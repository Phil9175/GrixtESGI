module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let CarModelsSchema = Schema({
        manufacturer: {
            type: String,
            default: 'unknown'
        },
        model: {
            type: String,
            default: 'unknown'
        },
        year: {
	        type: String,
	        default: '2010'
        },
        numberOfPlaces: {
	        type: Number,
	        default: 4
        }
    });

    return mongoose.model('CarModels', CarModelsSchema);
};