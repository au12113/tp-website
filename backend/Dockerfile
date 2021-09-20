FROM node:14.17-alpine3.14

## Step 1:
# Create a working directory
WORKDIR /app

## Step 2:
# Copy source code to working directory
COPY . /app/

## Step 3:
# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN npm install

## Step 4:
# Expose port 80
EXPOSE 3000 3306

## Step 5:
# Run app.py at container launch
CMD ["npm", "start"]
