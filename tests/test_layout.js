var test = require("tap").test
  , trees = require("../trees.js");

var COMPARE = new Function("a", "b", "return a-b;");
var TEST_N = [ 0, 1, 2, 4, 7, 100, 128, 127, 129 ];


//Tests the layout of a binary tree
function testLayout(layout_str) {

  var layout = trees[layout_str];
  
  console.log(layout);
  
  test(layout_str, function(t) {
    for(var nn=0; nn<TEST_N.length; ++nn) {
    
      //Read in value of n to test
      var n  = TEST_N[nn];
      console.log("Testing: ", layout_str, "n=", n);
    
      //Create a random sorted list
      var data = new Array(n);
      for(var i=0; i<n; ++i) {
        data[i] = Math.random();
      }
      data.sort();
      
      //Convert to tree layout
      var tree = trees.convert(trees.inorder, layout, data);
      t.equal(tree.length, n);

      //Check successor codes
      for(var i=0, j=layout.begin(n); i<n; ++i, j=layout.next(j, n)) {
        t.equal(tree[j], data[i]);
      }
      
      //Check predecessor codes
      for(var i=n-1, j=layout.prev(layout.end(n), n); i>=0; --i, j=layout.prev(j, n)) {
        t.equal(tree[j], data[i]);
      }
      
      //Check binary search
      var bsearch = trees.lowerBound.bind(null, layout, COMPARE, tree);
      for(var i=0; i<n; ++i) {
        var lb = bsearch(data[i]);
        t.equal(tree[lb], data[i]);
      }
      
      console.log(layout.root(n), layout.height(layout.root(n),n));
      
      //Search against some random stuff
      for(var i=0; i<1000; ++i) {
        var rnd = Math.random() * 3 - 1
          , lb = bsearch(rnd);
        console.log(rnd, lb);
        if(n > 0) {
          t.ok(tree[lb+1] <= rnd, "lower range: query=", rnd, ",idx=" + lb + ",tree[lb+1]=" + tree[lb+1]);
        }
        if(lb >= 0) {
          t.ok(rnd < tree[lb], "upper range: query=", rnd, ",idx=" + lb + ",tree[lb+1]=" + tree[lb+1]);
        }
      }
    } 
    t.end();
  });
}

//Test each layout
(function() {
  for(l in {
    "inorder":  1
  }) {
    testLayout(l);
  }
})();
