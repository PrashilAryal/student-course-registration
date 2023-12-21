-- Students table
CREATE TABLE if not exists students (
  	id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT null,
    phone_number VARCHAR(255) null,
    created_date timestamp default current_timestamp,
	updated_date timestamp default current_timestamp
);

-- Courses table
CREATE TABLE if not exists courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT null,
    course_credit int null,
    instructor_name VARCHAR(255) NOT null,
    writer_name varchar(255) not null,
    course_publication VARCHAR(255) not null,
    publication_year int not null,
    created_date timestamp default current_timestamp,
	updated_date timestamp default current_timestamp,
	constraint course_instructor_year unique (course_name, instructor_name, publication_year)
);

-- Registrations table
CREATE TABLE if not exists registrations (
    id SERIAL PRIMARY KEY,
    student_id INT not null REFERENCES students(id),
    course_id INT not null REFERENCES courses(id),
    created_date timestamp default current_timestamp,
	updated_date timestamp default current_timestamp,
	CONSTRAINT student_course_registration UNIQUE (student_id, course_id)
);


-- Inserting into Students table
INSERT INTO students (first_name, last_name, phone_number) VALUES 
    ('Prashil', 'Aryal', '123-456-7890'),
    ('Ram', 'Aryal', '987-654-3210'),
    ('Shyam', 'Aryal', null),
    ('Hari', 'Aryal', '555-123-4567'),
    ('Krishna', 'Aryal', '111-222-3333');

   
 -- Inserting into Courses table
INSERT INTO courses (course_name, instructor_name, writer_name, course_publication, publication_year, course_credit) VALUES 
    ('React', 'Surya Aryal', 'Kaushal Aryal', 'Tech Publication',2002, 3),
    ('PHP', 'Rupesh Aryal', 'Ayush Aryal', 'Tech Publication', 2001, 4),
    ('Python', 'Nabin Aryal', 'Rohan Aryal', 'Tech Publication', 2000, 5),
    ('Java', 'Sandip Aryal', 'Shiva Aryal', 'Tech Publication', 2001, 3),
    ('Flutter', 'Nayan Aryal', 'Ganesh Aryal', 'Tech Publication',2002, 4);

   
-- Inserting into Registrations table
INSERT INTO registrations (student_id, course_id) VALUES 
    (1, 1),
    (2, 3),
    (3, 2),
    (4, 4),
    (5, 5);
