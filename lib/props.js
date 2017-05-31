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
            allow: [],
            // type:'file',
            multiple:false,
            onChange: function (files,errFilesLists) {},
            thumb:'',
            themes:'default',
        },
        propTypes: {
            prefixClassName: PropTypes.string,
            wrapClassName: PropTypes.string,
            // accept: PropTypes.string,
            allow: PropTypes.array,
            // type:PropTypes.string,
            multiple:PropTypes.bool,
            onChange: PropTypes.func,
            data: PropTypes.object, // 提交时附带数据
            headers: PropTypes.object,
            withCredentials: PropTypes.bool, // ajax upload with cookie send (default:false)
        },
        propExample: {
            allow: example(
                ['.jpg','.png','.gif']
            ),
            thumb: example(
                'http://xxxxxx.jpg'
            ),
            onProgress : example(
                function (step, file) {}
            ),
            onSuccess : example(
                function (res) {}
            ),
            onError : example(
                function (err, res){}
            ),
            onXhrError: example(
                function(e) {}
            ),
        },
        propsDesc: {
        }
    })
}

