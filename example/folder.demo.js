var React = require('react')
var UploadPicker = require('upload.react').default
var UploadFile = require('upload.react').UploadFile

var App = React.createClass({
    getInitialState: function () {
        return {
            list:[
                // {
                //     src: '',
                //     id: '',
                // }
            ]
        }
    },
    render: function () {
        var self = this
        return (
            <div>
                <UploadPicker 
	                name="file"
                    action="/upload?status=success"
                    onPick={function (files) {
                        console.log('onPick : ',files)
                        let list = self.state.list
                        for(let key in files){
                            list.push({
                                src:files[key].thumb,
                                id:files[key].id
                            })
                        }
                        self.setState({
                            list:list
                        })
                    }}
                    onError={function(errFiles){
                        console.log('onError : ',errFiles)
                    }}
                    multiple
                    webkitdirectory
                 >
                    <button type="button"
                        style={{width:'100px',height:'100px',border:'1px solid #333'}}
                    >try click to choose folder</button>
                </UploadPicker>
                <hr />
                <div>
                    {
                        self.state.list.map(function(item,index){
                            return (
                                <img key={index} src={item.src} style={{width:'50px',height:'50px',border:'1px solid #ccc',marginRight:'5px'}}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
})
module.exports = App
