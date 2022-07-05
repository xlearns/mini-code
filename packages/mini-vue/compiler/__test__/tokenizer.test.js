import { describe, it, expect } from "vitest";
import { tokenizer } from "../src/tokenizer";

describe("compiler", () => {
  it("tokenizer", () => {
    let input = "<div>hello</div>";
    let tokens = tokenizer(input);
    expect(tokens).toEqual([
      { type: "tagstart", val: "div" },
      { type: "text", val: "hello" },
      { type: "tagend", val: "div" },
    ]);
  });

  it("2", () => {
    let input = `<div id="app">
    <div @click="()=>console.log(xx)" :id="name">{{name}}</div>
    <h1 :name="title">玩转vue3</h1>
    <p >编译原理</p>
  </div>
  `;
    let tokens = tokenizer(input);
    expect(tokens).toEqual([
      { type: "tagstart", val: "div" },
      { type: "props", val: 'id="app"' },
      { type: "tagstart", val: "div" },
      { type: "props", val: '@click="()=>console.log(xx)"' },
      { type: "props", val: ':id="name"' },
      { type: "text", val: "{{name}}" },
      { type: "tagend", val: "div" },
      { type: "tagstart", val: "h1" },
      { type: "props", val: ':name="title"' },
      { type: "text", val: "玩转vue3" },
      { type: "tagend", val: "h1" },
      { type: "tagstart", val: "p" },
      { type: "text", val: "编译原理" },
      { type: "tagend", val: "p" },
      { type: "tagend", val: "div" },
    ]);
  });
});
