import { PropTypes } from "react"
import extend from "extend"

var example = function () {return arguments;}
function empty() {
}

var UploadPickerProps = function (component) {
    extend(true, component, {
        defaultProps: {
            prefixClassName: 'r-upload',
            allow: [],
            // type:'file', // 默认属性不抛出
            multiple:false, // IE不支持
            onPick: function (files) {},
            onError: function (errFiles) {},
            themes:'default',
            drop:false, // ie10-不支持,默认拖拽功能关闭
            thumb:{ //缩略图默认配置
                image:{
                    default:'/images/image.png', // 通用图片文件格式缩略图
                },
                music:{
                    default:'/images/music.png', // 通用音乐文件格式缩略图
                },
                video:{
                    default:'/images/video.png', // 通用视频文件格式缩略图
                },
                package:{
                    default:'/images/package.png', // 通用压缩包文件格式缩略图
                },
                file:{
                    default:'/images/file.png' // 通用文件格式缩略图
                },
                unknown:{
                    default:'/images/unknown.png', // 通用未知文件格式缩略图
                }
            }
        },
        propTypes: {
            prefixClassName: PropTypes.string,
            themes: PropTypes.string,
            drop: PropTypes.bool,
            allow: PropTypes.array,
            size: PropTypes.number,
            // type:PropTypes.string,
            multiple:PropTypes.bool,
            onPick: PropTypes.func,
            onError: PropTypes.func,
            data: PropTypes.object, // 提交时附带数据
            headers: PropTypes.object,
            thumb: PropTypes.object, // 缩略图配置
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
                {
                    image:{
                        default:'http://xxxxxx.jpg',
                        png:'http://xxxxxx.jpg'
                    },
                    vedio:{
                        default:'http://xxxxxx.gif'
                    }
                },
                {
                    image:'http://xxxxxx.jpg'
                }
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
