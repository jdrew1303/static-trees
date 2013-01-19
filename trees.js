/**
 * Routines for static binary search trees in JavaScript
 *
 * Author: Mikola Lysenko (c) 2013
 */
"use strict"; "use restrict";

var bits = require("bit-twiddle");

//In order memory layout of an array
var inorder = {
  root:     function(n)     { return (bits.nextPow2(n+1)-1)>>>1; },
  begin:    function(n)     { return 0; },
  end:      function(n)     { return n-1; },
  height:   function(x, n)  { return bits.countTrailingZeros(~x); },
  prev:     function(x, n)  { return x-1; },
  next:     function(x, n)  { return x+1; },
  parent:   function(x, n)  {
    var h = bits.countTrailingZeros(~x);
    return (x & ~(1<<(h+1)) )^(1<<h);
  },
  left:     function(x, n)  {
    return x-(1<<(bits.countTrailingZeros(~x)-1));
  },
  right:    function(x, n)  {
    return x+(1<<(bits.countTrailingZeros(~x)-1));
  }
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



function convert(from_layout, to_layout, array) {
  var n       = array.length
    , result  = new Array(n)
    , x       = from_layout.begin(n)
    , y       = to_layout.begin(n);
  for(var i=0; i<n; ++i, x=from_layout.next(x), y=to_layout.next(y)) {
    result[y] = array[x];
  }
  return result;
}
exports.convert = convert;


function lowerBound(layout, compare_func, array, x) {
  var n = array.length;
  if(n === 0) {
    return -1;
  }
  var v = layout.root(n)
    , r = -1;
  console.log("SEARCHING--n=", n, ",root=", v, ",x=", x)
  while(layout.height(v, n) > 0) {
    console.log("@node=", v + ", val[n]=", array[v], ", r=", r);
    if(compare_func(array[v], x) <= 0) {
      console.log("LO");
      r = v;
      v = layout.right(v, n);
    } else {
      console.log("HI");
      v = layout.left(v, n);
    }
  }
  console.log("@bottom=", v, ", r=", r);
  if(compare_func(array[v], x) <= 0) {
    r = v;
  }
  console.log("DONE:", r);
  return r;
}
exports.lowerBound = lowerBound;

