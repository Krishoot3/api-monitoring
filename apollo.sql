-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: db
-- Čas generovania: Po 15.Nov 2021, 18:11
-- Verzia serveru: 10.4.17-MariaDB-1:10.4.17+maria~focal
-- Verzia PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `apollo`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `dbChanges`
--

CREATE TABLE `dbChanges` (
  `file` varchar(64) COLLATE utf8_bin NOT NULL,
  `updateDate` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('success','error') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Sťahujem dáta pre tabuľku `dbChanges`
--

INSERT INTO `dbChanges` (`file`, `updateDate`, `status`) VALUES
('db.sql', '2021-09-04 22:38:15', 'success'),
('update_01_users.sql', '2021-09-04 22:38:35', 'success'),
('update_02_users.sql', '2021-09-04 22:38:35', 'success'),
('update_03_developers.sql', '2021-09-04 22:38:35', 'success'),
('update_04_projectLangs.sql', '2021-09-04 22:38:35', 'success'),
('update_05_projectCotributors.sql', '2021-09-04 22:38:35', 'success'),
('update_06_project.sql', '2021-09-30 19:07:35', 'success');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_bin NOT NULL,
  `path` varchar(32) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_at` date NOT NULL,
  `web_url` varchar(255) COLLATE utf8_bin NOT NULL,
  `avatar_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `last_activity_at` date NOT NULL,
  `visibility` varchar(8) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Sťahujem dáta pre tabuľku `project`
--

INSERT INTO `project` (`id`, `name`, `path`, `description`, `created_at`, `web_url`, `avatar_url`, `last_activity_at`, `visibility`, `last_update`) VALUES
(3, 'exam', 'exam', '', '2019-09-18', 'https://gitlab.nsoric.com/mtf/exam', 'https://gitlab.nsoric.com/uploads/-/system/project/avatar/3/eXam.png', '2021-06-02', 0, '2021-09-30 17:07:35'),
(5, 'api2', 'api2', 'API version 2', '2019-09-22', 'https://gitlab.nsoric.com/nsoric/api2', 'https://gitlab.nsoric.com/uploads/-/system/project/avatar/5/api2.png', '2020-10-31', 0, '2021-09-30 17:07:35'),
(66, 'Saleae VirtualWire Analyzer', 'saleae_vw_analyzer', '', '2021-02-25', 'https://gitlab.nsoric.com/mtf/saleae_vw_analyzer', 'https://gitlab.nsoric.com/uploads/-/system/project/avatar/66/vwa.jpg', '2021-04-19', 0, '2021-09-30 17:07:35'),
(69, 'apollo', 'apollo', 'Dokumentačný server', '2021-03-11', 'https://gitlab.nsoric.com/mtf/web/apollo', 'https://gitlab.nsoric.com/uploads/-/system/project/avatar/69/apolo.png', '2021-09-04', 0, '2021-09-30 17:07:35');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `projectContributors`
--

CREATE TABLE `projectContributors` (
  `project` int(11) NOT NULL,
  `developer` int(11) NOT NULL,
  `commits` int(11) NOT NULL DEFAULT 0,
  `additions` int(11) NOT NULL DEFAULT 0,
  `deletions` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Sťahujem dáta pre tabuľku `projectContributors`
--

INSERT INTO `projectContributors` (`project`, `developer`, `commits`, `additions`, `deletions`) VALUES
(3, 2, 326, 0, 0),
(5, 2, 145, 0, 0),
(66, 2, 4, 0, 0),
(66, 25, 20, 0, 0),
(69, 2, 61, 0, 0);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `projectLangs`
--

CREATE TABLE `projectLangs` (
  `project` int(11) NOT NULL,
  `lang` varchar(32) COLLATE utf8_bin NOT NULL,
  `percent` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Sťahujem dáta pre tabuľku `projectLangs`
--

INSERT INTO `projectLangs` (`project`, `lang`, `percent`) VALUES
(3, 'CSS', 14.1),
(3, 'HTML', 0.41),
(3, 'JavaScript', 7.89),
(3, 'Latte', 21.51),
(3, 'PHP', 55.38),
(5, 'Go', 91.15),
(5, 'Shell', 1.72),
(5, 'TSQL', 7.12),
(66, 'Batchfile', 0.08),
(66, 'C++', 76.88),
(66, 'Objective-C', 17.75),
(66, 'Python', 5.29),
(69, 'CSS', 17.38),
(69, 'HTML', 1.56),
(69, 'JavaScript', 0.7),
(69, 'Latte', 22.9),
(69, 'PHP', 57.36);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `projectReleases`
--

CREATE TABLE `projectReleases` (
  `id` int(11) NOT NULL,
  `project` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `tag_name` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `releaseAssets`
--

CREATE TABLE `releaseAssets` (
  `id` int(11) NOT NULL,
  `release` int(11) NOT NULL,
  `type` enum('SRC','BIN') COLLATE utf8_bin NOT NULL DEFAULT 'SRC',
  `architecture` enum('ALL','LIN', 'WIN', 'MAC') COLLATE utf8_bin NOT NULL DEFAULT 'ALL',
  `url` varchar(255) COLLATE utf8_bin NOT NULL,
  `file_size` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(64) COLLATE utf8_bin NOT NULL,
  `fullName` varchar(64) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `state` varchar(16) COLLATE utf8_bin DEFAULT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT 0,
  `is_developer` tinyint(4) NOT NULL DEFAULT 0,
  `avatar_url` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Sťahujem dáta pre tabuľku `users`
--

INSERT INTO `users` (`id`, `login`, `fullName`, `password`, `email`, `state`, `is_admin`, `is_developer`, `avatar_url`) VALUES
(2, 'juraj', 'Juraj Ďuďák', '$2y$10$oSoOVWl/fcLTJmfaDi9zPuTBit2WDqOWnj7zyoFQJh7JHQ3CHGwtG', 'jdudak@gmail.com', 'active', 1, 1, 'https://gitlab.nsoric.com/uploads/-/system/user/avatar/2/avatar.png'),
(25, 'matej_fitos', 'Matej Fitoš', '$2y$10$Kb/BDCv71z/3ibpyEjF1zOkyOy/KZ08EUJKVzfVEfzNueOgFZtZ0u', 'xfitos@stuba.sk', 'active', 0, 1, 'https://gitlab.nsoric.com/uploads/-/system/user/avatar/25/avatar.png'),
(28, 'n0nsens', 'Ján Šurinčík', '$2y$10$uhEtulIXjdLOhrwF7jaQvehikOu/n8sYPBHDpwVrkfvnYlktMvx6e', 'xsurincik@stuba.sk', 'active', 0, 1, 'https://gitlab.nsoric.com/uploads/-/system/user/avatar/28/avatar.png');

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `dbChanges`
--
ALTER TABLE `dbChanges`
  ADD PRIMARY KEY (`file`);

--
-- Indexy pre tabuľku `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `projectContributors`
--
ALTER TABLE `projectContributors`
  ADD PRIMARY KEY (`project`,`developer`),
  ADD KEY `developer` (`developer`);

--
-- Indexy pre tabuľku `projectLangs`
--
ALTER TABLE `projectLangs`
  ADD PRIMARY KEY (`project`,`lang`),
  ADD KEY `project` (`project`);

--
-- Indexy pre tabuľku `projectReleases`
--
ALTER TABLE `projectReleases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project` (`project`);

--
-- Indexy pre tabuľku `releaseAssets`
--
ALTER TABLE `releaseAssets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `release` (`release`);

--
-- Indexy pre tabuľku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `projectReleases`
--
ALTER TABLE `projectReleases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pre tabuľku `releaseAssets`
--
ALTER TABLE `releaseAssets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Obmedzenie pre exportované tabuľky
--

--
-- Obmedzenie pre tabuľku `projectContributors`
--
ALTER TABLE `projectContributors`
  ADD CONSTRAINT `projectContributors_ibfk_4` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projectContributors_ibfk_5` FOREIGN KEY (`developer`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Obmedzenie pre tabuľku `projectLangs`
--
ALTER TABLE `projectLangs`
  ADD CONSTRAINT `projectLangs_ibfk_1` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Obmedzenie pre tabuľku `projectReleases`
--
ALTER TABLE `projectReleases`
  ADD CONSTRAINT `projectReleases_ibfk_1` FOREIGN KEY (`project`) REFERENCES `project` (`id`);

--
-- Obmedzenie pre tabuľku `releaseAssets`
--
ALTER TABLE `releaseAssets`
  ADD CONSTRAINT `releaseAssets_ibfk_1` FOREIGN KEY (`release`) REFERENCES `projectReleases` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
