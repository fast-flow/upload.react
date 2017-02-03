import "./index.css"
import { Component } from "react"
import props from "./props"
import classNames from "classnames"
class Upload extends Component {
    render() {
        const self = this
        const pcls = self.props.prefixClassName
        return (
            <div className={classNames({
                    [`${pcls}`]: true,
                    [`${self.props.className}`]: self.props.className
                })} >
                <div className={`${pcls}-cnt`}>
                    {self.props.children}
                </div>
                <span ref="close" className={`${pcls}-close`} onClick={self.props.onClose} >
                    ×
                </span>
            </div>
        )
    }
}
props(Upload)
export default Upload
