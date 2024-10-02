const express = require('express');
const path = require('path');



const app = express()

const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const checkWorkingHours = (req, res, next) => {
    const currentDate = new Date();
    const day = currentDate.getDay(); 
    const hour = currentDate.getHours();


    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); 
      } else {
        res.status(503).send('The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
      }
    };


    app.use(checkWorkingHours);

    app.get('/', (req, res) => {
        res.render('home');
      });
      
      app.get('/services', (req, res) => {
        res.render('services');
      });
      
      app.get('/contact', (req, res) => {
        res.render('contact');
      });





app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})