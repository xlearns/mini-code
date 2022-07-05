//饼状图生成器
function pie(data) {
  let sum = data.map((v) => v[1]).reduce((pre, cur) => pre + cur);
  let angle = 0;
  return data.map((v) => {
    let [key, value] = v;
    v.ratio = value / sum;
    v.startAngle = angle;
    angle += v.ratio * 2 * Math.PI;
    v.endAngle = angle;
    return v;
  });
}

export { pie };
