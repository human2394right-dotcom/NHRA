# Production Readiness Checklist ✅

## 1) Local run & dev scripts 🔧
- npm install
- npm start  # should run `node index.js`
- npm run dev # runs `nodemon index.js` (optional)
- Confirm `package.json` has `start` set to `node index.js` and `dev` to `nodemon index.js`.

## 2) Environment variables & secrets 🔒
- Add `.env.example` to repository (do NOT commit real secrets)
- Ensure `.env` is in `.gitignore`
- Required vars (example):
  - PORT
  - MONGO_URI (if using DB)
  - SESSION_SECRET
  - ENABLE_CORS (optional)
  - ENABLE_METRICS (optional)
  - RATE_LIMIT_MAX

## 3) Server & health checks ❤️
- Ensure server reads `process.env.PORT || 3000` (or default) — DONE
- Add `/health` endpoint returning 200 OK (used for probes) — DONE
- Optionally add `/metrics` for Prometheus (enable with env var) — DONE (requires `prom-client`)

## 4) Security & middleware 🔐
- Add `helmet` for headers — DONE
- Add `cors` and enable via `ENABLE_CORS` env — DONE
- Add `express-rate-limit` and tune via env — INSTALLED
- Use input validation (e.g., `express-validator`) — INSTALLED
- Use `csurf` for forms (already present)

## 5) Logging & monitoring 📈
- Add structured logging (`winston`/`pino`) — `winston` added as dependency
- Configure external aggregator (e.g., Datadog, Papertrail)
- Add uptime monitoring (UptimeRobot)

## 6) Process manager & containerization 🐳
- PM2: `pm2 start index.js --name human-right` (script added)
- Dockerfile added (multi-step recommended for prod image)

## 7) CI/CD and deploy 🔁
- Add GitHub Actions to: install deps, run lint/tests, build Docker image, push to registry, deploy to host
- Store secrets in project CI secrets (DOCKERHUB_TOKEN, MONGO_URI, SESSION_SECRET, etc.)
- Choose deployment: Render/Heroku/Railway for simplicity; DigitalOcean/AWS for containers; Kubernetes for large-scale

## 8) DB migrations & backups 🗄️
- Use a migration tool appropriate to DB (migrate/knex/typeorm/mongoose-migrate)
- Ensure regular backups and tested restore

## 9) Testing & readiness ✅
- Add automated tests (unit/integration)
- Add smoke tests hitting `/health` post-deploy

---

If you want, I can:
- Add `prom-client` instrumentation fully and example Grafana dashboard
- Add `winston` config and log file rotation
- Create a GitHub Actions workflow template that builds Docker and pushes to GHCR/Docker Hub
- Add an example `docker-compose.yml` for local testing

Tell me which of the above you'd like me to implement next.