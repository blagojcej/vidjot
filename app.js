const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

//Initializing application
const app = express();

//Load routes
const ideas=require('./routes/ideas');
const users=require('./routes/users');

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//Method override middleware
app.use(methodOverride('_method'))

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Connect Flash middleware
app.use(flash());

//Global variables
app.use(function (req, res, next) {
    //Whathever we put in this variables we can output in our template
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    //Call next piece of middleware(s)
    next();
})

//How middleware works
/*
app.use(function(req, res, next){
    //console.log(Date.now());
    req.name='Blagojce';
    next();
});
*/

//Index Route
app.get('/', (req, res) => {
    //console.log(req.name);
    // res.send('INDEX');
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});

//About Route
app.get('/about', (req, res) => {
    // res.send('ABOUT');
    res.render('about');
});

//Use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});