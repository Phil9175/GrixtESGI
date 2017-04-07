module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let CarSchema = Schema({
        renters: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
         modelOfCar: [{
            type: Schema.Types.ObjectId,
            ref: 'CarModels'
        }]
    });

    return mongoose.model('Car', CarSchema);
};