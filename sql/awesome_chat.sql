/*
 Navicat Premium Data Transfer

 Source Server         : aliyun
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : 47.95.234.220
 Source Database       : awesome_chat

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : utf-8

 Date: 03/26/2018 17:09:54 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admins`
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `adminId` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `adminName` varchar(255) DEFAULT NULL,
  `adminPwd` varchar(255) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `admins`
-- ----------------------------
BEGIN;
INSERT INTO `admins` VALUES ('1', 'wengrunyu', '0000', '1');
COMMIT;

-- ----------------------------
--  Table structure for `attendances`
-- ----------------------------
DROP TABLE IF EXISTS `attendances`;
CREATE TABLE `attendances` (
  `attendanceId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned zerofill DEFAULT NULL,
  `attendanceYear` int(11) DEFAULT NULL,
  `attendanceMonth` int(11) DEFAULT NULL,
  `attendanceDate` int(11) DEFAULT NULL,
  `strikeTime` varchar(255) DEFAULT NULL,
  `hasCottage` int(11) DEFAULT NULL,
  `cottageReason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attendanceId`),
  KEY `userId` (`userId`),
  CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `companies`
-- ----------------------------
DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `companyId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) DEFAULT NULL,
  `companyOwnerId` int(11) unsigned zerofill DEFAULT NULL,
  `companyTel` varchar(255) DEFAULT NULL,
  `companyMail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`companyId`),
  KEY `companyOwnerId` (`companyOwnerId`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`companyOwnerId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `companies`
-- ----------------------------
BEGIN;
INSERT INTO `companies` VALUES ('1', 'test', '1', '1212414124', '12123123@gmail.com');
COMMIT;

-- ----------------------------
--  Table structure for `deps`
-- ----------------------------
DROP TABLE IF EXISTS `deps`;
CREATE TABLE `deps` (
  `depId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `depName` varchar(255) DEFAULT NULL,
  `depOwnerId` int(11) unsigned zerofill DEFAULT NULL,
  `depParentId` int(11) unsigned zerofill DEFAULT NULL,
  `companyId` int(11) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`depId`),
  KEY `companyId` (`companyId`),
  KEY `depOwnerId` (`depOwnerId`),
  CONSTRAINT `deps_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`companyId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `deps_ibfk_2` FOREIGN KEY (`depOwnerId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `deps`
-- ----------------------------
BEGIN;
INSERT INTO `deps` VALUES ('1', '总部', '1', '0', '1'), ('3', '研发', '2', '1', '1'), ('4', '前端', '5', '3', '1'), ('5', '后台', '4', '3', '1');
COMMIT;

-- ----------------------------
--  Table structure for `feedbacks`
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `fbId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `fbUserId` int(11) unsigned zerofill DEFAULT NULL,
  `fbUserName` varchar(255) DEFAULT NULL,
  `fbContent` varchar(255) DEFAULT NULL,
  `fbType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fbId`),
  KEY `fbUserId` (`fbUserId`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`fbUserId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `messages`
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `messageId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `otherSideAvatar` varchar(255) DEFAULT NULL,
  `messageContent` varchar(255) DEFAULT NULL,
  `messageFromId` int(11) unsigned zerofill DEFAULT NULL,
  `messageToId` varchar(255) DEFAULT NULL,
  `createTime` bigint(25) DEFAULT NULL,
  `isPic` int(11) DEFAULT NULL,
  `isGroup` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  `isRecommend` int(11) DEFAULT NULL,
  PRIMARY KEY (`messageId`),
  KEY `messageFromId` (`messageFromId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`messageFromId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `messages`
-- ----------------------------
BEGIN;
INSERT INTO `messages` VALUES ('1', 'upload_d490a0f5884381665d6970fe10d01829', 'zai?', '2', '1-2', '1521012265000', '0', null, null, '0'), ('2', 'upload_d490a0f5884381665d6970fe10d01829', '{\"userId\":5,\"userName\":\"万虎\",\"userAvatar\":null}', '2', '1-2', '1521012277000', '0', null, null, '1'), ('3', 'upload_e5a1dcf100bac5f0c9cb6ebe6f9ef4f3', '{\"userId\":2,\"userName\":\"朴灵\",\"userAvatar\":\"upload_d490a0f5884381665d6970fe10d01829\"}', '1', '1-5', '1521012638000', '0', null, null, '1'), ('4', 'upload_e5a1dcf100bac5f0c9cb6ebe6f9ef4f3', '?', '1', '1-5', '1521012645000', '0', null, null, '0');
COMMIT;

-- ----------------------------
--  Table structure for `rooms`
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `roomId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `roomName` varchar(255) DEFAULT NULL,
  `roomIntro` varchar(255) DEFAULT NULL,
  `roomMemberId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roomId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rooms`
-- ----------------------------
BEGIN;
INSERT INTO `rooms` VALUES ('1', null, null, '1-2'), ('2', null, null, '1-5');
COMMIT;

-- ----------------------------
--  Table structure for `rooms_to_users`
-- ----------------------------
DROP TABLE IF EXISTS `rooms_to_users`;
CREATE TABLE `rooms_to_users` (
  `mappingId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `roomId` int(11) unsigned zerofill DEFAULT NULL,
  `userId` int(11) unsigned zerofill DEFAULT NULL,
  `roomMemberId` varchar(255) DEFAULT NULL,
  `isGroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`mappingId`),
  KEY `roomId` (`roomId`),
  KEY `userId` (`userId`),
  CONSTRAINT `rooms_to_users_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`roomId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `rooms_to_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rooms_to_users`
-- ----------------------------
BEGIN;
INSERT INTO `rooms_to_users` VALUES ('1', '1', '1', '1-2', null), ('2', '1', '2', '1-2', null), ('3', '2', '1', '1-5', null), ('4', '2', '5', '1-5', null);
COMMIT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userMisId` varchar(255) DEFAULT NULL,
  `userAvatar` varchar(255) DEFAULT NULL,
  `userTel` varchar(255) DEFAULT NULL,
  `userPwd` varchar(255) DEFAULT NULL,
  `userSign` varchar(255) DEFAULT NULL,
  `userExt` varchar(255) DEFAULT NULL,
  `userWorkPlace` varchar(255) DEFAULT NULL,
  `userSex` int(11) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  `depId` int(11) DEFAULT NULL,
  `userRegisterTime` varchar(255) DEFAULT NULL,
  `lastUpdateTime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('1', '翁润雨', 'wengrunyu', 'upload_e5a1dcf100bac5f0c9cb6ebe6f9ef4f3', '155247456', '0000', null, null, null, null, '1', '1', '1521011427000', '1521013982000'), ('2', '朴灵', 'puling', 'upload_d490a0f5884381665d6970fe10d01829', '1222341', '0000', null, null, null, null, '1', '3', '1521011427000', '1521012284000'), ('3', '余波', 'yubo', null, '17772822', '0000', null, null, null, null, '1', '4', '1521011661000', null), ('4', '司马', 'sima', null, '13323435', '0000', null, null, null, null, '1', '5', '1521011702000', null), ('5', '万虎', 'wanhu', null, '234351423', '0000', null, null, null, null, '1', '4', '1521011725000', null), ('6', '小辉', 'xiaohui', null, '1244223', '0000', null, null, null, null, '1', '4', '1521011752000', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
