# [参考](https://github.com/PPGY0711/react_learn_notes/blob/bbd695122ad9f39cfb84076b6e977c087459ba8d/promise/lib/Promise_class.js)

# [node.js如何处理es6模块](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)

## esm与cjs区别
- 语法上面，CommonJS 模块使用require()加载和module.exports输出，ES6 模块使用import和export。
- 用法上面，require()是同步加载，后面的代码必须等待这个命令执行完，才会执行。import命令则是异步加载，或者更准确地说，ES6 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。
## node中使用esm
- Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。
- 如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。
- 如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。


# 极简版promise
# 支持异步回调promise
# then的实现
# 真正的微任务