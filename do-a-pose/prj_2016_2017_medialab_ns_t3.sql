-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 29 jun 2017 om 00:12
-- Serverversie: 10.1.13-MariaDB
-- PHP-versie: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prj_2016_2017_medialab_ns_t3`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `dap_subscriptions`
--

CREATE TABLE `dap_subscriptions` (
  `id` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `skeletonImage` varchar(60) NOT NULL,
  `city` varchar(100) NOT NULL,
  `workshopId` int(11) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  `chosen` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `dap_subscriptions`
--

INSERT INTO `dap_subscriptions` (`id`, `email`, `skeletonImage`, `city`, `workshopId`, `complete`, `chosen`) VALUES
(11, 'test1@ns.nl', '../canvas_uploads/32100nr1498687300.png', 'Utrecht', 1, 1, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `dap_workshops`
--

CREATE TABLE `dap_workshops` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `dap_workshops`
--

INSERT INTO `dap_workshops` (`id`, `name`, `description`, `date`) VALUES
(1, 'Koken', 'In een restaurant', '2017-06-29 00:00:00');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `dap_subscriptions`
--
ALTER TABLE `dap_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `dap_workshops`
--
ALTER TABLE `dap_workshops`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `dap_subscriptions`
--
ALTER TABLE `dap_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT voor een tabel `dap_workshops`
--
ALTER TABLE `dap_workshops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
