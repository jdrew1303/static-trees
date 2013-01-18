"use strict"; "use restrict";


function inorder(len) {
  return {
    root: len >>> 1,
    
  
  };
};
exports.inorder = inorder;

var bfs = {
  root:   0,
  parent: new Function("x", "return x>>>1;"),
  left:   new Function("x", "return x<<1;"),
  right:  new Function("x", "return (x<<1)+1;")
};
exports.bfs = bfs;
