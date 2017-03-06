import { PropTypes } from "react"
import extend from "extend"
export default function (component) {
    extend(true, component, {
        defaultProps: {
            name:'file',
            prefixClassName: 'r-upload',
            className: '',
            accept:'',
            type:'file',
            multiple:false,
            onClose: function () {},
            onChange: function () {},
        },
        propTypes: {
            name: PropTypes.string,
            prefixClassName: PropTypes.string,
            className: PropTypes.string,
            accept: PropTypes.string,
            type:PropTypes.string,
            multiple:PropTypes.bool,
            onClose: PropTypes.func,
            onChange: PropTypes.func,
        }
    })
}
