import { PropTypes } from "react"
import extend from "extend"

var example = function () {return arguments;}
function empty() {
}

export default function (component) {
    extend(true, component, {
        defaultProps: {
            prefixClassName: 'r-upload',
            wrapClassName: '',
            //  accept:'', // Attributes 'accept' is deprecated, use 'filetype'
            filetype: [],
            // type:'file',
            multiple:false,
            onChange: function () {},
            thumb:'',
            themes:'default'
        },
        propTypes: {
            prefixClassName: PropTypes.string,
            wrapClassName: PropTypes.string,
            // accept: PropTypes.string,
            filetype: PropTypes.array,
            // type:PropTypes.string,
            multiple:PropTypes.bool,
            onChange: PropTypes.func,
            data: PropTypes.object, // 提交时附带数据
            headers: PropTypes.object,
            withCredentials: PropTypes.bool, // ajax upload with cookie send (default:false)
        },
        propExample: {
            filetype: example(
                [],
                ['.jpg','.png','.gif']
            ),
            thumb: example(
                'http://xxxxxx.jpg'
            )
        },
        propsDesc: {
        }
    })
}

