// readline function connected
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//connect to database sqlite
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('university.db');

//Connect Cli-table
const Table = require('cli-table');

//Form Tampilan Awal
function Login(){
  console.log();
  console.log("============================================");
  console.log(" Welcome to Universitas Pendidikan Indonesia");
  console.log(" Jl. Setiabudhi No.225");
  console.log("============================================");
  inputUsername();
}

//Cek data username dan password ke database
let inputUsername = () => {
  rl.question('username :', function(user){
    inputPassword(user);
  });
}

let inputPassword = (user) => {
  rl.question('password :', (pass)=>{
    verification(user, pass);
  });
}

let verification = (user, pass) => {
  db.all(`SELECT * FROM Account WHERE Username='${user}' AND Passwor='${pass}'`, [], (err, akun)=>{
    if(err) throw err;
    if(akun.length > 0){
      mainInterface(akun);
    }else{
      console.log();
      console.log("Username dan Password salah !!");
      console.log("======================================================");
      inputUsername();
    }
  });
}

function mainInterface(akun){
  console.log();
  console.log(`Welcome, ${akun[0].Username}. your access level is : ${akun[0].Level_User}`);
  console.log("===========================================================================");
  console.log("Silahkan pilih opsi di bawah ini");
  console.log("[1] Mahasiswa");
  console.log("[2] Jurusan");
  console.log("[3] Dosen");
  console.log("[4] Mata Kuliah");
  console.log("[5] Kontrak");
  console.log("[6] Keluar");
  console.log("===========================================================================");
  chooseOption(akun);
}

let chooseOption = (akun) =>{
  rl.question('Masukkan salah satu no. dari opsi di atas: ', (pilih) => {
    cekOption(pilih, akun);
  });
}

let cekOption = (pilih, akun) =>{
  switch (pilih) {
    case '1':
    mahasiswaInterface(akun);
    break;
    case '2':
    //console.log('Menu Jurusan');
    jurusanInterface(akun);
    break;
    case '3':
    //console.log('Menu Dosen');
    dosenInterface(akun);
    break;
    case '4':
    //console.log('Mata Kuliah');
    kuliahInterface(akun);
    break;
    case '5':
    //console.log("Menu Kontrak");
    kontrakInterface(akun);
    break;
    case '6':
    Login();
    break;
    default:
    console.log();
    console.log('Masukkan Nomer sesuai opsi yang tersedia!!');
    console.log('==========================================');
    mainInterface(akun);
    break;
  }
}

//------------------------------------------------------------- KELOLA DATA MAHASISWA -------------------------------
//------------------------------------------------------------- KELOLA DATA MAHASISWA -------------------------------

let mahasiswaInterface = (akun) =>{
  console.log("=================================================");
  console.log("Silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar Murid");
  console.log("[2] Cari Murid");
  console.log("[3] Tambah Murid");
  console.log("[4] Hapus Murid");
  console.log("[5] Kembali");
  console.log("=================================================");
  chooseMahasiswa(akun);
}

let chooseMahasiswa = (akun) =>{
  rl.question('Masukkan salah satu no. dari opsi di atas: ', (pilih) => {
    optionMahasiswa(pilih, akun);
  });
}

let optionMahasiswa = (pilih, akun) =>{
  switch (pilih){
    case '1':
    listMahasiswa(akun);
    break;
    case '2':
    searchMahasiswa(akun);
    break;
    case '3':
    addMahasiswa(akun);
    break;
    case '4':
    console.log('Hapus Mahasiswa');
    deleteMahasiswa(akun);
    break;
    case '5':
    mainInterface(akun);
    break;
    default:
    console.log();
    console.log('Masukkan Nomer sesuai opsi yang tersedia!!');
    console.log('==========================================');
    mahasiswaInterface(akun);
    break;
  }
}

let listMahasiswa = (akun) =>{
  let sql = `SELECT Nim, Nama_Mhs, Alamat_Mhs, Usia_Mhs,Nama_Jur
  FROM Mahasiswa
  INNER JOIN Jurusan ON Mahasiswa.Id_Jurusan = Jurusan.Id_Jurusan`;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['NIM', 'Nama', 'Alamat', 'Usia','Jurusan'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].Nim ? rows[i].Nim : '', rows[i].Nama_Mhs ? rows[i].Nama_Mhs : '', rows[i].Alamat_Mhs ? rows[i].Alamat_Mhs : '', rows[i].Usia_Mhs ? rows[i].Usia_Mhs : '', rows[i].Nama_Jur ? rows[i].Nama_Jur : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    mahasiswaInterface(akun);
  });
}

let searchMahasiswa = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan NIM Mahasiswa: ', (Nim) => {
    cekMahasiswa(Nim, akun);
  });
}

let cekMahasiswa = (Nim, akun) =>{
  let sql = `SELECT * FROM Mahasiswa, Jurusan WHERE Mahasiswa.Id_Jurusan = Jurusan.Id_Jurusan AND Nim = ${Nim}`;
  db.all(sql, [], (err, rows) =>{
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      rows.forEach((row) => {
        console.log("=================================================");
        console.log(`NIM                : ${row.Nim}`);
        console.log(`Nama Mahasiswa     : ${row.Nama_Mhs}`);
        console.log(`Alamat Mahasiswa   : ${row.Alamat_Mhs}`);
        console.log(`Jurusan Mahasiswa  : ${row.Nama_Jur}`);
        console.log();
        console.log();
      });
      mahasiswaInterface(akun);
    } else {
      console.log(`Mahasiswa dengan nim ${Nim} tidak terdaftar`);
      console.log();
      searchMahasiswa();
    }
  });
}

let addMahasiswa = (akun) => {
  console.log("=================================================");
  console.log("Lengkapi data di bawah ini :");
  rl.question('NIM : ', (Nim) => {
    inputNamaMahsiswa(Nim, akun);
  });
}

let inputNamaMahsiswa = (Nim, akun) => {
  rl.question('Nama : ', (Nama) => {
    inputAlamatMahasiswa(Nim, Nama, akun);
  });
}


let inputAlamatMahasiswa = (Nim, Nama, akun) => {
  rl.question('Alamat :', (Alamat) =>{
    inputUsiaMahasiswa(Nim, Nama, Alamat, akun);
  });
}

let inputUsiaMahasiswa = (Nim, Nama, Alamat, akun) => {
  rl.question('Usia :', (Usia) =>{
    inputJurusanMahasiswa(Nim, Nama, Alamat, Usia, akun);
  });
}

let inputJurusanMahasiswa = (Nim, Nama, Alamat, Usia, akun) => {
  rl.question('Jurusan (Input-an berupa kode jurusan): ', (Jurusan) => {
    insertDataMahasiswa(Nim, Nama, Alamat, Usia, Jurusan, akun);
  });
}

let insertDataMahasiswa = (Nim, Nama, Alamat, Usia, Jurusan, akun) => {
  let sql = `INSERT INTO Mahasiswa (Nim, Nama_Mhs, Alamat_Mhs, Usia_Mhs, Id_Jurusan) VALUES (${Nim},'${Nama}','${Alamat}', ${Usia}, ${Jurusan})`;
  db.run(sql, function(err) {
    if (err) {
      throw err;
    }
    listMahasiswa(akun);
  });
}

let deleteMahasiswa = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan NIM mahasiswa yang akan dihapus: ', (nim) => {
    deleteLogic(nim, akun);
  });
}

let deleteLogic = (nim, akun) =>{
  let sql = `DELETE FROM Mahasiswa WHERE Nim = ${nim}`;
  db.run(sql, function (err){
    if (err) {
      throw err;
    }
    console.log(`Mahasiswa dengan NIM : ${nim} Telah Di Hapus`);
    console.log("=================================================");
    listMahasiswa(akun);
  });
}


//------------------------------------------------------------- KELOLA DATA JURUSAN -------------------------------
//------------------------------------------------------------- KELOLA DATA JURUSAN -------------------------------

let jurusanInterface = (akun) =>{
  console.log("=================================================");
  console.log("Silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar Jurusan");
  console.log("[2] Cari Jurusan");
  console.log("[3] Tambah Jurusan");
  console.log("[4] Hapus Jurusan");
  console.log("[5] Kembali");
  console.log("=================================================");
  chooseJurusan(akun);
}

let chooseJurusan = (akun) =>{
  rl.question('Masukkan salah satu no. dari opsi di atas: ', (pilih) => {
    optionJurusan(pilih, akun);
  });
}

let optionJurusan = (pilih, akun) =>{
  switch (pilih){
    case '1':
    listJurusan(akun);
    break;
    case '2':
    searchJurusan(akun);
    break;
    case '3':
    addJurusan(akun);
    break;
    case '4':
    // console.log('Hapus Mahasiswa');
    deleteJurusan(akun);
    break;
    case '5':
    mainInterface(akun);
    break;
    default:
    console.log();
    console.log('Masukkan Nomer sesuai opsi yang tersedia!!');
    console.log('==========================================');
    jurusanInterface(akun);
    break;
  }
}

let listJurusan = (akun) =>{
  let sql = `SELECT Id_Jurusan, Nama_Jur FROM Jurusan`;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['Kode Jurusan', 'Jurusan'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].Id_Jurusan ? rows[i].Id_Jurusan : '', rows[i].Nama_Jur ? rows[i].Nama_Jur : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    jurusanInterface(akun);
  });
}

let searchJurusan = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan Kode Jurusan: ', (KodJur) => {
    cekJurusan(KodJur, akun);
  });
}

let cekJurusan = (KodJur, akun) =>{
  let sql = `SELECT * FROM Jurusan WHERE Id_Jurusan = ${KodJur}`;
  db.all(sql, [], (err, rows) =>{
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      rows.forEach((row) => {
        console.log("=================================================");
        console.log(`Kode Jurusan     : ${row.Id_Jurusan}`);
        console.log(`Nama Jurusan     : ${row.Nama_Jur}`);
        console.log();
        console.log();
      });
      jurusanInterface(akun);
    } else {
      console.log(`Mahasiswa dengan nim ${Nim} tidak terdaftar`);
      console.log();
      searchJurusan(akun);
    }
  });
}

let addJurusan = (akun) => {
  console.log("=================================================");
  console.log("Lengkapi data di bawah ini :");
  rl.question('Kode Jurusan : ', (KodJur) => {
    inputJurusan(KodJur, akun);
  });
}

let inputJurusan = (KodJur, akun) => {
  rl.question('Nama Jurusan : ', (Nama_Jurusan) => {
    insertDataJurusan(KodJur, Nama_Jurusan, akun);
  });
}

let insertDataJurusan = (KodJur, Nama_Jurusan, akun) => {
  let sql = `INSERT INTO Jurusan (Id_Jurusan, Nama_Jur) VALUES (${KodJur},'${Nama_Jurusan}')`;
  db.run(sql, function(err) {
    if (err) {
      throw err;
    }
    listJurusan(akun);
  });
}

let deleteJurusan = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan Kode Jurusan yang akan dihapus: ', (KodJur) => {
    deleteLogicJurusan(KodJur, akun);
  });
}

let deleteLogicJurusan = (KodJur, akun) =>{
  let sql = `DELETE FROM Jurusan WHERE Id_Jurusan = ${KodJur}`;
  db.run(sql, function (err){
    if (err) {
      throw err;
    }
    console.log(`Nama Jurusan dengan Kode : ${KodJur} Telah Di Hapus`);
    console.log("===================================================");
    listJurusan(akun);
  });
}

//------------------------------------------------------------- KELOLA DATA Dosen -------------------------------
//------------------------------------------------------------- KELOLA DATA Dosen -------------------------------

let dosenInterface = (akun) =>{
  console.log("=================================================");
  console.log("Silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar Dosen");
  console.log("[2] Cari Dosen");
  console.log("[3] Tambah Dosen");
  console.log("[4] Hapus Dosen");
  console.log("[5] Kembali");
  console.log("=================================================");
  chooseDosen(akun);
}

let chooseDosen = (akun) =>{
  rl.question('Masukkan salah satu no. dari opsi di atas: ', (pilih) => {
    optionDosen(pilih, akun);
  });
}

let optionDosen = (pilih, akun) =>{
  switch (pilih){
    case '1':
    listDosen(akun);
    break;
    case '2':
    searchDosen(akun);
    break;
    case '3':
    addDosen(akun);
    break;
    case '4':
    //     console.log('Hapus Mahasiswa');
    deleteDosen(akun);
    break;
    case '5':
    mainInterface(akun);
    break;
    default:
    console.log();
    console.log('Masukkan Nomer sesuai opsi yang tersedia!!');
    console.log('==========================================');
    dosenInterface(akun);
    break;
  }
}

let listDosen = (akun) =>{
  let sql = `SELECT NIP, Nama_Dosen FROM dosen`;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['NIP', 'Nama Dosen'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].NIP ? rows[i].NIP : '', rows[i].Nama_Dosen ? rows[i].Nama_Dosen : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    dosenInterface(akun);
  });
}

let searchDosen = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan NIP Dosen : ', (Nip) => {
    cekDosen(Nip, akun);
  });
}

let cekDosen = (Nip, akun) =>{
  let sql = `SELECT * FROM Dosen WHERE NIP = ${Nip}`;
  db.all(sql, [], (err, rows) =>{
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      rows.forEach((row) => {
        console.log("=================================================");
        console.log(`NIP         : ${row.NIP}`);
        console.log(`Nama Dosen  : ${row.Nama_Dosen}`);
        console.log();
        console.log();
      });
      dosenInterface(akun);
    } else {
      console.log(`Dosen dengan NIP ${Nip} tidak terdaftar`);
      console.log();
      searchDosen(akun);
    }
  });
}

let addDosen = (akun) => {
  console.log("=================================================");
  console.log("Lengkapi data di bawah ini :");
  rl.question('NIP Dosen : ', (Nip) => {
    inputDosen(Nip, akun);
  });
}

let inputDosen = (Nip, akun) => {
  rl.question('Nama Dosen : ', (Nama_Dosen) => {
    insertDataDosen(Nip, Nama_Dosen, akun);
  });
}

let insertDataDosen = (Nip, Nama_Dosen, akun) => {
  let sql = `INSERT INTO Dosen (NIP, Nama_Dosen) VALUES (${Nip},'${Nama_Dosen}')`;
  db.run(sql, function(err) {
    if (err) {
      throw err;
    }
    listDosen(akun);
  });
}

let deleteDosen = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan NIP Dosen yang akan dihapus: ', (Nip) => {
    deleteLogicDosen(Nip, akun, akun);
  });
}

let deleteLogicDosen = (Nip, akun) =>{
  let sql = `DELETE FROM Dosen WHERE NIP = ${Nip}`;
  db.run(sql, function (err){
    if (err) {
      throw err;
    }
    console.log(`Dosen dengan NIP : ${Nip} Telah Di Hapus`);
    console.log("===================================================");
    listDosen(akun);
  });
}


//------------------------------------------------------------- KELOLA MATA KULIAH -------------------------------
//------------------------------------------------------------- KELOLA MATA KULIAH -------------------------------


let kuliahInterface = (akun) =>{
  console.log("=================================================");
  console.log("Silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar Mata Kuliah");
  console.log("[2] Cari Mata Kuliah");
  console.log("[3] Tambah Mata Kuliah");
  console.log("[4] Hapus Mata Kuliah");
  console.log("[5] Kembali");
  console.log("=================================================");
  chooseMataKuliah(akun);
}

let chooseMataKuliah = (akun) =>{
  rl.question('Masukkan salah satu no. dari opsi di atas: ', (pilih) => {
    optionMataKuliah(pilih, akun);
  });
}

let optionMataKuliah = (pilih, akun) =>{
  switch (pilih){
    case '1':
    listMataKuliah(akun);
    break;
    case '2':
    searchMataKuliah(akun);
    break;
    case '3':
    addMataKuliah(akun);
    break;
    case '4':
    // console.log('Hapus Mahasiswa');
    deleteMataKuliah(akun);
    break;
    case '5':
    mainInterface(akun);
    break;
    default:
    console.log();
    console.log('Masukkan Nomer sesuai opsi yang tersedia!!');
    console.log('==========================================');
    KuliahInterface(akun);
    break;
  }
}

let listMataKuliah = (akun) =>{
  let sql = `SELECT Id_MataKuliah, Nama_MataKuliah, SKS FROM Mata_Kuliah`;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['Kode Mata Kuliah', 'Nama Mata Kuliah', 'SKS'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].Id_MataKuliah ? rows[i].Id_MataKuliah : '', rows[i].Nama_MataKuliah ? rows[i].Nama_MataKuliah : '', rows[i].SKS ? rows[i].SKS : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    kuliahInterface(akun);
  });
}

let searchMataKuliah = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan Kode Mata Kuliah : ', (KodMatkul) => {
    cekMataKuliah(KodMatkul,akun);
  });
}

let cekMataKuliah = (KodMatkul, akun) =>{
  let sql = `SELECT * FROM Mata_Kuliah WHERE Id_MataKuliah = ${KodMatkul}`;
  db.all(sql, [], (err, rows) =>{
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      rows.forEach((row) => {
        console.log("=================================================")
        console.log(`Kode Mata Kuliah        : ${row.Id_MataKuliah}`);
        console.log(`Nama Mata Kuliah        : ${row.Nama_MataKuliah}`);
        console.log(`Jumlah SKS Mata Kuliah  : ${row.SKS}`);
        console.log();
        console.log();
      });
      kuliahInterface(akun);
    } else {
      console.log(`Mata Kuliah dengan Kode Mata Kuliah ${KodMatkul} tidak terdaftar`);
      console.log();
      searchMataKuliah(akun);
    }
  });
}

let addMataKuliah = (akun) => {
  console.log("=================================================");
  console.log("Lengkapi data di bawah ini :");
  rl.question('Kode Matakuliah : ', (KodMatkul) => {
    inputMataKuliah(KodMatkul, akun);
  });
}

let inputMataKuliah = (KodMatkul, akun) => {
  rl.question('Nama Mata Kuliah : ', (NamaMatkul) => {
    inputSKS(KodMatkul, NamaMatkul, akun);
  });
}

let inputSKS = (KodMatkul, NamaMatkul, akun) => {
  rl.question('Jumlah SKS Mata Kuliah : ', (SKSMatkul) => {
    insertDataMatkul(KodMatkul, NamaMatkul, SKSMatkul, akun);
  });
}

let insertDataMatkul = (KodMatkul, NamaMatkul, SKSMatkul, akun) => {
  let sql = `INSERT INTO Mata_Kuliah(Id_MataKuliah, Nama_MataKuliah, SKS) VALUES (${KodMatkul},'${NamaMatkul}', ${SKSMatkul})`;
  db.run(sql, function(err) {
    if (err) {
      throw err;
    }
    listMataKuliah(akun);
  });
}

let deleteMataKuliah = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan Kode Mata Kuliah yang akan dihapus: ', (KodMatkul) => {
    deleteLogicMataKuliah(KodMatkul, akun);
  });
}

let deleteLogicMataKuliah = (KodMatkul, akun) =>{
  let sql = `DELETE FROM Mata_Kuliah WHERE Id_MataKuliah = ${KodMatkul}`;
  db.run(sql, function (err){
    if (err) {
      throw err;
    }
    console.log(`Mata Kuliah dengan Kode : ${KodMatkul} Telah Di Hapus`);
    console.log("===================================================");
    listMataKuliah(akun);
  });
}

//------------------------------------------------------------- KELOLA DATA KOTRAK BELAJAR -------------------------------
//------------------------------------------------------------- KELOLA DATA KONTRAK BELAJAR -------------------------------


let kontrakInterface = (akun) =>{
  console.log("=================================================");
  console.log("Silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar Kontrak Belajar");
  console.log("[2] Cari Kontrak Belajar");
  console.log("[3] Tambah Kontrak Belajar");
  console.log("[4] Hapus Kontrak Belajar");
  console.log("[5] Kembali");
  console.log("=================================================");
  chooseKontrak(akun);
}

let chooseKontrak = (akun) =>{
  rl.question('Masukkan salah satu no. dari opsi di atas: ', (pilih) => {
    optionKontrak(pilih, akun);
  });
}

let optionKontrak = (pilih, akun) =>{
  switch (pilih){
    case '1':
    //console.log('listKontrak');
    listKontrak(akun);
    break;
    case '2':
    //console.log('search');
    searchKontrak(akun);
    break;
    case '3':
    //console.log('add');
    addKontrak(akun);
    break;
    case '4':
    //console.log('Hapus Mahasiswa');
    deleteKontrak(akun);
    break;
    case '5':
    mainInterface(akun);
    break;
    default:
    console.log();
    console.log('Masukkan Nomer sesuai opsi yang tersedia!!');
    console.log('==========================================');
    kontrakInterface(akun);
    break;
  }
}

let listKontrak = (akun) =>{
  let sql = `SELECT Nilai_Mhs.ID, Nilai_Mhs.Nim, Nama_Mhs, Jurusan.Nama_Jur, Nama_MataKuliah, Nama_Dosen, Pencapaian
  FROM Mahasiswa, Jurusan, Nilai_Mhs, Mata_Kuliah, Dosen
  WHERE Mahasiswa.Nim = Nilai_Mhs.Nim
  AND Jurusan.Id_Jurusan = Mahasiswa.Id_Jurusan
  AND Dosen.NIP = Nilai_Mhs.NIP
  AND Mata_Kuliah.Id_MataKuliah = Nilai_Mhs.Id_MataKuliah`;

  // `SELECT Nim, Nama_Mhs, Alamat_Mhs, Usia_Mhs,Nama_Jur
  // FROM Mahasiswa
  // INNER JOIN Jurusan ON Mahasiswa.Id_Jurusan = Jurusan.Id_Jurusan`;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['Id Kontrak', 'NIM', 'Nama Mahasiswa', 'Jurusan Studi', 'Nama Matakuliah', 'Nama Dosen','Pencapaian'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].ID ? rows[i].ID : '', rows[i].Nim ? rows[i].Nim : '', rows[i].Nama_Mhs ? rows[i].Nama_Mhs : '', rows[i].Nama_Jur ? rows[i].Nama_Jur : '', rows[i].Nama_MataKuliah ? rows[i].Nama_MataKuliah : '', rows[i].Nama_Dosen ? rows[i].Nama_Dosen : '', rows[i].Pencapaian ? rows[i].Pencapaian : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    kontrakInterface(akun);
  });
}

let searchKontrak = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan NIM Mahasiswa: ', (Nim) => {
    cekKontrak(Nim, akun);
  });
}

let cekKontrak = (Nim, akun) =>{
  let sql = `SELECT Nilai_Mhs.Nim, Nama_Mhs, Jurusan.Nama_Jur, Nama_MataKuliah, Nama_Dosen, Nilai, Pencapaian
  FROM Mahasiswa, Jurusan, Nilai_Mhs, Mata_Kuliah, Dosen
  WHERE Mahasiswa.Nim = Nilai_Mhs.Nim
  AND Jurusan.Id_Jurusan = Mahasiswa.Id_Jurusan
  AND Dosen.NIP = Nilai_Mhs.NIP
  AND Mata_Kuliah.Id_MataKuliah = Nilai_Mhs.Id_MataKuliah
  AND Nilai_Mhs.Nim = ${Nim}`;

  db.all(sql, [], (err, rows) =>{
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      rows.forEach((row) => {
        console.log("=================================================")
        console.log(`Kode NIM Mahasiswa   : ${row.Nim}`);
        console.log(`Nama Nama Mahasiswa  : ${row.Nama_Mhs}`);
        console.log(`Jurusan Mahsiswa     : ${row.Nama_Jur}`);
        console.log(`Nama Matakuliah      : ${row.Nama_MataKuliah}`);
        console.log(`Dosen                : ${row.Nama_Dosen}`);
        console.log(`Nilai                : ${row.Nilai}`);
        console.log(`Pencapaian           : ${row.Pencapaian}`);
        console.log();
        console.log();
      });
      kontrakInterface(akun);
    } else {
      console.log(`Mahasiswa dengan NIM ${Nim} tidak terdaftar`);
      console.log();
      searchKontrak(akun);
    }
  });
}

let addKontrak= (akun) => {
  console.log("=================================================");
  console.log("Untuk Mengisi Form anda Membutuhkan NIM, Kode Mata Kuliah dan NIP Dosen :");
  console.log("Masukkan 'help' Jika Anda Membutuhkan Bantuan");
  console.log("Lengkapi data di bawah ini :");
  rl.question('ID Kontrak Mahasiswa : ', (IdKontrak) => {
    inputNilai(IdKontrak, akun);
  });
}

let tampilHelpMahasiswa = (IdKontrak, NilaiMhs, capai, akun) => {
  console.log();
  console.log("============ DATA MAHASISWA ============");
  console.log();
  let sql1 = `SELECT Nim, Nama_Mhs
  FROM Mahasiswa
  INNER JOIN Jurusan ON Mahasiswa.Id_Jurusan = Jurusan.Id_Jurusan`;
  db.all(sql1, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['NIM', 'Nama'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].Nim ? rows[i].Nim : '', rows[i].Nama_Mhs ? rows[i].Nama_Mhs : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    inputNimMahasiswa(IdKontrak, NilaiMhs, capai, akun);
  });
}

let tampilHelpDosen = (IdKontrak, NilaiMhs, capai, nim, IdMatkul, akun) =>{
  console.log();
  console.log("============== DATA DOSEN ==============");
  console.log();
  let sql2 = `SELECT NIP, Nama_Dosen FROM dosen`;
  db.all(sql2, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['NIP', 'Nama Dosen'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].NIP ? rows[i].NIP : '', rows[i].Nama_Dosen ? rows[i].Nama_Dosen : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    inputDosenKontrak(IdKontrak, NilaiMhs, capai, nim, IdMatkul, akun);
  });
}

let tampilHelpMataKuliah = (IdKontrak, NilaiMhs, capai, nim, akun) => {
  console.log();
  console.log("============ DATA MATAKULIAH ============");
  console.log();
  let sql3 = `SELECT Id_MataKuliah, Nama_MataKuliah, SKS FROM Mata_Kuliah`;
  db.all(sql3, (err, rows) => {
    if (err) {
      throw err;
    }
    let table = new Table({
      head : ['Kode Mata Kuliah', 'Nama Mata Kuliah', 'SKS'],
      //    colWidths: [10, 30, 30, 10, 30]
    });
    for(let i = 0; i < rows.length; i++){
      table.push([rows[i].Id_MataKuliah ? rows[i].Id_MataKuliah : '', rows[i].Nama_MataKuliah ? rows[i].Nama_MataKuliah : '', rows[i].SKS ? rows[i].SKS : ''])
      // Nb : Cli table tidak dapat menerima 'Nilai' Null maka di pergunakan ternary
    }
    console.log(table.toString());
    inputIdMatkul(IdKontrak, NilaiMhs, capai, nim, akun);
  });
}

let inputNilai = (IdKontrak, akun) => {
  rl.question('Nilai Mahasiswa : ', (NilaiMhs) => {
    inputPencapaian(IdKontrak, NilaiMhs, akun);
  });
}

let inputPencapaian = (IdKontrak, NilaiMhs, akun) => {
  rl.question('Pencapaian :', (capai) =>{
    inputNimMahasiswa(IdKontrak, NilaiMhs, capai, akun);
    //console.log(IdKontrak, NilaiMhs, capai);
  });
}

let inputNimMahasiswa = (IdKontrak, NilaiMhs, capai, akun) => {
  console.log();
  console.log();
  console.log("Masukkan 'help' Jika membutuhkan bantuan");
  console.log("========================================");
  rl.question('Nomer Induk Mahasiswa :', (nim) =>{
    if (nim.toLowerCase() == 'help') {
      tampilHelpMahasiswa(IdKontrak, NilaiMhs, capai, akun)
    } else {
    inputIdMatkul(IdKontrak, NilaiMhs, capai, nim, akun);
    }
  });
}

let inputIdMatkul = (IdKontrak, NilaiMhs, capai, nim, akun) => {
  console.log();
  console.log();
  console.log("Masukkan 'help' Jika membutuhkan bantuan");
  console.log("========================================");
  rl.question('Masukkan ID Mata Kuliah :', (IdMatkul) =>{
    if (IdMatkul.toLowerCase() == 'help') {
      tampilHelpMataKuliah(IdKontrak, NilaiMhs, capai, nim, akun)
    } else {
    inputDosenKontrak(IdKontrak, NilaiMhs, capai, nim, IdMatkul, akun);
    }
  });
}

let inputDosenKontrak = (IdKontrak, NilaiMhs, capai, nim, IdMatkul, akun) => {
  console.log();
  console.log();
  console.log("Masukkan 'help' Jika membutuhkan bantuan");
  console.log("========================================");
  rl.question('ID Dosen :', (IdDosen) => {
    if (IdDosen.toLowerCase() == 'help') {
      tampilHelpDosen(IdKontrak, NilaiMhs, capai, nim, IdMatkul, akun)
    } else {
    insertDataKontrak(IdKontrak, NilaiMhs, capai, nim, IdMatkul, IdDosen, akun);
    }
  });
}

let insertDataKontrak = (IdKontrak, NilaiMhs, capai, nim, IdMatkul, IdDosen, akun) => {
//  console.log(IdKontrak, NilaiMhs, capai, nim, IdMatkul, IdDosen);
  let sql = `INSERT INTO Nilai_Mhs (ID, Nilai, Pencapaian, Nim, Id_MataKuliah, NIP ) VALUES (${IdKontrak},${NilaiMhs},'${capai}', ${nim}, ${IdMatkul}, ${IdDosen})`;
  db.run(sql, function(err) {
    if (err) {
      throw err;
    }
    listKontrak(akun);
  });
}

let deleteKontrak = (akun) =>{
  console.log("=================================================");
  rl.question('Masukkan Id Kontrak mahasiswa yang akan dihapus: ', (idKontrak) => {
    deleteLogicKontrak(idKontrak, akun);
  });
}

let deleteLogicKontrak = (idKontrak, akun) =>{
  let sql = `DELETE FROM Nilai_Mhs WHERE ID = ${idKontrak}`;
  db.run(sql, function (err){
    if (err) {
      throw err;
    }
    console.log(`Kontrak Mahasiswa : ${idKontrak} Telah Di Hapus`);
    console.log("====================================================");
    listKontrak(akun);
  });
}


Login();
