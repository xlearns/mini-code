import { pie } from "./../pie";
import { describe, it, expect } from "vitest";
var dataset = [
  ["小米", 10],
  ["三星", 10],
];
describe("pie基本使用", () => {
  it("测试饼状图生成器数据占用比例", () => {
    let data = pie(dataset);
    let ratios = data.map((v) => v.ratio);

    let target = dataset.map((v) => v[1] / 20);

    expect(ratios).toEqual(target);
  });

  it("测试饼状图生成器角度占用比例", () => {
    let data = pie(dataset).map((v) => {
      let startAngle = (180 / Math.PI) * v.startAngle;
      let endAngle = (180 / Math.PI) * v.endAngle;
      return {
        startAngle: startAngle,
        endAngle: endAngle,
        name: v[0],
        value: v[1],
      };
    });
    let target = [
      {
        startAngle: 0,
        endAngle: 180,
        name: "小米",
        value: 10,
      },
      {
        startAngle: 180,
        endAngle: 360,
        name: "三星",
        value: 10,
      },
    ];
    expect(data).toEqual(target);
  });
});
