function sum(){
    var x = 0;
    for(var i = 0; i < arguments.length; i++){
      x = x + arguments[i];
    }
    return x;
}

console.log (sum(1,2,3));
