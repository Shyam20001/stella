// const express = require('express');
// const request = require('request');

// const app = express();
// const port = process.env.PORT || 3000;

// // Handle GET requests to the root URL
// app.get('/', (req, res) => {
//   const url = 'https://www.google.co.in/webhp'; // Base URL, e.g., Google
//   req.pipe(request(url)).pipe(res);
// });

// // Handle all other GET requests dynamically
// app.get('*', (req, res) => {
//   // Adjust base URL if needed or handle other requests
//   const url = `https://www.google.co.in/webhp${req.originalUrl}`; // Forward to Google with appended paths
//   req.pipe(request({
//     url,
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//     }
//   })).pipe(res);
// });

// app.listen(port, () => {
//   console.log(`Proxy server running on port ${port}`);
// });


// const express = require('express');
// const request = require('request');
// const dns = require('dns');

// // Set Cloudflare's DNS servers
// dns.setServers(['1.1.1.1', '1.0.0.1']);

// const app = express();
// const port = process.env.PORT || 3000;

// // Handle GET requests to the root URL
// app.get('/', (req, res) => {
//   const url = 'https://chatgpt.com/'; // Base URL, e.g., Google
//   req.pipe(request(url)).pipe(res);
// });

// // Handle all other GET requests dynamically
// app.get('*', (req, res) => {
//   // Adjust base URL if needed or handle other requests
//   const url = `https://chatgpt.com/${req.originalUrl}`; // Forward to Google with appended paths
//   req.pipe(request({
//     url,
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//     }
//   })).pipe(res);
// });

// app.listen(port, () => {
//   console.log(`Proxy server running on port ${port}`);
// });


const express = require('express');
const request = require('request-promise');

const app = express();
const port = process.env.PORT || 3000;

// Handle GET requests to the root URL
app.get('/', async (req, res) => {
  const url = 'https://chatgpt.com'; // Base URL, e.g., Google
  try {
    const response = await request({
      uri: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'cf-visitor': 'https',
        'cf-connecting-ip': req.ip,
        'cf-ray': '8ae3a71369449c39',
        'cf-request-id': '01FK6P1NVGZD1ZD7DFQ0',
        'x-forwarded-for': req.ip
      },
      resolveWithFullResponse: true,
    });
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
});

// Handle all other GET requests dynamically
app.get('*', async (req, res) => {
  const url = `https://chatgpt.com${req.originalUrl}`; // Forward to Google with appended paths
  try {
    const response = await request({
      uri: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'cf-visitor': 'https',
        'cf-connecting-ip': req.ip,
        'cf-ray': '8ae3a71369449c39',
        'cf-request-id': '01FK6P1NVGZD1ZD7DFQ0',
        'x-forwarded-for': req.ip
      },
      resolveWithFullResponse: true,
    });
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
