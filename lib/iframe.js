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

// TODO : 根据uid获取到dom,配置参数,触发submit
export default function upload(option) {
alert('iframeUpload')


var iframe = document.getElementById(option.pcls+"-iframe-iframe_"+option.uid);  
// config onSuccess
iframe.onload = function(){
	var win = iframe.contentWindow  ;
	var response = win.document.body.innerText ;
	console.log(response) ;
	option.onSuccess(response)
}

// config action
var form = document.getElementById(option.pcls+"-iframe-form_"+option.uid);   
form.setAttribute("action",option.action); 

// config data
for(let key in option.data){
	var input = document.createElement("input"); 
	input.setAttribute("type","text"); 
	input.setAttribute("name",key);
	input.setAttribute("value",option.data[key]);
	form.appendChild(input);
}



form.submit();


}