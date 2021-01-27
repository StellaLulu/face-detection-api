const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-octagonal-73852',
      user : 'postgres',
      password : '',
      database : 'face-detection'
    }
});

// Simple check of select * from a table
// db.select('*').from('users').then(data=>{
//     console.log(data);
// });

const app = express();


app.use(bodyParser.json());
app.use(cors());


/*
res = this is working
/signin: POST = success /fail
/register: POST = user
/profile/:userId: GET = user
/image: PUT user
*/

// there will be error if running... in heroku
//app.get('/', (req, res)=> { res.send(database.users)})
app.get('/', (req, res)=> { res.send('it is working!')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl',(req,res) => { image.handleApiCall(req,res)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is running');
})

