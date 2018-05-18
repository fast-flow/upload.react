/* 
option {
    action : { String } ,
    file : { File Object } ,
    data : { Object } ,
    headers : { Object } ,
    onProgress : ( ProgressEvent : { percent : float }  ) ,
    onSuccess : ( body : Object ) ,
    onError : ( Error Object ) ,  // xhr.upload.onerror
    onXhrError : ( Error Object ) , // Network error
}
*/

export default function resumeUpload(option) {
    let sum = {
        pieSize: 1024 * 1024 ,  // TODO: 以后改为用户可配置
        completeIndex: 0 ,
        pieTotal: 0 ,
        status:''
    }
    /* 
        1. find localStory saveInfo || loadInfo
        onface.upl {
            [lastModifiedPathDate || lastModifiedPath] : {
                pieSize : {Number | 1024*1024 b' } // 每片大小
                completeIndex : {Number | 0 } // 当前上传的片数序号
                pieTotal : {Number} // 总片数
                status : {string | 'init' 未开始(是否需要初始状态) 'finsh' 全部上传成功 'stop' 暂停(失败或手动暂停) 'run' 进行中 }
            }
        }
    */ 
    /*
        2. 配置代理回调事件
            onProgress
            onSuccess
            onError
            onXhrError
            abort
    */
    /*
        3. 异步轮循 xhr
    */
}

