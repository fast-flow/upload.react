function getError(option, xhr) {
    const msg = `cannot post ${option.action} ${xhr.status}'`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;
    return err;
}

function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    /*console.group('getBody')
    console.log(text)
    console.log(typeof text)
    console.log(JSON.parse(text))
    console.groupEnd()*/
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
  onProgress: (event: { percent: number }): void,
  onError: (event: Error, body?: Object): void,
  onSuccess: (body: Object): void,
  data: Object,
  filename: String,
  file: File,
  action: String,
  headers: Object,
}
*/
export default function upload(option) {
    const xhr = new XMLHttpRequest();
    let pro_e ;
    if (option.onProgress && xhr.upload) {
        // console.log('option.onProgress && xhr.upload')
        xhr.upload.onprogress = function progress(e) {
           if (e.total > 0) {
                e.percent = Math.min( e.loaded / e.total * 100 , 99 ) ; //返回精确浮点数
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
        // see https://github.com/react-component/upload/issues/34
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }
        // console.log('request onload')
        pro_e.percent = 100
        option.onProgress(pro_e)
        option.onSuccess(getBody(xhr));
    };


    xhr.open('post', option.action, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    // when set headers['X-Requested-With'] = null , can close default XHR header
    // see https://github.com/react-component/upload/issues/33
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
