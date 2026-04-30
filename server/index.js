import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usersRoutes from './routes/users.routes.js';
import todosRoutes from './routes/todos.routes.js';
import postsRoutes from './routes/posts.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import logger from './middleware/logger.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(logger);

app.use('/api/users', usersRoutes);
app.use('/api/todos', todosRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
