/**
 * priority
 * 1. create an object URL for a File, Blob, or MediaStream object 
 * 2. specific file format configuration 
 * 3. general file format configuration 
 * 
 * 
 * Assign the project to an settings.
 * @param {object} settings - xxx
 * @param {object} settings.defaultThumb - 组件默认配置
 * @param {object} settings.thumbProps - 用户设置的默认配置
 * @param {object} settings.fileData - 当前上传文件
 * 
 */

import extend from 'extend';

// TODO: 整个js整改 defaultprops props ->  extend
export default function getThumb(settings) {
	settings = settings || {}

	let thumb = false

	// priority 1
	if(window.URL){
		// 清除释放
		window.URL.revokeObjectURL(settings.fileData); 
		thumb = window.URL.createObjectURL(settings.fileData) || false
	}

	// priority 2 (specific) || priority 3 (general)
	if(thumb === false){
		// get thumbConfig by extend
		let defaultThumb = extend(true,{},settings.defaultThumb)
		let thumbProps = extend(true,{},settings.thumbProps)
		for(let key in thumbProps){
			if(typeof thumbProps[key] == 'string'){
				thumbProps[key] = {
					default:thumbProps[key]
				}
			}
		}
		let thumbConfig = extend(true,defaultThumb,thumbProps)

		// get file format
		let fileName = settings.fileData.name.replace(/.+\/([^\/]+)$/,'$1').split('.')
		if(fileName.length > 1 ){
			fileName = fileName[fileName.length - 1]
		}else{
			fileName = ''
		}

		// specific , general
		// TODO : 匹配设置thumb

	}


	return thumb || ''


	// if(thumbProps){
	// 	return thumbProps
	// }else{
	// 	let thumb = ''
	// 	// TODO	: ie和高级浏览器 name值不同
	// 	let fileTypeName = fileData.name.replace(/.+\.(.+)$/,'$1').toLowerCase()
	//     switch(fileTypeName){
	//         case 'jpg': case 'jpeg': case 'png': case 'gif': case 'bmp': case 'svg': case 'cdr': case 'pdf':
	// 		case 'tga': case 'eps': case 'dxf': case 'emf': case 'wmf': case 'pcx': case 'psd': case 'tif':
	// 			if(typeof window.URL != 'undefined'){
	// 				window.URL.revokeObjectURL(fileData); // 清除释放
	// 				thumb = window.URL.createObjectURL(fileData)
	// 			}else{
	// 				thumb = require('./images/image.png')
	// 			}
	//         break
	//         case 'rar': case 'zip': case 'cab': case 'iso': case 'jar': case '7z': case 'tar': case 'iso': case 'dmp': case 'app':
	//             thumb = require('./images/package.png')
	//         break
	// 		case 'mp3': case 'mp2': case 'aac': case 'flac': case 'midi': case 'ape': case 'ogg': case 'wav': case 'wma': case 'm4a':
	// 			thumb = require('./images/music.png')
	// 		break
	// 		case 'mp4': case 'swf': case 'fla': case 'flv': case 'mkv': case 'vob': case 'dat': case 'avi': case 'mov': case 'm4v':
	// 		case 'mpeg': case 'mpe': case 'mpg': case '3gp': case 'rmvb': case 'rm': case 'asx': case 'asf': case 'wmv':
	// 			thumb = require('./images/video.png')
	// 		break
	//         default :
	//             thumb = require('./images/file.png')
	//     }
	//     return thumb
	// }

}

