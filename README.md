# Express Best Practices

## Folder Structure

```
[root]
  📄 .gitignore
  📄 package.json/package-lock.json
    | (dotenv, express, nodemon)
  📄 README.md

  📁 config
    📄 config.env

  📁 node_modules
    📄 [...]

  📁 src
    📄 server.js
```

## src/server.js

```javascript
const app = require('express')();
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(
    `Listening on ${process.env.NODE_ENV} server at http://localhost:${PORT}`
  );
});
```

## config/config.env

```env
NODE_ENV=development
PORT=3000
```

## package.json

```json
{
  "name": "keep-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "NODE_ENV=production node src/server.js",
    "serve": "nodemon src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^9.0.2",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```
