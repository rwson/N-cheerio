/**
 * �洢���͵ķ����б����಩���б�������ϸ����
 */
var async = require("async");
var db = require("../config").db;
var debug = require("debug")("blog:update:save");

exports = {
    /**
     * �������·����б�
     * @param list      ���·����б�
     * @param callback  �ص�
     */
    "classList":function(list,callback){
        debug("�������·����б�:%d",list.length);

        async.eachSeries(list,function(item,next){
            //  ��ÿһ����б���

            db.query("SELECT * FROM 'class_list' where 'id' = ?",[item.id],function(err,data){
                //  ��ѯ�÷����Ƿ����

                if(err){
                    return next(err);
                }
                if(Array.isArray(data) && data.length >= 1){
                    //  �����Ѿ�����,���·���

                    db.query("UPDATE 'class_list' SET 'name'=?,'url'=? WHERE 'id'=?",[item.name,item,url,item.id],next);
                }else{
                    //  ���಻����,����һ��������

                    db.query("INSERT INTO 'class_list'('id','name','url') VALUES(?,?,?)",[item.id,item.name,item,url]);
                }
            });
        },callback);
    },

    /**
     * ���������б�
     * @param class_id  ����id
     * @param list      �����б�
     * @param callback  �ص�
     */
    "articleList":function(class_id,list,callback){
        debug("���沩���б�:%d,%d",class_id,list.length);
        async.eachSeries(list,function(item,next){


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