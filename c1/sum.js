function sum(){
    var x = 0;
    for(var i = 0; i < arguments.length; i++){
      x = x + arguments[i];
    }
    return x;
}

console.log (sum(1,2,7));

// i = 0, x = 0 + 0 = 0
// i = 1, x = 0 + 1 = 1
// i = 2, x = 1 + 2 = 3
// i = 3, x = 3 + 7 = 7
