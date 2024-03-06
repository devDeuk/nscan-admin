<%@ page language="java" contentType="text/html; UTF=8" pageEncoding="UTF-8" %>

<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AjaxRestTest</title>
    <script
            src="https://code.jquery.com/jquery-1.12.4.min.js"
            integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
            crossorigin="anonymous"></script>
    <script>
        $(document).ready(function(){
            $("#listBtn").on("click", function(){
                $.get("/api/sample", function(data){
                    console.log(data);
                    alert(JSON.stringify(data));
                });
            });

            $("#readBtn").on("click", function(){
                let seq = $("#seq");
                let seqVal = seq.val();
                console.log(seqVal);
                if(seqVal === "" ){
                    alert("seq값이 없습니다.")
                    return;
                }

                $.get("/api/sample/"+seqVal, function(data){
                    console.log(data);
                    alert(JSON.stringify(data));
                });
            });

            $("#registerBtn").on("click", function(){

                let titleVal = $("#title").val();
                let contentVal = $("#content").val();
                let creNmVal = $("#creNm").val();

                if(titleVal === "" ){
                    alert("title값이 없습니다.")
                    return;
                }

                let saveObject = {
                    title : titleVal,
                    content : contentVal,
                    creNm : creNmVal
                };

                console.log(saveObject);

                $.ajax({
                    type: "POST",
                    url : "/api/sample",
                    data: saveObject,
                    dataType: "json" ,
                    success: function(result){
                        console.log("result : " +  result);
                        alert(result);
                    },
                    error:function(e){
                        alert(e);
                    }
                });
            });


            $("#deleteBtn").on("click", function(){

                let seq = $("#seq");
                let seqVal = seq.val();
                if(seqVal === "" ){
                    alert("seq값이 없습니다.")
                    return;
                }
                console.log(seqVal);
            });

            $("#modifyBtn").on("click", function(){
                let seq = $("#seq");
                let seqVal = seq.val();
                if(seqVal === "" ){
                    alert("seq값이 없습니다.")
                    return;
                }
                console.log(seqVal);
            });
        });
    </script>
</head>


<body>

<form>
    seq: <input type="text" name="seq" value="" id="seq"/><br>
    title: <input type="text" name="title" value="" id="title"/><br>
    content: <input type="text" name="content" value="" id="content"/><br>
    creNm: <input type="text" name="creNm" value="" id="creNm"/><br>

    <div>
        <button id="listBtn">List</button>
        <button id="readBtn">Read</button>
        <button id="registerBtn">Register</button>
        <button id="deleteBtn">Delete</button>
        <button id="modifyBtn">Modify</button>
    </div>

</form>

</body>
</html>