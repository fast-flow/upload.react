var React = require('react')
var UploadPicker = require('upload.react').default
var UploadFile = require('upload.react').UploadFile

var App = React.createClass({
    render: function () {
        var self = this
        return (
            <div>
                <UploadPicker name="file" action="/upload?status=success"
                    allow={['.jpg']}
                    onChange={function (files,errFilesLists) {
                        console.log(files,errFilesLists)
                        /*
                        errFilesLists: [
                            {
                                name: 'ashdasdasd.jpg',
                                errmsg:'文件格式错误'
                            },
                        ]
                        */
                        if(errFilesLists.length > 0){
                        	alert(errFilesLists[0].errmsg)
                        }
                    }}
                 >
                    <button type="button">Picker</button>
                </UploadPicker>
            </div>
        )
    }
})
module.exports = App
