**GraphQL Federation** is an architectural pattern for building a **unified GraphQL API** that spans **multiple backend services**, each responsible for a part of the overall graph. It's part of **Apollo Federation**, created by Apollo to support **distributed GraphQL** systems.

---

### 🧩 Problem It Solves

In large organizations, backend functionality is often split across **microservices**. While GraphQL makes consuming data easy for frontend developers, managing a **single monolithic GraphQL schema** can become unwieldy. GraphQL Federation allows you to split that schema into **modular, composable services** called **subgraphs**.

---

### 🔧 How It Works

#### 1. **Subgraphs (Microservices)**

Each service owns part of the overall schema and implements it independently. These are called **subgraphs**.

Example (User Service):

graphql

CopyEdit

`type User @key(fields: "id") {   id: ID!   name: String }`

The `@key` directive tells the system that the `id` field is the unique identifier used to **reference** this type across services.

#### 2. **Gateway**

The **Apollo Gateway** composes these subgraphs into a **single unified schema** and serves it to clients.

The Gateway does not contain any business logic—it just:

- Fetches the schema from each subgraph
    
- Merges them into a supergraph
    
- Delegates client queries to the appropriate subgraph(s)
    

#### 3. **Entities and Resolvers**

Federation introduces the concept of **entities**, which are types that can be extended across services.

Example (Reviews Service extending `User`):

graphql

CopyEdit

`extend type User @key(fields: "id") {   id: ID! @external   reviews: [Review] }`

Here, the `@external` directive means that `id` is defined in another service (the User service).

---

### 📦 Key Features

|Feature|Description|
|---|---|
|`@key`|Declares a unique identifier for an entity|
|`@external`|Marks a field defined in another service|
|`@requires`|Tells the gateway which fields are needed to resolve a field|
|`@provides`|Tells the gateway what additional fields a service can supply|
|Composable schemas|Combine multiple schemas into one supergraph|

---

### ✅ Benefits

- **Scalability**: Teams can develop and deploy their GraphQL services independently.
    
- **Modularity**: Encourages clean service boundaries and domain ownership.
    
- **Flexibility**: Easily add new subgraphs without changing the whole schema.
    

---

### ⚠️ Considerations

- **Complexity**: Adds architectural complexity (e.g., gateway orchestration).
    
- **Performance**: Queries may span multiple services, requiring thoughtful batching and caching.
    
- **Schema Governance**: Requires coordination to avoid type conflicts or cyclic dependencies.
    

---

### 🛠 Use Cases

- Large teams with **domain-oriented microservices**
    
- Organizations needing **independent deployment** of GraphQL services
    
- Systems evolving from monolithic GraphQL to **modular architectures**