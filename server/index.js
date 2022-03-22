const express = require('express');
const db = require('../db/index.js').dbConnection;
const app = express();
const port = 4000;




app.listen(port, () => {
  console.log(`Listening at Localhost: ${port}`);
});