StoryBook is messaging app

## initial setup backend and frontend explanation
creating project using react and express
and using adminlte bootstrap admin panel and crcf cli tool
tool and wrapping code using html to jsx
## creating login and register
using formik to cantrol forms and yup for validation to create react forms
and using axios for http requests and sweetalert for user validation messages and using bcrybt on backend to encrypt passwords and jwt to authenticate user  
## protect routes and integrating chat and message components
- using jwt token to protect routest and decoding token to get user data
- creating chat and message components using socket
- creating message schema and adding routes for chat and message
and using socket to send and receive messages
## creating all routes  for messages 
adding all message routes and using jwt token to secure requests
and fetching data in chat component
## creating edit and delete messages
creating component for editing messages and updating and deleting messages in backend
## how to run the app
open terminal in the app folder
add your database in db.js file
run ``cd client && npm install && npm start``
open another terminal in the app folder
run ``cd backend && npm install && npx nodemon index.js``
credits :
https://blog.soshace.com/create-a-simple-pos-with-react-node-and-mongodb-0-initial-setup-frontend-and-backend/

https://dev.to/sirwanafifi/websocket-and-react-58an 

https://dev.to/rexeze/how-to-build-a-real-time-chat-app-with-nodejs-socketio-and-mongodb-2kho

https://blog.soshace.com/create-a-simple-pos-with-react-node-and-mongodb-1-register-and-login-with-jwt/
https://github.com/saramorell/react-message-board/tree/617f1601244285449e3b3e0773e2967e5a71e989