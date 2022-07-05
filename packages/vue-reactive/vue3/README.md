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
- 收集依赖到 deps 中由于deps的数据结构为WeakMap{map:{key:set}}，所以当不存在的时候需要做初始化

# trigger
- 触发依赖根据obj与key结构deps中的set也就是拿到dep数组,然后遍历数组，调用每一个effect

# 与Vue2.x的区别
- proxy与defineProperty
 - defineProperty的缺点
  - 无法拦截对象包括数组新增或者删除的数据
  - [通过下标修改数组属性拦截不到](https://segmentfault.com/a/1190000015783546)
    - 这个结论是错误的.事实上defineProperty可以拦截数组存在的元素的修改，但是不能拦截数组的其他属性,比如我们新增一个元素，就不会触发监听事件，因为这个新属性我们并没有监听，删除一个属性也是。为什么vue中下标修改不好使呢.是因为vue中考虑了性能原因.所以直接修改数组下标不是响应式.
    - 试想一下如果把数组下标当做对象的属性进行defineReactive，如果数组只有10个属性，这样做没问题，如果数组长度为1000呢，挨个defineReactive么？性能消耗太大，vue的做法是修改原生操作数组的方法，并且跟用户约定修改数组要用这些方法去操作
   ```js
    var arr = [1,2,3,4]
    arr.forEach((item,index)=>{
        Object.defineProperty(arr,index,{
            set:function(val){
                console.log('set')
                item = val
            },
            get:function(val){
                console.log('get')
                return item
            }
        })
    })
    arr[1]; // get  2
    arr[1] = 1; // set  1
   ```
- effect跟watcher的本质上都是将先将要收集的对象赋值给一个中间变量,然后通过获取值[obj[key]]来触发proxy或者Object.defineProperty的get从而将要收集的对象添加到deps中

