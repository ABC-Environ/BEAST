# API Notes

Primary contract is in `docs/openapi.yaml`.

Implemented scaffold endpoints:
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /users`
- `GET /customers`
- `GET /jobs`
- `POST /imports/customers`

All list endpoints are expected to support pagination/filter/sort as implementation expands.
