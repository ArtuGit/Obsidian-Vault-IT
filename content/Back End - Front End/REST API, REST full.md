### **REST API (Representational State Transfer - Application Programming Interface)**

### **1. What is REST?**

**REST (Representational State Transfer)** is an **architectural style** for designing distributed systems, primarily for web services. It was introduced by **Roy Fielding** in his doctoral dissertation in 2000. REST focuses on using simple HTTP methods and concepts for communication between client and server.

REST is not a strict protocol, but a set of principles that guide how web services should be structured. The key goal of REST is to create scalable, efficient, and loosely coupled systems.

---

### **2. Key Concepts of REST**

REST is based on a few fundamental concepts:

#### a) **Resources**

In REST, everything is considered a **resource**. A resource can be a user, an image, a product, etc. Resources are identified by **URLs (Uniform Resource Locators)**.

For example:

- `GET /users` → Retrieves a list of users.
    
- `GET /users/123` → Retrieves details for the user with ID 123.
    

Each resource is identified by a unique URL, and the state of a resource can be manipulated using standard HTTP methods.

#### b) **HTTP Methods (CRUD operations)**

REST APIs use the **standard HTTP methods** to perform operations on resources:

- **GET**: Retrieves data from the server (i.e., read operation).
    
- **POST**: Sends data to the server to create a new resource (i.e., create operation).
    
- **PUT**: Replaces an existing resource with new data (i.e., full update).
    
- **PATCH**: Partially updates an existing resource (i.e., partial update).
    
- **DELETE**: Removes a resource from the server (i.e., delete operation).
    

Each of these methods maps to the **CRUD** operations (Create, Read, Update, Delete), and in REST, these methods are applied to resources using URLs.

#### c) **Statelessness**

One of the most important principles of REST is that it is **stateless**. This means that every **request** from a client to a server must contain all the necessary information to understand and process the request. The server should not store any session information between requests.

Each request is treated as an independent transaction, and the server does not remember previous requests. This improves scalability and simplifies server design because there’s no need to maintain client session states.

---

### **3. What Makes an API RESTful?**

For an API to be considered **RESTful**, it must adhere to the following **6 guiding principles**:

#### a) **Client-Server Architecture**

- **Separation of concerns**: The client and server are separate entities. The server handles the backend logic (data storage, processing), and the client is responsible for the user interface (UI). This separation allows for scalability and flexibility.
    
- The client and server can evolve independently, as long as the communication (API) contract remains the same.
    

#### b) **Statelessness**

- Every request from a client to a server must contain all the information the server needs to process the request.
    
- The server does not store any session information between requests. It only processes each request independently.
    
- This reduces server load and complexity.
    

#### c) **Cacheability**

- Responses from the server can be explicitly marked as cacheable or non-cacheable.
    
- **Caching** helps improve performance, as responses that are cacheable do not need to be recomputed each time they are requested.
    
- However, since REST is stateless, the server should tell the client when a response can be cached and how long it’s valid.
    

#### d) **Uniform Interface**

- REST requires that the communication between client and server follows a consistent, uniform interface.
    
- This helps simplify interactions, ensuring that clients and servers are using the same conventions (e.g., standard HTTP methods and response codes).
    
- This can include:
    
    - Resource-based URLs (e.g., `/users/123`)
        
    - HTTP methods (GET, POST, PUT, PATCH, DELETE)
        
    - Status codes (e.g., `200 OK`, `404 Not Found`, `500 Internal Server Error`)
        

#### e) **Layered System**

- A REST system can be composed of several layers. The client doesn’t need to know whether it’s talking to the actual server or an intermediary (like a load balancer, caching server, etc.).
    
- Each layer is responsible for a specific task. This allows for more flexibility and scalability in system design.
    

#### f) **Code on Demand (Optional)**

- REST allows the server to send executable code (like JavaScript) to the client, which the client can execute. This is an optional feature and isn’t commonly used.
    
- It allows the server to extend or modify the client’s behavior dynamically, but this is generally less common in RESTful APIs.
    

---

### **4. REST API Structure**

A RESTful API follows a **resource-based structure**. Resources are accessed and manipulated using standard HTTP methods, and each resource is identified by a unique **URL**. Below are examples of how different HTTP methods are mapped to common CRUD operations.

#### a) **URLs (Resources)**

```sql
GET    /users          → Get all users (Read)
GET    /users/123      → Get user with ID 123 (Read)
POST   /users          → Create a new user (Create)
PUT    /users/123      → Update user 123 completely (Update)
PATCH  /users/123      → Partially update user 123 (Update)
DELETE /users/123      → Delete user 123 (Delete)

```
- `/users` is a **collection** of users (a resource).
    
- `/users/123` refers to a **specific user** with ID `123`.
    

#### b) **Status Codes**

RESTful APIs also use **HTTP status codes** to indicate the outcome of requests:

- `200 OK`: The request was successful.
    
- `201 Created`: A new resource was created (usually after a `POST` request).
    
- `204 No Content`: The request was successful, but there is no content to return (used for `DELETE` or `PUT`).
    
- `400 Bad Request`: The request was malformed or missing required parameters.
    
- `404 Not Found`: The resource was not found.
    
- `500 Internal Server Error`: An error occurred on the server.
    

---

### **5. Example of RESTful API Usage**

Let’s consider a RESTful API for managing a collection of **books** in a library:

- **GET /books** → Retrieves a list of all books.
    
- **POST /books** → Adds a new book to the library.
    
- **GET /books/1** → Retrieves the details of the book with ID `1`.
    
- **PUT /books/1** → Updates the details of the book with ID `1` (replaces the entire resource).
    
- **PATCH /books/1** → Updates part of the book with ID `1` (e.g., updating just the title).
    
- **DELETE /books/1** → Removes the book with ID `1` from the library.
    

---

### **6. Advantages of RESTful APIs**

- **Scalability**: Statelessness and a uniform interface make REST highly scalable.
    
- **Simplicity**: REST uses standard HTTP methods and status codes, which are widely known and understood.
    
- **Loose Coupling**: The client and server are independent of each other, as long as the API contract remains the same. This allows for flexibility and easier maintenance.
    

---

### **Conclusion**

In summary, a **REST API** is a simple, scalable, and stateless way of designing web services. It uses **HTTP methods** to manipulate **resources**, which are identified by **URLs**. A **RESTful API** follows these principles to create a robust, efficient web service architecture that can evolve independently, scale efficiently, and maintain consistency across various clients.