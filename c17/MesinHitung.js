export default class Example {

  constructor(){
    this.x = 1;
    this.Pi = 3.14;
  }

  //Menampilkan Nilai x
  result(){
    console.log(Math.round(this.x));
    return this;
  }
  // Method Tambah Nilai Ke x
  add(val){
    this.x += val;
    return this;
  }

  //Method Pengurangan Nilai X
  substract(val){
    this.x -= val;
    return this;
  }

  //Method Membagi Nilai x
  divide(val){
    this.x /= val;
    return this;
  }

  //Method Perkalian Nilai x
  multiply(val){
    this.x *= val;
    return this;
  }

  //Method nilai akar dari x
  square(){
    this.x = Math.sqrt(this.x)
    return this;
  }

  //Method Menghasilkan nilai pangkat sebanyak n dari x
  exponent(val){
    this.x = Math.pow(this.x, val);
    return this;
  }

}
