# Expense Tracker

A website application built with Node.js, Express, and MongoDB to view, log, and manage your expenses.

[Online Website](https://secret-plateau-05253.herokuapp.com/users/login)

Development Background Introduction [Link](http://bit.ly/2MkEubi)

<img width="1005" alt="Screen Shot 2021-01-01 at 7 51 32 PM" src="https://user-images.githubusercontent.com/67764641/103448776-3daf2700-4c6c-11eb-8028-08be55e5529f.png">


## Summary

  - [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Versioning](#versioning)
  - [Contributor](#contributor)

## Getting Started

- The user can register an account
- The user can log in by registered email 
- The user can login via Facebook with Facebook account
- The user can view all expenses, including item, date, category, and amount
- The user can view total expense amount
- The user can add an expense 
- The user can edit an expense 
- The user can delete an expense
- The user can filter expenses based on category and month

### Prerequisites

- [npm](https://www.npmjs.com/get-npm) v7.0.15
- Node.js v15.4.0
- Nodemon v2.0.6
- Mongoose v5.11.9
- Express v4.17.1
- Express Handlebars v5.2.0
- Express-Session v1.17.1
- Body-Parser v1.19.0
- Method-Override v3.0.0
- Passport v0.4.1
- Passport-Local v1.0.0
- Connect-Flash v0.1.1
- bcrypt v2.4.3

### Installing
1. Clone the repository to your local machine
```shell
$ git clone git@github.com:newush/expense-tracker.git
```
2. Install local packages
```shell
$ npm install
```
3. Run seed
```shell
$ npm run seed
```
4. Create .env file
```shell
$ touch .env
```
5. Check .env.example and Store API Key in .env file
```
FACEBOOK_ID=<YOUR_FACEBOOK_APP_ID>
FACEBOOK_SECRET=<YOUR_FACEBOOK_APP_SECRET>
```
6. Run server and project
```shell
$ npm run dev
```
7. Open your browser `http://localhost/3000`

8. User information to login

```
user: user1@example.com
password: 123
```

### Versioning
Based on Alpha Camp semester 2-3 A12 and semester 3 A3

v.1.0

### Contributor

 [newush](https://github.com/newush) 
 
