import { Schema, model, ObjectId } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret: string = process.env.JWT_SECRET || 'JwtSecret';

export interface UserInterface {
	_id: ObjectId;
  email: string;
  firstname?: string;
  lastname?: string;
	phone?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	zip?: string;
	role?: string;
	accountType?: string;
	emailConfirmed: boolean;
	accountStatus: string;
	registeredOn: Schema.Types.Date;
	hash: string;
	salt: string;
	resetPasswordToken?: string;
	resetPasswordExpires?: Schema.Types.Date;
	token?: string;
	setPassword: (password: string) => void;
	validatePassword: (password: string) => boolean;
	generateJwt: () => string;
}

const userSchema = new Schema<UserInterface>({
	email: {
		type: String,
		unique: true,
		required: true,
		index: true
	},
	firstname: String,
	lastname: String,
	phone: String,
	address: String,
	city: String,
	state: String,
	country: String,
	zip: String,
	role: String,
	accountType: String,
	emailConfirmed: {
		type: Boolean,
		default: false
	},
	accountStatus: {
		type: String,
		default: 'active'
	},
	registeredOn: {
		type: Date,
		default: Date.now,
	},
	hash: String,
	salt: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validatePassword = function(password){
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		exp: Number(expiry.getTime() / 1000),
	}, jwtSecret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

export default model<UserInterface>('User', userSchema);
