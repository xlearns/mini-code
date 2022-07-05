# 整个流程
- 
# observe
- observer
 - 遍历data中的key判断是对象还是数组
- walk
 - 对象拦截
- defineReactive
 - object.defineProperty
 - get
 - set
# deps
- 收集依赖
- addSub 
  - 到dep数组中
- notify 
  - 触发依赖
# watcher
- wath?
- template or api [watch]
- 将当前this赋值给window.target
- 触发get
- 将window.target赋值为空
- 在this挂在update方法
# watch
# computed

