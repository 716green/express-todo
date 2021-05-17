const app = require('express')();
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () =>
  console.log(
    `Listening on ${process.env.NODE_ENV} server at http://localhost:${PORT}`
  )
);
