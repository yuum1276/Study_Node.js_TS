import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'mysql2/promise';

const app = express();
const port = 3000;

// Database connection setup
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'node_ts',
};

// Create a connection pool
const pool = createConnection(dbConfig);

// Middleware to handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// User routes
app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, created_at, updated_at FROM users'
    );
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

app.get(
  '/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        'SELECT id, email, created_at, updated_at FROM users WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).send('User not found');
      }
      res.send(rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

// Post routes
app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, content, created_at, updated_at FROM posts'
    );
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

app.get(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        'SELECT id, title, content, created_at, updated_at FROM posts WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).send('Post not found');
      }
      res.send(rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
