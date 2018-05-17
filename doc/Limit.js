var React = require('react')
import UploadPicker, {UploadFile } from 'upload.react'
class Limit extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
    render () {
    	let self = this
        return (
            <div className="limitDemo" >
                <UploadPicker name="file" action="/upload?status=success"
                    allow={['.jpg']}
                    size={1024} // 单位:K
                    onError={function(errFiles){
                        console.log(errFiles)
                        /*
                        errFilesLists: [
                            {
                                file: [ Object File ],
                                errType:'TYPE' // 文件类型错误
                            },
                            {
                                file: [ Object File ],
                                errType:'SIZE' // 文件大小错误
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
}
/*ONFACE-DEL*/Limit = require("react-hot-loader").hot(module)(Limit)
module.exports = Limit
