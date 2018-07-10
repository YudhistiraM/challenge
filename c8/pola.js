function pola(str){
  //nb : '*' dan '=' bersifat unflexible dalam 'soal'
  let pecahan1 = str.split("="),
  //memecah data string menjadi dua bagian (newarray) berdasarkan 'sama dengan'
  angka3 = pecahan1[1].trim(),
  //'.trim()' menghapus white blank
  pecahan2 = pecahan1[0].split("*"),
  //memecah data string menjadi dua bagian kembali (newarray) berdasarkan 'operator'
  angka1 = pecahan2[0].trim(),
  angka2 = pecahan2[1].trim();

  for (let i = 0; i < 10 ; i++) {
    //pengulangan untuk pengecekan pada 'angka1'
    for (let j = 0; j < 10; j++) {
      //pengulangan untuk pengecekan pada 'angka2'
      if (parseInt(angka1.replace("#",i))*
         parseInt(angka2) ==
         parseInt(angka3.replace("#",j)))
         {
          return [i,j];
         }
      }
  }
}

console.log(pola("42#3 * 188 = 80#204"));
//result :[8 , 5]
console.log(pola("8#61 * 895 = 78410#5"));
//result :[7,9]
