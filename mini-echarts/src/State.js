// 场景
class Stage {
  constructor() {
    this.deps = [];
  }
  
  add(...ele) {
    this.deps.push(...ele);
  }
  
  delete(ele) {
    let index = this.deps.indexOf(ele);
    if (index <= -1) return;
    this.deps.splice(index, 1);
  }
  
  updateElements() {
    this.deps.sort((a,b)=>{
      return a.zLevel - b.zLevel;
    })
  }

  getAll() {
    this.updateElements()
    return this.deps;
  }
}

export default Stage;
