export default class InterceptorManager{
  constructor(){
    this.handlers = []
  }
  use(fulfilled,rejected){
    this.handlers.push({
      fulfilled,
      rejected
    })
  }
}