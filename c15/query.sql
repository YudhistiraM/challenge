//Menampilkan Seluruh Data Mahasiswa beserta nama jurusannya

SELECT Nim, Nama_Mhs, Alamat_Mhs, Usia_Mhs,Nama_Jur
FROM Mahasiswa
INNER JOIN Jurusan
ON Mahasiswa.Id_Jurusan = Jurusan.Id_Jurusan;

//Mahasiswa dengan umur di bawah 20 tahun)

SELECT Nim, Nama_Mhs, Usia_Mhs
FROM Mahasiswa
WHERE Usia_Mhs < 20;

//Tampilkan data Mahasiswa yang memiliki nilai "B" Ke atas

SELECT Mahasiswa.Nim, Mahasiswa.Nama_Mhs,Nilai_Mhs.Pencapaian
FROM Nilai_Mhs
INNER JOIN Mahasiswa
ON Nilai_Mhs.Nim = Mahasiswa.Nim
Where Pencapaian = 'A' OR Pencapaian = 'B';

//Menampilkan Mahasiswa yang mengambil SKS > 10

SELECT Mahasiswa.Nama_Mhs, SUM(Mata_Kuliah.SKS)
FROM Mahasiswa, Nilai_Mhs, Mata_Kuliah
WHERE Mahasiswa.Nim = Nilai_Mhs.Nim
AND Nilai_Mhs.Id_MataKuliah = Mata_Kuliah.Id_MataKuliah
GROUP BY Mahasiswa.Nama_Mhs
HAVING SUM(Mata_Kuliah.SKS) > 10;

//Menampilkan Mahasiswa mengambil kuliah 'data Mining'

SELECT Mahasiswa.nim,Mahasiswa.nama_Mhs,Mata_Kuliah.Nama_MataKuliah,Mata_Kuliah.SKS
FROM((Nilai_Mhs INNER JOIN Mahasiswa ON Nilai_Mhs.Nim = Mahasiswa.Nim)
INNER JOIN Mata_Kuliah ON Nilai_Mhs.Id_MataKuliah = Mata_Kuliah.Id_MataKuliah)
WHERE Nama_MataKuliah = 'Data Mining';

//Menampilkan Jumlah Mahasiswa Untuk Setiap Dosen

SELECT Dosen.NIP,Dosen.Nama_Dosen,COUNT(Mahasiswa.Nama_Mhs)
FROM((Nilai_Mhs
INNER JOIN Dosen ON Nilai_Mhs.NIP = Dosen.NIP)
INNER JOIN Mahasiswa ON Nilai_Mhs.nim = Mahasiswa.Nim)
GROUP BY Nama_Dosen;

//Urutkan Mahasiswa berdasarkan umurnya

-SELECT * FROM Mahasiswa ORDER BY Usia_Mhs DESC;
-SELECT * FROM Mahasiswa ORDER BY Usia_Mhs ASC;

// Menampilkan Matakulai yang di ulang C dan D Dengan Detail lengkap Table Mahasiswa, Dosen dan Mata_Kuliah

SELECT Nama_MataKuliah, Nama_Mhs, Nama_Jur, Nama_Dosen, Pencapaian
FROM ((((Mahasiswa
INNER JOIN Jurusan ON Mahasiswa.Id_Jurusan = Jurusan.Id_Jurusan)
INNER JOIN Nilai_Mhs ON Mahasiswa.Nim = Nilai_Mhs.Nim)
INNER JOIN Dosen ON Dosen.NIP = Nilai_Mhs.NIP)
INNER JOIN Mata_Kuliah ON Mata_Kuliah.Id_MataKuliah = Nilai_Mhs.Id_MataKuliah
AND (Pencapaian = 'D' OR Pencapaian = 'E'));
