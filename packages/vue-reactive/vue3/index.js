import {reactive,effect,computed} from './reactive.js'

let state = reactive({
  count:0,
  name:'hello world',
})
let add = function(num){
  if(num==1){
    return 1
  }else{
    return (1+num)*num/2
  }
}
let reduce = computed(()=>{
  return add(state.count)
})

effect(()=>{ 
  document.querySelector("#app").innerHTML = `name:${state.name} count:${state.count} add:${reduce.value}`
})

window.state =state

window.addEventListener('click',()=>{
  state.count++
})