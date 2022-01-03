
const express = require('express');
const router = express.Router();
const data = require('../data');
const marveldata = data.marvelCharacters;


//-------------This is the function to check Space--------------//
function checkSpace (mystr)
{
    let flag=0;
    for (let i =0;i<mystr.length;i++)
    {
        if (mystr.charAt(i)!=' ')
        {
            flag=1;
            break;
        }
    }
    if (flag===0)
    {
        return true
    }
    else
    {
        return false
    }
}

//------------End of Check Space--------------------//

router.get('/', async (req, res) => {
  
    res.render('character_search', { title:'Character Finder'});

});

router.post('/search', async (req, res) => {
    let request = req.body;
    let searchTerm = request.searchTerm;
    let h1_tag='Characters Found'

    

    if(!searchTerm)
    {
      res.status(400).render('characters',{error1: `The searchTerm Cannot be null.Please use below link to search again,`,title:'Characters Found'});
      return;
    }

    searchTerm = searchTerm.trim()

    if(typeof searchTerm !=='string')
    {
      res.status(400).render('characters',{error1: `The searchTerm Parameter should be string`,title:'Characters Found'});
      return;
    }

    if(checkSpace(searchTerm))
    {
      res.status(400).render('characters',{error1: `The searchTerm cannot be empty spaces.Please use the below link to search again`,title:'Characters Found'});
      return;
    }

    if(searchTerm=='0')
    { 
      res.status(404).render('characters',{error: `404 not found!`,searchTerm:searchTerm,title:'Characters Found'});
      return;
    }

    try {
        const searchList = await marveldata.searchcharacters(searchTerm);
        
        const results=searchList.data.results.slice(0,20)
        if(results.length==0)
        {
          res.status(404).render('characters',{error: `404 not found!`,searchTerm:searchTerm,title:'Characters Found'});
          return;
        }
        else{
          res.render('characters', {title:'Characters Found',searchTerm:searchTerm,results:results,h1_tag:h1_tag});
        }
        
      } catch (e) {
          console.log(e)
        res.status(e.err || 500).render('characters',{ error1:(e.msg || "Internal Server Error"),title:'Characters Found' });
        return; 
      }


    });


    router.get('/characters/:id', async (req, res) => {
        let id = req.params.id;

        if(!id){
          res.status(400).render('noCharacter',{error: `The id Cannot be null.`,title:"error page"});
          return;
        }

        temp_id = parseInt(id)
        
        if(typeof temp_id != "number"){
          res.status(400).render('noCharacter',{error: `The id Should be number.`,title:"error page"});
          return;
        }

        if(isNaN(temp_id)){
          
          res.status(400).render('noCharacter',{error: `The id Should be number!!!.`,title:"error page"});
          return;
        }

        
    
        try {
            const character = await marveldata.getCharacter(id);

            if(!character)
            {
              res.status(404).render('noCharacter', {error:"404 Not Found!"});
            }

            let name = character.data.results[0].name
            let img = character.data.results[0].thumbnail.path
            let ext = character.data.results[0].thumbnail.extension
            let desc= character.data.results[0].description
            let comics = character.data.results[0].comics.items

            res.render('character', {title:name,name:name,img:img,desc:desc,ext:ext,comics:comics});
          } catch (e) {
              console.log(e)
            res.status(e.err || 500).render('noCharacter',{ error:(e.msg || "404 Not Found!" ),title:"Character not found" });
            return; 
          }
          
          
        });
    




module.exports=router