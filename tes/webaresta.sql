-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2021 at 11:07 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.24

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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(250) NOT NULL,
  `ubah` varchar(250) NOT NULL,
  `hapus` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `ubah`, `hapus`) VALUES
(0, 'aresta17j4y4lah8455', '$2a$15$bvEALTUwT/riqb15PIH/y.UgOGV2KKe/mQYpoowu//UZzGGIzv1Gq', '$2a$15$bvEALTUwT/riqb15PIH/y.hr16d50adadKQ1jJfP7KSDFv9VGS3aG', '$2a$15$bvEALTUwT/riqb15PIH/y.uo65E6bEoNZ6FOVV9dsI8bhHJQj1.xW'),
(7, 'testing', '$2a$15$Y05UMZjgZS69cvyY2U4YuefnWgff54PRBvkMSOa0zfC6mAREQGnw6', '$2a$15$Y05UMZjgZS69cvyY2U4YueBCrrYP74B6MBeT55o27rSqxPBY11m2G', '$2a$15$Y05UMZjgZS69cvyY2U4Yue2LPKivvlgoUUjUcvB3bFzy79MqEytHi');

-- --------------------------------------------------------

--
-- Table structure for table `users`
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
  `suratRekomendasi` varchar(100) NOT NULL,
  `fotoTim` varchar(200) NOT NULL,
  `kis1` mediumtext NOT NULL,
  `kis2` mediumtext NOT NULL,
  `kis3` mediumtext NOT NULL,
  `kis4` mediumtext NOT NULL,
  `kis5` mediumtext NOT NULL,
  `kis6` mediumtext NOT NULL,
  `kis7` mediumtext NOT NULL,
  `kis8` mediumtext NOT NULL,
  `kis9` mediumtext NOT NULL,
  `kis10` mediumtext NOT NULL,
  `kis11` mediumtext NOT NULL,
  `kis12` mediumtext NOT NULL,
  `kis13` mediumtext NOT NULL,
  `kis14` mediumtext NOT NULL,
  `kis15` mediumtext NOT NULL,
  `kis16` mediumtext NOT NULL,
  `kis17` mediumtext NOT NULL,
  `kis18` mediumtext NOT NULL,
  `kis19` mediumtext NOT NULL,
  `kis20` mediumtext NOT NULL,
  `kis21` mediumtext NOT NULL,
  `kis22` mediumtext NOT NULL,
  `kis23` mediumtext NOT NULL,
  `kis24` mediumtext NOT NULL,
  `kis25` mediumtext NOT NULL,
  `postIg1` varchar(200) NOT NULL,
  `postIg2` varchar(200) NOT NULL,
  `postIg3` varchar(200) NOT NULL,
  `postIg4` varchar(200) NOT NULL,
  `postIg5` varchar(200) NOT NULL,
  `postIg6` varchar(200) NOT NULL,
  `postIg7` varchar(200) NOT NULL,
  `postIg8` varchar(200) NOT NULL,
  `postIg9` varchar(200) NOT NULL,
  `postIg10` varchar(200) NOT NULL,
  `postIg11` varchar(200) NOT NULL,
  `postIg12` varchar(200) NOT NULL,
  `postIg13` varchar(200) NOT NULL,
  `postIg14` varchar(200) NOT NULL,
  `postIg15` varchar(200) NOT NULL,
  `postIg16` varchar(200) NOT NULL,
  `postIg17` varchar(200) NOT NULL,
  `postIg18` varchar(200) NOT NULL,
  `postIg19` varchar(200) NOT NULL,
  `postIg20` varchar(200) NOT NULL,
  `postIg21` varchar(200) NOT NULL,
  `postIg22` varchar(200) NOT NULL,
  `postIg23` varchar(200) NOT NULL,
  `postIg24` varchar(200) NOT NULL,
  `postIg25` varchar(200) NOT NULL,
  `fotoDiri1` varchar(200) NOT NULL,
  `fotoDiri2` varchar(200) NOT NULL,
  `fotoDiri3` varchar(200) NOT NULL,
  `fotoDiri4` varchar(200) NOT NULL,
  `fotoDiri5` varchar(200) NOT NULL,
  `fotoDiri6` varchar(200) NOT NULL,
  `fotoDiri7` varchar(200) NOT NULL,
  `fotoDiri8` varchar(200) NOT NULL,
  `fotoDiri9` varchar(200) NOT NULL,
  `fotoDiri10` varchar(200) NOT NULL,
  `fotoDiri11` varchar(200) NOT NULL,
  `fotoDiri12` varchar(200) NOT NULL,
  `fotoDiri13` varchar(200) NOT NULL,
  `fotoDiri14` varchar(200) NOT NULL,
  `fotoDiri15` varchar(200) NOT NULL,
  `fotoDiri16` varchar(200) NOT NULL,
  `fotoDiri17` varchar(200) NOT NULL,
  `fotoDiri18` varchar(200) NOT NULL,
  `fotoDiri19` varchar(200) NOT NULL,
  `fotoDiri20` varchar(200) NOT NULL,
  `fotoDiri21` varchar(200) NOT NULL,
  `fotoDiri22` varchar(200) NOT NULL,
  `fotoDiri23` varchar(200) NOT NULL,
  `fotoDiri24` varchar(200) NOT NULL,
  `fotoDiri25` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
