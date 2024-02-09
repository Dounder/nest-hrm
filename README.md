<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS + PostgreSQL HRM

### Getting Started

1. **Clone the Repository**

2. **Install dependencies**:

   ```bash
   yarn
   # or
   npm install

   ```

3. **Rename `.env.template` to `.env` and set environment variables to use**
4. **Run only database container**

   ```bash
   docker compose up
   # or detached
   docker compose up -d
   ```

5. **Run api in dev mode**

   ```bash
   yarn start:dev
   # or
   npm run start:dev
   ```

6. **Open browser and navigate to `http://localhost:3000`**

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
