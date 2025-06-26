# REST API (Spring Boot)

This document describes the RESTful API endpoints exposed by the Spring Boot backend for managing products and categories. The application runs on port `9090`.

## Product Controller (`/products`)

This controller provides endpoints for managing product information.

### 1. Create a New Product (`POST /products`)

* **Description:** Creates a new product in the inventory.
* **Request Body:**
    ```json
    {
      "name": "Product Name",
      "categoryName": "Category Name",
      "unitPrice": 10.0,
      "expirationDate": "2025-12-31",
      "inStock": 100
    }
    ```
    * `name` (string, required): The name of the product.
    * `categoryName` (string, required): The name of the category to which the product belongs.
    * `unitPrice` (number, required): The price of a single unit of the product.
    * `expirationDate` (string, optional): The expiration date of the product (YYYY-MM-DD).
    * `inStock` (integer, required): The current number of units in stock.
* **Response:**
    * **Status Code:** `201 Created`
    * **Response Body:** The newly created `Product` object.
    ```json
    {
      "id": "uniqueProductId",
      "name": "Product Name",
      "category": {
        "id": "categoryId",
        "categoryName": "Category Name"
      },
      "unitPrice": 10.0,
      "expirationDate": "2025-12-31",
      "inStock": 100,
      "createdAt": "2025-05-29",
      "updatedAt": null
    }
    ```

### 2. Update an Existing Product (`PUT /products/{id}`)

* **Description:** Updates the information of an existing product.
* **Path Variable:**
    * `id` (string, required): The unique ID of the product to update.
* **Request Body:** Same as the request body for creating a product.
* **Response:**
    * **Status Code:** `200 OK`
    * **Response Body:** The updated `Product` object.
    * **Status Code:** `404 Not Found` If the product with the given ID does not exist.

### 3. Delete a Product (`DELETE /products/{id}`)

* **Description:** Deletes a product from the inventory.
* **Path Variable:**
    * `id` (string, required): The unique ID of the product to delete.
* **Response:**
    * **Status Code:** `204 No Content` If the product was successfully deleted.
    * **Status Code:** `404 Not Found` If the product with the given ID does not exist.

### 4. Get a Product by ID (`GET /products/{id}`)

* **Description:** Retrieves a specific product based on its ID.
* **Path Variable:**
    * `id` (string, required): The unique ID of the product to retrieve.
* **Response:**
    * **Status Code:** `200 OK`
    * **Response Body:** The `Product` object with the given ID.
    ```json
    {
      "id": "uniqueProductId",
      "name": "Product Name",
      "category": {
        "categoryName": "Category Name"
      },
      "unitPrice": 10.0,
      "expirationDate": "2025-12-31",
      "inStock": 100,
      "createdAt": "2025-05-29",
      "updatedAt": null
    }
    ```
    * **Status Code:** `404 Not Found` If the product with the given ID does not exist.

### 5. Get All Products (with optional filters) (`GET /products`)

* **Description:** Retrieves a list of all products, with optional filtering by name, categories, and availability.
* **Query Parameters:**
    * `name` (string, optional): Filters products whose name contains the provided string.
    * `category` (string, optional): Filters products belonging to any of the provided category name.
    * `inStock` (boolean, optional): Filters products based on their stock status (`true` for in-stock, `false` for out-of-stock and `null` for all products).
* **Response:**
    * **Status Code:** `200 OK`
    * **Response Body:** A list of `Product` objects.
    ```json
    [
      {
        "id": "product1",
        "name": "Product A",
        "category": {
          "categoryName": "Electronics"
        },
        "unitPrice": 10.00,
        "expirationDate": null,
        "inStock": 50,
        "createdAt": "2025-05-29",
        "updatedAt": null
      },
      {
        "id": "product2",
        "name": "Product B",
        "category": {
          "categoryName": "Books"
        },
        "unitPrice": 56.0,
        "expirationDate": null,
        "inStock": 0,
        "createdAt": "2025-05-29",
        "updatedAt": null
      }
    ]
    ```

### 6. Mark Product as Out of Stock (`POST /products/{id}/outofstock`)

* **Description:** Marks a specific product as out of stock (sets `inStock` to 0).
* **Path Variable:**
    * `id` (string, required): The unique ID of the product to update.
* **Response:**
    * **Status Code:** `204 No Content` If the product was successfully marked as out of stock.
    * **Status Code:** `404 Not Found` If the product with the given ID does not exist.

### 7. Mark Product as In Stock (`PUT /products/{id}/instock?defaultQuantity=10`)

* **Description:** Marks a specific product as in stock (sets `inStock` to 10).
* **Path Variable:**
    * `id` (string, required): The unique ID of the product to update.
* **Response:**
    * **Status Code:** `204 No Content` If the product was successfully marked as in stock.
    * **Status Code:** `404 Not Found` If the product with the given ID does not exist.

### 8. Get Inventory Metrics Report (`GET /products/metrics`)

* **Description:** Retrieves a report containing overall inventory metrics and metrics per category.
* **Response:**
    * **Status Code:** `200 OK`
    * **Response Body:** An `InventoryMetricsReport` object.
    ```json
    {
      "categoryMetrics": [
        {
          "categoryName": "Books",
          "totalProductsInStock": 5,
          "totalValueInStock": 75.50,
          "averagePriceInStock": 18.0
        },
        {
          "categoryName": "Electronics",
          "totalProductsInStock": 10,
          "totalValueInStock": 50.00,
          "averagePriceInStock": 5.00
        }
      ],
      "overallMetrics": {
        "totalProductsInStock": 15,
        "totalValueInStock": 30.0,
        "averagePriceInStock": 20.0
      }
    }
    ```
