# Bienvenido al coding-interview-backend-level-3 - Parte I

## Descripción
Eres el Senior Developer de tu equipo en El Dorado, y te han dado la responsabilidad de desarrollar un nuevo feature que nos pide el equipo de producto:

> API REST que permita realizar operaciones CRUD sobre una entidad de tipo `Item`.
>
> La entidad tiene 3 campos: `id`, `name` y `price`.
>
>

# Requisitos:
- Si el servicio se reinicia, los datos no se pueden perder.
- Tienes que implementar tu codigo como si estuvieses haciendo un servicio para El Dorado listo para produccion.
- Completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.


### Que puedes hacer: 
- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/** es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Crear tests
- ✅ Cambiar la definición del .devContainer


### Que **no** puedes hacer:
- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros test si lo deseas)
- ❌ El proyecto debe usar Typescript 
- ❌ Estresarte 🤗


## Pasos para comenzar
1. Haz un fork usando este repositorio como template
2. Clona el repositorio en tu máquina
3. Realiza los cambios necesarios para que los tests pasen
4. Sube tus cambios a tu repositorio
5. Avísanos que has terminado
6. ???
7. PROFIT

### Cualquier duda contactarme a https://www.linkedin.com/in/andreujuan/

## Requirements

- Docker
- Node.js (Preferably version 16 or higher)
- PostgreSQL (Optional, as Docker is used to set up the database)

## Setting up the Database with Docker

1. Make sure you have Docker and Docker Compose installed on your machine.
2. In the root of the project, run the following command to start the PostgreSQL container:

   ```bash
   docker-compose up -d
   ```

   This command will:

   - Start the PostgreSQL container using the configuration from the `./devcontainer/docker-compose.yml` file.
   - The database will run on port `5432` on your local machine.

## Environment Configuration

first, go the backend app

```bash
cd coding-interview-backend-level-3
```

1. Create a `.env` file in the root of the project with the following content:

   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
   ```

   Replace `username` and `password` with your PostgreSQL credentials. If you're using Docker Compose to run the database, the username and password are defined in `docker-compose.yml`.

2. Make sure the `.env` file is loaded by your application. The server will automatically load the environment variables.

3. run `cd src/prisma && npx prisma migrate dev --name init`

4. run the command `npx prisma generate`

5. run the server `npm start`


## Ports

- **API Port**: The API runs on port `4000` by default.

  You can access the API at `http://localhost:4000`.

---

### 🐳 Running Backend with Docker (OPTIONAL)

1. Build and start the containers:

   ```bash
   docker-compose -f .devcontainer/docker-compose.yml up --build
   ```

2. The API will be available at: [http://localhost:4000](http://localhost:4000)

---


### 🚀 Available Endpoints

#### ✅ `GET /ping`

Checks if the system and database are healthy.

```bash
curl -X GET http://localhost:4000/ping
```

**Expected response:**
```json
{
  "ok": true
}
```

---

### 📦 Items Endpoints

#### 🔍 `GET /items`

Lists all items.

```bash
curl -X GET http://localhost:4000/items
```

**Expected response (when empty):**
```json
[]
```

---

#### ➕ `POST /items`

Creates a new item.

```bash
curl -X POST http://localhost:4000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Item 1", "price": 10}'
```

**Expected response:**
```json
{
  "id": 1,
  "name": "Item 1",
  "price": 10
}
```

---

#### 🔍 `GET /items/:id`

Fetches a specific item by its ID.

```bash
curl -X GET http://localhost:4000/items/1
```

**Expected response:**
```json
{
  "id": 1,
  "name": "Item 1",
  "price": 10
}
```

---

#### ✏️ `PUT /items/:id`

Updates an existing item.

```bash
curl -X PUT http://localhost:4000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Item 1 updated", "price": 20}'
```

**Expected response:**
```json
{
  "id": 1,
  "name": "Item 1 updated",
  "price": 20
}
```

---

#### ❌ `DELETE /items/:id`

Deletes an item by its ID.

```bash
curl -X DELETE http://localhost:4000/items/1
```

**Expected response:**  
HTTP status code `204 No Content`, with no response body.

---

### ⚠️ Validations

#### Negative price (POST)

```bash
curl -X POST http://localhost:4000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Item 1", "price": -10}'
```

**Expected response:**
```json
{
  "errors": [
    {
      "field": "price",
      "message": "Field \"price\" cannot be negative"
    }
  ]
}
```

---

#### Missing required field (`price`)

```bash
curl -X POST http://localhost:4000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Item 1"}'
```

**Expected response:**
```json
{
  "errors": [
    {
      "field": "price",
      "message": "Field \"price\" is required"
    }
  ]
}
```

---

#### Negative price on update (PUT)

```bash
curl -X PUT http://localhost:4000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Item 1", "price": -20}'
```

**Expected response:**
```json
{
  "errors": [
    {
      "field": "price",
      "message": "Field \"price\" cannot be negative"
    }
  ]
}
```

---

### 🧪 Running Tests

```bash
npm run test
```