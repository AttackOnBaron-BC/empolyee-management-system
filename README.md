# Employee Management System
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
## Description

This command-line application allows business owners to manage their company's employee database using Node.js, Inquirer, and PostgreSQL. Users can view and manage departments, roles, and employees, making it easier to organize and plan their business.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Bonus Features](#bonus-features)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd employee-management-system
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the PostgreSQL database and update the connection details in the `.env` file.

## Usage

1. Start the application:
   ```bash
   npm run start
   ```
2. Follow the prompts to view and manage departments, roles, and employees.

## Database Schema

The database schema includes the following tables:

- **department**
  - `id`: SERIAL PRIMARY KEY
  - `name`: VARCHAR(30) UNIQUE NOT NULL

- **role**
  - `id`: SERIAL PRIMARY KEY
  - `title`: VARCHAR(30) UNIQUE NOT NULL
  - `salary`: DECIMAL NOT NULL
  - `department_id`: INTEGER NOT NULL

- **employee**
  - `id`: SERIAL PRIMARY KEY
  - `first_name`: VARCHAR(30) NOT NULL
  - `last_name`: VARCHAR(30) NOT NULL
  - `role_id`: INTEGER NOT NULL
  - `manager_id`: INTEGER

## Features

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

## Bonus Features

- Update employee managers
- View employees by manager
- View employees by department
- View the total utilized budget of a department

## Walkthrough Video

A walkthrough video demonstrating the functionality of the application can be found [here](https://app.screencastify.com/v3/watch/YmbuciqvmTpaguChuiVP).

## License

[MIT](https://choosealicense.com/licenses/mit/)
