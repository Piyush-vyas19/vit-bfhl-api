# BFHL API

This project implements a simple REST API for processing arrays of mixed inputs including numbers, alphabets, and special characters. The API is deployed on Vercel and supports JSON requests.

## API Endpoint

Base URL:

```
[https://vit-bfhl-api.vercel.app](https://vit-bfhl-api.vercel.app)
```

### POST `/bfhl`

Accepts a JSON object with a `data` field (array of strings). Returns processed results including classification of elements, sum of numbers, and metadata.

**Request Body Example**

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response Example**

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "numbers": ["1", "334", "4"],
  "alphabets": ["A", "R"],
  "highest_lowercase_alphabet": ["a"],
  "even_numbers": ["334", "4"],
  "odd_numbers": ["1"],
  "special_characters": ["$"],
  "sum": "339"
}
```

### GET `/bfhl`

Returns a simple status check.

**Response**

```json
{
  "operation_code": 1
}
```

---

## Error Handling

- **400 Bad Request**: Returned when the input JSON is missing the `data` field or when `data` is not an array.
- **405 Method Not Allowed**: Returned when using an unsupported HTTP method (e.g., GET on `/bfhl`).
- **500 Internal Server Error**: Returned for unexpected server errors.

---

## Development

### Prerequisites

- Node.js 18+
- npm

### Local Setup

```bash
git clone https://github.com/Piyush-vyas19/bfhl-api.git
cd bfhl-api
npm install
npm start
```

Server runs locally on:

```
http://localhost:3000
```

---

## Testing

Tests are written using Jest and Supertest.

### Run Tests

```bash
npm test
```

### GitHub Actions

A CI/CD workflow is configured in `.github/workflows/tests.yml` to run the test suite automatically on every push or pull request.

---

## Deployment

This project is configured for deployment on Vercel. Any changes pushed to the `main` branch will be deployed automatically.

Production URL:

```
https://vit-bfhl-api.vercel.app
```

---

```

---

```
