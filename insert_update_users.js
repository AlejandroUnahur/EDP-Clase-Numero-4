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
    .then(async () => {
        await Characters.bulkCreate([
            {
                nombre: 'Pedro',
                apellido: 'Pascal',
                fechaNac: '1975-05-02',
                personaje: 'Din Djarin (The Mandalorian)'
            },
            {
                nombre: 'Mark',
                apellido: 'Hamill',
                fechaNac: '1951-09-25',
                personaje: 'Luke Skywalker'
            },
            {
                nombre: 'Harrison',
                apellido: 'Ford',
                fechaNac: '1942-07-13',
                personaje: 'Han Solo'
            },
            {
                nombre: 'Ewan',
                apellido: 'McGregor',
                fechaNac: '1942-07-13',
                personaje: 'Obi-Wan Kenobi'
            }
        ]);
        
        //Actualizo la fecha de nacimiento del primer registro
        await Characters.update(
            { fechaNac: '1975-04-02'},
            { where: {id: 1 }}
        );
        console.log("Fecha Actualizada");
        
        //Actualizo el personaje del cuarto registro
        await Characters.update(
            { personaje: 'Ben Kenobi'},
            { where: {id: 4}}
        );
        console.log("Personaje Actualizado");
    })
    .catch(error => {
        console.log(error);
    });
