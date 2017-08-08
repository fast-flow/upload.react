var React = require('react')
var UploadPicker = require('upload.react').default
var UploadFile = require('upload.react').UploadFile

var App = React.createClass({
    getInitialState: function () {
        return {
            src: '',
            id: '',
            action:'/upload?status=success'
        }
    },
    render: function () {
        var self = this
        return (
            <div>
                {'xhr type :  '}
                <select onChange={function(e){
                            self.setState({
                                action:e.target.value
                            })
                        }}
                >
                    <option value="/upload?status=success" >xhr success</option>
                    <option value="/upload?status=error" >xhr error</option>
                    <option value="/upload?status=500" >xhr 500</option>
                    <option value="/upload?status=307" >xhr 307</option>
                    <option value="http://127.0.0.1:32954/upload?status=success" >xhr cross-domain</option>
                </select>
                <hr />
                <UploadPicker name="file"
                    action={self.state.action}
                    data={{'a':'1'}}
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
                                res = typeof res == 'string' ? JSON.parse(res) : res
                                if(res.status == 'success'){
                                    self.setState({
                                        id: res.data.id
                                    })
                                }else{
                                    console.log(res.msg)
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
                    <button type="button"
                        onClick={function () {
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
