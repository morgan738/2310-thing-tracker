const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const client = new pg.Client('postgres://localhost/thing_tracker')

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html'))); 


const init = async()=> {

  await client.connect()
  console.log("connected to database")

  const SQL = `
    DROP TABLE IF EXISTS things;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) 
    );

    CREATE TABLE things(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE,
      user_id INTEGER REFERENCES users(id)
    );
    
    INSERT INTO users (name) VALUES ('Moe');
    INSERT INTO users (name) VALUES ('Lucy');
    INSERT INTO users (name) VALUES ('John');
    INSERT INTO users (name) VALUES ('Jill');

    INSERT INTO things (name, user_id) VALUES(
      'foo',
      (SELECT id FROM users WHERE name='Moe')
    );
    INSERT INTO things (name, user_id) VALUES(
      'bar',
      (SELECT id FROM users WHERE name='Moe')
    );
    INSERT INTO things(name) VALUES ('bazz');
    INSERT INTO things(name) VALUES ('quq');

    `;

    
    await client.query(SQL)
    console.log("created and seeded db")

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
  });
};

init();
