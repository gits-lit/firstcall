const router = require('express')();
const system = require('../util/system');

// Creates a new empty user entry.
router.post('/createUser', async (req, res) => res.json(await system.createUserEntry()));

// Updates the user entry with data.
router.post('/updateUser', async (req, res) => {
    let uid = req.body.uid;

    if (uid && uid.length > 0) {
        let count = 0; // keep count of the amount of new data
        
        let newData = {};
        let invalidKeys = [];
        let validKeys = ['name', 'address', 'emergency', 'transcript',
                         'lat', 'long', 'startDate', 'endDate', 'time', 'status'];

        for (let [key, val] of Object.entries(req.body)) {
            if (key !== 'uid') {
                if (validKeys.indexOf(key) < 0) {
                    invalidKeys.push(key);
                } else {
                    newData[key] = val;
                    count++;
                }
            }
        }
                
        
        if (invalidKeys.length > 0)
            res.json(system.createError(`Invalid parameter(s): ${invalidKeys.join(', ')}`));
        else
            if (count === 0)
                res.json(system.createError(`There is no data to update for user with id: ${uid}.`));
            else
                res.json(await system.updateUserEntry(uid, newData));
    } else {
        res.json(system.createError(`User with id: ${uid} does not exist.`));
    }
});

// Get All Users
router.get('/', async (req, res) => res.json(await system.getUsers()));

module.exports = router;