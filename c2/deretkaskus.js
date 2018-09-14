// function deretkaskus(n){
// var n = 0;
// for (var i = 0; i < n ; i++) {
//     n = n + 3
// }
// return n;
// if (n%5){
//   console.log("KAS");
// }
//   else if (n%6) {
//     console.log ("KUS");
//   }
//   else if (n%5 && n%6){
//     console.log ("KASKUS");
//   }
// }
// console.log(deretkaskus(10));

function kaskus(n){
  var result = []
  for(var i = 3; i <= n * 3; i+=3){
    if (i % 5 == 0 && i % 6 == 0){
      result.push("KASKUS")
    }else if(i % 6 == 0){
      result.push("KUS")
    }else if (i % 5 == 0){
      result.push("KAS")
    } else {
      result.push (i)
    }
  }
  return result;
}

console.log(kaskus(3));
