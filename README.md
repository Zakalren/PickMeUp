# Pick Me Up!


2021년도 공군 해커톤에 참가하는 무인자동포장 시스템을 적용한 언택트 BX 픽업 체계 프로젝트 입니다.
이 레포지토리는 Express.js를 이용하여 구현한 웹 사이트 프로젝트 입니다.


## API

백엔드 서버에 구현되어 있는 API 및 그 사용 방법을 기술합니다.
본 프로젝트의 API는 모두 REST API를 사용합니다.

> url에 포함되어 있는 :id 는 상품이 가지고 있는 고유 아이디를 나타냅니다.


#### product/:id (GET)

> 상품의 정보를 반환합니다.


#### product (POST)

> 상품을 등록합니다.

| 인자 | 설명 | 타입 |
| ---- | ---- | --- |
| name  | 상품의 이름입니다.                  | String |
| image | 상품의 이미지가 담긴 url 주소입니다.| String |
| price | 상품의 가격입니다.                  | Number |

#### 예시

```json
{
    "name": "새우깡",
    "image": "http://timg.danawa.com/prod_img/500000/951/529/img/1529951_1.jpg",
    "price": 2000
}
```


#### product/:id (PUT)

> 상품의 정보를 변경합니다.

| 인자 | 설명 | 타입 |
| ---- | ---- | --- |
| name  | 상품의 이름입니다.                  | String |
| image | 상품의 이미지가 담긴 url 주소입니다.| String |
| price | 상품의 가격입니다.                  | Number |

#### 예시

```json
{
    "name": "새우깡",
    "image": "http://timg.danawa.com/prod_img/500000/951/529/img/1529951_1.jpg",
    "price": 2000
}
```


#### product/:id (DELETE)

> 상품을 삭제합니다.