import "./index.css"
import { Component } from "react"
import props from "./props"
import classNames from "classnames"
import getUid from './uid';
import defaultRequest from './request';
import extend from 'extend';
import getThumb from './getThumb';

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
        /*onError: function (err, ret) {
            delete self.state[uid];
            props.onError(err, ret, file);
        },*/
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
        for (let i = 0; i < fileData.length; i++) {
            files[i] = fileData[i]
            files[i].id = getUid()
            files[i].thumb = getThumb(self.props.thumb)
            files[i].__UploadProps = {
                action : props.action ,
                data : props.data ,
                headers : props.headers ,
            }
            awaitFileLists[files[i].id] = files[i]
        }
        self.props.onChange(files)
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
                        // if(self.props.autoUpload){
                            self.onChange(e.target.files)
                        // }else{
                        //     self.props.waitingList([pcls+self.state.uid])
                        // }
                    }}
                />
                <label  className={`${pcls}-xhr-label`} 
                        onClick={function(){
                            console.log('label onClick')
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