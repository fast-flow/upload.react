export default function getThumb(thumbProps,fileData) {
	if(thumbProps){
		return thumbProps
	}else{
		let thumb = ''
	    switch(fileData.name.replace(/.+\.(.+)$/,'$1')){
	        case 'jpg': case 'jpeg': case 'png': case 'gif': case 'bmp': case 'svg':
	            window.URL.revokeObjectURL(fileData); // 清除释放
	            thumb = window.URL.createObjectURL(fileData)
	        break
	        case 'rar': case 'zip': case 'cab': case 'iso': case 'jar': case '7z': 
	            thumb = require('./images/zip.png')
	        break
	        default :
	            thumb = require('./images/file.png')
	    }
	    return thumb
	}
}