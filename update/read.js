/**
 * 读取博客的分类列表、分类博文列表、文章详细内容
 */
var request = require("request");
var cheerio = require("cheerio");
var debug = require("debug")("blog:update:read");

exports = {
    /**
     * 获取文章分类列表
     * @param url       获取的url
     * @param callback  回调
     */
    "classList":function(url,callback){
        debug("读取文章列表:%s",url);

        request(url,function(err,res){
            if(err){
                return callback(err);
            }
            var $ = cheerio.load(res.body.toString());
            //  根据请求到的网页内容创建DOM对象

            var classList = [];
            //  定义空数组,用来存储分类列表

            $(".classList a").each(function(){
                var $me = $(this);
                var item = {
                    "name":$me.text().trim(),
                    "url":$me.attr("href")
                };
                var s = item.url.match(/acticlelist_\d+_(\d+)_\d\.html/);
                //  从url中提取分类id

                if(Array.isArray(s)){
                    item.id = s[1];
                    classList.push(item);
                }
            });

            callback(null,classList);
            //  返回结果
        });
    },

    /**
     * 读取文章分类博文列表
     * @param url       获取的url
     * @param callback  回调
     */
    "articleList":function(url,callback){
        debug("获取博文列表:%s",url);
        _request(url,function(err,res){
            if(err){
                return callback(err);
            }
            var $ = cheerio.load(res.body.toString());
            //  根据请求到的网页内容创建DOM对象

            var articleList = [];
            //  定义空数组,用来存储博文列表

            $(".articleList .articleCell").each(function(){
                var $me = $(this);
                var $title = $me.find(".act_title a");
                var $time = $me.find(".act_tm");
                var item = {
                    "title":$title.text().trim(),
                    "url":$title.attr("href"),
                    "time":$time.text().trim()
                };
                var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
                //  从url中提取文章id

                if(Array.isArray(s)){
                    item.id = s[1];
                    articleList.push(item);
                }

                var nextUrl = $(".SG_pgnext a").attr("href");
                //  获取下一页url
                if(nextUrl){
                    //  如果下一页存在
                    exports.articleList(nextUrl,function(err,list){
                        if(err){
                            return callback(err);
                        } else{
                            callback(null,articleList.concat(list));
                        }
                    });
                }else{
                    callback(null,articleList);
                }
            });
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