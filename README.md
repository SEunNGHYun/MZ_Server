# MZ_Server
<hr/>

  여기는 MZ 어플리케이션의 서버 레파지토리 입니다. <br/>
  
  [MZ_Application 레파지토리 바로가기](https://github.com/SEunNGHYun/MZ_Application)

### 🎁 프로젝트 소개
<hr/>
  사용자에 정보에 맞는 국내 청년지원 정책들을 볼 수 있는 정보 플랫폼 어플리케이션.

### 🦜 개발 이유
<hr/>
   청년들을 위한 정책들이 매년 나오고 있지만 참여도는 계속 떨어지고 있다는 것을 확인하였습니다. <br/>
   저희들은 그러한 이유가 낮은 접근성이라 생각하였고 청년들에게 높은 접근성을 가진 어플로 개발함으로 참여도를 향상 시키고자 개발을 시작하게 되었습니다.
   
### 💻 개발 기간
<hr/>
  설계 : 2022-9-5 ~ 2022-9-17  <br/>
  구현 : 2022-9-18 ~ 2022-11-7
  
### 🧳 개발 맴버
<hr/>

#### [Front]

  * **신효민** [깃허브 바로가기](https://github.com/BeanPhone)  

  * **윤승현** [깃허브 바로가기](https://github.com/SEunNGHYun) 
  
#### [Back]

  * **윤승현** [깃허브 바로가기](https://github.com/SEunNGHYun) 


### 🕹️ 개발 환경
<hr/>

      node 16.3.0
      
      npm 8.19.1 
      
      express 4.18.1
      
      mariadb 3.0.1

### 🤖 구현 기능
<hr/>

  #### * 데이터베이스 스키마
  
  <img src="https://velog.velcdn.com/images/swerty14/post/17b6868a-60fa-4ec8-b42b-4665678276ae/image.png" width="500" height="400">

  [api 문서 확인하기](https://www.notion.so/MZ-Api-7d0c499fb5d54fa2852a9b32b708a870)
    
  <hr/>
  
  #### * 회원가입    
  사용자의 나이와 같은 정보와 관심분야에 대한 정보를 입력하여 회원 가입을 함
    
  #### * 로그인 
  사용자가 가입할 때의 아이디와 패스워드를 가지고 로그인하여 어플리케이션의 홈화면으로 이동
 
  <hr/>
  
  #### * 홈화면
  사용자의 지역정보에 맞는 **청년공간** 리스트와 간단한 **네이버 뉴스**들이 보임
    
  #### * 메인화면
  사용자가 설정한 정보에 맞게 청년지원정책들을 확인 할 수 있다. <br/>
  원하는 정보를 클릭하여 상세 정보를 볼 수있고 정보를 **스크랩**하여 저장할 수 있다.
  
  <hr/>
    
  #### * 설정화면 
  사용자의 정보를 변경 할 수 있다. 
  사용자가 스크랩 해 놓은 정책들을 확인, 스크랩 취소 할 수 있다.
  
  
