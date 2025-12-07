### **What are Cookies?**

**Cookies** are small pieces of data (key-value pairs) that a **web server stores on the client (browser)**. They are used to remember information across requests and sessions — such as user authentication, preferences, or tracking identifiers.

### **Are Cookies a Frontend or Backend Concept?**

➡️ **Both** — cookies are part of the **HTTP protocol**, so they bridge both **frontend** and **backend** responsibilities:

- **Frontend (Client-side):**
    
    - Can **read and write cookies** using JavaScript via `document.cookie`.
        
    - Used for UI behavior like remembering user settings or saving tokens (not ideal for sensitive data).
        
- **Backend (Server-side):**
    
    - Can **set cookies** in HTTP response headers using `Set-Cookie`.
        
    - Used for things like **session management**, **authentication**, and **tracking**.
        
    - Can also read cookies sent by the browser in the `Cookie` header on incoming requests.

### **Example Flow:**

 ✅ **Server sets a cookie:**
 ```http
Set-Cookie: session_id=abc123; HttpOnly; Path=/; Max-Age=3600
```
 🍪 **Browser stores the cookie.**
 📩 **Browser sends it back automatically on requests:**
 ```http
 Cookie: session_id=abc123
```
### **Key Properties in Cookies:**

- `HttpOnly` – Not accessible via JavaScript (adds security).
    
- `Secure` – Sent only over HTTPS.
    
- `SameSite` – Controls cross-site cookie behavior (e.g., `Strict`, `Lax`, or `None`).
    
- `Max-Age` / `Expires` – Determines cookie lifespan.
    
- `Path` / `Domain` – Scope of the cookie.

### 🔹 **What is `Set-Cookie`?**

`Set-Cookie` is an **HTTP response header** sent by the **server** to **instruct the browser** to store a cookie.

#### **Basic Syntax:**
```http
Set-Cookie: name=value; [attributes]
```
#### Example:
```http
Set-Cookie: session_id=abc123; HttpOnly; Secure; Max-Age=3600; SameSite=Lax
```
This sets a cookie called `session_id` with value `abc123`, valid for 1 hour, HTTP-only, secure, and with `SameSite=Lax` policy.
### 🔹 **Common Attributes:**

- `HttpOnly`: Prevents JavaScript from accessing the cookie.
    
- `Secure`: Only sent over HTTPS.
    
- `Max-Age` or `Expires`: Controls how long the cookie lives.
    
- `Path`: URL path scope (default is `/`).
    
- `Domain`: Limits cookie to a specific domain or subdomain.
    
- `SameSite`: Controls cross-site request behavior (`Strict`, `Lax`, `None`).
### 🧪 **Can it be tested with `curl`?**

✅ **Yes!** You can simulate how a server sets cookies and inspect them using `curl`.

#### **Example 1: View `Set-Cookie` in response**
```http
curl -i https://example.com
```
- `-i` shows headers.
    
- If the server sets a cookie, you’ll see:
```http
Set-Cookie: session_id=abc123; Path=/; HttpOnly
```
Example 2: Send a cookie in request
```http
curl -i https://example.com -H "Cookie: session_id=abc123"
```
This simulates the browser sending a cookie back to the server.

## HTTP-Only Cookies

- **Definition**: Cookies that are inaccessible to JavaScript running in the browser
    
- **Security**: More secure as they're protected from cross-site scripting (XSS) attacks
    
- **Access**: Can only be read/modified by the server (via HTTP headers)
    
- **Set via**: `Set-Cookie` header with `HttpOnly` flag
    
- **Example**: `Set-Cookie: sessionId=abc123; HttpOnly; Secure`
    

## JS-Accessible Cookies

- **Definition**: Cookies that can be read and modified by client-side JavaScript
    
- **Access**: Available via `document.cookie` API
    
- **Risk**: Vulnerable to XSS attacks
    
- **Use case**: When client-side scripts need to access cookie data
    
- **Example**: `document.cookie = "pref=dark_theme; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";`
    

# Cookies types
## Other Important Cookie Types

### Secure Cookies

- Only transmitted over HTTPS
    
- Set with `Secure` flag
    
- Example: `Set-Cookie: auth=xyz; Secure; HttpOnly`
    

### SameSite Cookies

- Controls when cookies are sent with cross-site requests
    
- Values:
    
    - `Strict`: Only sent for same-site requests
        
    - `Lax`: Sent with top-level navigation (default in modern browsers)
        
    - `None`: Sent with all requests (requires `Secure` flag)
        
- Example: `Set-Cookie: cart=items123; SameSite=Lax`
    

### Session Cookies

- Temporary cookies deleted when browser closes
    
- No `Expires` or `Max-Age` attributes
    
- Example: `Set-Cookie: temp_id=789;`
    

### Persistent Cookies

- Remain until expiration date
    
- Set with `Expires` or `Max-Age` attributes
    
- Example: `Set-Cookie: user=john; Expires=Wed, 21 Oct 2026 07:28:00 GMT`
    

### Host-only Cookies

- Only sent to exact domain that set them
    
- No `Domain` attribute specified
    
- Example: `Set-Cookie: lang=en; path=/` (only sent to exact host)
    

### Domain Cookies

- Sent to domain and all subdomains
    
- Set with `Domain` attribute
    
- Example: `Set-Cookie: shared=value; Domain=.example.com` (sent to example.com and all subdomains)
    

### Path-specific Cookies

- Only sent for requests to specific paths
    
- Set with `Path` attribute
    
- Example: `Set-Cookie: admin=yes; Path=/admin` (only sent for /admin paths)