# 整体流程

# effectstack

- 存放当前 effect
- 考虑到存在嵌套的情况，所以 vue3 中将其设计为数组

# deps

- 存放 effect 依赖数组
- vue3 中将 obj 声明为 map 存放 weakmap 中、将 key 声明为 set 存放在 map 中
  - weakmap 为弱引用所以不会栈溢出
  - map 的 key 可以是任意类型
  - set 去重

# reactive

- 数据劫持
  - get 中 track
  - set 中 trigger
- proxy

# effect

- reactive 属性改变的副作用函数
- 具体过程。首先 effect 执行。会调用 createEffect，这个函数的作用为创建 effect 其实就是包裹了一层 effect 函数并返回。执行 createEffect 返回的函数。就会执行 run 函数，run 函数会先将当前的 effect 给 push 到 effectstack 中，然后执行 effect 里面的 fn，由于 fn 里面引用了 reacitve 的属性。所以会触发 proxy 的 get 从而将 effect 添加到 deps 中。然后会将当前 effect 冲 effectstack 这样设计是为了解决嵌套问题。

# track

# trigger

# computed
