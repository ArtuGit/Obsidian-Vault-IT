RPC (Remote Procedure Call) protocols enable a program to execute code on a different address space (often on another computer on a network) as if it were a local procedure. Several RPC protocol implementations exist, each with different trade-offs in terms of performance, interoperability, language support, and security.

Here’s a list of **widely used RPC protocol implementations**:

---

### 🔹 1. **gRPC**

- **Developed by**: Google
    
- **Transport**: HTTP/2
    
- **Serialization**: Protocol Buffers (Protobuf)
    
- **Language Support**: C++, Java, Go, Python, Node.js, Ruby, C#, etc.
    
- **Features**:
    
    - Bi-directional streaming
        
    - Built-in authentication
        
    - Strong typing
        
    - Excellent for microservices
        
- **Use Case**: Modern, high-performance microservices communication.
    

---

### 🔹 2. **Apache Thrift**

- **Developed by**: Facebook (now part of Apache)
    
- **Transport**: Custom or HTTP
    
- **Serialization**: Custom binary or JSON
    
- **Language Support**: Java, C++, Python, PHP, Ruby, Erlang, Haskell, Go, etc.
    
- **Features**:
    
    - Cross-language support
        
    - Flexible transport and protocol layers
        
- **Use Case**: Cross-language RPC with tight control over serialization.
    

---

### 🔹 3. **JSON-RPC / XML-RPC**

- **Developed by**: Community-driven
    
- **Transport**: Typically HTTP
    
- **Serialization**: JSON or XML
    
- **Language Support**: Broad (due to simplicity)
    
- **Features**:
    
    - Human-readable
        
    - Very simple protocol
        
- **Use Case**: Lightweight services or browser-based RPC.
    

---

### 🔹 4. **CORBA (Common Object Request Broker Architecture)**

- **Developed by**: OMG (Object Management Group)
    
- **Transport**: IIOP (Internet Inter-ORB Protocol)
    
- **Serialization**: CDR (Common Data Representation)
    
- **Language Support**: C++, Java, Ada, Python, etc.
    
- **Features**:
    
    - Language and platform neutral
        
    - More popular in legacy enterprise systems
        
- **Use Case**: Enterprise distributed object systems.
    

---

### 🔹 5. **SOAP (Simple Object Access Protocol)**

- **Transport**: HTTP, SMTP
    
- **Serialization**: XML
    
- **Language Support**: Most languages via Web Services libraries
    
- **Features**:
    
    - Built-in WS-* standards (security, transactions, etc.)
        
    - Heavily used in enterprise systems
        
- **Use Case**: Interoperable enterprise systems with strict standards.
    

---

### 🔹 6. **Cap’n Proto**

- **Developed by**: Kenton Varda (ex-Google)
    
- **Transport**: Custom
    
- **Serialization**: Cap’n Proto binary format
    
- **Language Support**: C++, Go, Rust, others (via bindings)
    
- **Features**:
    
    - Extremely fast (zero-copy)
        
    - Schema evolution support
        
- **Use Case**: High-performance systems with low-latency needs.
    

---

### 🔹 7. **MessagePack-RPC**

- **Transport**: TCP or HTTP
    
- **Serialization**: MessagePack (binary format like JSON but faster)
    
- **Language Support**: Several (Lua, Ruby, Python, Go, etc.)
    
- **Use Case**: Compact, fast, and cross-language RPC.