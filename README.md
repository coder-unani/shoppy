# 프로젝트 정보

- 프로젝트명: Shoppy
- 프로젝트 진행: UNANI
- 프로젝트 작업기간: 2024.03.12 ~ 2024.03.15

# 프로젝트에 사용된 기술

- 화면 : HTML, CSS, Tailwind, JavaScript, React
- DB : firebase
- oAuth 인증 : firebase
- 이미지 : Cloudinary Cloud

- React 관련 라이브러리
  ReactRouter
  ReactQuery
  Context
  Fetch

- CSS 관련 라이브러리
  Tailwind

# 프로젝트 생성

yarn create react-app .

# 추가 라이브러리 설치

yarn add react-router-dom react-icons
yarn add @tanstack/react-query
yarn add firebase
yarn add uuid

# tailwind 설정

yarn add -D tailwindcss
npx tailwindcss init

- tailwind.config.js
  변경 : content: ["./src/**/*.{js,jsx}"],

- index.css
  추가 :
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
