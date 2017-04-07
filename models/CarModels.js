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
	        type: Number,
	        default: 2010
        },
        numberOfSeat: {
	        type: Number,
	        default: 4
        }
    });

    return mongoose.model('CarModels', CarModelsSchema);
};