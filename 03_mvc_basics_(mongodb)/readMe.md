## Notes :

---

# 1.0  MongoDB with Mongoose

### Steps for Dealing with MongoDB (Using Mongoose)

To work with MongoDB using Mongoose, we generally follow **three main steps**:

1. **Create a Schema**  
   - Defines the structure of the data  
   - Includes fields, data types, validations, and constraints  

2. **Create a Model**  
   - Created using a schema  
   - Used to perform database operations (CRUD)  

3. **Connect with Mongoose**  
   - Establishes a connection between the Node.js application and MongoDB  

---
# 1.1  Useful MongoDB / Mongoose Commands

- `show dbs`  
  → Displays all databases

- `show collections`  
  → Displays all collections in the current database

- `use collection_name`  
  → Switches to a specific database  
  → Example: `use Youtube-app-1'

- `db.users.find({})`  
  → Fetches all documents from the `users` collection


---
# 1.2  MVC Architecture (Project Structure)

I have organized this project using the **MVC (Model–View–Controller)** architecture.  
This helps in writing **clean, scalable, and maintainable code** by separating concerns.

---

## 1. Models

- Handles database-related logic  
- Contains schemas and models  
- Responsible for interacting with MongoDB  

📁 **models/**  
Example: `User.js`, `Product.js`

### Handles:
- Data structure  
- Database queries  
- Validation at schema level  

---

## 2. Views

- Handles UI / presentation layer  
- Displays data to the user  
- Mostly used in server-side rendering (EJS, Pug, etc.)  

📁 **views/**

**Note:**  
If the frontend is built using React or another frontend framework, views are handled separately and this folder may not be used.

---

## 3. Controllers

- Handles business logic  
- Acts as a bridge between routes and models  
- Processes requests and sends responses  

📁 **controllers/**  
Example: `userController.js`

### Handles:
- Request processing  
- Calling model methods  
- Sending response (`res.json`, `res.send`)  

---

## 4. Routes

- Defines API endpoints  
- Maps HTTP requests to controller functions  

📁 **routes/**  
Example: `/api/users`, `/api/auth`

### Handles:
- URL structure  
- HTTP methods (GET, POST, PUT, DELETE)  

---

## 5. Middlewares

- Functions that run before controllers  
- Used to modify or validate requests  

📁 **middlewares/**

### Handles:
- Authentication & authorization  
- Request validation  
- Logging  
- Error handling  

---

# 1.3 Why MVC?

- Separation of concerns  
- Cleaner codebase  
- Easy debugging  
- Better scalability  
- Team-friendly structure  

---

# 1.4 Overall MVC Flow

```text
Client
  ↓
Routes
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
Database
  ↓
Response to Client
