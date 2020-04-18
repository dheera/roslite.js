const ROSLiteCore = require("./ROSLiteCore.js");
const ROSLiteNode = require("./ROSLiteNode.js");

let _core = new ROSLiteCore();
let initNode = (nodeName) => {
  return new ROSLiteNode(_core, nodeName);
}

module.exports = {
  initNode: initNode,
}
