# target
- 这个库应该如何使用？
  - 基于这个库的文档写一篇小教程
- 持续集成是如何实现的
  - CircleCI
- 目录分析
  - .editorconfig
    - 必须配合：EditorConfig for VS Code 插件使用
    - [参考](https://juejin.cn/post/7058177971214876708)
  - .gitattributes
- 注释
  - [参考](https://juejin.cn/post/7024319866119127053)
- 分析用了那些包
  - mri
    - 获取解析命令行的数据
- package.json
- 分析tsconfig.json配置
- 类型分析
- 构建是如何做的？
  - rollup.config.js
  - rollup各个插件的作用
    - 插件的具体实现
- 分析一下单元测试环境是如何搭建的
- 写一个库的 README 需要哪几个部分？
- 尝试通过单元测试调试库
- 原理
  - EventEmitter
    - 订阅发布
    - on/emit
  - options
  - command
  - action
  - parse
    - mri
  - 如何实现连续调用得api
  - help 
  - version 

# finish
- jest
  - 快照
  - 配置
  - 解析ts、tsx
  - js导入ts
    - ts-node


# 忽略
- script文件夹
  - deno相关
- mod.js
- mod.ts
- mod_test.ts
