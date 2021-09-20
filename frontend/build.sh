# install ftp client
apk add lftp

# enter to frontend directory
cd frontend

# install dependencies 
npm install --legacy-peer-deps

# build
npm run build

# upload build folder through ftp client
lftp -e "mirror -R ./build/ public_html/" -u $FTP_USER,$FTP_PASSWORD $FTP_URL