# crud-react-app

CRUD application made with React/Node.js/MongoDB.

MERN based technology stack application.

Stuff used:

- **frontend**
  - React
  - Redux
  - Axios
  - OAuth
  - JWT
  - Toastify
  - MaterialUI v4 - styles

- **backend**
  - Express
  - Node.js

- **database**
  - MongoDB

**.env** client requirements:

- REACT_APP_GOOGLE_ID - Google API token for OAuth login

**.env** server requirements:

- PORT = 5000 - server port

- DB_CONNECTION_URL - MongoDB connection link

- JWT_SECRET - JWT secret

- JWT_EXPIRATION - JWT expiration time

**Implementation:**

- CRUD operations over:
  - post
  - user profile
- login/register
- Google login
- like/comment
- search
- pagination
- toast messages
- basic user input validation (email, password, ...)

**Users can:**

- view posts
- view individual user profile
- search posts
- login/register
- login with Google account

**Registered users can also:**

- manage account
- manage uploaded posts
- like/comment post

**Potential updates:**

- better validation

- better validation error display using redux to store errors in state

- faster image loading

- multiple image support
