function indexprime(param1){
  function cekprime(param1){

    var Bilanganprima = Math.sqrt(param1);

    for(var i = 2; i <= Bilanganprima; i++){
      if (param1 % i == 0)
      return false;
    }
    return true;
  }
  var mulai = 2;
  var count = 0;
  while (count != param1) {
    if (cekprime(mulai)){
      count++;
    }
    mulai++;
  }
  return mulai - 1
}

console.log(indexprime(4));
console.log(indexprime(500));
console.log(indexprime(37786));
