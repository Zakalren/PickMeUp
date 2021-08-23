import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import logger from 'morgan'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import passport from 'passport'
import cors from 'cors'

// passport
import './passport'

// db setup
import './db'

// routers
import indexRouter from './routes/index'
import productRouter from './routes/product'
import profileRouter from './routes/profile'
import paymentsRouter from './routes/payments'
import uploadRouter from './routes/upload'
import signRouter from './routes/sign'
import basketRouter from './routes/basket'

const app = express();

const MongoStore = connectMongo.constructor(session);
const __dirname = path.resolve();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('airforcehackathon'));
app.use(session({
  secret: 'airforcehackathon',
  resave: true,
  saveUninitialized: false,
  store: MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/profile', profileRouter);
app.use('/payments', paymentsRouter);
app.use('/upload', uploadRouter);
app.use('/sign', signRouter);
app.use('/basket', basketRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
