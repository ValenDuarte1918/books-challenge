const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { validationResult } = require('express-validator');

const mainController = {
  home: (req, res) => {
    console.log(req.session.userLogged);
    console.log("estas en session");

    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: async(req, res) => {
    const book = await db.Book.findByPk(req.params.id)
    const authors = await db.Author.findByPk(req.params.id)
    res.render('bookDetail', { book, authors });
},
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: async (req, res) => {
    const title = req.body.title.toLowerCase();
  
    const books = await db.Book.findAll({
      where: {
        title: {
          [db.Sequelize.Op.like]: '%' + title + '%'
        }
      }
    });
      res.render('search', { books });
  },
  deleteBook: async(req, res) => {
    // Implement delete book
    const bookId = req.params.id;

    
  
    await db.Book.destroy({
      where: {
        id: bookId,
      },
    });
    res.redirect('/'); // no puedo hacer que me redirija a la home pero se borra el libro
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: async(req, res) => {
    const book = await db.Book.findByPk(req.params.id)
    const authors = await db.Author.findByPk(req.params.id)
    res.render('authorBooks', { book, authors });
},
register: async(req, res) => {
  res.render('register');
},
  processRegister: async (req, res) => {
    const resultValidations = validationResult(req);
    
    // Check if email already exists
    const existingUser = await db.User.findOne({ where: { Email: req.body.email } });
    if (existingUser) {
      resultValidations.errors.push({
        msg: 'Email already registered'
      });
    }
  
    if (resultValidations.errors.length > 0) {
      return res.render('register', {
        errors: resultValidations.mapped(),
        oldData: req.body
      });
    }
  
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
    console.log(req.cookies);
  },
  processLogin: async (req, res) => {
    const resultValidations = validationResult(req);
    if (resultValidations.errors.length > 0) {
      return res.render('login', {
        errors: resultValidations.mapped(),
        oldData: req.body
      });
    }

    const { email, password } = req.body;
    
    const userToLogin = await db.User.findOne({ where: { email } });
  
    if(userToLogin) {
      const isOkThePassword = bcryptjs.compare( req.body.password, userToLogin.Pass);
      if (isOkThePassword) {
        delete userToLogin.Pass;
        req.session.userLogged = userToLogin;
  
        if(userToLogin) {
          res.cookie("test", "Funcionando",{ maxAge: 1000 * 30});
        }
        return res.redirect('/');
      } 
      return res.render('login', {
        errors: req.session.errors
      });
    }
  
    return res.render('login', {
      errors: {
        email: {
          msg: 'No se encuentra este email en nuestra base de datos',
        password: {
          msg: 'Contraseña incorrecta'
        }
      }
    }
    });
  },
  logout: (req, res) => {
    res.clearCookie('test');
    req.session.destroy();
    return res.redirect('/users/login');
    console.log(req.session);
  },
  edit: async (req, res) => {
    // Implement edit book
  const book = await db.Book.findByPk(req.params.id);
    res.render('editBook', {book})
  },
  processEdit: async(req, res) => {
    // Implement edit book
      const bookId = req.params.id;
      const { title, description, cover } = req.body;
    
      await db.Book.update({ title, description, cover }, {
        where: {
          id: bookId
        }
      });
    res.redirect('/books/detail/' + bookId);
  }
};

module.exports = mainController;
