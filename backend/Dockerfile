FROM node:12.22.12-alpine3.15
ARG DB_URI=172.20.0.2
## Step 1:
# Create a working directory
RUN addgroup -S tp-website && adduser -D -G tp-website -h /usr/tp-backend -S tp-backend
USER tp-backend
WORKDIR /usr/tp-backend
ENV DB_URI=$DB_URI

## Step 2:
# Copy source code to working directory
COPY --chown=tp-backend . /usr/tp-backend

## Step 3:
# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN npm install

## Step 4:
EXPOSE 4000

## Step 5:
# Run app.py at container launch
# CMD ["npm", "start"]
CMD ["npm", "start"]
