-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 09, 2023 at 06:13 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pentas-seni`
--

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text,
  `pencipta` varchar(255) DEFAULT NULL,
  `tanggal_cipta` varchar(255) DEFAULT NULL,
  `gambar_gallery` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `judul`, `deskripsi`, `pencipta`, `tanggal_cipta`, `gambar_gallery`, `createdAt`, `updatedAt`) VALUES
('15abb5e1-4481-43d9-8d79-e0f6faad90fd', 'aduh sudah subuh', 'menggabut ngelarin BE sampe subuh', 'farras', '2023-9-12', 'http://localhost:3000/public/uploads/gambar_gallery-1702074451255.png', '2023-12-08 20:42:21', '2023-12-08 22:27:31'),
('62038c24-2bde-4730-9200-ddea574f81e2', 'di atas langit masih ada aldi taher', 'definisi mahasiswa akhir yang lebih mementingkan mencing dari pada skripsi', 'Ntahlah', '2023-11-11', 'http://localhost:3000/public/uploads/gambar_gallery-1702075709190.png', '2023-12-08 22:48:29', '2023-12-08 22:48:29'),
('7af1d957-f34c-4e4d-844a-936a7a8e730e', 'coba lagi', 'definisi mahasiswa akhir yang lebih mementingkan mencing dari pada skripsi', 'Ntahlah', '2023-11-11', 'http://localhost:3000/public/uploads/gambar_gallery-1702068878228.png', '2023-12-08 20:54:38', '2023-12-08 20:54:38'),
('beded28d-115b-4b13-a169-950a4241f322', 'Ngoding Sampe Subuh', 'lagi ngetes BE sampe subuh hehehe', 'Ntahlah', '2023-11-11', 'http://localhost:3000/public/uploads/Screenshot-2023-12-09-025041.png-1702065453016.png', '2023-12-08 19:57:33', '2023-12-08 19:57:33'),
('c15ce964-88ba-4933-992c-920a7a7165c6', 'Haduh Error Mulu', 'definisi mahasiswa akhir yang lebih mementingkan mencing dari pada skripsi', 'Ntahlah', '2023-11-11', 'http://localhost:3000/public/uploads/Screenshot-2023-12-09-021250.png-1702067630391.png', '2023-12-08 20:33:50', '2023-12-08 20:33:50'),
('d15030f5-e733-4a49-8fb9-f72d78d16d14', 'Mancing Virtual', 'definisi mahasiswa akhir yang lebih mementingkan mencing dari pada skripsi', 'Ntahlah', '2023-11-11', 'http://localhost:3000/public/uploads/Screenshot-2023-11-29-000750.png-1702066309409.png', '2023-12-08 20:11:49', '2023-12-08 20:11:49');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatans`
--

CREATE TABLE `kegiatans` (
  `id` int NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `description` text,
  `alamat` varchar(255) DEFAULT NULL,
  `tanggal` varchar(255) DEFAULT NULL,
  `waktu` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `gambar_kegiatan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kegiatans`
--

INSERT INTO `kegiatans` (`id`, `judul`, `description`, `alamat`, `tanggal`, `waktu`, `createdAt`, `updatedAt`, `gambar_kegiatan`) VALUES
(9, 'Perang Ketupat', 'Salah satu tradisi dari Kepulauan Bangka Belitung yang tak kalah menarik ialah perang ketupat atau ruah tempilang. Tradisi ini diselenggarakan setiap masuk Tahun Baru Islam atau 1 Muharram. Para penduduk setempat akan berbondong-bondong menuju ke pantai. Saat meriam dinyalakan, para penduduk dapat saling melempar ketupat ke setiap orang yang mereka temui. Kamu dapat melihat tradisi ini di desa-desa sekitar Pantai Tempilang, Bangka Barat. Tak sedikit banyak perantau yang pulang dan wisatawan yang berdatangan untuk menonton tradisi ini.', 'Tempilang, Bangka Barat', '2023-12-12', '12.00 WIB', '2023-12-09 04:41:34', '2023-12-09 04:41:34', 'http://localhost:3000/public/uploads/gambar_kegiatan-1702096894797.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20231208143903-create-kegiatan.js'),
('20231208170943-create-gallery.js'),
('20231209022251-kegiatan.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `judul` (`judul`);

--
-- Indexes for table `kegiatans`
--
ALTER TABLE `kegiatans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kegiatans`
--
ALTER TABLE `kegiatans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
