var React = require('react')
var Upload = require('upload.react').default

    console.log(Upload)

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
                <Upload name="file" action="/upload"
                    multiple={true}
                    onChange={function (files) {
                        /*
                        files: [
                            {
                                id: '3fiuhwufhweufgwef',
                                filename: 'ashdasdasd.jpg',
                                // thumb base64 or defaultThumb
                                thumb: 'BASE64:sufihsiufh'
                                // ie8 下不存在 File
                                File: function File() {}
                            }
                        ]
                        */
                        Upload.upload(files[0].id)
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
                </Upload>
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
})
module.exports = App
