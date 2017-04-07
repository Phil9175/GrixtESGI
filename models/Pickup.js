module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let PickupSchema = Schema({
        maxEmplacement: {
            type: Number,
            default: 5
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    });

    return mongoose.model('Pickup', PickupSchema);
};