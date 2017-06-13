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
            	<h3>一次只能选择一个文件</h3>
	            {/* TODO : allow , size , onError */}
                <UploadPicker name="file" action="/upload?status=success"
                    data={{'a':'1'}}
                    thumb={'http://dummyimage.com/200x200/000/fff?text=thumb'}
                    onPick={function (files) {
                        alert('onPick : '+files[0].id)
                        /* ie下files.length == 0
                        files: [
                            {
                                id: '3fiuhwufhweufgwef',
                                name: 'ashdasdasd.jpg',
                                // thumb base64 or defaultThumb
                                // defaultThumb blob
                                thumb: 'BASE64:sufihsiufh'
                            },
                        ]
                        */
                        self.setState({
                            src:files[0].thumb
                        })

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
                            	alert('onSuccess : '+JSON.stringify(res))
                                // self.setState({
                                //     id: res.data.id
                                // })
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
            </div>
        )
    }
})
module.exports = App
