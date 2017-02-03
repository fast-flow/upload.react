import { PropTypes } from "react"
import extend from "extend"
export default function (component) {
    extend(true, component, {
        defaultProps: {
            prefixClassName: 'r-alert',
            className: '',
            onClose: function () {}
        },
        propTypes: {
            prefixClassName: PropTypes.string,
            className: PropTypes.string,
            onClose: PropTypes.func
        }
    })
}
