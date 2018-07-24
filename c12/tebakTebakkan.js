function tebakTebakkan(){
  let soal = process.argv[2];

  if(soal){
    const fs = require('fs'),
    myData = fs.readFileSync(soal),
    dataFinish = JSON.parse(myData);
    let i = 0;
    let fault = 0;

    let readline = require('readline');

    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt:'Tebakan : ',
    });
    console.log("Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini 'data.json'");
    console.log("untuk bermain, jawablah dengan jawaban yang sesuai.");
    console.log("Gunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan di tanyakan kembali");
    console.log("\npertanyaan: " +dataFinish[i].definition);
    rl.prompt();
    rl.on('line', (input) => {
      if(input.trim().toLowerCase() == 'skip'){
        //toLowerCase() untuk mengeksekusi huruf besar atau kecil agar "sama ketika di eksekusi"
        dataFinish.push(dataFinish[i]);
        i++;
        console.log("\npertanyaan: " +dataFinish[i].definition);
      }else{
        if (dataFinish[i].term == input.trim()) {
          console.log("\nAnda Beruntung!");
          i++;
          if (i < dataFinish.length) {
            console.log("\npertanyaan: " +dataFinish[i].definition);
          }else {
            console.log("\nHore Anda Menang!\n");
            rl.close();
          }
        } else {
          fault++;
          console.log("\nAnda Kurang Beruntung! anda telah salah "+fault+" kali, Silahkan coba lagi");
        }
      }
      rl.prompt();
      //rl.prompt (line 44) di buat satu kali karena di eksekusi hampir pada setiap kondisi
    }).on('close', () => {
      console.log('SAMPAI JUMPA DI KESEMPATAN LAINNYA! :)');
      process.exit(0);
    });
  }else{
    console.log("\nTolong sertakan nama file dengan inputan soalnya");
    console.log("Misalnya 'node solution.js data.json'\n");
    process.exit(0);
  }
}

tebakTebakkan();
//console.log(process.argv[0]);
