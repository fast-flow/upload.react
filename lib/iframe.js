/*
option {
  uid:String,
  pcls: String,
  data: Object,
  action: String,
  headers: Object,
  onProgress: (event: { percent: number }): void,
  onError: (event: Error, body?: Object): void,
  onXhrError: (event: Error, body?: Object): void,
  onSuccess: (body: Object): void,
}
*/

/* TODO : 根据uid获取到dom,配置参数,触发submit
	success后销毁dom,反正ie下iframe只激活一次,没测过
*/
export default function iframeRequest(option) {
alert('iframeRequest')


var iframe = document.getElementById(option.pcls+"-iframe-iframe_"+option.uid);
// config onSuccess
var MyOnLoadFn = function(){
	alert('onload');
	var win = iframe.contentWindow  ;
	var response = win.document.body.innerText ;
	alert(response) ;
	option.onSuccess(response)
};
// iframe.setAttribute("onload","MyOnLoadFn()"); 呵呵 该死的ie8居然不支持setAttribute
if (iframe.attachEvent){
	iframe.attachEvent("onload", MyOnLoadFn);
} else {
	iframe.onload = MyOnLoadFn;
}

// config action
var form = document.getElementById(option.pcls+"-iframe-form_"+option.uid);
form.setAttribute("action",option.action);

// config data
for(let key in option.data){
	var input = document.createElement("input");
	input.setAttribute("type","hidden");
	input.setAttribute("name",key);
	input.setAttribute("value",option.data[key]);
	form.appendChild(input);
};



form.submit();


}
