const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  const url = 'https://chat.openai.com'; // Base URL
  req.pipe(request(url)).pipe(res);
});

// Handle all other GET requests dynamically
app.get('*', (req, res) => {
  const url = `https://chat.openai.com${req.originalUrl}`; // Append the original URL path
  req.pipe(request(url)).pipe(res);
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
