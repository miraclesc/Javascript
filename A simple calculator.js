<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8">
  <title> A simple calculator</title>  
  <script type="text/javascript">
   function count(){
    var x=document.getElementById("txt1").value;
    var y=document.getElementById("txt2").value;
    var z=document.getElementById("select").value;
    var result;
    switch(z){
        case "+":
            result=parseInt(x) + parseInt(y);
            break;
        case "-":
            result=parseInt(x) - parseInt(y);
            break;
        case "*":
            result=parseInt(x) * parseInt(y);
            break;
        case "/":
            result=parseFloat(x) / parseFloat(y);
        
    }
    document.getElementById("calculator").value=result;

   }
  </script> 
 </head> 
 <body>
   <input type='text' id='txt1' />
   <select id='select'>
		<option value='+'>+</option>
		<option value="-">-</option>
		<option value="*">*</option>
		<option value="/">/</option>
   </select><br/> 
   <input type='text' id='txt2' /> 
   <input type='button' value=' = ' onclick="count()" /><br/> 
   <input type='text' id='calculator' />   
 </body>
</html>
