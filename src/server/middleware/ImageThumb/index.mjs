
import sharp from "sharp";

import fs from "fs";




const resizeMax = async function (img, width, height) {
  return await img
    .metadata()
    .then(function (metadata) {

      const {
        width: originWidth,
        height: originHeight,
      } = metadata;

      // console(chalk.green());

      if (width < originWidth || height < originHeight) {

        img.max()
          .resize(width, height)
          .max()
          ;

      }

    })
}



const ImageThumbMiddleware = async (req, res, next) => {

  console.log('req.params', req.params);


  let {
    0: src,
    type,
  } = req.params;

  console.log("type", type);
  console.log("src", src);

  src = src && src.replace(/^uploads/, '') || "";

  console.log("src", src);

  let path = `/uploads/${src}`;

  // const abthPath = __dirname + path;
  const abthPath = process.cwd() + path;

  console.log('path', path);
  console.log('abthPath', abthPath);

  if (fs.existsSync(abthPath)) {
    // Do something
    console.log('exists');


    let img = await sharp(abthPath)
    // .flatten()
    // .background('#ff6600')
    // // .overlayWith('overlay.png', { gravity: sharp.gravity.southeast } )
    // .sharpen()


    switch (type) {

      case 'origin':


        break;


      case 'big':

        img.max();

        resizeMax(img, 1000)

        break;


      case 'avatar':

        // await img
        //   .metadata()
        //   .then(function (metadata) {

        //     const maxWidth = 200;

        //     const {
        //       width,
        //       height,
        //     } = metadata;

        //     if (width > maxWidth) {

        //       img.max()
        //         .resize(maxWidth)
        //         .max()
        //         ;

        //     }

        //   })


        img
          .resize(200, 200)
          .max()
          .crop(sharp.strategy.entropy)

        break;

      case 'place_avatar':

        // await img
        //   .metadata()
        //   .then(function (metadata) {

        //     const maxWidth = 200;

        //     const {
        //       width,
        //       height,
        //     } = metadata;

        //     if (width > maxWidth) {

        //       img.max()
        //         .resize(maxWidth)
        //         .max()
        //         ;

        //     }

        //   })


        /**
         * Ресайз выполняется в два этапа:
         * 1. Создается канвас с заданными размерами.
         * 2. Картинка ресайзится и накладывается на этот канвас.
         */

        img
          // .ignoreAspectRatio()
          .resize(250, 250)
          // .embed()
          // .resize(250, 250)
          // .background({r: 255, g: 255, b: 255, alpha: 0})
          .max()
          // .crop(sharp.strategy.entropy)
          // .flatten()
          // .background('#ff6600')
          // .max()
          // .resize(250, 250)
        // .png()
        // .tile({
        //   size: 300
        // })
        // .extend({top: 10, bottom: 20, left: 10, right: 10})


        // let newImage = sharp({
        //   create: {
        //     width: 300,
        //     height: 200,
        //     channels: 4,
        //     background: { r: 255, g: 0, b: 0, alpha: 128 }
        //   }
        // })

        const oldImg = await img.clone()
        .toBuffer()
        // .then();


        let newImage = await sharp({
          create: {
            width: 250,
            height: 250,
            channels: 4,
            // background: { r: 255, g: 0, b: 0, alpha: 128 }
            background: { r: 255, g: 255, b: 255, alpha: 255 }
          }
        })
        .png()
        // .toBuffer()
        // .then()

        newImage.overlayWith(oldImg);
        // oldImg.overlayWith(newImage);
        // img.overlayWith(newImage);

        // img = oldImg;
        img = newImage;

        break;

      case 'thumb':

        // img
        //   .resize(150, 150)
        //   // .max()
        //   .crop(sharp.strategy.entropy);


        await img
          .metadata()
          .then(function (metadata) {

            const maxWidth = 150;

            const {
              width,
              height,
            } = metadata;

            if (width > maxWidth) {

              img.max()
                .resize(maxWidth)
                .max()
                ;

            }

          })

        break;

      case 'dot_thumb':

        img
          .resize(40, 30)
          // .max()
          .crop(sharp.strategy.entropy);

        break;

      case 'slider_thumb':

        img
          .resize(300, 400)
          .max()
          .crop(sharp.strategy.entropy)

        // img
        //   .resize(400)
        //   .max()

        break;

      default:

        res.status(500);
        res.send(`Wrong image type '${type}'`);

    }

    await img
      .withMetadata()
      // .toFormat('jpeg', {
      //   quality: 100,
      // })
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        // console.log('shape result', data);
        // console.log('shape result info', info);

        const {
          format,
        } = info;

        res.status(200);
        res.contentType(`image/${format}`);
        res.setHeader("Cache-Control", "public, max-age=2592000");
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
        res.send(data);

      })
      .catch(e => {
        console.error(e);

        res.status(500);
        res.send(e);

      });

    // console.log('img', img);

    // res.sendFile(abthPath);
    // res.send('src');
    // res.end(img);
  }
  else {
    console.error("File not exists");

    res.status(404).send('File not found');
  }


}

export default ImageThumbMiddleware;