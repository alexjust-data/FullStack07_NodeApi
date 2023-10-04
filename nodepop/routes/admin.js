const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');
const multer = require('multer'); // upload img

// Configura multer para cargar imágenes en una ubicación específica
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Ruta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  }
});

const upload = multer({ storage: storage });

// Ruta para procesar el formulario de creación de anuncios
router.post('/add-ad', upload.single('image'), async (req, res, next) => {
  try {
    const { name, option, price, tags } = req.body;
    const image = req.file.filename; // Nombre del archivo de imagen cargado

    // Crea un nuevo anuncio en la base de datos
    const newAd = new Ad({ name, option, price, img: image, tags: tags.split(',') });
    const adGuardado = await newAd.save();

    // Renderiza la vista de la página principal con los anuncios actualizados
    const ads = await Ad.lista(); // Otra vez, ajusta esto según tu lógica
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});


router.get('/logout', (req, res) => {
  res.clearHeader('WWW-Authenticate');
  res.redirect('/');
});




router.get('/', async (req, res, next) => {
  try {
    const filterByName = req.query.name;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const sort = req.query.sort;
    const fields = req.query.fields;
    const filterByTags = req.query.tags;
    const filterByType = req.query.venta;
    const filterByPrice = req.query.price;

    const filter = {};

    if (filterByTags) {
      filter.tags = { $in: filterByTags.split(',') };
    }

    if (filterByType !== undefined) {
      filter.venta = filterByType === 'true';
    }

    if (filterByName) {
      filter.name = new RegExp('^' + filterByName, 'i');
    }

    if (filterByPrice) {
      const priceRange = filterByPrice.split('-');

      if (priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange.map(parseFloat);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          filter.price = { $gte: minPrice, $lte: maxPrice };
        } else if (!isNaN(minPrice)) {
          filter.price = { $gte: minPrice };
        } else if (!isNaN(maxPrice)) {
          filter.price = { $lte: maxPrice };
        }
      } else if (priceRange.length === 1) {
        const singlePrice = parseFloat(priceRange[0]);
        if (!isNaN(singlePrice)) {
          filter.price = singlePrice;
        }
      }
    }

    const ads = await Ad.lista(filter, skip, limit, sort, fields);

    if (req.originalUrl.startsWith('/api/')) {
      // Si la solicitud proviene de la API, responde con JSON
      res.json({ results: ads });
    } else {
      // Si la solicitud proviene de la interfaz de administración, renderiza la vista
      res.render('admin', { ads });
    }

  } catch (err) {
    next(err);
  }
});

module.exports = router;
