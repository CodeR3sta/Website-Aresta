-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Nov 2021 pada 06.15
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webaresta`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(250) NOT NULL,
  `ubah` varchar(250) NOT NULL,
  `hapus` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `ubah`, `hapus`) VALUES
(0, 'aresta17j4y4lah8455', '$2a$15$bvEALTUwT/riqb15PIH/y.UgOGV2KKe/mQYpoowu//UZzGGIzv1Gq', '$2a$15$bvEALTUwT/riqb15PIH/y.hr16d50adadKQ1jJfP7KSDFv9VGS3aG', '$2a$15$bvEALTUwT/riqb15PIH/y.uo65E6bEoNZ6FOVV9dsI8bhHJQj1.xW'),
(7, 'testing', '$2a$15$Y05UMZjgZS69cvyY2U4YuefnWgff54PRBvkMSOa0zfC6mAREQGnw6', '$2a$15$Y05UMZjgZS69cvyY2U4YueBCrrYP74B6MBeT55o27rSqxPBY11m2G', '$2a$15$Y05UMZjgZS69cvyY2U4Yue2LPKivvlgoUUjUcvB3bFzy79MqEytHi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `phone` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `status` int(10) NOT NULL,
  `sekolah` varchar(100) NOT NULL,
  `tingkat` varchar(50) NOT NULL,
  `lomba` varchar(50) NOT NULL,
  `kategori` varchar(50) NOT NULL,
  `registered` varchar(20) NOT NULL,
  `pesan` text NOT NULL,
  `verification` varchar(100) NOT NULL,
  `namaUtama` varchar(100) NOT NULL,
  `jumlahAnggota` int(11) NOT NULL,
  `anggota1` varchar(100) NOT NULL,
  `anggota2` varchar(100) NOT NULL,
  `anggota3` varchar(100) NOT NULL,
  `anggota4` varchar(100) NOT NULL,
  `anggota5` varchar(100) NOT NULL,
  `anggota6` varchar(100) NOT NULL,
  `anggota7` varchar(100) NOT NULL,
  `anggota8` varchar(100) NOT NULL,
  `anggota9` varchar(100) NOT NULL,
  `anggota10` varchar(100) NOT NULL,
  `anggota11` varchar(100) NOT NULL,
  `anggota12` varchar(100) NOT NULL,
  `anggota13` varchar(100) NOT NULL,
  `anggota14` varchar(100) NOT NULL,
  `anggota15` varchar(100) NOT NULL,
  `anggota16` varchar(100) NOT NULL,
  `anggota17` varchar(100) NOT NULL,
  `anggota18` varchar(100) NOT NULL,
  `anggota19` varchar(100) NOT NULL,
  `anggota20` varchar(100) NOT NULL,
  `anggota21` varchar(100) NOT NULL,
  `anggota22` varchar(100) NOT NULL,
  `anggota23` varchar(100) NOT NULL,
  `anggota24` varchar(100) NOT NULL,
  `kis` mediumtext NOT NULL,
  `suratRekomendasi` varchar(100) NOT NULL,
  `fotoTim` varchar(200) NOT NULL,
  `postIg` mediumtext NOT NULL,
  `fotoDiri` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
