import { Component } from "react"
// import props from "./props"
// import classNames from "classnames"
import getUid from './uid';
import defaultRequest from './request';
import extend from 'extend';
import getThumb from './getThumb';
import isLimit from './isLimit'
import util from 'util.react';
// import "./index.css"

let awaitFileLists = {}
let awaitFileUploadProps = {}

const uploadfile = function (settings) {
    let uid = settings.id || ''
    let file = awaitFileLists[uid] || {}
    let props = awaitFileUploadProps[uid] || {}
    return defaultRequest({
        action: props.action,
        file,
        data : props.data,
        headers: props.headers,
        onProgress: function(step){
            settings.onProgress(step,file)
        } ,
        onSuccess: settings.onSuccess || function(){} ,
        onError: settings.onError || function (err, res) {
            settings.onError(err, res, file);
        },
        onXhrError: settings.onXhrError || function(e) {
            delete awaitFileLists[uid];
        }
    });
}

class AjaxUpload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uid: getUid(),
        }
    }
    onChange(fileData){
        let self = this
        let state = this.state
        let props = this.props

        const files = []
        const errFilesLists = []
        for (let i = 0; i < fileData.length; i++) {
            // 限制判断
            let limit_result = isLimit(fileData[i])
            if( limit_result.type(props.allow) ){
                errFilesLists.push({
                    file: fileData[i],
                    errType:'TYPE'
                })
            }
            else if( limit_result.size(props.size) ){
                errFilesLists.push({
                    file: fileData[i],
                    errType:'SIZE'
                })
            }
            /* 文件夹的判断 不精确 && 当选择了上传文件夹是忽略此限制判断
            else if( limit_result.isFolder() ){
                console.warn('\"'+fileData[i].name+'\" 是文件夹, 暂不支持上传文件夹 !')
                errFilesLists.push({
                    file: fileData[i],
                    errType:'FOLDER'
                })
            }*/
            else {
                files[i] = fileData[i]
                files[i].id = fileData[i].lastModified || fileData[i].lastModifiedDate.getTime() || getUid()
                files[i].thumb = getThumb({
                    defaultThumb : self.constructor.defaultProps.thumb ,
                    thumbProps :  self.props.thumb ,
                    fileData : fileData[i]
                })
                awaitFileUploadProps[files[i].id] = {
                    action : props.action ,
                    data : props.data ,
                    headers : props.headers ,
                }
                awaitFileLists[files[i].id] = files[i]
            }
        }
        // 有错误才抛出
        if(errFilesLists.length > 0){
            self.props.onError(errFilesLists)
        }

        // 去除 files 中 undefined项
        let filesArray = []
        for(let i=0 ; i<files.length ; i++){
        	if(typeof files[i] !== 'undefined'){
        		filesArray.push( extend(true,{},files[i]) )
        	}
        }
        // 有正确可上传文件才抛出
        if(fileData.length != errFilesLists.length){
            self.props.onPick(filesArray)
        }
        // 相同文件重复触发
        self.$refs[self.props.prefixClassName+'-xhr-input-'+self.state.uid].value = ''
    }
    componentDidMount(){
        this.toggleWebkitDirectory()
    }
    // react 不支持webkit属性 只能以这种方式添加
    toggleWebkitDirectory(){
        let self = this
        // console.log('toggleWebkitDirectory',self.props)
        if(self.$refs[self.props.prefixClassName+'-xhr-input-'+self.state.uid]){
            if(self.props.webkitdirectory){
                self.$refs[self.props.prefixClassName+'-xhr-input-'+self.state.uid].setAttribute('webkitdirectory',true)
            }else{
                self.$refs[self.props.prefixClassName+'-xhr-input-'+self.state.uid].removeAttribute('webkitdirectory')
            }
        }
    }
    render() {
        const self = this
        const ref = util.ref(this)
        const pcls = self.props.prefixClassName

        // 拖拽
        let dropPropsFn = {}
        if(self.props.drop){
            dropPropsFn = {
                onDragOver : function(e){
                    // 这保证 handleDroZoneDrop 可以被调用
                    e.preventDefault();
                },
                onDrop : function(e){
                    e.preventDefault();
                    // 拖拽暂时只支持文件 ,拖拽文件夹提示不支持 (limit.js中做)
                    self.onChange(e.dataTransfer.files)
                }
            }
        }
        // if(self.props.webkitdirectory){
        //     self.toggleWebkitDirectory()
        // }
        return (
            <span className={`${pcls}-xhr`}>
                <input
                    ref={ref(pcls+'-xhr-input-'+self.state.uid)}
                    type='file'
                    className={`${pcls}-xhr-input`}
                    multiple={self.props.multiple}
                    onChange={function(e){
                        self.onChange(e.target.files)
                    }}
                />
                <label
                    {...dropPropsFn}
                    className={`${pcls}-xhr-label`}
                    onClick={function(){
                        self.$refs[pcls+'-xhr-input-'+self.state.uid].click();
                    }}
                >
                    {self.props.children}
                </label>
            </span>
        )
    }
}
require('./props').default(AjaxUpload)
export { uploadfile }
export default AjaxUpload
