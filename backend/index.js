import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import 'dotenv/config';

const productListData = JSON.parse(
  fs.readFileSync('./productListData.json', 'utf-8')
);

const productDetailData = JSON.parse(
  fs.readFileSync('./productDetailData.json', 'utf-8')
);

const app = express();
const port = process.env.PORT || 3001;

// Add middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add middleware for setting up CORS headers
app.use(cors());

const users = [
  {
    id: 1,
    username: 'user',
    password: process.env.USER_PASSWORD,
  },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the password is correct
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.USER_SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  });
});

app.get('/products', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(productListData);
});

const getProductById = (productId) => {
  return productDetailData.find((product) => product.id === productId);
};

app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const product = getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

app.post('/product/:id', (req, res) => {
  const productId = req.params.id;
  const { comment, rating } = req.body;

  const updatedProduct = saveComment(productId, comment, rating);

  res.json({
    comment: {
      id:
        updatedProduct.comments[updatedProduct.comments.length - 1].id +
        Math.floor(Math.random() * 100),
      comment,
      rating,
    },
    totalComments: updatedProduct.comments.length,
    averageRating: calculateAverageRating(updatedProduct.comments),
  });
});

function saveComment(productId, comment, rating) {
  const product = getProductById(productId);
  const newComment = {
    id: Math.floor(Math.random() * 100),
    comment,
    rating,
  };
  product.comments.push(newComment);

  // Update the totalComments and averageRating
  product.totalComments = product.comments.length;
  product.averageRating = calculateAverageRating(product.comments);

  return product;
}

function calculateAverageRating(comments) {
  if (comments.length === 0) {
    return 0;
  }

  const totalRating = comments.reduce(
    (sum, comment) => sum + comment.rating,
    0
  );
  return totalRating / comments.length;
}

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
