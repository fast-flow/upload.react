var React = require('react')
var UploadPicker = require('upload.react').default
var UploadFile = require('upload.react').UploadFile

var App = React.createClass({
    getInitialState: function () {
        return {
            src: '',
            id: ''
        }
    },
    render: function () {
        var self = this
        return (
            <div>
                <UploadPicker name="file"
                    // action="/upload?status=success"
                    // action="/upload?status=error"
                    // action="/upload?status=500"
                    // action="/upload?status=307"
                    // 跨域测试
                    action="http://localhost:32954/upload?status=success"
                    data={{'a':'1'}}
                    thumb={'http://dummyimage.com/200x200/000/fff?text=thumb'}
                    onPick={function (files) {
                        console.log(files)
                        self.setState({
                            src:files[0].thumb
                        })
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
                        UploadFile({
                            id : files[0].id ,
                            onProgress : function (step, file) {
                                /*
                                    // 精确的浮点数
                                    step = 30.214124
                                */
                                // let percent = Math.round(step.percent)
                                console.info('上传进度', step.percent)
                            },
                            onSuccess : function (res) {
                                console.log(res)
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
                    }}
                 >
                    <button type="button">Picker</button>
                </UploadPicker>
                <div>
                    <img src={self.state.src} alt="" style={{maxWidth:100+'px'}}/>
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
})
module.exports = App
