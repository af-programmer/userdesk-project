const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRoutes = require('./routes/users.routes');
const todosRoutes = require('./routes/todos.routes');
const postsRoutes = require('./routes/posts.routes');
const commentsRoutes = require('./routes/comments.routes');
const logger = require('./middleware/logger.middleware');

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
