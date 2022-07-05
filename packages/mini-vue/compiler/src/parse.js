import { tokenizer } from "./tokenizer";
// 生成ast
export function parse(template) {
  const tokens = tokenizer(template);
  let cur = 0;
  let ast = {
    type: "root",
    props: [],
    children: [],
  };
  while (cur < tokens.length) {
    ast.children.push(walk());
  }
  return ast;

  function walk() {
    let token = tokens[cur];
    if (token.type == "tagstart") {
      let node = {
        type: "element",
        tag: token.val,
        props: [],
        children: [],
      };
      token = tokens[++cur];
      while (token.type !== "tagend") {
        if (token.type == "props") {
          node.props.push(walk());
        } else {
          node.children.push(walk());
        }
        token = tokens[cur];
      }
      cur++;
      return node;
    }
    if (token.type === "tagend") {
      cur++;
      // return token
    }
    if (token.type == "text") {
      cur++;
      return token;
    }
    if (token.type === "props") {
      cur++;
      const [key, val] = token.val.replace("=", "~").split("~");
      return {
        key,
        val,
      };
    }
  }
}
