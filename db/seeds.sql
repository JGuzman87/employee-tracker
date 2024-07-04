INSERT INTO departments (id, name)
VALUES
(1, 'Lending'),
(2, 'Collections'),
(3, 'IT'),
(4, 'Digital Services'),
(5, 'Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('AVP', 90000.00, 1),
('Manager', 60000.00, 2),
('VP', 110000.00, 3),
('Processor', 45000.00, 4),
('Accountant', 55000.00, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jonathan', 'Taylor', 1, 1),
('Cloud', 'Strife', 2, 2),
('Barret', 'Wallace', 3, 3),
('Red', 'XIII', 4, 4),
('Jimmy', 'Neutron', 5, 5);

SELECT * 
FROM employee

