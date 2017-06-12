var React = require('react')
var UploadPicker = require('upload.react').default


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
                <UploadPicker name="file" action="/upload?status=success"
                    data={{'a':'1'}}
                    thumb={'http://dummyimage.com/200x200/000/fff?text=thumb'}
                    onPick={function (files) {
                        console.log(files)
                        self.setState({
                            src:files[0].thumb
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
