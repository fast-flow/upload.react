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
                            let exist = false
                            list.some(function(item,index){
                                if(files[key].id == item.id){
                                    list[index] = files[key]
                                    exist = true
                                    return true
                                }
                            })
                            if(!exist){
                                list.push(files[key])
                            }
                        }
                        self.setState({
                            list:list
                        })
                        files.forEach(function (item,index) {
                            console.log(item)
                            UploadFile({
                                id : item.id ,
                                onProgress : function (step, file) {
                                    /*
                                        // 精确的浮点数
                                        step = 30.214124
                                    */
                                    // let percent = Math.round(step.percent)
                                    console.info('上传进度',file.id,file.name, step.percent)
                                },
                                onSuccess : function (res) {
                                    if(res.status == 'success'){
                                        self.setState({
                                            id: res.data.id
                                        })
                                    }else{
                                        alert(res.msg)
                                    }
                                },
                                onError : function (err, res){
                                    console.log(err,res)
                                },
                                onXhrError: function(e) {
                                    console.log(e)
                                }
                            })
                        })
                    }}
                    onError={function(errFiles){
                        console.log('onError : ',errFiles)
                    }}
                    breakresume
                    multiple
                 >
                    <button type="button"
                        style={{width:'100px',height:'100px',border:'1px solid #333'}}
                    >Try choose vary vary vary large file</button>
                </UploadPicker>
                <hr />
                <div>
                    {
                        self.state.list.map(function(item,index){
                            return (
                                <img key={index} src={item.thumb} style={{width:'50px',height:'50px',border:'1px solid #ccc',marginRight:'5px'}}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
})
module.exports = App
