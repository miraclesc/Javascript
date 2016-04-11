<!DOCTYPE  HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>实时时间</title>
<script type="text/javascript">
 var mydate=new Date();
 var year=mydate.getFullYear();
 var month=mydate.getMonth()+1;
 var date=mydate.getDate();
 var myweekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
 var weekday=mydate.getDay();
 document.write(year+"年"+month+"月"+date+"日"+myweekday[weekday]);
 var attime;
  function clock(){
    var time=new Date();          
   var hour=time.getHours();
   if(hour<10){
       hour="0"+hour;
   }
   var min=time.getMinutes();
   if(min<10){
       min="0"+min;
   }
   var sec=time.getSeconds();
   if(sec<10){
       sec="0"+sec;
   }
   attime=hour+":"+min+":"+sec;
    document.getElementById("clock").value = attime;
  }
 attime=setInterval(clock,1000)
</script>
</head>
<body>
<form>
<input type="text" id="clock" size="10"  />
</form>
</body>
</html>
