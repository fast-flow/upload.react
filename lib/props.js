import { PropTypes } from "react"
import extend from "extend"
export default function (component) {
    extend(true, component, {
        defaultProps: {
            name:'file',
            prefixClassName: 'r-upload',
            wrapClassName: '',
            accept:'',
            // type:'file',
            multiple:false,
            onClose: function () {},
            onChange: function () {},
        },
        propTypes: {
            name: PropTypes.string,
            prefixClassName: PropTypes.string,
            wrapClassName: PropTypes.string,
            accept: PropTypes.string,
            // type:PropTypes.string,
            multiple:PropTypes.bool,
            onClose: PropTypes.func,
            onChange: PropTypes.func,
            data: PropTypes.object, // 提交时附带数据
            headers: PropTypes.object,
            withCredentials: PropTypes.bool, // ajax upload with cookie send (default:false)
        },
        propExample: {
        },
        propsDesc: {
        }
    })
}
