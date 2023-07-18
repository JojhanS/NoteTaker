const express = require('express');
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
