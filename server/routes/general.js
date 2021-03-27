const router = require('express')();
const system = require('../util/system');

const responders = require('../assets/responders.json');
const translate = require('@vitalets/google-translate-api');
const { isSupported } = require('@vitalets/google-translate-api/languages');

router.get('/responders', (req, res) => res.json(responders));
router.get('/translate', async (req, res) => {
    let toLang = req.query.to;
    let fromLang = req.query.from;
    let text = req.query.text;

    if (text && text.length > 0)
        if (isSupported(toLang))
            try {
                let config = { to: toLang };
                if (fromLang && fromLang.length > 0) {
                    if (isSupported(fromLang))
                        config['from'] = fromLang;
                    else {
                        res.json(system.createError('Please provide a valid language code to translate from.'));
                        return;
                    }
                }
                 
                let result = await translate(text, config);
                res.json(system.createSuccess({ text: result.text }));
            } catch (e) {
                res.json(system.createError(`Error translating text: ${e.message}`));
            }
        else
            res.json(system.createError('Please provide a valid language code to translate to.'));
    else
        res.json(system.createError('Please provide a valid text to translate.'));
});

module.exports = router;