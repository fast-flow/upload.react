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
                <UploadPicker name="file"
                    action="/upload?status=success"
                    drop={true}
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
                        for(let key in files){
                            UploadFile({
                                id : files[key].id ,
                                onProgress : function (step, file) {
                                    /*
                                        // 精确的浮点数
                                        step = 30.214124
                                    */
                                    // let percent = Math.round(step.percent)
                                    console.info('上传进度', step.percent)
                                },
                                onSuccess : function (res) {
                                    console.log(res)
                                    res = typeof res == 'string' ? JSON.parse(res) : res
                                    if(res.status == 'success'){
                                        self.setState({
                                            id: res.data.id
                                        })
                                    }else{
                                        console.log(res.msg)
                                    }
                                },
                                onError : function (err, res){
                                    console.log(err,res)
                                },
                                onXhrError: function(e) {
                                    console.log(e)
                                }
                            })
                        }
                    }}
                    onError={function(errFiles){
                        console.log('onError : ',errFiles)
                    }}
                 >
                    <button type="button"
                        style={{width:'100px',height:'100px',border:'1px solid #333'}}
                    >Drag it over here</button>
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
