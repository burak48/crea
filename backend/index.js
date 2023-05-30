import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';

const productListData = JSON.parse(
  fs.readFileSync('./productListData.json', 'utf-8')
);

const productDetailData = JSON.parse(
  fs.readFileSync('./productDetailData.json', 'utf-8')
);

const app = express();
const port = 3001;

// Add middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add middleware for setting up CORS headers
app.use(cors());

const users = [
  {
    id: 1,
    username: 'user',
    password: '$2a$12$rG9czHZFac0imcj3o0OP0.2dv/sVs3MAs.lMFUQQzFpLa72wuJCZS', // Hashed password for "user123"
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
    const token = jwt.sign(
      { userId: user.id },
      'wvnpoN7UISgF0xNnyUXnkyBa-miJAGjVYMc3dOqMlQq4CPtbyVPNc5OjhIxyEsr5',
      {
        expiresIn: '1h',
      }
    );
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

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
