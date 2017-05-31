import "./index.css"
import { Component } from "react"
import props from "./props"
import classNames from "classnames"
import getUid from './uid';
import defaultRequest from './request';
import extend from 'extend';
import getThumb from './getThumb';
import isAllow from './isAllow';

let awaitFileLists = {}

const uploadfile = function (settings) {
    let uid = settings.id || ''
    let file = awaitFileLists[uid] || {}
    let props = file.__UploadProps || {}
    defaultRequest({
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

        const files = {}
        const errFilesLists = []
        for (let i = 0; i < fileData.length; i++) {
            let isAllowResult = isAllow(props.allow,fileData[i].name)
            if(isAllowResult){
                files[i] = fileData[i]
                files[i].id = getUid()
                files[i].thumb = getThumb(self.props.thumb)
                files[i].__UploadProps = {
                    action : props.action ,
                    data : props.data ,
                    headers : props.headers ,
                }
                awaitFileLists[files[i].id] = files[i]
            }else{
                errFilesLists.push({
                    name: fileData[i].name,
                    errmsg:'文件格式错误'
                })
            }
        }
        self.props.onChange(files,errFilesLists)
    }
    render() {
        const self = this
        const pcls = self.props.prefixClassName
        return (
            <div className={`${pcls}-xhr`} >
                <input  
                    ref={`${pcls}-xhr-input-${self.state.uid}`}
                    type='file'
                    accept={self.props.accept} 
                    className={`${pcls}-xhr-input`}
                    multiple={self.props.multiple} 
                    onChange={function(e){
                        /*console.group('input onChange')
                        console.groupEnd()*/
                            self.onChange(e.target.files)
                    }}
                />
                <label  className={`${pcls}-xhr-label`} 
                        onClick={function(){
                            // console.log('label onClick')
                            self.refs[pcls+'-xhr-input-'+self.state.uid].click();
                        }}
                >
                    {self.props.children}
                </label>
            </div>
        )
    }
}
props(AjaxUpload)
export { uploadfile }
export default AjaxUpload