/*
 * Primary file for API
 */

"use strict";
// Dependencies
const express = require('express');
const app = express();
const url = require('url');
const bodyparser = require('body-parser');
const routeHandler = require('./routeHandler');
// const { StringDecoder } = require('string_decoder');
const port = 3000;


// REST Endpoints
// Product Endpoints
app.get('/api/product/', routeHandler.product.get);
app.post('/api/product/', routeHandler.product.post);
app.put('/api/product/', routeHandler.product.put);
app.delete('/api/product/', routeHandler.product.delete);



// Start the server, and have it listen on port 3000
app.listen(port, () => console.log(`App listening on port ${port}!`));

