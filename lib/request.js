function getError(option, xhr) {
    const msg = `cannot post ${option.action} ${xhr.status}'`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;
    return err;
}

function getResponse(xhr) {
    const text = xhr.responseText || xhr.response;
    // console.log('getResponse : ', text, typeof text, JSON.parse(text) )
    if (!text) {
        return text;
    }
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

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

export default function upload(option) {
    const xhr = new XMLHttpRequest();
    let pro_e ;
    if (option.onProgress && xhr.upload) {
        // console.log('option.onProgress && xhr.upload')
        xhr.upload.onprogress = function progress(e) {
           if (e.total > 0) {
                e.percent = Math.min( e.loaded / e.total * 100 , 99 ) ; //返回进度数据精确浮点数
            }
            pro_e = e
            option.onProgress(pro_e);
        };
    }

    const formData = new FormData();

    if (option.data) {
        Object.keys(option.data).map(key => {
            formData.append(key, option.data[key]);
        });
    }

    formData.append('file', option.file);

    // 请求出错时触发
    xhr.onerror = function error(e) {
        option.onXhrError(e);
    };
    // 下载结束
    xhr.onload = function onload() {
        // allow success when 2xx status
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getResponse(xhr));
        }
        pro_e.percent = 100
        option.onProgress(pro_e)
        option.onSuccess(getResponse(xhr));
    };


    xhr.open('post', option.action, true);

    /*
        Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179

        CORS标准中做了规定，默认情况下，浏览器在发送跨域请求时，不能发送任何认证信息（credentials）如:"cookies"和"HTTP authentication schemes"。
        除非xhr.withCredentials为true（xhr对象有一个属性叫withCredentials，默认值为false）
    */ 
    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    /*
        headers['X-Requested-With'] = null

        when set headers['X-Requested-With'] = null , can close default XHR header
        see https://github.com/react-component/upload/issues/33
    */
    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    for (const h in headers) {
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    xhr.send(formData);

    return {
        abort() {
            // 请求中断而不是因为错误，常常是用户取消
            xhr.abort();
        },
    };
}
