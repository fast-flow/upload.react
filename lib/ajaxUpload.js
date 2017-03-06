import "./index.css"
import { Component } from "react"
import props from "./props"
import classNames from "classnames"
import getUid from './uid';
import defaultRequest from './request';

class Upload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uid: getUid(),
            filesLists:{},
        }
        this.upload = this.upload.bind(this)
    }
    upload = () => {
        return 'aaaa'
    }
    ms = (action) => {
        let self = this
        let state = this.state
        switch (action.type) {
            // 选择文件
            case 'onChange':
                const files = {}
                for (let i = 0; i < action.data.length; i++) {
                    files[i] = action.data[i]
                    files[i].id = getUid()
                }
                state.filesLists = files
                self.props.onChange(state.filesLists)
            break
            // 上传
            case 'onPost':

            break
            default:
                console.log(action.type)
                console.warn(new Error("Not find action.type", action))
        }
        this.setState(state)
    }
    render() {
        const self = this
        const pcls = self.props.prefixClassName
        return (
            <div className={classNames({
                    [`${pcls}`]: true,
                    [`${self.props.className}`]: self.props.className
                })} >
                <div className={`${pcls}-cnt`}
                    onClick={function(){
                        self.refs[pcls+'-input'+self.state.uid].click();
                    }}
                >
                    {self.props.children}
                </div>
                <span ref="close" className={`${pcls}-close`} onClick={self.props.onClose} >
                    ×
                </span>
                <input  
                    ref={pcls+'-input'+self.state.uid}
                    name={self.props.name} 
                    type={self.props.type}
                    accept={self.props.accept} 
                    className={`${pcls}-input`}
                    multiple={self.props.multiple} 
                    onChange={function(e){
                        // if(self.props.autoUpload){
                            self.ms({
                                type:'onChange',
                                data:e.target.files
                            })
                        // }else{
                        //     self.props.waitingList([pcls+self.state.uid])
                        // }
                    }}
                />
            </div>
        )
    }
}
props(Upload)
export default Upload