#!/bin/sh
if curl -fs http://localhost:8000/votes >/dev/null; then
  exit 0
else
  exit 1
fi 