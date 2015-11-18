/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 50163
 Source Host           : 127.0.0.1
 Source Database       : sina_blog

 Target Server Version : 50163
 File Encoding         : utf-8

 Date: 11/18/2015 14:18:21 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `acticle_tag`
-- ----------------------------
DROP TABLE IF EXISTS `acticle_tag`;
CREATE TABLE `acticle_tag` (
  `id` varchar(20) NOT NULL COMMENT '文章id，与tag为联合主键',
  `tag` varchar(20) NOT NULL COMMENT '标签名称，与id为联合主键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` varchar(20) NOT NULL COMMENT '文章id',
  `tags` varchar(255) NOT NULL COMMENT '文章标签',
  `content` text NOT NULL COMMENT '内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `article_list`
-- ----------------------------
DROP TABLE IF EXISTS `article_list`;
CREATE TABLE `article_list` (
  `id` varchar(20) NOT NULL COMMENT '文章id，与class_list表中的id为联合主键',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `url` varchar(255) NOT NULL COMMENT '文章页面的url',
  `class_id` varchar(20) NOT NULL COMMENT '文章所属分类id，与id为联合主键',
  `created_time` int(11) NOT NULL COMMENT '文章发布时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `class_list`
-- ----------------------------
DROP TABLE IF EXISTS `class_list`;
CREATE TABLE `class_list` (
  `id` varchar(20) NOT NULL COMMENT '文章分类的id，主键',
  `url` varchar(255) NOT NULL COMMENT '文章分类页面的url',
  `name` varchar(50) NOT NULL COMMENT '文章分类名称',
  `count` int(11) NOT NULL COMMENT '文章数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `class_list`
-- ----------------------------
BEGIN;
INSERT INTO `class_list` VALUES ('1776757314', 'http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', '全部博文', '0'), ('1776757314_0_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', '全部博文', '0'), ('1776757314_10_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_10_1.html', '【亚洲】非常新加坡', '0'), ('1776757314_11_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_11_1.html', '【亚洲】美嘀泰泰', '0'), ('1776757314_12_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_12_1.html', '【欧洲】浓情西班牙', '0'), ('1776757314_13_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_13_1.html', '【南美洲】热辣巴西', '0'), ('1776757314_14_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_14_1.html', '【欧洲】法国、芬兰、…', '0'), ('1776757314_15_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_15_1.html', '【澳洲】新西兰', '0'), ('1776757314_1_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_1_1.html', '【祖国】大陆', '0'), ('1776757314_2_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_2_1.html', '【MY烘焙生活】', '0'), ('1776757314_3_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_3_1.html', '【小日子】', '0'), ('1776757314_4_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_4_1.html', '【祖国】纵贯台湾岛', '0'), ('1776757314_5_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_5_1.html', '【祖国】港澳行记', '0'), ('1776757314_6_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_6_1.html', '【亚洲】马来西亚', '0'), ('1776757314_7_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_7_1.html', '【澳洲】澳大利亚', '0'), ('1776757314_8_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_8_1.html', '【亚洲】日本、韩国', '0'), ('1776757314_9_1', 'http://blog.sina.com.cn/s/articlelist_1776757314_9_1.html', '【北美洲】自驾美利坚', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
