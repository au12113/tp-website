FROM node:12.22.12-alpine3.15
ARG REACT_APP_BACKEND_API=172.20.0.3
## Step 1:
# Create a working directory
RUN addgroup -S tp-website && adduser -D -G tp-website -h /usr/tp-frontend -S tp-frontend
USER tp-frontend
WORKDIR /usr/tp-frontend
ENV REACT_APP_BACKEND_API=$REACT_APP_BACKEND_API

## Step 2:
# Copy source code to working directory
COPY --chown=tp-frontend . /usr/tp-frontend

## Step 3:
# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN npm install --legacy-peer-deps

## Step 4:
EXPOSE 8080

## Step 5:
# Run app.py at container launch
# CMD ["npm", "start"]
CMD ["npm", "start"]
