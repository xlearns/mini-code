function bindStyle (ctx, style) {
  let fill = style.fill || 'transparent'
  ctx.fillStyle = fill
  ctx.strokeStyle = style.stroke
  ctx.globalAlpha = style.opacity
  ctx.lineWidth = style.lineWidth
}

class Element {
  constructor(opt) {
    this.options = opt;
    this.shape = {};
    this.style = {};
    this.updateOptions();
  }
  updateOptions() {
    // 合并
    let opt = this.options;
    opt.style && Object.assign(this.style, opt.style);
    opt.shape && Object.assign(this.shape, opt.shape);
    if(!opt.zLevel) {
      return  this.zLevel = 0
    }
    this.zLevel = opt.zLevel
  }
  render(ctx) {
    // 绘制
  }
  beforeRender(ctx) {
    // 绘制之前
    // 保存状态 做到0侵入
    let style = this.style;
    ctx.save();
    bindStyle(ctx, style);
    ctx.beginPath();
  }
  afterRender(ctx) {
    // 绘制之后
    // 恢复状态
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
  refresh(ctx) {
    // 刷新
    this.beforeRender(ctx);
    this.render(ctx);
    this.afterRender(ctx);
  }
}

export default Element;
