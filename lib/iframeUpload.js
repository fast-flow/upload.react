import React, { Component , PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import getUid from './uid';
import iframeRequest from './iframe';

/*
    ${uid} : {
        filename: ' ',
        {...props}
    }
*/
let awaitFileList = {}

/* 根据参数配置dom & 并触发上传 */
let uploadiframe = function(setting){
    iframeRequest({
        
    })
}

/* 根据uid生成dom(iframe , form ,input) */
let createDom = function(uid) {
    // var iframe = document.createElement('iframe'); 
    // iframe.setAttribute("class","r-upload-iframe-iframe");   
    // iframe.setAttribute("id","r-upload-iframe-iframe");   
    // iframe.setAttribute("name","r-upload-iframe-iframe");   
    // iframe.onload=function(){
    //  var win = document.getElementById('r-upload-iframe-iframe').contentWindow  ;
    //  var response = win.document.body.innerText ;
    //  console.log(response) ;
    // }

    // var form = document.createElement("form");   
    // form.setAttribute("action","/upload?status=success"); 
    // form.setAttribute("method","post"); 
    // form.setAttribute("target","r-upload-iframe-iframe");  
    // form.setAttribute("class","r-upload-iframe-form");   
    // form.setAttribute("id","r-upload-iframe-form");  
    // form.setAttribute("enctype","multipart/form-data"); 

    // var input = document.createElement("input"); 
    // input.setAttribute("type","file"); 
    // input.setAttribute("class","r-upload-iframe-form-input");
    // input.setAttribute("name","heiheihei");
    // input.setAttribute("value","hello world");

    // document.body.appendChild(iframe);
    // form.appendChild(input);
    // document.body.appendChild(form);
}

/* 根据uid销毁dom,(销毁时机?) */
let destroyDom = function(uid) {

}

// diferent from AjaxUpload, can only upload on at one time, serial seriously
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
                                4. get filename & saveas awaitlist
                            */ 
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