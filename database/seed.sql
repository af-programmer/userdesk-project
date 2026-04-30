-- Insert sample users
INSERT INTO users (username, email, phone) VALUES
('john_doe', 'john@example.com', '123-456-7890'),
('jane_smith', 'jane@example.com', '098-765-4321'),
('bob_wilson', 'bob@example.com', '555-555-5555');

INSERT INTO passwords (user_id, password_hash) VALUES
(1, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
(2, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
(3, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

INSERT INTO todos (user_id, title, completed) VALUES
(1, 'Complete project documentation', FALSE),
(1, 'Review pull requests', TRUE),
(2, 'Buy groceries', FALSE),
(3, 'Call dentist', FALSE);

INSERT INTO posts (user_id, title, content) VALUES
(1, 'Getting Started with Node.js', 'Node.js is a powerful runtime...'),
(2, 'React Best Practices', 'Here are some tips for React development...'),
(3, 'MySQL Tips and Tricks', 'Database optimization techniques...');

INSERT INTO comments (post_id, user_id, content) VALUES
(1, 2, 'Great article! Very helpful.'),
(1, 3, 'Thanks for sharing this.'),
(2, 1, 'I learned a lot from this post.'),
(3, 2, 'Excellent tips!');
