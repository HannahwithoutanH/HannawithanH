const express = require('express');
require('dotenv').config();
const { Pool } = require('pg')
const app = express();

// pools will use environment variables
// for connection information

// Use a pool if you have or expect to have multiple concurrent requests. It is there to provide a pool of 
// re-usable open client instances (reduces latency whenever a client can be reused). You definitely do 
// not want to call pool.end() when your query completes, you want to reserve that for when your application 
// terminates because pool.end() disposes of all the open client instances.
const pool = new Pool(process.env.POSTGRES_URI);

pool.connect(err => {
  if (err) return console.error('Could not connect to postgres', err);
  else {
    pool.query('SELECT NOW() AS "theTime"', (err, result) => {
      if (err) return console.error('error running query', err);
      console.log(result.rows[0].theTime);
      // client.end();
    });
  }
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
})