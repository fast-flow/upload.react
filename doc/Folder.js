var React = require('react')
import UploadPicker, {UploadFile } from 'upload.react'
class Folder extends React.Component {
	constructor(props){
		super(props)
		this.state = {
            list:[
                // {
                //     src: '',
                //     id: '',
                // }
            ]
		}
	}
    render () {
    	let self = this
        return (
            <div className="folderDemo" >
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
}
/*ONFACE-DEL*/Folder = require("react-hot-loader").hot(module)(Folder)
module.exports = Folder
