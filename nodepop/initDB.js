'use strict';

const readLine = require('node:readline');
// inicio la base de datos
const connection = require('./lib/connectMongoose'); // conecto a la base de datos
const Ad = require('./models/Ad'); // cargo el modelo
const initData = require('./ads.json'); // cargo ficheros con datos iniciales

// cazo el error si lo hay con la bbdd o el modelo
main().catch(err => console.log('Hubo un error --> ', err));

// para usar comodamente el async creo 
async function main() {

     // espero a que se conecte a la base de datos
    await new Promise(resolve => connection.once('open', resolve))

    const borrar = await pregunta(
        "\nEstas seguro que deseas boorar los datos y cargar datos iniciales? si/no --> "
    )
    if (!borrar) {
        process.exit();
      }


    // inicializar la coleccion de agentes
    await initAds(); // la defino abajo

    // en un script la conezion a ala base de datos la tenemos que terminar
    // he tenido que exportar module.exports = mongoose.connection;
    connection.close();

}




async function initAds() {
    // borrar todos los documentos de a colleccion de agentes
    const deleted = await Ad.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} ads.`);

    // crear agentes iniciales
    // const inserted = await Ad.insertMany(initData.agentes);
    const adsToInsert = initData.anuncios.map(ad => ({
        name: ad.nombre,
        option: ad.venta,
        price: ad.precio,
        img: ad.foto,
        tags: ad.tags
    }));
    
    const inserted = await Ad.insertMany(adsToInsert);
    console.log(`Creados ${inserted.length} ads.`);
}

/**
  "scripts": {
    "start": "node ./bin/www",
    "dev": "cross-env DEBUG=nodeapp:* nodemon ./bin/www",
    "init-db": "node init-db.js" <---- añado esta linea
  },

  voy a terminal y arranco $ node init-db.js
 */



  /**
   * ¿seguro que deseas installar? si o no
   * requiere una librería para que el usuario escriba, readline
   */

  function pregunta(texto) {
    return new Promise((resolve, reject) => {

      // conectar readline con la consola
      const ifc = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      ifc.question(texto, respuesta => {
        ifc.close();
        resolve(respuesta.toLowerCase() === 'si');
      })

    });
  }