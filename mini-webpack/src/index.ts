const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");
let ID = 0;

function readFile(filename) {
	const content = fs.readFileSync(filename, "utf-8");
	return content;
}

function parser(content) {
	const ast = babylon.parse(content, {
		sourceType: "module",
	});
	return ast;
}

function createAsset(filename) {
	const content = readFile(filename);
	const ast = parser(content);
	const dependencies = [];

	traverse(ast, {
		ImportDeclaration({ node }) {
			const source = node.source.value;
			dependencies.push(source);
		},
	});

	//  通过递增简单计数器为此模块分配唯一标识符.
	const id = ID++;
	const { code } = transformFromAst(ast, null, {
		presets: ["env"],
	});

	return {
		id,
		filename,
		dependencies,
		code,
	};
}

function createGraph(filename) {
	const mainAsset = createAsset(filename);
	const queue: typeAsset[] = [mainAsset];

	for (const asset of queue) {
		asset.mapping = {};
		// 这个模块所在的目录
		const dirname = path.dirname(asset.filename);
		//模块依赖
		asset.dependencies.forEach((relativePath) => {
			const absolutePath = path.join(dirname, relativePath);
			// __dirname根目录 绝对地址
			// dirname 当前目录 相对地址
			const child = createAsset(absolutePath);
			asset.mapping[relativePath] = child.id;
			queue.push(child);
		});
	}

	return queue;
}

function bundle(pragh) {
	let modules = "";
	pragh.forEach((mod) => {
		modules += `${mod.id}: [
      function (require, module, exports) { ${mod.code} },
      ${JSON.stringify(mod.mapping)},
    ],`;
	});

	const result = `
    (function(modules) {
      function require(id) { //🌟
        const [fn, mapping] = modules[id];
        function localRequire(name) { //⏰
          return require(mapping[name]); //🌟
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports); 
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;

	return result;
}

const url = "./example/index.js";
let graph = createGraph(url);

const result = bundle(graph);

console.log(result);
