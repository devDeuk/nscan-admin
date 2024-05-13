# Thymeleaf



## 유용한 Tip


#### 1. application.properties 값 조회
```html
<span th:text="${@environment.getProperty('app.title')}"></span>
```

#### 2. message 조회
```html
<span th:text="#{msg.example.title}"></span>
```


#### 3. 세션 정보조회
```html
<span th:text="${session['userId']}"></span>
<span th:text="${session.userId}"></span>
```

#### 4. Parameter 정보 조회
```html
<span th:text="${param.authType}"></span>
<span th:text="${#httpServletRequest.getParameter('authType')}"></span>
```

#### 5. PathVariable가져오기
```html
<span th:text="__${userId}__"></span>
```
* Spring 컨트롤러에Request Mapping에 선언되어 있고 @PathVariable이 있어야만 정보를 가져올 수 있다.

예제)
* application.properties
```properties
app.title=thymeleaf test project
```
* message.properties
```properties
msg.example.title=메시지 가져 오기 테스트
```

* 호출 url
```txt
http://localhost:8080/users/1234?authType=facebook
``` 

* controller
```java
@Controller
public class UserTestController {
    @GetMapping("/users/{userId}")
    public String getUserList(@PathVariable String userId, User pUser, HttpSession session, Model model) {
        session.setAttribute("userId", pUser.getUserId());
        
        pUser.setName("테스터");
        pUser.setAuthType("facebook");
        model.addAttribute("user", pUser);
        return "user";
    }
}
```

* html
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Thymeleaf 예제</title>
    <script th:src="@{/assets/vendor/jquery/jquery.js}"></script>
</head>
<body>
<h1>application.properties 값 조회</h1>
app title : <span th:text="${@environment.getProperty('app.title')}"></span><br/>
 
<h1>message 조회</h1>
msg.example.title : <span th:text="#{msg.example.title}"></span><br/>
 
<h1>세션 조회</h1>
session['userId'] : <span th:text="${session['userId']}"></span><br/>
session.userId : <span th:text="${session.userId}"></span><br/>
 
<h1>Parameter 가져오기 </h1>
{authType} : <span th:text="${param.authType}"></span><br/>
{authType} : <span th:text="${#httpServletRequest.getParameter('authType')}"></span><br/>
 
<h1>PathVariable 가져오기 </h1>
{userId} : <span th:text="__${userId}__"></span><br/>
 
</body>
</html>

```

* 결과
```
application.properties 값 조회
app title : thymeleaf test project

message 조회
msg.example.title : 메시지 가져 오기 테스트

세션 조회
session['userId'] : 1234
session.userId : 1234

Parameter 가져오기
{authType} : facebook
{authType} : facebook

PathVariable 가져오기
{userId} : 1234
```



#### 6. 속성 설정
```html
<input type="hidden" th:value="${question.id}" th:attr="name='quizID'" />
```

#### 7. context path
```html
   var contextpath = '[[@{/}]]';
  <img scr="@{/}/test.img">
```