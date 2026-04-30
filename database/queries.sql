-- -- =====================
-- -- USERS
-- -- =====================

-- -- Get user by email (login)
-- SELECT * FROM users WHERE email = ?;

-- -- Get user by id
-- SELECT id, username, email FROM users WHERE id = ?;

-- -- Create new user
-- INSERT INTO users (username, email, phone) VALUES (?, ?, ?);

-- -- Save user password (after inserting user)
-- INSERT INTO passwords (user_id, password_hash) VALUES (?, ?);

-- -- Check if email already exists
-- SELECT id FROM users WHERE email = ?;

-- -- Get user password hash (for login)
-- SELECT password_hash FROM passwords WHERE user_id = ?;


-- -- =====================
-- -- TODOS
-- -- =====================

-- -- Get all todos for a user
-- SELECT * FROM todos WHERE user_id = ?;

-- -- Get todos filtered by status
-- SELECT * FROM todos WHERE user_id = ? AND completed = ?;

-- -- Create new todo
-- INSERT INTO todos (user_id, title, completed) VALUES (?, ?, FALSE);

-- -- Update todo (title or completed)
-- UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?;

-- -- Delete todo
-- DELETE FROM todos WHERE id = ? AND user_id = ?;

-- -- Count completed todos by user
-- SELECT user_id, COUNT(*) as completed_count 
-- FROM todos WHERE completed = TRUE GROUP BY user_id;


-- -- =====================
-- -- POSTS
-- -- =====================

-- -- Get all posts with user info
-- SELECT posts.*, users.username FROM posts 
-- JOIN users ON posts.user_id = users.id;

-- -- Get single post with user info
-- SELECT posts.*, users.username FROM posts 
-- JOIN users ON posts.user_id = users.id 
-- WHERE posts.id = ?;

-- -- Get posts by user
-- SELECT * FROM posts WHERE user_id = ?;

-- -- Search posts by content/title
-- SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?;

-- -- Get posts with comment count
-- SELECT posts.*, users.username, COUNT(comments.id) as comment_count 
-- FROM posts 
-- JOIN users ON posts.user_id = users.id 
-- LEFT JOIN comments ON comments.post_id = posts.id 
-- GROUP BY posts.id;

-- -- Create new post
-- INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?);

-- -- Update post
-- UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?;

-- -- Delete post
-- DELETE FROM posts WHERE id = ? AND user_id = ?;


-- -- =====================
-- -- COMMENTS
-- -- =====================

-- -- Get all comments for a post
-- SELECT comments.*, users.username FROM comments 
-- JOIN users ON comments.user_id = users.id 
-- WHERE comments.post_id = ?;

-- -- Create new comment
-- INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?);

-- -- Delete comment
-- DELETE FROM comments WHERE id = ? AND user_id = ?;
