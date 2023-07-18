const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
