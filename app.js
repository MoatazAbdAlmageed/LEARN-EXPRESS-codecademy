const utils = require("./utils");
const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const PORT = 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));


const expressions = [];

utils.seedElements(expressions,
    'expressions');
console.log(expressions);
// Get all expressions
app.get('/expressions', (req, res, next) => {
    res.send(expressions);
});


// The first one that is matched will be used, and its callback will be called.
app.get('/expressions/:id', (req, res, next) => {
    var item = utils.getElementById(req.params.id, expressions);
    if (item) {
        res.status(200).send(item);
    } else {
        res.status(404).send('expression not found');
    }
});


/* not be called */
app.get('/', (req, res, next) => {
    res.send([2, 3, 4]);
});


const monsterStoreInventory = {fenrirs: 4, banshees: 1, jerseyDevils: 4, krakens: 3};
app.get('/monsters-inventory/:name', (req, res, next) => {
    console.log(req.params.name);
    const monsterInventory = monsterStoreInventory[req.params.name];
    console.log('************');
    console.log(monsterInventory);
    if (monsterInventory) {
        res.status(200).send(monsterInventory);
    } else {
        res.status(404).send('Monster not found');
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
