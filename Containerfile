# Multi-stage build for Soccer Vote App
# Frontend is pre-built locally to avoid esbuild issues
FROM python:3.12-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY frontend/dist ./frontend/dist/
COPY static/ ./static/

# Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/votes || exit 1

# Run the application
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"] 