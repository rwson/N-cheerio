/**
 * ��������MySql�����ļ�
 */

var mysql = require("mysql");

exports = {
    "db":mysql.createConnection({
        "host":"127.0.0.1",         //  ���ݿ��ַ
        "port":3306,                //  ���ݿ�˿�
        "database":"sina_blog",     //  ���ݿ�����
        "user":"root",              //  ���ݿ��û���
        "password":"root"           //  ���ݿ�����
    }),
    "sinaBlog":"http://blog.sina.com.cn/u/1191258123"      //  ���˲��͵�ַ
};