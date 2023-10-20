const express = require('express');
const app = express();

//Settings
app.set('port',process.env.port || 3000);

//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/products'));
app.use(require('./routes/categories'));
app.use(require('./routes/orders'));


app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
})
