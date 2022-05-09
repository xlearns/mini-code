class Element{
  constructor(opt){
    this.options = opt
    this.shape = {}
    this.style = {}
  }
  updateOptions(){
    // 合并
  }
  render(ctx){
    // 绘制
   
  }
  beforeRender(ctx){
    // 绘制之前
    // 保存状态 做到0侵入
    let style = this.style
    ctx.save()
    ctx.fillStyle = style.fill
    ctx.strokeStyle = style.stroke
    ctx.beginPath()
  }
  afterRender(ctx){
    // 绘制之后
    // 恢复状态
    ctx.stroke()
    ctx.fill()
    ctx.restore()
    
  }
  refresh(ctx){
    // 刷新
    this.beforeRender(ctx)
    this.render(ctx)
    this.afterRender(ctx)
  }
}

export default Element