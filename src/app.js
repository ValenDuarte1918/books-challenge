const express = require('express');
const mainRouter = require('./routes/main');
const session = require('express-session');
const cookies = require('cookie-parser');
const {check, validationResult} = require('express-validator');
const rememberUser = require('./middlewares/recordarMiddleware'); 
const userLogged = require('./middlewares/userLogged');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(cookies());
app.use(express.static('public'));
app.use(rememberUser)
app.use(userLogged);

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
