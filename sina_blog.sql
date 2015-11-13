/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : sina_blog

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2015-11-13 15:33:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `acticle_tag`
-- ----------------------------
DROP TABLE IF EXISTS `acticle_tag`;
CREATE TABLE `acticle_tag` (
  `id` varchar(20) NOT NULL COMMENT '文章id，与tag为联合主键',
  `tag` varchar(20) NOT NULL COMMENT '标签名称，与id为联合主键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of acticle_tag
-- ----------------------------

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` varchar(20) NOT NULL COMMENT '文章id',
  `tags` varchar(255) NOT NULL COMMENT '文章标签',
  `content` text NOT NULL COMMENT '内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for `article_list`
-- ----------------------------
DROP TABLE IF EXISTS `article_list`;
CREATE TABLE `article_list` (
  `id` varchar(20) NOT NULL COMMENT '文章id，与class_list表中的id为联合主键',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `url` varchar(255) NOT NULL COMMENT '文章页面的url',
  `class_id` int(11) NOT NULL COMMENT '文章所属分类id，与id为联合主键',
  `created_time` int(11) NOT NULL COMMENT '文章发布时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_list
-- ----------------------------

-- ----------------------------
-- Table structure for `class_list`
-- ----------------------------
DROP TABLE IF EXISTS `class_list`;
CREATE TABLE `class_list` (
  `id` int(11) NOT NULL COMMENT '文章分类的id，主键',
  `url` varchar(255) NOT NULL COMMENT '文章分类页面的url',
  `name` varchar(50) NOT NULL COMMENT '文章分类名称',
  `count` int(11) NOT NULL COMMENT '文章数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_list
-- ----------------------------
