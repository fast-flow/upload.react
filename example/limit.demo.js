var React = require('react')
var UploadPicker = require('upload.react').default
var UploadFile = require('upload.react').UploadFile

var App = React.createClass({
    render: function () {
        var self = this
        return (
            <div>
                <UploadPicker name="file" action="/upload?status=success"
                    // allow={['.jpg']}
                    // size={1024} // 单位:K
                    onError={function(errFiles){
                        console.log(errFiles)
                        /*
                        errFilesLists: [
                            {
                                file: [ Object File ],
                                errType:'TYPE'
                            },
                            {
                                file: [ Object File ],
                                errType:'SIZE'
                            },
                        ]
                        */
                    	alert(errFiles[0].errType)
                    }}
                    onPick={function (files) {
                        console.log(files)
                    }}
                 >
                    <button type="button">Picker</button>
                </UploadPicker>
            </div>
        )
    }
})
module.exports = App