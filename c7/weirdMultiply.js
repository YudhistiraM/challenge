function weirdMultiply(sentence){
  let hasil = 1,
  strAngka = sentence.toString();

  if (strAngka.length == 1) {
    hasil = parseInt(strAngka);
    return hasil;
  } else {
    for (let i = 0; i < strAngka.length; i++) {
      hasil *= parseInt((strAngka.charAt(i)));
    }
    return weirdMultiply(hasil);
  }

}
console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));
