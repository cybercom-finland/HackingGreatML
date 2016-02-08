const express = require('express');
const path = require('path');
const app = express();

// For static files, we will return them.
app.use(express.static(path.join(__dirname, 'public')));

// For anything else, we will return index.html as is common with
// single page apps.
app.use((req, res) => {
  res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.listen(8080);
console.log('Listening in http://localhost:8080');

