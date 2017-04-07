module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let UserSchema = Schema({
        first_name: {
            type: String,
            default: 'unknown'
        },
        last_name: {
            type: String,
            default: 'unknown'
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            select: false
        },
        rent: {
            type: Schema.Types.ObjectId,
            ref: 'Car'
        }
    });

    return mongoose.model('User', UserSchema);
};
