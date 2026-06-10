# VStay Deployment Strategy

## Purpose

This document describes how to deploy the VStay React web frontend to AWS using a production Docker image.

The frontend is a Vite React single-page application. It is built into static files and served by Nginx.

## Deployment Target

Recommended AWS targets:

- **AWS App Runner** for the simplest container deployment.
- **Amazon ECS Fargate** for production control over networking, scaling, and load balancing.
- **Elastic Beanstalk Docker** for simpler classroom or demo deployments.

For production, prefer ECS Fargate behind an Application Load Balancer.

## Image Build

Build from the `frontend-web` directory:

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://your-api-domain.com \
  -t vstay-web:latest .
```

For local testing against the backend:

```bash
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:8080 \
  -t vstay-web:local .
```

Run locally:

```bash
docker run --rm -p 8081:80 vstay-web:local
```

Then open:

```text
http://localhost:8081
```

## Environment Rules

Vite injects `VITE_*` variables at build time.

Set `VITE_API_BASE_URL` during `docker build`, not only when running the container.

Examples:

- Local: `http://localhost:8080`
- Staging: `https://staging-api.vstay.example.com`
- Production: `https://api.vstay.example.com`

Do not hardcode API hostnames inside React components.

## AWS ECR Push

Create an ECR repository, then authenticate Docker:

```bash
aws ecr get-login-password --region ap-southeast-1 \
  | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-southeast-1.amazonaws.com
```

Tag and push:

```bash
docker tag vstay-web:latest <account-id>.dkr.ecr.ap-southeast-1.amazonaws.com/vstay-web:latest
docker push <account-id>.dkr.ecr.ap-southeast-1.amazonaws.com/vstay-web:latest
```

Use immutable tags for real releases:

```text
vstay-web:2026-06-10.1
```

## ECS Fargate Strategy

Recommended setup:

- One ECS cluster.
- One Fargate service for `vstay-web`.
- One task definition using the ECR image.
- Container port `80`.
- Application Load Balancer forwards HTTPS traffic to port `80`.
- ACM certificate for HTTPS.
- Route 53 DNS record pointing to the load balancer.

Health check path:

```text
/healthz
```

Expected response:

```text
ok
```

## App Runner Strategy

Use App Runner when deployment speed matters more than infrastructure control.

Configuration:

- Source: ECR image.
- Port: `80`.
- Health check path: `/healthz`.
- Auto deploy: enabled for staging, manual approval for production.

## Backend CORS Requirement

The backend must allow the deployed frontend origin.

For production, configure allowed origins explicitly:

```text
https://vstay.example.com
```

Local wildcard CORS is acceptable for development only. Production should not allow every localhost pattern or broad wildcard origins.

## Release Checklist

Before deploying:

- Run `npm run typecheck`.
- Run `npm run build`.
- Build the Docker image successfully.
- Confirm `VITE_API_BASE_URL` points to the intended backend.
- Confirm backend CORS allows the frontend domain.
- Confirm `/healthz` returns `200`.
- Smoke test villa listing, villa details, booking, and payment entry points.

## Rollback Strategy

Keep the last known good image tag in ECR.

For ECS:

- Register a new task definition revision with the previous image tag.
- Update the ECS service to that revision.

For App Runner:

- Redeploy the previous image tag.

Avoid using only `latest` for production because it makes rollbacks ambiguous.

## Security Notes

- Serve the app over HTTPS only.
- Keep API credentials out of frontend code.
- Do not put secrets in `VITE_*` variables; those are embedded into the browser bundle.
- Use AWS IAM roles for deployment automation.
- Restrict backend CORS to trusted frontend origins in staging and production.
