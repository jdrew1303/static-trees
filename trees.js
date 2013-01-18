"use strict"; "use restrict";

var bits = require("bit-twiddle");

var inorder = {
  root:     function(n)     { return n>>>1; },
  begin:    function(n)     { return 0; },
  end:      function(n)     { return n; },
  height:   function(x, n)  { return bits.countTrailingZeros(n); },
  prev:     function(x, n)  { return n-1; },
  next:     function(x, n)  { return n+1; },
  parent:   function(x, n)  { },
  left:     function(x, n)  { },
  right:    function(x, n)  { }
};
exports.inorder = inorder;

var bfs = {
  root:     function(n)     { return 0; },
  begin:    function(n)     { },
  end:      function(n)     { },
  height:   function(x, n)  { return bits.log2(n) - bits.log2(x); },
  prev:     function(x, n)  { },
  next:     function(x, n)  { },
  parent:   function(x, n)  { return x >>> 1; },
  left:     function(x, n)  { return x << 1; },
  right:    function(x, n)  { return (x<<1)+1; }
};
exports.bfs = bfs;

var dfs = {
  root:     function(n)     { return 0; },
  height:   function(x, n)  { },
  prev:     function(x, n)  { },
  next:     function(x, n)  { },
  parent:   function(x, n)  { },
  left:     function(x, n)  { },
  right:    function(x, n)  { }
};
exports.dfs = dfs;

var veb = {
  root:     function(n)     { return 0; },
  height:   function(x, n)  { },
  prev:     function(x, n)  { },
  next:     function(x, n)  { },
  parent:   function(x, n)  { },
  left:     function(x, n)  { },
  right:    function(x, n)  { }
};
exports.veb = veb;

function convert(array, from_layout, to_layout) {
  var n       = array.length;
    , result  = new Array(n)
    , x       = from_layout.begin(n)
    , y       = to_layout.begin(n);
  for(var i=0; i<n; ++i, x=from_layout.next(x), y=to_layout.next(y)) {
    result[y] = array[x];
  }
  return result;
}
exports.convert = convert;


function lowerBound(array, x, compare_func, layout) {
  var n       = array.length;
    , v       = layout.root(n);
  while(layout.height(v, n) > 0) {
    var s = compare_func(array[v], x);
    if(s < 0) {
      v = layout.left(v, n);
    } else if(s > 0) {
      v = layout.right(v, n);
    } else {
      return v;
    }
  }
  return v;
}
exports.lowerBound = lowerBound;

