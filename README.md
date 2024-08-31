# Node - JSON Web Tokens (JWT)

This project will deploy a Web API to heroku: ([https://node-jwt-e444b8b27b20.herokuapp.com/](https://node-jwt-e444b8b27b20.herokuapp.com/)).

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.
- [Postman](https://www.postman.com/) installed.

## Project Setup

- [ ] clone this repository.
- [ ] move inside the project.
- [ ] type`npm i` to download dependencies.
- [ ] type `npm run migrate` to run the migrations.
- [ ] type `npm run seed` to seed the db.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds support for `JSON Web Tokens (JWT)` to the API.

## Dummy Login Info

<details>
<summary>Usernames/Passwords</summary>

```json
[
  {
    "user_id": 1,
    "username": "tom",
    "password": "1234",
    "role_name": "employee"
  },
  {
    "user_id": 2,
    "username": "jerry",
    "password": "1234",
    "role_name": "employee"
  },
  {
    "user_id": 3,
    "username": "garfield",
    "password": "1234",
    "role_name": "client"
  },
  {
    "user_id": 4,
    "username": "odie",
    "password": "1234",
    "role_name": "client"
  }
]
```

</details>

### [POST] /api/auth/register

- Register a new user
  - _username required (must be between 3 and 30 characters)_
  - _password required (must be between 5 and 200 characters)_
  - _role required (must be between 'client' or 'instructor', insructor requires auth code)_

_What you send:_

```json client
{
  "username": "SampleUser",
  "password": "1234",
  "role_name": "client"
}
```

```json employee
{
  "username": "SampleUser",
  "password": "1234",
  "role_name": "employee",
  "auth_code": "auth_employee_123"
}
```

_What you receive:_

```json
{
  "message": "Account successfully created. Please login.",
  "newUser": {
    "user_id": 15,
    "username": "SampleUser",
    "role_name": "employee"
  }
}
```

### [POST] /api/auth/login

- Login
  - _username and password required_
  - _provides a newly created token_

_What you send:_

```json
{
  "username": "SampleUser",
  "password": "1234"
}
```

_What you receive:_

```json
{
  "message": "welcome, SampleUser",
  "role": "employee",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Ik5ld1VzZXIiLCJpYXQiOjE2MjcyNjY4MDYsImV4cCI6MTYyNzM1MzIwNn0.J1dFd3ghUPYVTodsaAU3Bg2RRcmYM_1oOe-96nvLLUg"
}
```
