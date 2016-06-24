//post方法发送文本字符串给服务器并忽略反应
		function postMessage(msg) {
			var request = new XMLHttpRequest();
			request.open("POST","/XX.php");
			request.setRequestHeader("Content-Type","text/plain;charset=UTF-8");//请求主体是纯文本
			request.send(msg); //msg作为请求主体并发送
			//请求完成，忽略响应和错误
		}

		//监听readystatechange事件
		function getText(url, callback) {
			var request = new XMLHttpRequest();
			request.open("GET","url");
			request.onreadystatechange = function() {
				if (request.readyState === 4 && request.status === 200) {  //响应完成，请求成功
					var type = request.getRequestHeader("Content-Type");
					if (type.match(/^text/)) callback(request.responseText); //把响应纯文本传递给回调函数
				}
			};
			request.send(null);
		}

		//解析HTTP响应
		function get(url, callback) {
			var request = new XMLHttpRequest();
			request.open("GET","url");
			request.onreadystatechange = function() {
				if (request.readyState === 4 && request.status === 200) {
					var type = request.getRequestHeader("Content-Type");
					if (type.indexOf("xml") !== -1 && request.responseXML) //检测类型
						callback(request.responseXML);
					else if(type = "application/json")
						callback(JSON.parse(request.responseText)); //JSON响应
					else callback(request.responseText); //字符串响应
				}
			}
			request.send(null);
		}

		//HTTP请求编码对象
		function encodeFormData(data){
			if (!data) return "";
			var pairs = [];
			for(var name in data){
				if (!data.hasOwnProperty(name)) continue; //跳过继承属性
				if (typeof data[name] === "function") continue; //跳过方法
				var value = data[name].toString();
				name = encodeURIComponent(name.replace("%20","+")); //编码名字
				value = encodeURIComponent(value.replace("%20","+")); //编码值
				pairs.push(name + "=" + value);
			}
			return pairs.join("&");
		}

		//使用表单编码数据发起一个HTTP POST请求
		function postData(url, data, callback){
			var request = new XMLHttpRequest();
			request.open("POST","url");
			request.onreadystatechange = function(){
				if(request.readyState === 4 && callback) callback(request); //响应完成调用回调函数
			}
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.send(encodeFormData(data));  //发送表单编码的数据
		}

		//使用表单编码数据发起一个HTTP GET请求 只读查询GET更合适
		function getData(url, data, callback){
			var request = new XMLHttpRequest();
			request.open = open("GET", url + "?" + encodeFormData(data)); //获取指定的URL
			request.onreadystatechange = function(){
				if(request.readyState === 4 && callback) callback(request); 
			};
			request(null);
		}

		//使用JSON编码主体来发起HTTP POST请求
		function postJSON(url, data, callback){
			var request = new XMLHttpRequest();
			request.open("POST","url");
			request.onreadystatechange = function(){
				if (request.readyState === 4 && callback) callback(request);
			};
			request.setRequestHeader("Content-Type","application/json");
			request.send(JSON.stringify(data));
		}

		//HTTP POST 上传文件
		whenReady(function(){
			var elts = document.getElementsByTagName('input');
			for(var i= 0; i < elts.length; i++){
				var input = elts[i];
				if (input.type !== "file") continue;
				var url = input.getAttribute("data-uploadto"); //获取上传url
				if (!url) continue;
				input.addEventListener("change",function(){
					var file = this.file[0];
					if (!file) return;
					var xhr = new XMLHttpRequest();
					xhr.open("POST",url);
					xhr.send(file);
				},false);
			}
		});

		//表单同时包含文件上传元素和其他元素时，使用“multipart/form-data”的特殊Content-Type来用post方法提交表单
		function postFormData(url, data, callback) {
			if (typeof FormDta === "undefined") throw new Error("FormDta is not implemented");
			var request = new XMLHttpRequest();
			request.open("POST"，"url");
			request.onreadystatechange = function(){
				if (request.readyState === 4 && callback) callback(request);
			};
			var formdata = new FormData();
			for(var name in data){
				if(!data.hasOwnProperty(name)) continue;
				var value = data[name];
				if (typeof value === "function") continue;
				formdata.append(name, value);
			}
			request.send(formdata);
		}

		//监控HTTP上传进度
		whenReady(function() {
			var elts = document.getElementsByClssName('fileDropTarget');
			for(var i = 0; i<elts.length; i++){
				var target = elts[i];
				var url = target.getAttribute("data-uploadto");
				if(!url) continue;
				createFileUploadDropTarget(target, url);
			}
			function createFileUploadDropTarget(target, url) {
				var uploading = false;
				target.ondragenter = function(e){
					if(uploading) return;
					var types = e.dataTransfer.types;
					if (types && ((types.contains && types.contains("Files"))||(types.indexOf && types.indexOf("Files") !== -1))) {
						target.classList.add("wantdrop");
						return false;
					}
				};
				target.ondragover = function(e){
					if (!uploading) return false;
				};
				target.ondragleave = function(e){
					if (!uploading) target.classList.remove("wantdrop");
				};
				target.ondrop = function(e){
					if (uploading) return false;
					var files = e.dataTransfer.files;
					if (files && files.length) {
						uploading = true;
						var message = "Uploading files:<ul>";
						for(var i = 0; i < files.length; i++) message += "<li>" + files[i].name + "<li>";
						message += "</ul>";

						target.innerHTML = message;
						target.classList.remove("wantdrop");
						target.classList.add("uploading");

						var xhr = new XMLHttpRequest();
						xhr.open("POST",url);
						var body = new FormData();
						for(var i = 0; i<files.length; i++) body.append(i, files[i]);
						xhr.upload.onprogress = function(e){
							if (e.lengthComputable) {
								target.innerHTML = message + Math.round(e.loaded/e.total*100) + "% Complete";
							}
						};
						xhr.upload.onload = function(e){
							uploading = false;
							target.classList.remove("uploading");
							target.innerHTML = "Drop files to upload";
						};
						xhr.send(body);
						return false;
					}
					target.classList.remove("wantdrop");
				}
			}
		});

		//实现超时
		function timedGetText(url, timeout, callback){
			var request = new XMLHttpRequest();
			var timedout = false;
			var timer = setTimeout(function(){
				timedout = true;
				request.abort();
			},timeout);
			request.open("GET",url);
			request.onreadystatechange = function(){
				if (request.readyState !==4) return;
				if (timedout) return;
				clearTimeout(timer);
				if (request.status === 200) callback(request.responseText);
			};
			request.send(null);
		}

		//使用HEAD和CORS请求链接详细信息
		whenReady(function(){
			//是否有机会使用跨域请求？
			var supportsCORS = (new XMLHttpRequest()).withCredentials !== undefined;
			var links = document.getElementsByTagName('a');//遍历所有链接
			for(var i = 0; i<links.length; i++){
				var link = links[i];
				if(!link.href) continue;
				if(link.title) continue;
				if (link.host !== location.host || link.protocol !== location.protocol) {
					link.title = "站外链接"；
					if (!supportsCORS) continue;
				}
				if(link.addEventListener)
					link.addEventListener("mouseover",mouseoverHandler,false);
				else link.attachEvent("onmouseover",mouseoverHandler);
			}
			function mouseoverHander(e){
				var link = e.target || e.srcElement;
				var url = link.href;
				var req = new XMLHttpRequest();
				req.open("HEAD",url); //仅仅询问头信息
				req.onreadystatechange = function() {
					if (req.readyState !== 4) return;
					if (req.status === 200) {
						var type = req.getResponseHeader("Content-Type"); //获取链接详细信息
						var size = req.getResponseHeader("Content-Length");
						var date = req.getResponseHeader("Last-Modified");
						link.title = "类型：" + type + "\n" + "大小：" + size + "\n" + "时间：" + date;
					}
					else{
						if (!link.title) link.title = "Couldn't fetch details :\n" + req.status + " " + req.statusText;
					}
				};
				req.send(null);
				if(link.removeEventListener) link.removeEventListener("mouseover",mouseoverHandler,false);
				else link.detachEvent("onmouseover",mouseoverHandler);
			}
		});
