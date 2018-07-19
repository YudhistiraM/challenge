function tebakKata(){
  let fs = require('fs'),
  myData = fs.readFileSync('data.json'),
  dataFinish = JSON.parse(myData),
  i = 0;

  let readline = require('readline');

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt:'Tebakan : '
  });
  console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawban yang benar ya!");
  console.log("pertanyaan: " +dataFinish[i].definition);
  rl.prompt();
  rl.on('line', (input) => {
    if (dataFinish[i].term == (input)) {
      console.log("Anda benar!");
      i++;
      if (i < dataFinish.length) {
        console.log("pertanyaan: " +dataFinish[i].definition);
        rl.prompt();
      }else {
        console.log("Hore Anda Menang");
      }
    } else {
      console.log("wkwkwkwk,Anda Kurang Beruntung!");
      rl.prompt();
    }
  }).on('close', () => {
    console.log('SAMPAI JUMPA DI KESEMPATAN LAINNYA! :)');
    process.exit(0);
  });
  //console.log(dataFinish);
}

tebakKata()
