import Watcher from './Watcher.js'

// 正则匹配{{}}
const doubleBracketsReg = /\{\{(.*)\}\}/

export default class Compile{
  constructor(el,vm){
     this.$el = el
     this.$vm = vm
     if(this.$el){
        //获取所有节点
        this.$fragment = this.getNodeFragment(this.$el)
        // 编译
        this.compile(this.$fragment)
        // 插入
        this.$el.appendChild(this.$fragment)
     }
  }
  getNodeFragment(el){
    // 创建文档碎片，减少DOM操作
    let frag = document.createDocumentFragment()

    let child 
    while(child = el.firstChild){
      // 添加到文档碎片的时候会自动删除当前节点
      frag.appendChild(child)
    }

    return frag

  }
  compile(frag){
      // 获取文档碎片中的所有节点
      let childNodes = frag.childNodes
      // 遍历所有节点
      Array.from(childNodes).forEach((node)=>{
        // 是否是文本节点
        if(this.isTextNode(node)){
          // 解析文本节点
          this.compileText(node)
        }
        // 是否是元素节点
        if(this.isElementNode(node)){
            //  获取当前节点所有的属性
            let attrs = node.attributes
            // 遍历所有属性
            Array.from(attrs).forEach((attr)=>{
              let {name,value} = attr
              // 判断是否是指令
              if(this.isDirective(name)){
                // 解析指令
                this.compileDirective(node,name,value)
              }
               // 判断是否是事件
                if(this.isEvent(name)){
                  // 解析事件
                  this.compileEvent(node,name,value)
                }
            })
        }
      })
      // 递归
      if(frag.childNodes?.length){
        this.compile(frag)
      }
  }
  // 解析文本节点
  compileText(node){
    // 获取文本内容
    let text = node.textContent
    // 判断是否有指令
    let reg = doubleBracketsReg
    if(reg.test(text)){
      // RegExp.$1选中的是{{}}里边的内容，会选取最近一次的匹配的结果
      let exp = RegExp.$1
      // 替换文本内容
      node.textContent = text.replace(reg,this.$vm[exp])
      // 添加订阅者
      // Watcher(node,vm,exp,cb)
      new Watcher(node,this.$vm,exp,(newVal)=>{
        node.textContent = text.replace(reg,newVal)
      })
    }
  }
 // 解析指令
  compileDirective(node,name,value){
    let [,directive] = name.split('-')
    // 判断指令
    switch(directive){
      case 'text':
        // 解析文本指令
        this.compileTextDirective(node,value)
        break;
      case 'html':
        // 解析html指令
        this.compileHtmlDirective(node,value)
        break;
      case 'model':
        // 解析model指令
        this.compileModelDirective(node,value)
        break;
      case 'show':
        // 解析show指令
        this.compileShowDirective(node,value)
        break;
      case 'for':
        // 解析for指令
        this.compileForDirective(node,value)
        break;
      case 'if':
        // 解析if指令
        this.compileIfDirective(node,value)
        break;
      case 'class':
        // 解析class指令
        this.compileClassDirective(node,value)
        break;
      case 'style':
        // 解析style指令
        this.compileStyleDirective(node,value)
        break;
      default:
        break;
    }
  }
  // 解析事件
  compileEvent(node,name,value){
    // 数组结构复制解析第二位类似[1]
    let [,eventName] = name.split('@')
    // 给节点添加事件
    node.addEventListener(eventName,this.$vm[value].bind(this.$vm))
  }
  // 解析文本指令
  compileTextDirective(node,exp){
    // 获取文本内容
    let text = node.textContent
    // 替换文本内容
    node.textContent = text.replace(doubleBracketsReg,this.$vm[exp])
    // 添加订阅者
    new Watcher(node,this.$vm,exp,(newVal)=>{
      node.textContent = text.replace(doubleBracketsReg,newVal)
    })
  }

  // 解析html指令
  compileHtmlDirective(node,exp){
    // 获取文本内容
    let html = node.innerHTML
    // 替换文本内容
    node.innerHTML = html.replace(doubleBracketsReg,this.$vm[exp])
    // 添加订阅者
    new Watcher(node,this.$vm,exp,(newVal)=>{
      node.innerHTML = html.replace(doubleBracketsReg,newVal)
    })
  }

  // 解析model指令
  compileModelDirective(node,exp){
    // 获取文本内容
    let value = node.value
    // 替换文本内容
    node.value = value.replace(doubleBracketsReg,this.$vm[exp])
    // 添加订阅者
    new Watcher(node,this.$vm,exp,(newVal)=>{
      node.value = value.replace(doubleBracketsReg,newVal)
    })
  }

  // 解析show指令
  compileShowDirective(node,exp){
    // 获取文本内容
    let value = node.style.display
    // 替换文本内容
    node.style.display = value.replace(doubleBracketsReg,this.$vm[exp])
    // 添加订阅者
    new Watcher(node,this.$vm,exp,(newVal)=>{
      node.style.display = value.replace(doubleBracketsReg,newVal)
    })
  }

  // 解析if指令
  compileIfDirective(node,exp){
    new Watcher(node,this.$vm,exp,(newVal)=>{
      console.log('解析if指令')
    })
  }

  // 解析class指令
  compileClassDirective(node,exp){
    // 获取文本内容
    let value = node.className
    // 替换文本内容
    node.className = value.replace(doubleBracketsReg,this.$vm[exp])
    // 添加订阅者
    new Watcher(node,this.$vm,exp,(newVal)=>{
      node.className = value.replace(doubleBracketsReg,newVal)
    })
  }

  // 解析style指令
  compileStyleDirective(node,exp){
    // 添加订阅者
    new Watcher(node,this.$vm,exp,(newVal)=>{
      console.log('解析style指令')
    })
  }

  // 解析for指令
  compileForDirective(node,exp){

    //解析v-for正则
    const forReg = /\s*(.*)\s+in\s+(.*)\s*/
    let [,item,index] = exp.match(forReg)
    // 获取数组
    let arr = this.$vm[index]
    // 创建一个新的fragment
    let frag = document.createDocumentFragment()
    // 循环遍历数组
    arr.forEach((item,index)=>{
      // 创建一个新的节点
      let newNode = node.cloneNode(true)
      // 替换文本内容
      newNode.textContent = newNode.textContent.replace(doubleBracketsReg,item)
      // 添加订阅者
      new Watcher(newNode,this.$vm,item,(newVal)=>{
        newNode.textContent = newNode.textContent.replace(doubleBracketsReg,newVal)
      })
      // 添加到fragment
      frag.appendChild(newNode)
    })
    // 替换节点
    node.parentNode.replaceChild(frag,node)
  }

  // 判断是否是文本节点
  isTextNode(node){
    return node.nodeType === 3
  }
  // 判断是否是元素节点
  isElementNode(node){
    return node.nodeType === 1
  }
  // 判断是否是指令
  isDirective(attr){
    return attr.startsWith('v-')
  }
  // 判断是否是事件
  isEvent(node){
    return node.startsWith('@')
  }
}





