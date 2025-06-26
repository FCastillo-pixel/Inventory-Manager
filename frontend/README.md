# Inventory Management FrontEnd

This is the front end for the inventory managment app, is used for managing products and categories with real-time data synchronization with a Spring Boot backend.


## **Product Management**
- **CRUD Operations** - Create, Read, Update, Delete products
- **Stock Management** - Toggle between in-stock and out-of-stock
- **Expiration Tracking** - Visual indicators for product expiration dates presented in colors
- **Category Assignment** - Organize products by categories with the possibility to filter them in base of their categories


## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **State Management**: React Context
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## API Integration

### **Base Configuration**
```.env
REACT_APP_API_URL=http://localhost:9090
```
```typescript
// services/api.ts

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export default api;
```

### **Product Endpoints**

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/products` | Get all products with optional filters | Query params: `name`, `categories[]`, `inStock` |
| `GET` | `/products/{id}` | Get product by ID | - |
| `POST` | `/products` | Create new product | `ProductInfo` |
| `PUT` | `/products/{id}` | Update product | `ProductInfo` |
| `DELETE` | `/products/{id}` | Delete product | - |
| `POST` | `/products/{id}/outofstock` | Mark product as out of stock | - |
| `PUT` | `/products/{id}/instock?defaultQuantity=10` | Mark product as in stock | - |
| `GET` | `/products/metrics` | get metrics | - |
| `GET` | `/products/categories` | get all categories | - |