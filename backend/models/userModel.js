import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        select: false,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false,
    }, );

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePasswordInDb = async function (pass, passDB) {
    return await bcrypt.compare(pass, passDB);
}

export default mongoose.model('Users', userSchema);



