const express = require('express');
const mainController = require('../controllers/main');
const db = require('../database/models');
const authMiddleware = require('../middlewares/authMiddleware');
const {body} = require('express-validator'); 
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const validations = [
    body('name').notEmpty().withMessage('Debes completar el campo nombre'),
    body('email')
        .notEmpty().withMessage('Debes completar el campo email')
        .bail()
        .isEmail().withMessage('Debes ingresar un email válido')
        .custom(value => {
            return db.User.findOne({ where: { Email: value } }).then(user => {
                if (user) {
                    return Promise.reject('Email ya registrado');
                }
            });
        }),
    body('password').notEmpty().withMessage('Debes completar el campo contraseña').bail().isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('category').notEmpty().withMessage('Debes completar el campo categoría'),
]

const validationsLogin = [
    body('email')
        .notEmpty().withMessage('Debes completar el campo email')
        .bail()
        .isEmail().withMessage('Debes ingresar un email válido')
        .custom(value => {
            return db.User.findOne({ where: { Email: value } }).then(user => {
                if (!user) {
                    return Promise.reject('Email no registrado');
                }
            });
        }),
]
    

const router = express.Router();

router.get('/', mainController.home);
router.get('/books/detail/:id',authMiddleware , mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register', guestMiddleware, mainController.register);
router.post('/users/register', validations, mainController.processRegister);
router.get('/users/login', guestMiddleware, mainController.login);
router.post('/users/login',validationsLogin, mainController.processLogin);
router.get('/logout/', mainController.logout);
router.post('/books/:id', mainController.deleteBook);
router.get('/books/edit/:id', adminMiddleware, mainController.edit);
router.post('/books/edit/:id', adminMiddleware, mainController.processEdit);

module.exports = router;
