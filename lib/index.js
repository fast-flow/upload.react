import "./index.css"
import { Component } from "react"
import props from "./props"
import classNames from "classnames";
import IframeUpload , { uploadiframe } from './iframeUpload';
import AjaxUpload , { uploadfile } from './ajaxUpload';
import util from 'util.react'

class UploadPicker extends Component {
    render() {
        const self = this
        const pcls = self.props.prefixClassName
        const themesClassName = util.themes(this.props)
        return (
            <div className={`${pcls} ${themesClassName}`}>
            {
                typeof window.FormData !== 'undefined' 
                ? (<AjaxUpload {...self.props} />) 
                : (<IframeUpload {...self.props} />)
            }
            </div>
        )
    }
}
props(UploadPicker)
exports.UploadFile = typeof window.FormData !== 'undefined' ? uploadfile : uploadiframe ;
export default UploadPicker