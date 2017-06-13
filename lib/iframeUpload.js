import React, { Component , PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import getUid from './uid';
import iframeRequest from './iframe';

/*
    ${uid} : {
        id: uid ,
        filename: ' ',
        {...props}
    }
*/
let awaitFileList = {}

/* 根据参数配置dom & 并触发上传 */
let uploadiframe = function(settings){
    let uid = settings.id || ''
    let props = awaitFileList[uid].__UploadProps || {}

    iframeRequest({
        uid:uid,
        pcls:props.pcls,
        data: props.data,
        action: props.action,
        headers: props.headers,
        // TODO : 模拟虚假进度条,时长控制?
        onProgress: function(step){
            settings.onProgress(step,file)
        } ,
        onSuccess: settings.onSuccess || function(){} ,
        onError: settings.onError || function (err, res) {
            settings.onError(err, res, file);
        },
        // TODO : ie下丢弃 onXhrError ?
        onXhrError: settings.onXhrError || function(e) {
            delete awaitFileLists[uid];
        }
    })
}

/* 根据uid生成dom(iframe , form ,input) */
let createDom = function(pcls,uid) {

    var iframe = document.createElement('iframe'); 
    iframe.setAttribute("class",pcls+"-iframe-iframe");   
    iframe.setAttribute("id",pcls+"-iframe-iframe_"+uid);   
    iframe.setAttribute("name",pcls+"-iframe-iframe_"+uid);   

    var form = document.createElement("form");   
    form.setAttribute("method","post"); 
    form.setAttribute("target",pcls+"-iframe-iframe_"+uid);  
    form.setAttribute("class",pcls+"-iframe-form");   
    form.setAttribute("id",pcls+"-iframe-form_"+uid);  
    form.setAttribute("enctype","multipart/form-data"); 

    var input = document.createElement("input"); 
    input.setAttribute("type","file"); 
    input.setAttribute("class",pcls+"-iframe-form-input");
    input.setAttribute("data",uid);
    input.setAttribute("id",pcls+"-iframe-form-input_"+uid);

    document.body.appendChild(iframe);
    form.appendChild(input);
    document.body.appendChild(form);
}

/* TODO : 根据uid销毁dom,(销毁时机?) */
let destroyDom = function(uid) {

}


class IframeUpload extends Component {
 
    render() {
        const self = this
        const pcls = self.props.prefixClassName
        return (
            <span className={`${pcls}-iframe`} >
                <label  className={`${pcls}-iframe-label`} 
                        onClick={function(){
                            /* TODO:
                                1. 生成uid
                                2. create Dom
                                3. trigger focus() & click()
                                4. onchange() - get filename & saveas awaitlist
                            */ 
                            let uid = getUid()
                            createDom(pcls,uid)
                            let ele = document.getElementById(pcls+'-iframe-form-input_'+uid)
                            ele.onchange = function(){
                                // alert(ele.value)
                                let fileDate = {
                                    id: uid,
                                    name: ele.value,
                                    thumb : self.props.thumb || '' , // TODO : 组件自配优化缩略图
                                    __UploadProps : {
                                        pcls: pcls ,
                                        data: self.props.data || {} ,
                                        action: self.props.action , // TODO : auto trans https ie8不支持
                                        headers : self.props.headers || {} ,
                                    }
                                }
                                awaitFileList[uid] = fileDate
                                self.props.onPick([fileDate])
                            }
                            ele.focus()
                            ele.click()
                        }}
                >
                    {self.props.children}
                </label>
            </span>
        );
    }
}
export { uploadiframe }
export default IframeUpload;