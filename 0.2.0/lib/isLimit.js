import extend from 'extend'

class __isLimit{
    constructor (props) {
        this.file = props
    }
	type(allowArray){
		if(Array.isArray(allowArray) && allowArray.length > 0 ){
			let fileFormat = this.file.name.replace(/.+(\..+)$/,'$1')
			let allow = allowArray.indexOf(fileFormat) != -1
			if(allow){
				return false
			}else{
				return true
			}
		}
		return false
	}
	size(fileSize){
		if(typeof fileSize == 'number'){
			if( fileSize > this.file.size){
				return true
			}else{
				return false
			}
		}
		return false
	}
    isFolder(){
        // TODO : 文件夹判断方式有误 , 待修改
        // if(/\S/.test(this.file.type)){
            return false
        // }else{
        //     return true
        // }
    }
}

function isLimit(fileData) {
	let file = extend(true,{},fileData)
	return new __isLimit(file)
}

export default isLimit
