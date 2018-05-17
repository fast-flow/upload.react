var React = require('react')
import UploadPicker, {UploadFile } from 'upload.react'
class MultipleStep extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			images: [
                /*
                    {
                        src: 'dshfusahf.jpg',
                        id: 'sever_id:sduihasiudhasd',
                        fileid: 'asiudjuiashfuahsf',
                        step: 40
                    },
                    {
                        src: '',
                        id: '',
                        fileid: 'asiudjuiashfuahsf',
                        step: false
                    }
                */
            ]
		}
	}
    render () {
    	let self = this
        return (
            <div className="multipleStepDemo" >
                <UploadPicker name="file" action="/upload"
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
                            UploadFile.upload(file.id)
                        })
                    }}
                    onProgress={function (step, file) {
                        step = Math.round(step)
                        var images = self.state.images
                        images.some(function (item, index) {
                            if (item.fileid === file.id) {
                                images[index].step = step
                                return true
                            }
                        })
                        self.setState({
                            images: images
                        })
                    }}
                    onUpload={function (res, file) {
                        res = JSON.parse(res)
                        var images = self.state.images
                        images.some(function (item, index) {
                            if (item.fileid === file.id) {
                                images[index].id = res.data.id
                                images[index].src = res.data.src
                                return true
                            }
                        })
                        self.setState({
                            images: images
                        })
                    }}
                 >
                    <button type="button">Picker</button>
                </UploadPicker>
                {
                    self.state.images.map(function (item) {
                        var click = function () {
                            var images = self.state.images
                            images = images.filter(function (item, index){
                                if (item.fileid === item.id) {
                                    return false
                                }
                                return true
                            })
                            self.setState({
                                images: images
                            })
                        }
                        return (
                            <div>
                                <img src={item.src} alt=""/>
                                {item.step}
                                <button type="button" onClick={click} >remove</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
/*ONFACE-DEL*/MultipleStep = require("react-hot-loader").hot(module)(MultipleStep)
module.exports = MultipleStep
