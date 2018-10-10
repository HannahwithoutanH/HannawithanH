const express = require('express');
const server = express();




sever.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
})


module.exports = server;