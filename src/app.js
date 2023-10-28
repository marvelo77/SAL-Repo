const express = require('express');
const app = express();

//Settings
app.set('port',process.env.port || 3000);

//Middlewares
app.use(express.json());

//Routes
app.use(require('./v1.0/routes/productsRoutes'));
app.use(require('./v1.0/routes/categoriesRoutes'));
app.use(require('./v1.0/routes/ordersRoutes'));


app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
})
