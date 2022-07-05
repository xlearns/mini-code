import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import ejs from "ejs";
import babel from "babel-core";
var id = 0;
function createAsset(filePath) {
  //1、获取文件内容
  const source = fs.readFileSync(filePath, {
    encoding: "utf-8",
  });
  const ast = parser.parse(source, {
    sourceType: "module",
  });
  const deps = [];
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      deps.push(node.source.value);
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["env"],
  });
  //2、获取依赖关系
  return {
    filePath,
    code,
    deps,
    mapping: {},
    id: id++,
  };
}
function createGraph() {
  const mainAsset = createAsset("./example/index.js");
  const queue = [mainAsset];
  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      const child = createAsset(path.resolve("./example", relativePath));
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  return queue;
}
const graph = createGraph();
function build(graph) {
  const template = fs.readFileSync("./bundle.ejs", { encoding: "utf-8" });
  const data = graph.map((asset) => {
    const { id, code, mapping } = asset;
    return {
      id,
      code,
      mapping,
    };
  });
  let code = ejs.render(template, { data });
  fs.writeFileSync("./dist/bundle.js", code);
}
build(graph);
