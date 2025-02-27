INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Human Resources'),
    ('Operations'),
    ('Marketing');

INSERT INTO role (title, salary, department) VALUES
    ('Software Engineer', 100000.00, 1),
    ('Lead Engineer', 120000.00, 1),
    ('Accountant', 80000.00, 2),
    ('Controller', 120000.00, 2),
    ('Legal Team Lead', 250000.00, 3),
    ('Corporate Lawyer', 200000.00, 3),
    ('Sales Lead', 100000.00, 4),
    ('Salesperson', 80000.00, 4),
    ('HR Manager', 120000.00, 5),
    ('HR Specialist', 80000.00, 5),
    ('Operations Manager', 120000.00, 6),
    ('Operations Specialist', 80000.00, 6),
    ('Marketing Manager', 120000.00, 7),
    ('Marketing Specialist', 80000.00, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 2, 1),
    ('Charlie', 'Brown', 3, NULL),
    ('David', 'White', 4, 3),
    ('Eve', 'Black', 5, NULL),
    ('Frank', 'Green', 6, 5),
    ('Grace', 'Blue', 7, NULL),
    ('Heidi', 'Yellow', 8, 7),
    ('Ivan', 'Red', 9, NULL),
    ('Jenny', 'Orange', 10, 9),
    ('Kevin', 'Purple', 11, NULL),
    ('Linda', 'Pink', 12, 11),
    ('Michael', 'Brown', 13, NULL),
    ('Nancy', 'Gray', 14, 13);