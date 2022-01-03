const axios = require('axios');


const md5 = require('md5');
const publickey = '79ba3cacd9cbf79bddef5df794ed7363';
const privatekey = 'b0dd2612a6dfee2a0e026964ac069c63e7d11f2b';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;


//--------------This is the function to check Space-------------//
function checkSpace(mystr) {
  let flag = 0;
  for (let i = 0; i < mystr.length; i++) {
    if (mystr.charAt(i) != " ") {
      flag = 1;
      break;
    }
  }

  if (flag === 0) {
    return true;
  } else {
    return false;
  }
}
//-------------------End of Check Space Fnction--------------------//



const searchcharacters = async function searchcharacters(search_term){
  if (arguments.length!=1)
  {
      throw {msg:`The Number of Arguments are not Proper`,err:400,title:'Characters Found'};
  }

  if(search_term==null)
  {
    throw {msg:`search_term cannot be null`,err:400,title:'Characters Found'};
  }

  if(typeof search_term!='string')
  {
    throw {msg:`search_term should be string`,err:400,title:'Characters Found'};
  }

  if(search_term=='0')
  { 
    throw {msg:`search_term cannot be 0`,err:400,title:'Characters Found'};
  }

  if (checkSpace(search_term)) {
    throw { msg: `Name field cannot be just empty spaces`, err: 400,title:'Characters Found' };
  }
    try{
    var { data } = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search_term}${url}`)
    }
    catch(e)
    {
      throw { msg: `Internal server error at Marvel API`, err: 500,title:'Characters Found' };
    }
    
    
    return data
  }

const getCharacter = async function getcharacter(id){

  if (arguments.length!=1)
  {
      throw {msg:`The Number of Arguments are not Proper`,err:400};
  }

  if(id==null)
  {
    throw {msg:`There is no input in the Id Field`,err:400};
  }
  
    let temp = parseInt(id)

  if(typeof temp!= 'number')
  {
    throw {msg:`The Id Field should be number`,err:400};
  }

  if(isNaN(temp))
  {
    throw {msg:`The Id Field should be number`,err:400};
  }

    const { data } = await axios.get(` https://gateway.marvel.com/v1/public/characters/${id}?${url}`)
    return data
}




module.exports = {
    searchcharacters,
    getCharacter
  };


