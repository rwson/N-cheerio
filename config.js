/**
 * 网络爬虫MySql配置文件
 */

var mysql = require("mysql");

exports = {
    "db":mysql.createConnection({
        "host":"127.0.0.1",         //  数据库地址
        "port":3306,                //  数据库端口
        "database":"sina_blog",     //  数据库名称
        "user":"root",              //  数据库用户名
        "password":"root"           //  数据库密码
    }),
    "sinaBlog":"http://blog.sina.com.cn/u/1191258123"      //  新浪博客地址
};