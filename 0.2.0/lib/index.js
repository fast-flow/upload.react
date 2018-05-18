import { Component } from "react"
import classNames from "classnames";
import AjaxUpload , { uploadfile } from './ajaxUpload';
import util from 'util.react'
require('./index.css')

class UploadPicker extends Component {
    render() {
        const self = this
        const pcls = self.props.prefixClassName
        const themesClassName = util.themes(this.props)
        return (
            <div className={`${pcls} ${themesClassName}`}>
                <AjaxUpload {...self.props} />
            </div>
        )
    }
}
require('./props').default(UploadPicker)
exports.UploadFile = uploadfile
export default UploadPicker
// module.exports = UploadPicker