/**
 * 存储博客的分类列表、分类博文列表、文章详细内容
 */
var async = require("async");
var db = require("../config").db;
var debug = require("debug")("blog:update:save");

exports = {
    /**
     * 保存文章分类列表
     * @param list      文章分类列表
     * @param callback  回调
     */
    "classList":function(list,callback){
        debug("保存文章分类列表:%d",list.length);

        async.eachSeries(list,function(item,next){
            //  对每一项进行遍历

            db.query("SELECT * FROM 'class_list' where 'id' = ?",[item.id],function(err,data){
                //  查询该分类是否存在

                if(err){
                    return next(err);
                }
                if(Array.isArray(data) && data.length >= 1){
                    //  分类已经存在,更新分类

                    db.query("UPDATE 'class_list' SET 'name'=?,'url'=? WHERE 'id'=?",[item.name,item,url,item.id],next);
                }else{
                    //  分类不存在,插入一条新数据

                    db.query("INSERT INTO 'class_list'('id','name','url') VALUES(?,?,?)",[item.id,item.name,item,url]);
                }
            });
        },callback);
    },

    /**
     * 保存文章列表
     * @param class_id  分类id
     * @param list      文章列表
     * @param callback  回调
     */
    "articleList":function(class_id,list,callback){
        debug("保存博文列表:%d,%d",class_id,list.length);
        async.eachSeries(list,function(item,next){


        });
    },

    /**
     * 获取博文详细的内容
     * @param url       获取的url
     * @param callback  回调
     */
    "articleDateil":function(url,callback){
        debug("获取博文内容:%s",url);
        _request(url,function(err,res){
            if(err){
                return callback(err);
            }
            var $ = cheerio.load(res.body.toString());
            //  根据请求到的网页内容创建DOM对象

            var tags = [];
            //  定义空数组,用来存储博文标签

            $(".blog_tag h3 a").each(function(){
                var tag = $(this).text().trim();
                if(tag){
                    tags.push(tag);
                }
            });

            var content = $(".articalContent").html().trim();
            //  获取文章内容

            callback(null,{
                "tags":tags,
                "content":content
            });
            //  返回结果
        });
    }
};

/**
 * 请求指定url
 * @param url           被请求的url
 * @param callback      请求成功的回调
 * @private
 */
function _request(url,callback){
    request(url,callback);
}