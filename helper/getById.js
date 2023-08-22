async function getById(params, model) {
    let query = {};
    let options = {};
    if (params.hasOwnProperty('query')) {
        query = params.query;
    }
    if (params.hasOwnProperty('options')) {
        options = params.options.populate;
    }
    try {
        let data = await model.findOne(query)
        if (options.constructor !== Object) {
            data = await model.findOne(query).populate(options);
        }
        return data;
    } catch (err) {
        console.log(err);
    }
}
module.exports = getById;