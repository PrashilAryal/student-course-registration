# Student Course Registration System

Welcome to the Student Course Registration System, a web application designed to streamline the process of course registration. This project utilizes the following technologies:

- Frontend: React
- Backend: Node.js, Express
- Database: PostgreSQL

## Features

- Add a student.
- Add a course.
- Register a student to a course.
- Show list on courses with no students.
- Search a list of students enrolled on particular course.
- Search a list of courses that a student is enrolled on.
- Remove a student from a course.
- Simple and intuitive user interface.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Clone the Repository

```bash
git clone https://github.com/PrashilAryal/student-course-registration.git
cd student-course-registration
```

### Install Dependencies

Navigate to the client and server directories and install the required dependencies.

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

### Database Setup

1. Create a PostgreSQL database for the project.
2. Update the database configuration in `server/config/db.js`.

### Run SQL Query

Execute the following SQL query to create the necessary table in your PostgreSQL database:

Copy the query from **db.sql** file

## Project Structure

The project follows a client-server architecture.

- **client**: Contains the React frontend code.
- **server**: Houses the Node.js and Express backend code.
- **database**: Includes Postgres SQL scripts for database setup and maintenance.

## Usage

To start the development servers for both the client and server, use the following commands:

#### Client

```bash
cd client
npm start
```

#### Server

```bash
cd server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
