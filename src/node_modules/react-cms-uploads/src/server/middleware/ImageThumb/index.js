
const sharp = require('sharp');
var fs = require('fs');

const ImageThumbMiddleware = async (req, res, next) => {



  
  const {
    0: src,
    type,
  } = req.params;
  



  let path = `/uploads/${src}`;

  // const abthPath = __dirname + path;
  const abthPath = process.cwd() + path;




  if (fs.existsSync(abthPath)) {
    // Do something


    
    const img = await sharp(abthPath)
    // .flatten()
    // .background('#ff6600')
    // // .overlayWith('overlay.png', { gravity: sharp.gravity.southeast } )
    // .sharpen()
    
    
    switch(type){
      
      case 'avatar':
      
        img
        .resize(200, 200);

      break;

      default:

        res.status(500);
        res.send("Wrong image type");
      
    }
    
    img
    .withMetadata()
    .toFormat('jpeg', {
      quality: 90,
    })
    .toBuffer()
    .then( data => {

    
      res.status(200);
      res.contentType("image/jpeg");
      res.send(data);

    } )
    .catch( e => {
      console.error(e);

      res.status(500);
      res.send(e);

    });



    // res.sendFile(abthPath);
    // res.send('src');
    res.end(img);
  }
  else{
    console.error("File not exists");

    res.status(404).send('File not found');
  }


}

module.exports = ImageThumbMiddleware;