const express=require('express');
const exphbs  = require('express-handlebars');


//Initializing application
const app=express();

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//How middleware works
/*
app.use(function(req, res, next){
    //console.log(Date.now());
    req.name='Blagojce';
    next();
});
*/

//Index Route
app.get('/', (req, res)=>{
    //console.log(req.name);
    // res.send('INDEX');
    const title='Welcome';
    res.render('index', {title:title});
});

//About Route
app.get('/about', (req, res)=>{
    // res.send('ABOUT');
    res.render('about');
});

const port=5000;

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});