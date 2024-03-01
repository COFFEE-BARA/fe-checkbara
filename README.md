# ⚛️ Checkbara FE

<br/>
<div align="center">
    
| <img width="165" alt="yugyeong" src="https://github.com/COFFEE-BARA/be-bookstore-stock/assets/72396865/90b7268d-92e5-43d1-9da8-ae48afd9e8c1"> | <img width="165" alt="dayeon" src="https://github.com/COFFEE-BARA/be-bookstore-stock/assets/72396865/f19e65e6-0856-4b6a-a355-993ce83ddcb7"> |
| :---: | :---: |
| 🐶[현유경](https://github.com/yugyeongh)🐶 | 🐤[양다연](https://github.com/dayeon1201)🐤 |

</div>

<br/>

<br/>

# 🛠 기술 스택

<div align="center">

| 역할                 | 종류                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                |
| Programming Language | ![JavaScript](https://img.shields.io/badge/javascript-blue?style=for-the-badge&logo=javascript)                                                                                             |
| Styling              | ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)                                                                           |
| State Management     | ![State Management](https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=Recoil)                                                                                                                   |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)  |
| Data Fetching        | <img  alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">                                                                                  |

</div>

<br/><br/>

# 📱 기능별 개요
### 1️⃣ 메인 페이지
<img width="250" alt="스크린샷 2024-03-01 오후 2 22 29" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/0bbe1ec9-93a0-4274-ae14-b92abec4c47c">

<br/><br/>
#### ❓what

- 챗봇, 검색, 통계 버튼 눌러 각 화면으로 연결

#### ❗️how

- `window.location.href`사용하여 각 페이지 이동

<br/><br/>

### 2️⃣ 도서 검색
<img width="250" alt="스크린샷 2024-03-01 오후 2 23 38" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/aa446852-ab56-43d6-9823-6c6b94bd8558">

<br/><br/>

#### ❓what

- 도서 제목 검색기능
    - 한 글자 입력할 때마다 쿼리 받아오도록 구현(es-ngram 적용)
    - 도서 제목, 저자, 가격, 표지 이미지 받아오기
- 각 도서마다 서점 재고, 도서관 대출 확인 연결하는 버튼 구현

#### ❗️how

1. **`useState`** 사용하여 **`curKeywords`** 와 **`searchResult`** 상태를 관리
2. **`curKeywords`** 는 현재 입력된 검색어를 저장, **`searchResult`** 는 해당 검색어로 받아온 도서 목록을 저자
3. **`useNavigate`** 훅을 사용하여 react-router-dom의 네비게이션을 수행
4. **`useEffect`** 사용하여 **`curKeywords`** 가 변경될 때마다 새로운 검색을 수행하고, 입력 필드가 변경될 때마다 상태를 업데이트
5. **`axios`** 를 사용하여 API 호출을 수행하고, **`getData`** 를 정의하여 검색 결과를 가져오기
6. **`getBookList`** 함수를 useCallback을 통해서 구현
7. **`ResultSection`** 컴포넌트에 검색 결과와 로딩 상태를 전달

<br/><br/>

### 3️⃣ AI 챗봇 추천
<img width="250" alt="스크린샷 2024-03-01 오후 2 22 32" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/20f8ea23-dce7-417d-8113-d383517798bf">
<img width="250" alt="스크린샷 2024-03-01 오후 2 22 47" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/b4ad3e9c-a6bc-484a-a7ca-0f8e16d41fe6">
<img width="250" alt="스크린샷 2024-03-01 오후 2 22 54" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/80005197-c978-4879-b24c-145e4397c596">

<br/><br/>

#### ❓what

- user가 추천받고 싶은 책을 입력하면 AI가 그에 맞는 도서를 챗봇 형식으로 표시
- 전송된 메시지를 챗봇 대화 내용에 추가하고, 챗봇으로부터 추천된 도서 목록을 받아오기
- 도서 추천 요청 시 로딩 상태를 표시하고, 도서 추천 결과를 챗봇 대화 내용에 추가
- 추천 도서 1~4순위까지
    - 1순위는 제목, 저자 받아오기
    - 2~4순위는 제목만 표기
- 1순위 도서는 상세정보, 재고, 대출 확인버튼 구현
    - 2~4순위는 제목을 누르면 각 도서 상세페이지로 연결되도록 구현

#### ❗️how

1. **`Recoil`** 을 사용하여 챗봇 대화 내용 상태관리
2. 사용자의 입력을 받아오는 input 필드를 렌더링, Enter 감지하여 메시지 전송
3. **`useState`** 로 **`userInput`** , **`loading`** , **`messages`** 상태관리
4. **`useEffect`** 로 `if (len>0&&len%2==0)`일 경우 메시지가 추가될 때 navigate로 chat 연결 & 챗봇 대화 내용을 상태로 관리하는 Recoil atom의 초기화 처리
5. 챗봇 대화 내용을 상태로 관리하기 위해 **`useRecoilState`** 사용
6. **`async/await`** 로 API 요청 보내고 응답 처리
7. **`axios`** 로 챗봇에 추천 도서 요청하기 위한 API 통신

<br/><br/>

### 4️⃣ 도서 상세페이지
<img width="250" alt="스크린샷 2024-03-01 오후 2 23 04" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/047a3c9c-8c62-49bd-9f0f-7338554156ce">

<br/><br/>

#### ❓what

- 도서 기본정보(제목, 표지, 출판사, 저자, 가격) 상단에 구현
- 스크롤시 도서 상세정보(책소개, 목차, 출판사 서평)
- 서점재고, 도서관대출, 판매처링크 연결 버튼 구현
    - 네이버도서 판매처링크로 연결

#### ❗️how

1. **`useNavigate`** 사용하여 뒤로 가기 버튼을 클릭했을 때 이전 페이지로 이동
2. **`useParams`** 사용하여 URL에서 isbn을 가져와 해당 도서의 상세 정보를 가져오기
3. **`useState`** 사용하여 도서의 상세 정보를 상태 관리하고, 해당 정보가 로드되었는지 여부 판단
4. 도서의 상세 정보를 가져오는 API 호출을 수행하는 **`getDetail`** 함수가 **`useEffect`** 내부에서 호출되어 도서 상세 정보 가져오기
5. **`axios`** 를 사용하여 도서 상세 정보를 가져오는 API 호출을 수행, ISBN을 기반으로 도서의 상세 정보를 가져오기
6. 각 버튼 클릭 시 **`navigate`** 함수를 사용하여 해당 페이지로 이동

<br/><br/>

### 6️⃣ 통계(ES Kibana) 확인
<img width="250" alt="스크린샷 2024-03-01 오후 2 23 46" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/54258d14-b535-4773-a651-b114683d3000">
<img width="250" alt="스크린샷 2024-03-01 오후 2 24 18" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/0b368018-1a42-4868-be6c-dd905886cda8">

<br/><br/>

#### ❓what

- Elasticsearch Kibana 화면 불러오기

#### ❗️how

1. **`iframe`** 을 통해 Kibana 대시보드를 포함하는 HTML 콘텐츠를 설정
2. 데이터 URL을 iframe의 소스로 설정하여 Kibana 대시보드를 표시

<br/><br/>

### 7️⃣ 서점 재고 확인
<img width="250" alt="스크린샷 2024-03-01 오후 4 48 49" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/13551832-863a-4eef-9b2a-e46767476dd9">

<br/><br/>

#### ❓what

- 사용자의 현재 위치 기반 지도 업데이트
- 교보문고, 영풍문고, 알라딘에 책 재고가 존재하면 마커 표시

#### ❗️how

1. **`getCurrentPosition`** 메소드를 사용해 getLocation 함수에서 사용자의 현재 위치를 불러오고 **`useEffect`** 를 사용해 현재 위치 변경 시 리렌더링
2. **`axios`** 을 사용해 백엔드에서 데이터를 받아오고 **`useEffect`** 를 사용해 데이터 변경 시 리렌더링
3. bookstore data인지 library data인지 path를 통해 구분하고 조건문을 사용해 필터링
4. 서점 별 다른 마커 적용을 위해 조건문 사용
5. **`window.naver.maps.Marker`** 를 통해 position 및 icon을 설정해준 뒤 **`useRef`** 배열에 저장
6. marker의 배열 변경을 감지하기 위해 **`useEffect`** hook을 사용

<br/><br/>

### 8️⃣ 도서관 대출가능여부 확인
<img width="250" alt="스크린샷 2024-03-01 오후 4 48 59" src="https://github.com/COFFEE-BARA/fe-checkbara/assets/114728629/ef7d5780-8fd5-4e2c-b483-e99c2cadecc5">

<br/><br/>

#### ❓what

- 사용자의 현재 위치 기반 지도 업데이트
- 도서관 정보 나루 API에서 제공하는 도서관의 책 재고가 존재하면 마커 표시

#### ❗️how

1. **`getCurrentPosition`** 메소드를 사용해 getLocation 함수에서 사용자의 현재 위치를 불러오고 **`useEffect`** 를 사용해 현재 위치 변경 시 리렌더링
2. **`axios`** 을 사용해 백엔드에서 데이터를 받아오고 **`useEffect`** 를 사용해 데이터 변경 시 리렌더링
3. bookstore data인지 library data인지 path를 통해 구분하고 조건문을 사용해 필터링
4. 도서관 별 다른 마커 적용을 위해 조건문 사용
5. **`window.naver.maps.Marker`** 를 통해 position 및 icon을 설정해준 뒤 **`useRef`** 배열에 저장
6. marker의 배열 변경을 감지하기 위해 **`useEffect`** hook을 사용
