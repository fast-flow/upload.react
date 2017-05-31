/*
@param 
	allowArray 允许可上传文件格式 array
	fileName 当前选择上传的文件名 string
@return 
	true || false
*/
export default function isAllow(allowArray , fileName) {
	if(Array.isArray(allowArray) && allowArray.length > 0 ){
		let fileFormat = fileName.replace(/.+(\..+)$/,'$1')
		let allow = allowArray.indexOf(fileFormat) != -1
		if(allow){
			return true
		}else{
			return false
		}
	}
	return true
}