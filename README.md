# react-instagram-clone2

- 인스타 웹 페이지를 기반으로 만든 클론 사이트
- nestjs-instagram-clone과 연동

> https://github.com/cdis001/nestjs-instagram-clone

## 1. 기술 스택

- react
  - 전체 프로젝트의 틀을 잡아주는 프레임워크 개념으로 사용
- redux
  - react 프로젝트에서 상태 관리를 위해 사용
- react-router
  - react 프로젝트 내에서 라우팅을 하기 위해 사용
  - BrowserRouter와 HashRouter 두 종류가 있었으나 BrowserRouter 사용
    - HashRouter는 location.key 혹은 location.state과 같은 위치 정보를 저장하지 않기에 공식문서의 조언대로 BrowserRouter 사용
- 그 외, 아이콘 관련 라이브러리들

## 2. 실행 방법

1. nestjs-instagram-clone 저장소에서 소스를 clone한다
2. nestjs-instagram-clone 프로젝트의 도커 설치 및 실행
3. nestjs-instagram-clone 프로젝트 폴더에서 npm install 명령어 실행
4. npm 설치 완료 후, npm start run 명령어 실행
5. react-instagram-clone2 저장소에서 소스를 clone한다
6. react-instagram-clone2 프로젝트 폴더에서 yarn install 명령어 실행
7. 라이브러리 설치 완료 후 yarn start 명령어 실행

## 3. 주요 기능

1. Auth

   - 로그인
   - 회원가입

2. Feed

   - 피드 추가
   - 피드 읽어오기
   - 피드 삭제

3. Follow

   - 팔로우 기능 추가
   - 팔로워들 모아서 볼 수 있는 기능 추가
   - 메인페이지에서는 팔로워들의 게시글만 볼 수 있게끔 구현

4. Comment

   - 댓글 추가
   - 댓글 삭제
   - 댓글 읽어오기

5. Like
   - 피드에 좋아요 누를 수 있는 기능 추가
   - 댓글에 좋아요 누를 수 있는 기능 추가
   - 피드에 좋아요를 누른 사람들의 수를 보여주는 기능 추가

## 4. 추가 예정 기능

- [ ] 피드 무한스크롤
- [ ] 날짜 관련 데이터 계산하는 로직 추가(n일전...)
- [ ] user page의 팔로워, 팔로우 등의 데이터 실제 데이터로 추가
- [ ] 프로필 편집 기능 추가
- [ ] 헤더에 알람기능 추가
- [ ] DM 기능 추가
