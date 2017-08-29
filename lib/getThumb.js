/**
 * priority
 * 1. create an object URL for a File, Blob, or MediaStream object
 * 2. file format configuration
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
	// 获取文件格式大类
	let fileType = 'unknown' // 文件大类
		fileType = settings.fileData.type.split('/')[0] || fileType
		console.log(fileType)

	let thumb = false

	// priority 1
	if(window.URL && fileType == 'image'){
		// 清除释放
		window.URL.revokeObjectURL(settings.fileData);
		thumb = window.URL.createObjectURL(settings.fileData) || false
		return thumb
	}

	// priority 2
	if(thumb === false){
		// 获取文件格式
		let config = extend(true,settings.defaultThumb,settings.thumbProps)
		let fileFormat = '' // 文件格式
			fileFormat = settings.fileData.name.replace(/.+\/([^\/]+)$/,'$1')
			fileFormat = fileFormat.substr(
							fileFormat.lastIndexOf(".") == -1 ? fileFormat.length : fileFormat.lastIndexOf(".")
						).substr(1).toLowerCase() || 'default'
		return config[fileType][fileFormat] || config[fileType].default
	}

	return thumb || ''

}
