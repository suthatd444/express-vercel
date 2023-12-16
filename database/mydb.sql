-- Adminer 4.8.1 MySQL 8.0.32-0ubuntu0.22.10.2 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `agent_commission`;
CREATE TABLE `agent_commission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agent_id` int NOT NULL,
  `subagent_id` int NOT NULL,
  `policy_id` int NOT NULL,
  `commission_per` varchar(150) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `split_amount` decimal(10,2) DEFAULT NULL,
  `doc_images` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `agent_commission` (`id`, `agent_id`, `subagent_id`, `policy_id`, `commission_per`, `description`, `split_amount`, `doc_images`, `created_at`, `updated_at`) VALUES
(4,	2,	1,	13,	'10',	'this is',	50.00,	'[\"2023-04-14T12-28-03.779Z-Screenshot from 2023-01-27 12-50-25.png\", \"2023-04-14T12-28-03.780Z-Screenshot from 2023-01-24 21-59-26.png\", \"2023-04-14T12-28-03.780Z-Screenshot from 2023-01-27 12-15-35.png\"]',	'2023-04-18 08:09:00',	'2023-04-14 12:28:03'),
(5,	2,	1,	13,	'10',	'this is',	50.00,	'[\"2023-04-14T13-05-58.940Z-Screenshot from 2023-01-27 12-50-25.png\", \"2023-04-14T13-05-58.941Z-Screenshot from 2023-01-24 21-59-26.png\", \"2023-04-14T13-05-58.945Z-Screenshot from 2023-01-27 12-15-35.png\"]',	'2023-04-18 08:09:00',	'2023-04-14 13:05:58');

DROP TABLE IF EXISTS `agent_subagent`;
CREATE TABLE `agent_subagent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agent_id` int NOT NULL,
  `subagent_id` int NOT NULL,
  `policy_id` int NOT NULL,
  `amount` float DEFAULT '0',
  `to_be_paid` float DEFAULT '0',
  `owes_you` float DEFAULT '0',
  `total_paid` float DEFAULT '0',
  `is_complete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_agent_subagent_agent_id_idx` (`agent_id`),
  KEY `fk_agent_subagent_subagent_id_idx` (`subagent_id`),
  KEY `fk_agent_subagent_policy)id_idx` (`policy_id`),
  KEY `fk_agent_subagent_created_at_idx` (`created_by`),
  KEY `fk_agent_subagent_updated_by_idx` (`updated_by`),
  CONSTRAINT `fk_agent_subagent_agent_id` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_agent_subagent_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_agent_subagent_policy_id` FOREIGN KEY (`policy_id`) REFERENCES `user_policy` (`id`),
  CONSTRAINT `fk_agent_subagent_subagent_id` FOREIGN KEY (`subagent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_agent_subagent_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `agents`;
CREATE TABLE `agents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `category_id` int NOT NULL,
  `user_name` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `full_name` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `agent_code` varchar(150) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_verified` tinyint DEFAULT '0',
  `is_active` tinyint DEFAULT '0',
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `agents` (`id`, `company_id`, `category_id`, `user_name`, `full_name`, `agent_code`, `address`, `latitude`, `longitude`, `last_name`, `mobile`, `email`, `password`, `is_verified`, `is_active`, `token`, `created_at`, `updated_at`) VALUES
(1,	1,	4,	'deepak agents',	NULL,	'ICICI11209',	'Raja rajeshwar nagar, kondapur',	NULL,	NULL,	'suthar',	'9549752035',	'abc@gmail.com',	'$2b$10$SQD3iR5HGyyLfp2QwDZit.Y..RaO571IxjYoEaUWScrqvSuuvG.I.',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NzY1NDcyMDgsImV4cCI6MTY3NzE1MjAwOH0.szlKUcKc9EZieCC7Z4m8ARc7iowkkAEVfabAvggSv5o',	'2023-02-16 06:03:28',	'2023-02-16 06:03:28'),
(2,	1,	4,	'vijay',	NULL,	'BAJAJ11209',	'Raja rajeshwar nagar, kondapur',	NULL,	NULL,	'pal',	'1234567890',	'vijay@gmail.com',	'$2b$10$nZCU29xd.sMlCETGqKuVfeQp6qIDEfUK/D8hMYI5llibbeFkCrGaG',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NzY1NDcyOTcsImV4cCI6MTY3NzE1MjA5N30.uOIS60Kd-XFKfUA0ASbyJvN2eDniApd5D_O1U7AKe9E',	'2023-02-16 06:04:57',	'2023-02-16 06:04:57'),
(3,	1,	4,	'pal',	'vijay',	'BAJAJ11209',	'Raja rajeshwar nagar, kondapur',	55.320000,	56.300000,	NULL,	'1234567899',	'vijay@gmails.com',	'$2b$10$0crVLWxD54vUkdVm7Pz89uqVt3u78HLBC8kcJa.3PR6zO73KftBdy',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE2ODE4MTQ2NTQsImV4cCI6MTY4MjQxOTQ1NH0.aC09ey1Dwu1q4bUic8TrA2ZQSuYjlDJxRhkQRlyYmAg',	'2023-04-18 10:44:14',	'2023-04-18 10:44:14');

DROP TABLE IF EXISTS `html_data`;
CREATE TABLE `html_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `html` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `html_data` (`id`, `type`, `html`) VALUES
(2,	'PRIVACY_POLICY',	'<h1>html</h1>'),
(3,	'TERMS & CONDITION',	'<h1>html</h1>');

DROP TABLE IF EXISTS `insurance_requests`;
CREATE TABLE `insurance_requests` (
  `insurance_request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `agent_id` int NOT NULL,
  `category_id` int NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `status` enum('ACCEPTED','PENDING','REJECTED') DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`insurance_request_id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `insurance_requests` (`insurance_request_id`, `user_id`, `agent_id`, `category_id`, `location`, `latitude`, `longitude`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(8,	16,	1,	1,	'kudi bhagtasni jodhpur',	NULL,	NULL,	'1234567890',	'REJECTED',	'2023-02-16 08:03:31',	'2023-02-16 06:19:13'),
(9,	16,	1,	1,	'kudi bhagtasni jodhpur',	NULL,	NULL,	'1234567890',	'PENDING',	'2023-02-16 07:47:55',	'2023-02-16 07:47:55'),
(10,	21,	1,	1,	'kudi bhagtasni jodhpur',	NULL,	NULL,	'1234567890',	'REJECTED',	'2023-03-22 10:55:59',	'2023-03-21 11:33:08'),
(11,	21,	1,	1,	'2209, Vijayrajnagar,, 364002',	NULL,	NULL,	'9636457896',	'ACCEPTED',	'2023-03-21 11:42:30',	'2023-03-21 11:39:19'),
(12,	21,	1,	1,	'2209, Vijayrajnagar,, 364002',	NULL,	NULL,	'9636457896',	'PENDING',	'2023-03-21 11:39:37',	'2023-03-21 11:39:37'),
(13,	21,	1,	1,	'2209, Vijayrajnagar,, 364002',	NULL,	NULL,	'9636457896',	'PENDING',	'2023-03-21 12:06:15',	'2023-03-21 12:06:15'),
(14,	21,	1,	1,	'Bortalav, Bhavnagar',	21.760000,	72.120000,	'9789091789',	'ACCEPTED',	'2023-03-24 05:03:29',	'2023-03-24 05:03:29'),
(15,	17,	1,	1,	'kudi bhagtasni jodhpur',	55.320000,	56.300000,	'1234567890',	'PENDING',	'2023-03-28 11:46:54',	'2023-03-28 11:46:54');

DROP TABLE IF EXISTS `policy_companies`;
CREATE TABLE `policy_companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `policy_companies` (`id`, `company_name`, `company_logo`, `is_active`, `created_at`, `updated_at`) VALUES
(1,	'NEW BAJAJ',	'2023-03-14T06-08-22.532Z-WhatsApp Image 2023-02-21 at 4.11.07 PM.jpeg',	1,	'2023-03-14 06:08:22',	NULL);

DROP TABLE IF EXISTS `policy_master`;
CREATE TABLE `policy_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `sub_category` varchar(255) DEFAULT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `policy_master` (`id`, `category`, `sub_category`, `category_image`, `is_active`, `created_at`, `updated_at`) VALUES
(4,	'Motor',	'1',	'https://mechodal.website/zerrins/motorcar.png',	1,	'2023-03-20 06:21:13',	NULL),
(5,	'Health',	'1',	'https://mechodal.website/zerrins/healthcare.png',	1,	'2023-03-20 06:21:22',	NULL),
(6,	'Life',	'1',	'https://mechodal.website/zerrins/life.png',	1,	'2023-03-20 06:21:31',	NULL),
(7,	'Travel',	'1',	'https://mechodal.website/zerrins/travel.png',	1,	'2023-03-20 06:21:40',	NULL),
(8,	'Non Motor',	'1',	'https://mechodal.website/zerrins/insurance.png',	1,	'2023-03-20 06:21:48',	NULL);

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `roles` (`id`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(27,	'Customers',	1,	'2023-02-04 03:27:02',	'2023-02-04 03:27:02'),
(28,	'Agent',	1,	'2023-02-21 00:47:20',	'2023-02-21 00:47:20'),
(29,	'Loss Assessor',	1,	'2023-02-04 03:27:33',	'2023-02-04 03:27:33'),
(30,	'Loss Assessor',	1,	'2023-02-21 00:42:00',	'2023-02-21 00:42:00');

DROP TABLE IF EXISTS `subcategory_master`;
CREATE TABLE `subcategory_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `sub_category` varchar(255) DEFAULT NULL,
  `subcategory_image` varchar(255) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `subcategory_master` (`id`, `category_id`, `sub_category`, `subcategory_image`, `is_active`, `created_at`, `updated_at`) VALUES
(1,	4,	'Private car Insurance',	'2023-03-23T06-45-51.488Z-motorcar.png',	0,	'2023-03-23 06:45:51',	NULL),
(2,	4,	'Commercial Vehicle Insurance',	'2023-03-23T06-54-12.332Z-pickup-truck.png',	0,	'2023-03-23 06:54:13',	NULL),
(3,	4,	'2 Wheeler Insurance',	'2023-03-23T06-54-53.397Z-motorcycle.png',	0,	'2023-03-23 06:54:53',	NULL),
(4,	5,	'Family floater Insurance',	'2023-03-23T06-55-53.521Z-family.png',	0,	'2023-03-23 06:55:55',	NULL),
(5,	5,	'Individual Insurance',	'2023-03-23T06-51-26.353Z-individual.png',	0,	NULL,	NULL),
(6,	5,	'Group Medical Insurance',	'2023-03-23T06-52-16.729Z-medical-team.png',	0,	NULL,	NULL);

DROP TABLE IF EXISTS `user_policy`;
CREATE TABLE `user_policy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `policy_type_id` int DEFAULT NULL,
  `subcategory_id` int DEFAULT NULL,
  `policy_number` varchar(100) DEFAULT NULL,
  `policy_company` int DEFAULT NULL,
  `policy_document` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `valid_till` date DEFAULT NULL,
  `agent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_user_policy_policy_id_idx` (`policy_type_id`),
  KEY `fk_user_policy_user_id_idx` (`user_id`),
  KEY `fk_user_policy_company_id_idx` (`policy_company`),
  CONSTRAINT `fk_user_policy_company_id` FOREIGN KEY (`policy_company`) REFERENCES `policy_companies` (`id`),
  CONSTRAINT `fk_user_policy_policy_id` FOREIGN KEY (`policy_type_id`) REFERENCES `policy_master` (`id`),
  CONSTRAINT `fk_user_policy_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `user_policy` (`id`, `user_id`, `policy_type_id`, `subcategory_id`, `policy_number`, `policy_company`, `policy_document`, `purchase_date`, `valid_till`, `agent_id`) VALUES
(13,	16,	4,	1,	'1256565656',	1,	'2023-03-24T18-32-57.977Z-Zerrins Privcy policies_corrected.docx.pdf',	'2022-02-28',	'2023-02-28',	2),
(17,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2022-02-28',	'2024-02-28',	2),
(18,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2022-02-28',	'2024-02-28',	NULL),
(19,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2021-03-24',	'2021-03-24',	NULL),
(20,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	NULL),
(21,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	NULL),
(22,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	NULL),
(23,	NULL,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	NULL),
(24,	NULL,	NULL,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	NULL),
(25,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	2),
(26,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	2),
(27,	21,	4,	1,	'66788',	NULL,	NULL,	'2023-03-24',	'2023-03-24',	0),
(28,	21,	4,	1,	NULL,	1,	NULL,	'2023-03-24',	'2023-03-24',	2),
(29,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	NULL),
(30,	21,	4,	1,	'142382348230310380',	1,	NULL,	NULL,	NULL,	2),
(31,	NULL,	4,	1,	'142382348230310380',	1,	NULL,	NULL,	NULL,	2),
(32,	NULL,	4,	1,	'142382348230310380',	1,	NULL,	NULL,	NULL,	2),
(33,	NULL,	NULL,	1,	'142382348230310380',	1,	NULL,	NULL,	NULL,	2),
(34,	NULL,	NULL,	1,	'142382348230310380',	NULL,	NULL,	NULL,	NULL,	2),
(35,	NULL,	NULL,	NULL,	'142382348230310380',	NULL,	NULL,	NULL,	NULL,	2),
(36,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(37,	21,	4,	1,	'',	NULL,	NULL,	'2023-03-24',	'2023-03-24',	0),
(38,	21,	5,	5,	'',	NULL,	NULL,	'2023-03-24',	'2023-03-24',	0),
(39,	21,	4,	1,	'142382348230310380',	1,	NULL,	'2023-03-24',	'2023-03-24',	2),
(40,	21,	5,	4,	'142382348230310380',	1,	NULL,	'2024-01-04',	'2022-01-04',	2),
(41,	21,	5,	4,	'142382348230310380',	1,	NULL,	'2024-01-04',	'2022-01-04',	2),
(42,	21,	5,	4,	'142382348230310380',	1,	NULL,	'2022-01-04',	'2024-01-04',	2),
(43,	21,	6,	0,	'142382348230310380',	1,	NULL,	'2021-01-04',	'2023-01-04',	2),
(44,	21,	7,	0,	'142382348230310380',	1,	NULL,	'2021-01-04',	'2023-01-04',	2),
(45,	21,	6,	3,	'1256565656',	1,	NULL,	'2022-02-28',	'2024-02-28',	2),
(46,	21,	8,	0,	'142382348230310380',	1,	NULL,	'2022-01-04',	'2024-01-04',	2),
(47,	21,	7,	3,	'1256565656',	1,	NULL,	'2022-02-28',	'2024-02-28',	2),
(48,	21,	8,	2,	'142382348230310380',	1,	NULL,	'2022-01-04',	'2024-01-04',	2);

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `iduser_role` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`iduser_role`),
  UNIQUE KEY `iduser_role_UNIQUE` (`iduser_role`),
  KEY `fk_user_role_user_id_idx` (`user_id`),
  KEY `fk_user_role_role_id_idx` (`role_id`),
  CONSTRAINT `fk_user_role_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_user_role_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) DEFAULT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_verified` tinyint DEFAULT '0',
  `is_active` tinyint DEFAULT '0',
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `users` (`id`, `first_name`, `full_name`, `profile_pic`, `last_name`, `mobile`, `email`, `password`, `is_verified`, `is_active`, `token`, `created_at`, `updated_at`) VALUES
(16,	'deepak',	'deepak',	'2023-02-10T10-18-27.016Z-logo%20final%20old%203_0.png',	'suthar',	'9549752035',	'abc@gmail.com',	'$2b$10$sdtO5OW4LgMMLNNDraqUr.WfZjfgY.yDozVF4sCMd2TJ8fD81hg6G',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNiwiaWF0IjoxNjc1NTA5NDQ0LCJleHAiOjE2NzYxMTQyNDR9.z35eCqHBbUF3mZF9kqAmrTzy502pYTgcbCP4RNeOjYQ',	'2023-04-18 08:36:55',	NULL),
(17,	NULL,	'deepak',	NULL,	NULL,	'9549752036',	'abcd@gmail.com',	'$2b$10$TSxFrQ2DcYBRnF.CE56hVeLZYx3KOpzz8UH0n7Ddo6WljDMWK0EUu',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywiaWF0IjoxNjc4MDkwMzA2LCJleHAiOjE2Nzg2OTUxMDZ9.raJyUKXJuj3jcR8mCtlQQIU7bQYld71DSREKiNF51oA',	'2023-03-06 02:41:46',	'2023-03-06 02:41:46'),
(20,	NULL,	'Uday Kotecha',	NULL,	NULL,	'9089908719',	'Uday@gmail.com',	'$2b$10$bMfG1bLubCyJUldatugmr.Tx1ta2nwempz1D8y8X99/pcbUJlMcWi',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMCwiaWF0IjoxNjc4MTg5NDEwLCJleHAiOjE2Nzg3OTQyMTB9.saRUJ5KdP58Up4y9Prr7c4Wj3XEDqf1Xwu8aEpkbjcI',	'2023-03-07 11:43:30',	'2023-03-07 11:43:30'),
(21,	NULL,	'Hiren Makwana',	'2023-03-24T17-40-59.363Z-wallpaperflare.com_wallpaper (1).jpg',	NULL,	'8989989898',	'abca@gmail.com',	'$2b$10$u3/R9.FJz5S0yOO99Ig5uOf8FYZK6JrpG.vt/BWgp4jFb3sanGbCy',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiaWF0IjoxNjc4MTg5NTczLCJleHAiOjE2Nzg3OTQzNzN9.BQ1AhjZL0vU4t3q5MmqiHEL0XBdTaR0y37HACLlRQhg',	'2023-03-24 17:40:59',	'2023-03-07 11:46:13'),
(22,	NULL,	'Dixit Kukadiya',	NULL,	NULL,	'8909198909',	'dixit@gmail.com',	'$2b$10$Fyaa3bPc0KP7e.WQU2y4zOkwCL.ZkAh6B6I8LhLWluBxjmnV2UZ7y',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiaWF0IjoxNjc4MTkxNzQwLCJleHAiOjE2Nzg3OTY1NDB9.-rVpFNqQfFh03DbyCRyy2Fo5yN7LM_QnsPS0bja39Y8',	'2023-03-07 12:22:20',	'2023-03-07 12:22:20'),
(23,	NULL,	'ZerrinsTesting',	NULL,	NULL,	'9890123490',	'zerrins@gmail.com',	'$2b$10$fDYebt7ETFPJqTXJ67WDjO2CuekobGBjg/0CH3OCqdWc53B3YOT3y',	0,	0,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMywiaWF0IjoxNjc5MzgzMDA1LCJleHAiOjE2Nzk5ODc4MDV9.btzWbxi-17EdVUoN6sNi1vQkXp3MewEI1VImydZpfE0',	'2023-03-21 07:16:45',	'2023-03-21 07:16:45');

-- 2023-04-18 10:44:32