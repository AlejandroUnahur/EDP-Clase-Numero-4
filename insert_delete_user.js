const Sequelize = require('sequelize');

const sequelize = new Sequelize('peliculas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

class Characters extends Sequelize.Model { }
Characters.init({
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    fechaNac: Sequelize.DATEONLY,
    personaje: Sequelize.STRING
}, { sequelize, modelName: 'Characters' });

sequelize.sync()
    .then(() => {
        return Characters.create({
            nombre: 'Pedro',
            apellido: 'Pascal',
            fechaNac: '1975-05-2',
            personaje: 'Din Djarin (The Mandalorian)'
        })
    })
    .then(john => {
        console.log(john.toJSON());

        return john.destroy();
    })
      .then(() => {
    console.log('Record deleted successfully!');
  })
