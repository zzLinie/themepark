# Themepark Management 
[Web App Link](https://gleaming-lokum-158537.netlify.app)
## Project description 

Our themepark management web app has 3 different roles for users to manage and be apart of our themepark 

## Customers
- Customers can view details about the park, buy tickets for their next visit, and register/login an account with us to manage their tickets. 
- Customer login is required to buy tickets. 
- if you are logged in as an admin or employee you are unable to buy tickets, you must register and login as a customer

## Employee
- Our Employee dashboard requires employees login using their employee email and password. 
- Employees main role in the dashboard is to perform database operations such as create, read, update, delete (soft delete).
- The employees are able to also view more park information such as ride popularity, upcoming events, and upcoming maintenance on park rides for our technicians.   

## Admin
- Just like employees, admins are required to login using their username and password.
- Admins have access to reports of the park that are generated based on filters from the user interface.
- Admins are able to perform data entry to create, update, read, delete new employees.
- Admins are also in charge of setting park operation days.
- The park operations days require the admins to create a park day, and the weather that day will have. 
- The Admins are able to view more park details such as capacity, which is dependent on the weather type and opening/closing time (constant time).
- Admins are also able to edit the park operation days.
- The last thing admins are able to do is view the park visits and ticket availibility.

## Installation & Setup
### Prerequisites
-- Ensure node.js is installed on your system.<br>
-- MySQL server set up on your system<br>
-- A package manager like npm or yarn.<br>
## Setup steps 
1. **Fork and Clone the Repository**  
```bash 
git clone https://github.com/your-repo
```
2. **Open Project in code editor**
Navigate into the project's root folder in working directory of a code editor <br>
3. **install frontend dependencies**
```bash 
cd frontend 
npm install
```
4. **install backend dependencies**
 ```bash
cd backend
npm install
```
## Technology Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MySQL

- **Hosting**:
  - **Database**: Azure Database for MySQL
  - **Frontend**: Netlify
  - **Backend**: Render

  
## Environment Variables
Define the following environment variables in your backend `.env` file:

```plaintext
DB_HOST             # Database host

DB_USER             # Database username

DB_PASSWORD         # Database password

DB_NAME             # Database name

DB_PORT             # Database port

DB_SSL_CERT         # SSL certificate (if required by your database host)

ACCESS_TOKEN_SECRET # Secret key for generating access tokens
```

# Database design 
[Database Schema](https://drive.google.com/file/d/1kFCGiRiFf-O_fZnsMHOMbAG5TTLdTte1/view?usp=sharing)

## Scripts 
### start backend server
```npm run dev```

### start frontend server
```npm run dev```


