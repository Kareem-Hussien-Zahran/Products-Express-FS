
const express = require('express');

const app= express();


const productRouter = require('./producRouter');

// parse all request body  built in middleware to pare the request body
        app.use(express.json());  

// app.use(productRouter);
        app.use('/imgs',express.static('./uploads')) // built in middleware in express

//       sub route
app.use('/product/',productRouter);


        
  app.listen(3000, _ => console.log("server is running on port 300. http://localhost:3000"));

