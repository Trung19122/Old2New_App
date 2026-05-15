require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash   = require('connect-flash');
const app     = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.user          = req.session.user || null;
  res.locals.successMsg    = req.flash('success');
  res.locals.errorMsg      = req.flash('error');
  next();
});

app.use('/products', require('./routers/products'));
app.use('/auth',     require('./routers/auth'));

app.get('/', (req, res) => res.redirect('/products'));

app.listen(process.env.PORT, () => {
  console.log(`Server chạy tại http://localhost:${process.env.PORT}`);
});