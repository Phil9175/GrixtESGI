module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let RentSchema = Schema({
        car: {
            type: Schema.Types.ObjectId,
            ref: 'Car'
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        beginDate: {
	        type: Date,
	        required: true
        },
        endDate:{
	        type: Date,
	        required: true
        },
        pickupPlace:{
	        type: Schema.Types.ObjectId,
	        ref: 'Pickup',
	        required: true
        },
        pickupLet:{
	        type: Schema.Types.ObjectId,
	        ref: 'Pickup',
	        required: true
        },
        availableSeat:{
	        type: Number,
	        default: 3
        }
    });

    return mongoose.model('Rent', RentSchema);
};