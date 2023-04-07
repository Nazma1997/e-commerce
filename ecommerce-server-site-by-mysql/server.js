const express = require('express');
const cors = require("cors")
require('dotenv').config();
const app = express();
const mysql = require('mysql2');
app.use(express.json());
app.use(cors())
const port = 5000;

// Connect Db

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'nazma',
  database: 'e-commerce'

})


// post request
app.post('/create-product', (req, res) => {
  // const {productName, productQuantity, productPrice, productCategory, productImage} = req.body;

   const productName = req.body.productName;
   const productQuantity = req.body.productQuantity;
   const productPrice = req.body.productPrice;
   const productCategory = req.body.productCategory;
   const productImage = req.body.productImage


  db.query('INSERT INTO product (productName, productQuantity, productPrice, productCategory, productImage) VALUES (?,?,?,?,?)',[productName, productQuantity, productPrice, productCategory, productImage], (error, result) => {

    // console.log('result: ', result)
    if(error){
      console.log('error', error)
    }
    else{
      res.status(201).json(result)
    }
  })
})



//get request
app.get('/all-product', (req, res) => {
  db.query('SELECT * FROM product', (error, result) => {
    if(error){
      console.log(error)
    }
    else{
      res.status(200).json(result)
    }
  })
});


// update request

app.put('/update-product/:id', (req, res) => {
  const id = req.body.id;
 
  const productName = req.body.productName;
  const productQuantity = req.body.productQuantity;
  const productPrice = req.body.productPrice;
  const productCategory = req.body.productCategory;
  const productImage = req.body.productImage;


  db.query('UPDATE  product SET productName=?,productQuantity=?,productPrice=?,productCategory=?,productImage=?  WHERE id = ?', [productName,productQuantity,productPrice, productCategory,productImage,id], (error, result) => {
    if(error){
      console.log(error)
    }
    else{
      console.log(result)
      res.status(200).json(result)
    }
  });

});

// Delete product

app.delete('/delete-product/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE from product WHERE id=?', id, (error, result) => {
    if(error){
      console.log(error)
    }
    else{
      console.log(result)
      res.status(200).json(result)
    }
  })
});


// Register
app.post('/register', (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  db.query('INSERT INTO users (userName, email, password) VALUES (?,?,?)', [userName, email, password], (error, result) => {
    if(error){
      console.log(error)
    }
    else{
   
      res.status(200).json(result)
    }
  })

});

// Login

app.post('/login', (req, res) => {
  const userName = req.body.userName;
  
  const password = req.body.password;

  db.query('SELECt * FROM users WHERE userName=? AND password=?', [userName, password], (error, result) => {
    if(error){
      console.log(error)
    }
    else{
       if(result.length > 0){
        res.status(200).json({message: 'Login in Successfully', result})
       }
       else{
        res.send({massage: 'USER NOT FOUND'})
       }
      
    }
  })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
