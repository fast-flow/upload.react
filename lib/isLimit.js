import extend from 'extend'

class __isLimit{
    constructor (props) {
        this.name = props.name
        this.size = props.size
    }
	type(allowArray){
		if(Array.isArray(allowArray) && allowArray.length > 0 ){
			let fileFormat = this.name.replace(/.+(\..+)$/,'$1')
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
			if( fileSize > this.size){
				return true
			}else{
				return false
			}
		}
		return false
	}
}

function isLimit(fileData) {
	let file = extend(true,{},fileData)
	return new __isLimit(file)
}

export default isLimit