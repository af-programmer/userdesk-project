-- Get all todos for a user
SELECT * FROM todos WHERE user_id = ?;

-- Get all posts with user info
SELECT posts.*, users.username FROM posts 
JOIN users ON posts.user_id = users.id;

-- Get all comments for a post
SELECT comments.*, users.username FROM comments 
JOIN users ON comments.user_id = users.id 
WHERE comments.post_id = ?;

-- Get user by email
SELECT * FROM users WHERE email = ?;

-- Count completed todos by user
SELECT user_id, COUNT(*) as completed_count 
FROM todos 
WHERE completed = TRUE 
GROUP BY user_id;
