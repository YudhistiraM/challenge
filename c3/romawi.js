function romawi(n) {
var desimal = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
var roman = ["M","CM","C","CD", "C","XC","L","XL","X","IX","V","IV","I"];
var hasil = "";

if (n <= 0 || n >= 4000)
return n;

for (var i = 0; i <desimal.length; i++){
  while (n%desimal[i] < n) {
    hasil += roman [i];
    n -= desimal [i];

  }
}
return hasil;
}
console.log("Script Testing untuk Konversi Romawi\n");
console.log("input | expected | result");
console.log("_____ | ________ | ______");
console.log("0     | 0       |", romawi(0));
console.log("9     | IX       |", romawi(9));
console.log("13    | XIII     |", romawi(13));
console.log("1453  | MCDLIII  |", romawi(1453));
console.log("1646  | MDCXLVI  |", romawi(1646));
