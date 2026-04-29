-- Insert sample users
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', '$2b$10$hashedpassword1'),
('jane_smith', 'jane@example.com', '$2b$10$hashedpassword2'),
('bob_wilson', 'bob@example.com', '$2b$10$hashedpassword3');

-- Insert sample todos
INSERT INTO todos (user_id, title, completed) VALUES
(1, 'Complete project documentation', FALSE),
(1, 'Review pull requests', TRUE),
(2, 'Buy groceries', FALSE),
(3, 'Call dentist', FALSE);

-- Insert sample posts
INSERT INTO posts (user_id, title, content) VALUES
(1, 'Getting Started with Node.js', 'Node.js is a powerful runtime...'),
(2, 'React Best Practices', 'Here are some tips for React development...'),
(3, 'MySQL Tips and Tricks', 'Database optimization techniques...');

-- Insert sample comments
INSERT INTO comments (post_id, user_id, content) VALUES
(1, 2, 'Great article! Very helpful.'),
(1, 3, 'Thanks for sharing this.'),
(2, 1, 'I learned a lot from this post.'),
(3, 2, 'Excellent tips!');
