// TODO: 整个js整改 defaultprops props ->  extend
export default function getThumb(thumbProps,fileData) {
	if(thumbProps){
		return thumbProps
	}else{
		let thumb = ''
		// TODO	: ie和高级浏览器 name值不同
		let fileTypeName = fileData.name.replace(/.+\.(.+)$/,'$1').toLowerCase()
	    switch(fileTypeName){
	        case 'jpg': case 'jpeg': case 'png': case 'gif': case 'bmp': case 'svg': case 'cdr': case 'pdf':
			case 'tga': case 'eps': case 'dxf': case 'emf': case 'wmf': case 'pcx': case 'psd': case 'tif':
				if(typeof window.URL != 'undefined'){
					window.URL.revokeObjectURL(fileData); // 清除释放
					thumb = window.URL.createObjectURL(fileData)
				}else{
					thumb = require('./images/image.png')
				}
	        break
	        case 'rar': case 'zip': case 'cab': case 'iso': case 'jar': case '7z': case 'tar': case 'iso': case 'dmp': case 'app':
	            thumb = require('./images/package.png')
	        break
			case 'mp3': case 'mp2': case 'aac': case 'flac': case 'midi': case 'ape': case 'ogg': case 'wav': case 'wma': case 'm4a':
				thumb = require('./images/music.png')
			break
			case 'mp4': case 'swf': case 'fla': case 'flv': case 'mkv': case 'vob': case 'dat': case 'avi': case 'mov': case 'm4v':
			case 'mpeg': case 'mpe': case 'mpg': case '3gp': case 'rmvb': case 'rm': case 'asx': case 'asf': case 'wmv':
				thumb = require('./images/video.png')
			break
	        default :
	            thumb = require('./images/file.png')
	    }
	    return thumb
	}
}
