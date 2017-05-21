import "./index.css"
import { Component } from "react"
import props from "./props"
import classNames from "classnames"
import getUid from './uid';
import defaultRequest from './request';
import extend from 'extend';

let awaitFileLists = {
}

const uploadfile = function () {
    console.group('uploadfile')
    console.log(arguments[0])
    let uid = arguments[0].id || ''
    let file = awaitFileLists[uid] || {}
    let props = file.__UploadProps || {}
    console.groupEnd()
    defaultRequest({
        action: props.action,
        filename: props.filename,
        file : file,
        data : props.data,
        headers: props.headers,
        onProgress: arguments[0].onProgress || function(){} ,
        onSuccess: arguments[0].onSuccess || function(){} ,
        /*onError: function (err, ret) {
            delete self.state[uid];
            props.onError(err, ret, file);
        },*/
    });
    console.log(uid)
}

class AjaxUpload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uid: getUid(),
        }
    }
    ms = (action) => {
        let self = this
        let state = this.state
        let props = this.props
        switch (action.type) {
            // 选择文件
            case 'onChange':
                const files = {}
                for (let i = 0; i < action.data.length; i++) {
                    files[i] = action.data[i]
                    files[i].id = getUid()
                        let thumb = ''
                        switch(files[i].name.replace(/.+\.(.+)$/,'$1')){
                            case 'jpg': case 'jpeg': case 'png': case 'gif': case 'bmp': case 'svg':
                                window.URL.revokeObjectURL(action.data[i]); // 清除释放
                                thumb = window.URL.createObjectURL(action.data[i])
                            break
                            case 'rar': case 'zip': case 'cab': case 'iso': case 'jar': case '7z': 
                                thumb = require('./images/zip.png')
                            break
                            default :
                                thumb = require('./images/file.png')
                        }
                    files[i].thumb = thumb
                    files[i].__UploadProps = {
                        action : props.action ,
                        filename : props.name ,
                        data : props.data ,
                        headers : props.headers ,
                    }
                    awaitFileLists[files[i].id] = extend(true,{},files[i])
                }
                self.props.onChange(files)
            break
            // 上传
            case 'onPost':

            break
            default:
                console.log(action.type)
                console.warn(new Error("Not find action.type", action))
        }
        this.setState(state)
    }
    render() {
        const self = this
        const pcls = self.props.prefixClassName
        return (
            <div className={classNames({
                [`${pcls}`]: true,
                [`${self.props.wrapClassName}`]: self.props.wrapClassName
            })} >
                <input  
                    ref={pcls+'-input'+self.state.uid}
                    name={self.props.name} 
                    type='file'
                    accept={self.props.accept} 
                    className={`${pcls}-input`}
                    multiple={self.props.multiple} 
                    onChange={function(e){
                        console.group('input onChange')
                        console.groupEnd()
                        // if(self.props.autoUpload){
                            self.ms({
                                type:'onChange',
                                data:e.target.files
                            })
                        // }else{
                        //     self.props.waitingList([pcls+self.state.uid])
                        // }
                    }}
                />
                <label  className={pcls + '-upload-ajax-label'+' '+props.wrapClassName} 
                        onClick={function(){
                            console.log('label onClick')
                            self.refs[pcls+'-input'+self.state.uid].click();
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