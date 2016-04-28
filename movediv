<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<style type="text/css">
	#movediv{position: absolute; top: 0;left: 0;width: 100px;height: 200px;border:1px solid black;background-color: red;}
</style>
</head>
<body>
	<div id="movediv"></div>
	<script type="text/javascript">
		var elem=document.getElementById('movediv');
		var clientX,clientY,moving;
		var mouseDownHandler = function(event){
			event=event||window.event;
			clientX=event.clientX;
			clientY=event.clientY;
			moving=!0;
		}
		var mouseMoveHandler = function(event){
			if (!moving) return;
			event=event||window.event;
			var newClientX=event.clientX,
			newClientY=event.clientY;
			left=parseInt(elem.style.left)||0,
			top=parseInt(elem.style.top)||0;
			elem.style.left=left+(newClientX - clientX)+"px";
			elem.style.top=top+(newClientY - clientY)+"px";
			clientX=newClientX;
			clientY=newClientY;
		}
		var mouseUpHandler = function(event){
			moving=!1;
		}
		var addEvent=document.addEventListener?
		function(elem,type,listener,useCapture){
			elem.addEventListener(type,listener,useCapture);
		}:
		function(elem,type,listener,useCapture){
			elem.attachEvent("on"+type,listener);
		};
		addEvent(elem,"mousedown",mouseDownHandler);
		addEvent(elem,"mousemove",mouseMoveHandler);
		addEvent(elem,"mouseup",mouseUpHandler);
	</script>
</body>
</html>
