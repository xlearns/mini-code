import { describe, it, expect } from "vitest";
import { parse } from "../src/parse";

describe("compiler", () => {
  it("parse text", () => {
    let input = "<div>hello</div>";
    let tokens = parse(input);
    expect(tokens).toEqual({
      "type": "root",
      "props": [],
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": [],
          "children": [
            {
              "type": "text",
              "val": "hello",
            }
          ]
        }
      ]
    } );
  });
  
  it("parse dom", () => {
    let template = `<div id="app">
        <div @click="()=>console.log(xx)" :id="name">{{name}}</div>
        <h1 :name="title">玩转vue3</h1>
        <p >编译原理</p>
    </div>`

    let tokens = parse(template);
    expect(tokens).toEqual({
      "type": "root",
      "props": [],
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": [
            {
              "key": "id",
              "val": "\"app\""
            }
          ],
          "children": [
            {
              "type": "element",
              "tag": "div",
              "props": [
                {
                  "key": "@click",
                  "val": "\"()=>console.log(xx)\""
                },
                {
                  "key": ":id",
                  "val": "\"name\""
                }
              ],
              "children": [
                {
                  "type": "text",
                  "val": "{{name}}"
                }
              ]
            },
            {
              "type": "element",
              "tag": "h1",
              "props": [
                {
                  "key": ":name",
                  "val": "\"title\""
                }
              ],
              "children": [
                {
                  "type": "text",
                  "val": "玩转vue3"
                }
              ]
            },
            {
              "type": "element",
              "tag": "p",
              "props": [],
              "children": [
                {
                  "type": "text",
                  "val": "编译原理"
                }
              ]
            }
          ]
        }
      ]
    });
  });
});
