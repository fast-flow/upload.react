import "./index.css"
import { Component } from "react"
import props from "./props"
import classNames from "classnames";
import AjaxUpload from './ajaxUpload';

class Upload extends Component {
    render() {
        const self = this
        // const pcls = self.props.prefixClassName
        return (
            <div>
            {
                typeof window.FormData !== 'undefined' ? (<AjaxUpload {...self.props} />) : null //(<IframeUpload {...props} />)
            }
            </div>
        )
    }
}
props(Upload)
export { AjaxUpload }
export default Upload
