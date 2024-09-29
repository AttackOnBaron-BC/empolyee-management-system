-- Seed data for department table
INSERT INTO department (name) VALUES
('Human Resources'),
('Engineering'),
('Finance'),
('Marketing'),
('Sales');

-- Seed data for role table
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 70000, 1),
('HR Assistant', 45000, 1),
('Senior Software Engineer', 120000, 2),
('Junior Software Engineer', 80000, 2),
('Financial Analyst', 75000, 3),
('Accountant', 65000, 3),
('Marketing Manager', 85000, 4),
('Marketing Specialist', 60000, 4),
('Sales Manager', 90000, 5),
('Sales Representative', 55000, 5);

-- Seed data for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, NULL),
('Emily', 'Brown', 4, 3),
('David', 'Wilson', 5, NULL),
('Sarah', 'Taylor', 6, 5),
('James', 'Anderson', 7, NULL),
('Olivia', 'Thomas', 8, 7),
('Robert', 'Jackson', 9, NULL),
('Emma', 'White', 10, 9);

-- Add more employees with varying roles and managers
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('William', 'Harris', 4, 3),
('Sophia', 'Martin', 8, 7),
('Daniel', 'Thompson', 10, 9),
('Ava', 'Garcia', 6, 5),
('Christopher', 'Martinez', 2, 1);