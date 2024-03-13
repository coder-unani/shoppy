# 프로젝트 생성

yarn create react-app .

# 추가 라이브러리 설치

yarn add react-router-dom react-icons
yarn add -D tailwindcss
npx tailwindcss init
yarn add firebase

- tailwind.config.js
  변경 : content: ["./src/**/*.{js,jsx}"],

- index.css
  추가 :
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
