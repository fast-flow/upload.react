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
                    // onPick={function (files) {
                    //     console.log(files)
                    //     self.setState({
                    //         src:files[0].thumb
                    //     })

                    // }}
                    onStart={function(file) {
					    console.log('onStart', file, file.name);
					}}
					onSuccess={function(ret) {
					    console.log('onSuccess', ret);
					}}
					onError={function(err) {
					    console.log('onError', err);
					}}
					beforeUpload={function(file, fileList) {
					    console.log(file, fileList);
					    return new Promise((resolve) => {
						    console.log('start check');
						    setTimeout(() => {
						        console.log('check finshed');
						        resolve(file);
						    }, 3000);
					    });
					}}
                 >
                    <button type="button">Picker</button>
                </UploadPicker>
            </div>
        )
    }
})
module.exports = App
