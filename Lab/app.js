const express = require('express');
const mysql = require('mysql');

const port = 5000;
const host = '0.0.0.0';

const mysqlConfig = {
    host: "mysql_server",
    user: "Owen",
    password: "1234",
    database: "basededonnee"
  };

let con = null;

const app = express();

app.get('/hello', (req, res) =>{
  res.send('hello nodejs');
});

app.get('/connect', (req, res) => {
  con =  mysql.createConnection(mysqlConfig);
  con.connect((err) =>{
    if (err) throw err;
    const sql = 'CREATE TABLE Book ( Book_id INT AUTO_INCREMENT PRIMARY KEY, book_name CHAR NOT NULL, Book_time INT DEFAULT CURRENT_TIMESTAMP)  ENGINE=INNODB;';
    con.query(sql, (err, result) =>{
      if (err) throw err;
      res.send("Create table");
    });
    sql = 'INSERT INTO Book(Book_name,Book_time) VALUES("A Game of Thrones",1996)';
    con.query(sql, (err, result) =>{
      if (err) throw err;
      res.send("Add Book");
    });
    con.query('SELECT * from Book',(err,rows)=>{
      if(err){
        res.json({
          success: false,
          err
          });
      }
      else{
        res.json({
          success: true,
          rows
          });
      }
    });
  });
});


app.listen(5000, () => console.log('listining on port 5000'));