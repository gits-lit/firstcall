const router = require('express')();
const system = require('../util/system');

const translate = require('@vitalets/google-translate-api');
const { isSupported } = require('@vitalets/google-translate-api/languages');

const vision = require('@google-cloud/vision');
const imageClient = new vision.ImageAnnotatorClient();

router.get('/responders', async (req, res) => res.json(await system.getResponders()));
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

router.get('/detect', async (req, res) => {
    let base64 = req.query.base64;

    if (base64 && base64.length > 0) {
        const config = {
            image: {
                content: Buffer.from(base64, 'base64')
            }
        };

        const [result] = await imageClient.objectLocalization(config);
        const objects = result.localizedObjectAnnotations;
        res.json(system.createSuccess({ objects }));
    } else {
        res.json(system.createError('Please provide a valid base64 image string.'));
    }
});

module.exports = router;