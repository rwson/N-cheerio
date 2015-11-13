/**
 * ��ȡ���͵ķ����б����಩���б�������ϸ����
 */
var request = require("request");
var cheerio = require("cheerio");
var debug = require("debug")("blog:update:read");

exports = {
    /**
     * ��ȡ���·����б�
     * @param url       ��ȡ��url
     * @param callback  �ص�
     */
    "classList":function(url,callback){
        debug("��ȡ�����б�:%s",url);

        request(url,function(err,res){
            if(err){
                return callback(err);
            }
            var $ = cheerio.load(res.body.toString());
            //  �������󵽵���ҳ���ݴ���DOM����

            var classList = [];
            //  ���������,�����洢�����б�

            $(".classList a").each(function(){
                var $me = $(this);
                var item = {
                    "name":$me.text().trim(),
                    "url":$me.attr("href")
                };
                var s = item.url.match(/acticlelist_\d+_(\d+)_\d\.html/);
                //  ��url����ȡ����id

                if(Array.isArray(s)){
                    item.id = s[1];
                    classList.push(item);
                }
            });

            callback(null,classList);
            //  ���ؽ��
        });
    },

    /**
     * ��ȡ���·��಩���б�
     * @param url       ��ȡ��url
     * @param callback  �ص�
     */
    "articleList":function(url,callback){
        debug("��ȡ�����б�:%s",url);
        _request(url,function(err,res){
            if(err){
                return callback(err);
            }
            var $ = cheerio.load(res.body.toString());
            //  �������󵽵���ҳ���ݴ���DOM����

            var articleList = [];
            //  ���������,�����洢�����б�

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
                //  ��url����ȡ����id

                if(Array.isArray(s)){
                    item.id = s[1];
                    articleList.push(item);
                }

                var nextUrl = $(".SG_pgnext a").attr("href");
                //  ��ȡ��һҳurl
                if(nextUrl){
                    //  �����һҳ����
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
     * ��ȡ������ϸ������
     * @param url       ��ȡ��url
     * @param callback  �ص�
     */
    "articleDateil":function(url,callback){
        debug("��ȡ��������:%s",url);
        _request(url,function(err,res){
            if(err){
                return callback(err);
            }
            var $ = cheerio.load(res.body.toString());
            //  �������󵽵���ҳ���ݴ���DOM����

            var tags = [];
            //  ���������,�����洢���ı�ǩ

            $(".blog_tag h3 a").each(function(){
                var tag = $(this).text().trim();
                if(tag){
                    tags.push(tag);
                }
            });

            var content = $(".articalContent").html().trim();
            //  ��ȡ��������

            callback(null,{
                "tags":tags,
                "content":content
            });
            //  ���ؽ��
        });
    }
};

/**
 * ����ָ��url
 * @param url           �������url
 * @param callback      ����ɹ��Ļص�
 * @private
 */
function _request(url,callback){
    request(url,callback);
}