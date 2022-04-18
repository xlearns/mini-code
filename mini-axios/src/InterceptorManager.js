export default class InterceptorManager{
  constructor(){
    this.handlers = []
  }
  use(resolved,rejected){
    this.handlers.push({
      resolved,
      rejected
    })
  }
}