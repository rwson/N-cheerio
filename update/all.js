/**
 * 应用save模块和read模块爬取数据
 */
var async = require("async");
var config = require("../config");
var read = require("./read");
var save = require("./save");
var debug = require("debug")("blog:update:all");
var classList;
var articleList = [];

console.log(read);
console.log(save);
console.log(config);

async.series([

    /**
     * 获取文章分类列表
     * @param done  完成回调
     */
    function(done){
        read.classList(config.sinaBlog,function(err,list){
            classList = list;
            done(err);
        });
    },

    /**
     * 保存文章分类列表
     * @param done  完成回调
     */
    function(done){
        save.classList(classList,done);
    },

    /**
     * 依次获取所有文章分类下的文章列表
     * @param done  完成回调
     */
    function(done){
        async.eachSeries(classList,function(c,next){
            read.articleList(c.url,function(err,list){
                articleList[c.id] = list;
                next(err);
            });
        },done);
    },

    /**
     * 保存文章列表
     * @param done  完成回调
     */
    function(done){
        async.eachSeries(Object.keys(articleList),function(classId,next){
            save.articleList(classId,articleList[classId],next);
        },done);
    },

    /**
     * 保存文章数量
     * @param done  完成回调
     */
    function(done){
        async.eachSeries(Object.keys(articleList),function(classId,next){
            save.articleCount(classId,articleList[classId].length,next);
        },done);
    },

    /**
     * 重新整理文章列表,并去重
     * @param done  完成回调
     */
    function(done){
        debug("重新整理文章列表,并去重");
        var articles = {};
        Object.keys(articleList).forEach(function(classId){
            articleList[classId].forEach(function(item){
                articles[item.id] = item;
            });
        });
        articleList = [];
        Object.keys(articles).forEach(function(id){
            articleList.push(articles[id]);
        });
        done();
    },

    /**
     * 依次读取文章详情,并保存
     * @param done  完成回调
     */
    function(done){
        async.eachSeries(articleList,function(item,next){
            save.isAericleExits(item.id,function(err,exits){
                if(err){
                    return next(err);
                }
                if(exits){
                    debug("文章已存在:%s",item.url);
                }
                read.articleDateil(item,url,function(err,ret){
                    if(err){
                        return next(err);
                    }
                    save.articleDetail(item.id,ret.tahs,ret.content,function(err){
                        if(err){
                            return next(err);
                        }
                        save.articleTags(item.id,ret.tags,next)
                    });
                })
            });
        },done);
    }
],function(err){
    if(err){
        console.error(err);
    }
    console.log("完成");
    process.exit(0);
});