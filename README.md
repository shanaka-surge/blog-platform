# Blog platform: React + Spring Boot + H2 + Keycloak

## Layout
- `keycloak/realm-export.json`: realm, roles, clients and test users, imported automatically
- `docker-compose.yml`: runs Keycloak on :8080
- `backend/`: Spring Boot API on :8081
- `frontend/`: React (Vite) on :5173

## Run it (3 terminals)
1. Keycloak: `docker compose up`  (wait for "Running the server in development mode")
2. Backend:  `cd backend && mvn spring-boot:run`   (Java 17+)
3. Frontend: `cd frontend && npm install && npm run dev`

Open http://localhost:5173.

## Test accounts (realm `blog-realm`)
| user  | password | roles       |
|-------|----------|-------------|
| alice | password | USER        |
| boss  | password | USER, ADMIN |

Keycloak's own admin console: http://localhost:8080 (admin / admin).
Anyone can also register from the login page and gets USER automatically.
H2 console: http://localhost:8081/h2-console  (JDBC URL `jdbc:h2:file:./data/blogdb`, user `sa`, empty password).

## API
| Method | Path | Who |
|---|---|---|
| GET | /api/blogs | any logged-in user: all blogs |
| GET | /api/blogs/me | any logged-in user: own blogs |
| POST | /api/blogs | any logged-in user |
| PUT / DELETE | /api/blogs/{id} | author only (set `app.admin-can-modify-blogs: true` to let admins too) |
| GET/POST/PUT/DELETE | /api/admin/users[/{id}] | ADMIN only, proxied to Keycloak |

## Before production
Change the `blog-admin-service` secret, the Keycloak admin password, turn off `directAccessGrantsEnabled` on `blog-frontend`, use HTTPS, and run Keycloak with a real database.
