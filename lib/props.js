import { PropTypes } from "react"
import extend from "extend"

var example = function () {return arguments;}
function empty() {
}

var UploadPickerProps = function (component) {
    extend(true, component, {
        defaultProps: {
            prefixClassName: 'r-upload',
            wrapClassName: '',
            //  accept:'', // Attributes 'accept' is deprecated, use 'filetype'
            allow: [],
            // type:'file',
            multiple:false,
            onPick: function (files) {},
            onError: function (errFiles) {},
            thumb:'',
            themes:'default',
        },
        propTypes: {
            prefixClassName: PropTypes.string,
            wrapClassName: PropTypes.string,
            // accept: PropTypes.string,
            allow: PropTypes.array,
            size: PropTypes.number,
            // type:PropTypes.string,
            multiple:PropTypes.bool,
            onPick: PropTypes.func,
            onError: PropTypes.func,
            data: PropTypes.object, // 提交时附带数据
            headers: PropTypes.object,
            withCredentials: PropTypes.bool, // ajax upload with cookie send (default:false)
        },
        propExample: {
            allow: example(
                ['.jpg','.png','.gif']
            ),
            size: example(
                1024,
                5,
            ),
            thumb: example(
                'http://xxxxxx.jpg'
            ),
        },
        propsDesc: {
        }
    })
}

var uploadfileProps = function (component) {
    extend(true, component, {
        defaultProps: {
        },
        propTypes: {
            id: PropTypes.string ,
            onProgress: PropTypes.func ,
            onSuccess: PropTypes.func ,
            onError: PropTypes.func ,
            onXhrError: PropTypes.func ,
        },
        propExample: {
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

export { uploadfileProps }
export default UploadPickerProps