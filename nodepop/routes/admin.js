const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');

router.get('/', async (req, res, next) => {
    try {
        const ads = await Ad.find();
        res.render('admin', { ads: ads });
        res.locals.ads = ads;
    } catch (err) {
        next(err);
    }
});

// Agrega más rutas según lo necesario, por ejemplo, para eliminar o agregar anuncios.

module.exports = router;
