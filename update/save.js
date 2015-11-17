/**
 * 保存博客的分类列表、分类博文列表、文章详细内容
 */
var async = require("async");
var db = require("../config").db;
var debug = require("debug")("blog:update:save");

module.exports = {

    /**
     * 保存文章分类列表
     * @param list      文章分类列表
     * @param callback  回调
     */
    "classList": function (list, callback) {
        console.log("保存文章分类列表:%d", list.length);

        async.eachSeries(list, function (item, next) {
            //  对每一项进行遍历

            db.query("SELECT * FROM class_list where id = '" + item.id + "'", function (err, data) {
                //  查询该分类是否存在
                if (err) {
                    return next(err);
                }

                if (Array.isArray(data) && data.length >= 1) {
                    //  分类已经存在,更新分类

                    db.query("UPDATE class_list SET name='" + item.name + "',url='" + item.url + "' WHERE id='" + item.id + "'", next);
                } else {
                    //  分类不存在,插入一条新数据

                    db.query("INSERT INTO class_list(id,name,url) VALUES('" + item.id + "','" + item.name + "','" + item.url + "')",next);
                }
            });
        }, callback);
    },

    /**
     * 保存文章列表
     * @param class_id  分类id
     * @param list      文章列表
     * @param callback  回调
     */
    "articleList": function (class_id, list, callback) {
        console.log("保存博文列表:%d,%d", class_id, list.length);
        async.eachSeries(list, function (item, next) {
            //  遍历每一项

            db.query("SELECT * FROM 'article_list' WHERE 'id'=? AND 'class_id'=? LIMIT 1", [item.id, class_id], function (err, data) {
                if (err) {
                    return callback(err);
                }

                var created_time = new Date(item.time).getTime() / 1000;
                //  将发布时间转成时间戳(秒)

                if (Array.isArray(data) && data.length >= 1) {
                    //  分类已经存在,更新
                    db.query("UPDATE 'article_list' SET 'title'=?,'url'=?,'class_id'=?,'created_time'=? WHERE 'id'=? AND 'class_id'=?", [item.title, item.url, class_id, created_time, item.id, class_id], next);
                } else {
                    //  分类不存在,添加
                    db.query("INSERT INTO 'article_list'('id','title','url','class_id','created_time') VALUES(?,?,?,?,?)", [item.id, item.title, item.url, class_id, created_time], next);
                }
            });
        }, callback);
    },

    /**
     * 保存文章分类的数量
     * @param class_id  分类id
     * @param count     数量
     * @param callback  回调
     */
    "articleCount": function (class_id, count, callback) {
        console.log("保存文章分类数量:%d,%d", class_id, count);

        db.query("UPDATE　'class_list' set 'count'=? WHERE 'id'=?", [count, class_id], callback);
    },

    /**
     * 保存文章分类标签
     * @param id        文章id
     * @param tags      标签
     * @param callback  回调
     */
    "articleTags": function (id, tags, callback) {
        console.log("保存文章分类标签:%s,%s", id, tags);

        db.query("DELETE FROM 'article_tag' WHERE 'id'=?", [id], function (err) {
            if (err) {
                return callback(err);
            }

            if (tags.length > 0) {
                var values = tags.map(function (tag) {
                    return "(" + db.escape(id) + "," + db.escape(id) + ")";
                }).join(",");
                db.query("INSERT INTO 'article_tag'('id','tag') VALUES" + values, callback);
            } else {
                //  如果没有标签直接走回调
                callback(null);
            }
        });
    },

    /**
     * 保存文章详情
     * @param id        文章id
     * @param tags      文章标签
     * @param content   文章内容
     * @param callback  回调
     */
    "articleDetail": function (id, tags, content, callback) {
        console.log("保存文章内容:%s", id);

        db.query("SELECT 'id' FROM 'article_detail' WHERE 'id'=?", [id], function (err, data) {
                //  查询文章是否存在
                if (err) {
                    return callback(err);
                }

                tags = tags.join(" ");
                if (Array.isArray(data) && data.length >= 1) {
                    db.query("UPDATE 'article_detail' SET 'tags'=?,'content'=?, WHERE 'id'=?", [tags, content, id], callback);
                    //   更新文章
                } else {
                    db.query("INSERT INTO 'article_detail'('id','tags','content') VALUES(?,?,?)",[id,tags,content],callback);
                }
            }
        );
    },

    /**
     * 检查文章是否存在
     * @param id        文章id
     * @param callback  回调
     */
    "isAericleExits":function(id,callback){
        db.query("SELECT 'id' FEOM 'article_detail' WHERE 'id'=?",[id],function(err,data){
            if(err){
                return callback(err);
            }

            callback(null,Array.isArray(data) && data.length >= 1);
        });
    }
};