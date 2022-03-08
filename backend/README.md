# InstagramClone API

Instagram clone is an API that has the functionalities of IG

### Users can: 
Create Account \
Login \
View other users \
Upload pictures \
Follow another user \
Comment on posts 



| Methods | Routes                         | Description                    |
|---------|--------------------------------|--------------------------------|
| POST    | api/users                      | Create a user account          | 
| GET     | api/users                      | Get all users accounts         |
|         |                                |                                | 
| POST    | api/users/login                | user login                     | 
| GET     | api/users/profile              | Get user profile               | 


#### Seed Database

You can use the following commands to seed the database with some sample users and admin accounts as well as destroy all data

```
# To seed user accounts, run
npm run data:import

# To destroy the users accounts, run
npm run data:destroy
```

```
Sample User Logins:

joshua@example.com
1234abcd

jerry@example.com
1234abcd
```

### Env Variables

Create a .env file in then root and add the following:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies

```
npm install
```

### Run

```
npm run dev
```

Copyright (c) 2021 Joshua Chinwendu
