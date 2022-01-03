# Marvel-API
This Website will demonstrate the use of Marvel API and Error Handling
# How to Run the Application
1. Download the Code into one folder. Make Sure you have nodejs Installed in your machine
2. Run Below command in the terminal
    >npm install
    >npm start
3. The Server will start and you can use any browser to run the url "http://localhost:3000/"

# Using Marvel API

We will be using the Marvel API (Links to an external site.).  You will need to register and sign up for an API key.  You will not be able to make requests to the API without signing up and getting an API key (Links to an external site.).  You will use the Characters (Links to an external site.) listings  Please look at the data returned so you know the schema of the data and the objects it returns (the links to Characters above work but using my API key.  **DO NOT use my API key**. **Please register for your own**.  You will need to compose the URL with your API key, a ts (time stamp) and a hash.  

You can use the following code to construct the URL. You can read more about AUTHORIZING AND SIGNING REQUESTS from the link below

https://developer.marvel.com/documentation/authorization (Links to an external site.) 

const md5 = require('blueimp-md5');
const publickey = 'your_public_key(API KEY) from Marvel dev portal';
const privatekey = 'your private key from Marvel dev portal';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
