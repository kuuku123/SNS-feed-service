# SNS-feed-service
임도현

## 사용법

docker-compose.yml 파일만 복붙해서 docker-compose up 으로 실행하면 됩니다. mysql이 좀 늦게 뜨니 기다려야 합니다. chrome 시크릿창으로 해야합니다.

이후 localhost:3000 접속 -> facebook 로그인 -> 로그인 정보입력 -> ~~로그인창에 다시오게되는데 refresh를 해줘야함~~ -> profile로 오면 feed request 버튼을 눌러 console창에 정보가 뜨는것을 확인


### 순서 및 개선해야할 것
사용자 로그인 요청(facebook 버튼 클릭) -> 스프링의 여러 filter 중에 만든 jwtfiler를 거치지 않는다 그냥 패스 (/oauth2/** 는 permitall이기에 , 추후 로그인다 하고 /profile을 요청하거나 refresh하면 매번 거치며 확인하게 됨) 

->  authorizationRequestRepository 제일 처음 user 가 인증 요청했을 때의 정보(state와 AuthorizeRequest)를 쿠키에 저장한다. 이후 user가 proivder가 제공하는 로그인창에서 인증을 끝내면 provider에 의해 callback url 로 redirect되고 다시 돌아올때 초기인증요청과 같은지 state를 비교하고 다르면 인증이 되지 않는다(일종의 csrf token 같은 역할).

자세한 설명을 블로그에 정리함  https://tonylim.tistory.com/356

-> 그 다음에는 userInfo endpoint를 거치게 되는데 이때 access token을 얻을 수 있다. customOAuth2UserService에서 추후 feed 요청을 위해 db에 User와 함께 저장한다.

-> 인증이 완료가되어 user 쪽으로 화면이 넘어가기전에 OAuth2Au thenticationSuccessHandler 에서 넘어갈 url 과 인증이 완료된 authentication 기반으로 jwt를 만들어 쿼리 파라미터로 넘겨준다. -> react에서 local storage에 저장을 한다.

-> /oauth2/redirect?token={toekn-value} 로 가면 react 의 OAuth2Redirecthandler 로 가서 localstorage 에 받은 jwt 토큰을 저장함 -> 이후 /profile 페이지로 redirect를 해야하는데

부모 컴포넌트의 prop인 authenticated는 false이고 currentUser는 아직 안담겼다. refresh를 한번해줘서 componemntDidMount 를 트리거 시켜서 사용자 정보를 /user/me api로부터 받아와야한다. (~~수정이 필요함~~ 해당 react 버그는 수정이 완료 되었고 class에서 hook,function 으로 전환중)

-> /profile 에서 feed request 를 누르면 해당 사용자의 access token을 db에 가져와서 feed 요청을 보내고 console에 뿌려준다.


