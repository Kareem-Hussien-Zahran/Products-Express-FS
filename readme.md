# Products API

A RESTful Product Management API built with **Node.js**, **Express.js**, **File System (JSON)**, and **Multer** for image uploads.

The API supports:

* Retrieving all products
* Searching products by name
* Retrieving a product by ID
* Retrieving all product names
* Creating products with image uploads
* Updating/replacing products
* Deleting products

---

## Technologies

* Node.js
* Express.js
* Multer
* File System (`fs`)
* JSON
* Postman

---

# Base URL

```text
http://localhost:3000/products
```

Replace `3000` with the port configured in your application.

---

# API Endpoints

| Method | Endpoint                    | Description                      |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/products`                 | Return all products              |
| GET    | `/products/name?name=value` | Return products filtered by name |
| GET    | `/products/:id`             | Return a product by ID           |
| GET    | `/products/allNames`        | Return all product names         |
| POST   | `/products`                 | Create a product with an image   |
| PUT    | `/products/:id`             | Replace/update a product         |
| DELETE | `/products/:id`             | Delete a product by ID           |

---

# 1. Get All Products

### Endpoint

```http
GET /products
```

### Example

```text
GET http://localhost:3000/products
```

### Description

Returns all products stored in the application.

### Example Response

```json
[
    {
        "id": 1,
        "name": "Laptop",
        "description": "Gaming Laptop",
        "price": 50000,
        "image": "/uploads/laptop.jpg"
    },
    {
        "id": 2,
        "name": "Keyboard",
        "description": "Mechanical Keyboard",
        "price": 2500,
        "image": "/uploads/keyboard.jpg"
    }
]
```

---

# 2. Get Products By Name

### Endpoint

```http
GET /products/name?name=value
```

### Example

```text
GET http://localhost:3000/products/name?name=laptop
```

### Query Parameter

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `name`    | String | Yes      | Product name or search value |

### Example

```text
GET /products/name?name=laptop
```

The controller can access the value using:

```js
req.query.name
```

For example:

```js
const { name } = req.query;
```

### Example Response

```json
[
    {
        "id": 1,
        "name": "Laptop",
        "description": "Gaming Laptop",
        "price": 50000,
        "image": "/uploads/laptop.jpg"
    }
]
```

---

# 3. Get Product By ID

### Endpoint

```http
GET /products/:id
```

### Example

```text
GET http://localhost:3000/products/5
```

### Path Parameter

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| `id`      | Number | Product ID  |

Inside the controller:

```js
const { id } = req.params;
```

or:

```js
req.params.id
```

### Example

```text
GET /products/5
```

Here:

```js
req.params.id
```

contains:

```text
5
```

### Example Response

```json
{
    "id": 5,
    "name": "Laptop",
    "description": "Gaming Laptop",
    "price": 50000,
    "image": "/uploads/laptop.jpg"
}
```

---

# 4. Get All Product Names

### Endpoint

```http
GET /products/allNames
```

### Example

```text
GET http://localhost:3000/products/allNames
```

### Description

Returns only the names of all available products.

### Example Response

```json
[
    "Laptop",
    "Keyboard",
    "Mouse",
    "Monitor"
]
```

---

# 5. Create Product With Image

### Endpoint

```http
POST /products
```

### Example

```text
POST http://localhost:3000/products
```

This endpoint uses **Multer** to handle image uploads.

### Content-Type

```text
multipart/form-data
```

### Form Data

| Key           | Type | Required           | Description         |
| ------------- | ---- | ------------------ | ------------------- |
| `name`        | Text | Yes                | Product name        |
| `description` | Text | Yes                | Product description |
| `price`       | Text | Yes                | Product price       |
| `image`       | File | Optional/Required* | Product image       |

> Whether `image` is required depends on the validation implemented inside the controller.

### Postman

Go to:

```text
Body → form-data
```

Add:

```text
name          → Laptop
description   → Gaming Laptop
price         → 50000
image         → laptop.jpg
```

For the `image` field, change its type from:

```text
Text
```

to:

```text
File
```

---

## Multer Middleware

The route uses:

```js
uploads.single('image')
```

Therefore, the uploaded file must have the field name:

```text
image
```

The route is:

```js
productRouter.post(
    '/',
    uploads.single('image'),
    productController.addProduct
);
```

Multer makes the uploaded image available through:

```js
req.file
```

The normal form fields are available through:

```js
req.body
```

For example:

```js
console.log(req.body);
console.log(req.file);
```

---

# 6. Update Product

### Recommended Endpoint

```http
PUT /products/:id
```

### Example

```text
PUT http://localhost:3000/products/5
```

The `id` identifies the product that should be replaced/updated.

### Path Parameter

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| `id`      | Number | ID of the product |

### Request Body

If using JSON:

```json
{
    "name": "Updated Laptop",
    "description": "Updated Gaming Laptop",
    "price": 60000
}
```

### Controller

The controller can access the ID using:

```js
const { id } = req.params;
```

And the updated data using:

```js
const { name, description, price } = req.body;
```

### Example Request

```text
PUT /products/5
```

```json
{
    "name": "Updated Laptop",
    "description": "New Description",
    "price": 60000
}
```

---

# 7. Delete Product By ID

### Endpoint

```http
DELETE /products/:id
```

### Example

```text
DELETE http://localhost:3000/products/5
```

### Path Parameter

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| `id`      | Number | ID of the product to delete |

### Controller

```js
const { id } = req.params;
```

### Example Success Response

```json
{
    "message": "Product deleted successfully"
}
```

### Example Not Found Response

```json
{
    "message": "Product not found"
}
```

---

# Postman Testing

## Get All Products

```text
GET http://localhost:3000/products
```

---

## Search By Name

```text
GET http://localhost:3000/products/name?name=laptop
```

---

## Get Product By ID

```text
GET http://localhost:3000/products/5
```

---

## Get All Names

```text
GET http://localhost:3000/products/allNames
```

---

## Create Product

```text
POST http://localhost:3000/products
```

Select:

```text
Body → form-data
```

Then:

```text
name          Text       Laptop
description   Text       Gaming Laptop
price         Text       50000
image         File       laptop.jpg
```

---

## Update Product

```text
PUT http://localhost:3000/products/5
```

Body:

```json
{
    "name": "Updated Laptop",
    "description": "Updated Description",
    "price": 60000
}
```

---

## Delete Product

```text
DELETE http://localhost:3000/products/5
```

---

# Request Data Types

There are three important ways your API receives data.

## 1. Path Parameters

Used when identifying a specific resource.

```text
/products/:id
```

Example:

```text
/products/10
```

Access:

```js
req.params.id
```

---

## 2. Query Parameters

Used for searching/filtering.

```text
/products/name?name=laptop
```

Access:

```js
req.query.name
```

---

## 3. Request Body

Used for sending product data.

```json
{
    "name": "Laptop",
    "price": 50000
}
```

Access:

```js
req.body
```

For multipart form data with an image:

```js
req.body
```

contains the text fields, while:

```js
req.file
```

contains the uploaded file.

---

# Recommended Router

For the routes shown above:

```js
const express = require('express');

const productRouter = express.Router();

const productController = require('./productController');

const uploads = require('./upload.Middeware');

// Get all products
productRouter.get(
    '/',
    productController.getALLProducts
);

// Get products by name
productRouter.get(
    '/name',
    productController.getByName
);

// Get all product names
productRouter.get(
    '/allNames',
    productController.getAllNames
);

// Get product by ID
productRouter.get(
    '/:id',
    productController.getById
);

// Create product with image
productRouter.post(
    '/',
    uploads.single('image'),
    productController.addProduct
);

// Update/replace product by ID
productRouter.put(
    '/:id',
    productController.updateById
);

// Delete product by ID
productRouter.delete(
    '/:id',
    productController.deleteById
);

module.exports = productRouter;
```

---

# Complete API Summary

```text
┌────────┬─────────────────────────────┬─────────────────────────────┐
│ Method │ Endpoint                    │ Purpose                     │
├────────┼─────────────────────────────┼─────────────────────────────┤
│ GET    │ /products                   │ Get all products            │
│ GET    │ /products/name?name=laptop  │ Search by product name      │
│ GET    │ /products/allNames          │ Get all product names       │
│ GET    │ /products/:id               │ Get product by ID            │
│ POST   │ /products                   │ Create product + image      │
│ PUT    │ /products/:id               │ Update/replace product      │
│ DELETE │ /products/:id               │ Delete product by ID        │
└────────┴─────────────────────────────┴─────────────────────────────┘
```

---

# Project Structure

```text
project/
│
├── app.js
├── productRouter.js
├── productController.js
├── upload.Middeware.js
├── products.json
├── package.json
│
├── uploads/
│   ├── laptop.jpg
│   ├── keyboard.jpg
│   └── mouse.jpg
│
└── README.md
```

---

# REST API Concepts Used

This project demonstrates:

* Express Router
* RESTful routing
* HTTP methods
* CRUD operations
* Path parameters
* Query parameters
* Request body
* `multipart/form-data`
* File uploads
* Multer middleware
* Controller architecture
* JSON file storage
* Postman API testing
* Resource-based URLs

---

# Endpoint Flow

```text
Client / Postman
       │
       ▼
Express Router
       │
       ├── GET  /products
       ├── GET  /products/name
       ├── GET  /products/allNames
       ├── GET  /products/:id
       ├── POST /products
       │        │
       │        └── Multer → req.file
       │
       ├── PUT  /products/:id
       │
       └── DELETE /products/:id
                │
                ▼
        Product Controller
                │
                ▼
          products.json
```
