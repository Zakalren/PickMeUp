# Pick Me Up!


2021년도 공군 해커톤에 참가하는 무인자동포장 시스템을 적용한 언택트 BX 픽업 체계 프로젝트 입니다.

이 레포지토리는 Express.js를 이용하여 구현한 웹 사이트 프로젝트 입니다.

아래에는 백엔드 서버에 구현되어 있는 API 및 그 사용 방법을 기술합니다.

url에 포함되어 있는 :id 는 상품이 가지고 있는 고유 아이디를 나타냅니다.

## Data (Json)

- #### Product
    > 상품 데이터입니다.

    | 인자 | 설명 | 타입 |
    | ---- | ---- | --- |
    | name     | 상품의 이름입니다.                  | String |
    | image    | 상품의 이미지가 담긴 url 주소입니다. | String |
    | price    | 상품의 가격입니다.                  | Number |
    | category | 상품의 분류입니다.                  | String |

    #### 예시

    ```json
    {
        "name": "새우깡",
        "image": "http://timg.danawa.com/prod_img/500000/951/529/img/1529951_1.jpg",
        "price": 2000
    }
    ```

- #### User
    > 사용자 데이터입니다.

    | 인자 | 설명 | 타입 |
    | ---- | ---- | --- |
    | service_number  | 군번입니다.                  | String |
    | name            | 이름입니다.                  | String |
    | affiliated_unit | 소속부대입니다.              | String |
    | rank            | 현재 계급입니다.             | String |
    | date_of_birth   | 생년월일입니다.              | Date   |
    | tel_number      | 전화번호입니다.              | String |

    ```json
    {
        "service_number": "군번",
        "name": "김굳건",
        "affiliated_unit": "대한민국 공군",
        "rank": "이등병",
        "date_of_birth": "1999-01-01",
        "tel_number": "01012345678"
    }
    ```

## Method (REST)

- #### product/list (GET)

    > 상품 리스트를 가져옵니다.
    >
    > Product 배열 형식을 반환합니다.

- #### product/:id (GET)

    > 상품의 정보를 확인합니다.
	> 
    > Product 형식을 인자로 받습니다.

- #### product/add (POST)

    > 상품을 등록합니다. 
    > 
    > Product 형식을 인자로 받습니다.


- #### product/update/:id (PUT)

    > 상품의 정보를 변경합니다.
	> 
    > Product 형식을 인자로 받습니다.


- #### product/delete/:id (DELETE)

    > 상품을 삭제합니다.

- #### user/signup (POST)

    > 신규 유저를 회원가입 시킵니다.
    >
    > User 형식에 더해 password(String)을 인자로 받습니다.

- #### user/signin (POST)

    > 유저를 로그인 시킵니다.
    >
    > User 형식에 더해 password(String)을 인자로 받습니다.

- #### user/signout (GET)

    > 유저를 로그아웃 시킵니다.

- #### user/me (GET) (Temporary)

    > 현재 로그인 정보를 확인합니다.