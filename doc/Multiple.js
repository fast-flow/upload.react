var React = require('react')
import UploadPicker, {UploadFile } from 'upload.react'
class Multiple extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
    render () {
    	let self = this
        return (
            <div className="multipleDemo" >
                <UploadPicker name="file" action="/upload?status=success"
                    multiple={true}
                    onPick={function (files) {
                        console.log(files)
                        /*
                        files: [
                            {
                                id: '3fiuhwufhweufgwef',
                                name: 'ashdasdasd.jpg',
                                // thumb base64 or defaultThumb
                                // defaultThumb blob
                                thumb: 'BASE64:sufihsiufh'
                                // ie8 下不存在 File
                                File: function File() {}
                            },
                        ]
                        */
                        files.forEach(function (item,index) {
                            console.log(item)
                            UploadFile({
                                id : item.id ,
                                onProgress : function (step, file) {
                                    /*
                                        // 精确的浮点数
                                        step = 30.214124
                                    */
                                    // let percent = Math.round(step.percent)
                                    console.info('上传进度',file.id,file.name, step.percent)
                                },
                                onSuccess : function (res) {
                                    if(res.status == 'success'){
                                        self.setState({
                                            id: res.data.id
                                        })
                                    }else{
                                        alert(res.msg)
                                    }
                                },
                                onError : function (err, res){
                                    console.log(err,res)
                                },
                                onXhrError: function(e) {
                                    console.log(e)
                                }
                            })
                        })
                    }}
                 >
                    <button type="button">Picker</button>
                </UploadPicker>
                <div>
                    <img src={self.state.src} alt=""/>
                    <button type="button" onClick={function () {
                            self.setState({
                                id: '',
                                src: ''
                            })
                        }} >remove</button>
                </div>
            </div>
        )
    }
}
/*ONFACE-DEL*/Multiple = require("react-hot-loader").hot(module)(Multiple)
module.exports = Multiple
