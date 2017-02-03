var React = require('react')
var Upload = require('upload.react').default
var App = React.createClass({
    getInitialState: function () {
        return {
            images: [
                /*
                {
                    src: '',
                    id: '',
                    step: false
                }
                */
            ]
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
                                // ie8 下不存在 File
                                File: function File() {}
                            }
                        ]
                        */
                        files.forEach(function (file) {
                            Upload.upload(file.id)
                        })
                    }}
                    onUpload={function (res, file) {
                        res = JSON.parse(res)
                        let images = self.state.images
                        images.push({
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
