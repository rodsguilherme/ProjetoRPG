const express = require('express');
const router = express.Router();

const races = {
    elf: { bonus: 2 },
    human: { bonus: 1 },
    dwarf: { bonus: 2 }
}


const classes = {
    warrior: { hp: 10 },
    mage: { hp: 6 },
    rogue: { hp: 8 }
}

/*
const attributes = {
    strength: 0,
    dexterity: 0,
    constution: 0,
    winsdom: 0,
    intelligence: 0,
    charisma: 0
}
*/

router.post('/', (request, response) => {
    const { attributes, races, classes, data } = request.body
    if (data.name && data.alignment && data.age) {

        if (races == "dwarf") {
            attributes.constitution += 2
        }

        if (races == "elf") {
            attributes.dexterity += 2
        }

        if (races == "human") {
            attributes = Object.entries(attributes)
                .map(atr => { atr[1]++; return atr })
                .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
        }

        if (classes == "warrior") {
            classes.warrior.hp = 10
        }
        if (classes == "mage") {
            classes.mage.hp = 6
        }
        if (classes == "rogue") {
            classes.rogue.hp = 8
        }


    }
    else {
        response.status(400).json({ sucess: false, err: "Preencha os dados!" })
    }

})

module.exports = (api) => api.use('/api/card', router)