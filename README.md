# Practice WEB-API/Node.js/MongoDB


```sh
# check node version
% node -v
v18.18.0

# nvm (Node Version Manager)
% nvm --version
0.39.5

# nodemon (automatically restarts the server when it detects changes to your files)
% nodemon --version
3.0.1

# create a file for dependencies `package.json`
% npm init
```


```sh
# install express-generator global
% npm install express-generator -g

% express --version               
4.16.1

# Generate a new applicattion with templates ejs
% express nodepop --view=ejs

# change directory to app
% cd nodepop

# install dependencies
% npm install

# install devDependencies in package.json
% npm install --save-dev nodemon cross-env

    ...
        "scripts": {
             "dev": "cross-env DEBUG=nodeapp:* nodemon ./bin/www",
        },
    ...


% npm start    # run the app in production
% npm run dev  # run the app in development
```

**MongoDB**
```sh
%  mongod --version
db version v7.0.1

# run mongo and open ports
% cd /Applications/mongodb-macos-x86_64-7.0.1/bin
% ./bin/mongod --dbpath ./data/db
% ./bin/mongod --dbpath ./data/db --port 3002


% mongosh --version
2.0.1

% cd /usr/local/Cellar/mongosh/2.0.1
% ./bin/mongosh

    Current Mongosh Log ID:	651aeafe9338fe1e1a488881
    Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1
    Using MongoDB:		7.0.1
    Using Mongosh:		2.0.1

test> show dbs;
admin       40.00 KiB
config      72.00 KiB
cursonode  144.00 KiB
local       72.00 KiB

test> use practice_nodepop
switched to db practice_nodepop
practice_nodepop> db.ad.insertOne(
    {name: "mesa", 
    option: "sell", 
    price: 50, 
    img: "foto1.jpg", 
    tags: ["lifestyle"]}
    )
{
  acknowledged: true,
  insertedId: ObjectId("651b01891fb67f8a16fc10e7")
}


% npm install mongoose

# ./nodepop
npm run dev
```


```sh
# HTTP Basic Authentication credentials in Node.js to ./admin
% npm install basic-auth

# popular middleware for handling file uploads in Node.js web applications
% npm install multer

```

Corrección de estilo https://eslint.org/
