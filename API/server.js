const express=require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const xss = require('xss');
const cookieParser = require('cookie-parser');
const signin = require('./controllers/signin');
const profilex = require('./middleware/profilex');
const withAuth = require('./middleware/withAuth');
const query = require('./controllers/query');
const { Pool, Client } = require('pg')
const register = require('./controllers/register');
const servAcc = require('./service-accounts.json');

const db = new Client({
	user: servAcc.user,
	host: servAcc.host,
	database: servAcc.database,
	password: servAcc.password,
	port: servAcc.port
})
db.connect()
const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/api', (req,res)=>{ res.send('it is working')});
app.post('/api/signin', (req,res)=> {signin.handleSignin(req, res, db, bcrypt, xss)});
app.post('/api/queryGet', (req,res)=>{query.handleQuerySelect(req, res, db)});
app.post('/api/query', (req,res)=>{query.handleQueryUpdate(req, res, db)});
app.get('/api/logout', (req, res) => {res.clearCookie('token'); res.status(301).redirect('/');});
app.post('/api/register', (req,res)=> {register.handleRegister(req, res, db, bcrypt, xss)});
app.get('/api/profilex', withAuth, (req, res) => {profilex.handleProfile(req, res, db)});
app.get('/api/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3006
app.listen(PORT, ()=>{
	console.log(`We are on on port ${PORT}!`);
})
