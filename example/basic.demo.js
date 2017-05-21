var React = require('react')
var UploadPicker = require('upload.react').default
var UploadFile = require('upload.react').UploadFile
// import UploadPicker , { UploadFile } from 'upload.react'

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
                {/*
                    onChange 默认就是 Upload.upload(files[0].id)
                */}
                <UploadPicker name="file" action="/upload"
                    multiple={true}
                    onChange={function (files) {
                        console.group('UploadPicker onChange')
                        console.log(files)
                        console.groupEnd()
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
                            }
                        ]
                        */
                        UploadFile({
                            id : files[0].id ,
                            onProgress : function (step, file) {
                                /*
                                    // 精确的浮点数
                                    step = 30.214124
                                */
                                step = Math.round(step)
                                console.info('上传进度', step)
                            },
                            onUpload : function (res) {
                                res = JSON.parse(res)
                                self.setState({
                                    src: res.data.src,
                                    id: res.data.id
                                })
                            }
                        })
                    }}
                    onProgress={function (step, file) {
                        /*
                            // 精确的浮点数
                            step = 30.214124
                        */
                        step = Math.round(step)
                        console.info('上传进度', step)
                    }}
                    onUpload={function (res) {
                        res = JSON.parse(res)
                        self.setState({
                            src: res.data.src,
                            id: res.data.id
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
