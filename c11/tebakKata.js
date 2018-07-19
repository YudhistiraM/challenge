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
  console.log("\npertanyaan: " +dataFinish[i].definition);
  rl.prompt();
  rl.on('line', (input) => {
    if (dataFinish[i].term == (input)) {
      console.log("Selamat Anda Benar!");
      i++;
      if (i < dataFinish.length) {
        console.log("\npertanyaan: " +dataFinish[i].definition);
        rl.prompt();
      }else {
        console.log("\nHore Anda Menang!\n");
        rl.close();
      }
    } else {
      console.log("wkwkwkwk,Anda Kurang Beruntung!\n");
      rl.prompt();
    }
  }).on('close', () => {
    console.log('SAMPAI JUMPA DI KESEMPATAN LAINNYA! :)');
    process.exit(0);
  });
  //console.log(dataFinish);
}

tebakKata()
