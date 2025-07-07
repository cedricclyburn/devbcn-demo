# Multi-stage build for Soccer Vote App (Mac/ARM64 optimized)
# Stage 1: Build the React frontend
FROM --platform=linux/arm64 node:20-alpine AS frontend-builder

WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# Stage 2: Final runtime image
FROM --platform=linux/arm64 python:3.12-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY --from=frontend-builder /frontend/dist ./frontend/dist/
COPY static/ ./static/

# Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

COPY healthcheck.sh /healthcheck.sh
RUN chmod +x /healthcheck.sh

RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check (works with Docker and Podman)
HEALTHCHECK CMD /healthcheck.sh

# Run the application
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"] 