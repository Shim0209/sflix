# sflix

React를 활용한 영화정보공유 웹사이트

## Screens

- [x] Home
- [x] TV
- [x] Search
- [x] Detail

## API Verbs

- [x] Now Playing (Movie)
- [x] Upcoming (Movie)
- [x] Popular (TV, Movie)
- [x] Top Rated (TV)
- [x] Airing Today (TV)
- [x] TV Show Detail
- [x] Movie Detail
- [x] Search (TV, Movie)

## 추가항목

- [x] IMDB Link
- [x] Tabs inside of Movie / TV Details (YT Vidoes, Production Company $ Coutries)
- [x] On TV Show, show seasons and creators

## 진행상황

- 21.04.30

  프로젝트 생성, 라우트 세팅

- 21.05.01

  styled-component적용, 글로벌스타일 리셋, 네비게이션 디자인

- 21.05.03

  api key 세팅, axios instance method로 데이터 가져오기, 컨테이너와 프리젠터 생성 for 라우터, 컨테이너 기능 구현

- 21.05.04

  PropTypes 세팅, 프리젠터 기능 구현

- 21.05.05

  프리젠터 디자인, react-helmet으로 웹페이지별 title 설정

- 21.05.24

  Class구조(Container, Presenter)에서 Function구조(Hook)로 변경

  Prop-Types 업그레이드

- 21.05.25 ~ 26

  TV Detail 페이지 추가 (감독, 방송사, 시즌정보, 출시일자 등)
  
  Movie Detail 페이지 추가 (제작국가, 제작회사 등)

- 21.06.10 ~ 

  Routes 구조 개선 (Home, Detail)

  기존 index.js + useXXX.js 방식에서 하나의 파일로 통합

## Netlify 
https://condescending-varahamihira-723e51.netlify.app/