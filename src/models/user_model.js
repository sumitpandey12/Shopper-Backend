const {Schema, model} = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    id: {type: String, unique: true},
    fullname:{type:String, default:""},
    email:{type:String, unique:true, require:true},
    password:{type:String, require:true},
    phoneNumber:{type:String, default:""},
    addresss:{type:String, default:""},
    city:{type:String, default:""},
    state:{type:String, default:""},
    profileProgress:{type:Number,default:0},
    updatedOn:{type:Date},
    createdOn:{type:Date}
});

userSchema.pre('save', function(next){
    this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    next();
});

userSchema.pre(['update','findOneAndUpdate','updateOne'], function(next){
    const update = this.getUpdate();

    delete update._id;
    delete update.id;

    this.updatedOn = new Date();
    next();
});

const UserModel = model('User', userSchema);

module.exports = UserModel;

