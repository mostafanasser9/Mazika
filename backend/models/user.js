// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   age: { type: Number, required: true },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// export default User;



// //dh kan sha8al
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName:  { type: String, required: true },
//   email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
//   password:  { type: String, required: true },
//   phone:     { type: String, required: true },
//   age:       { type: Number, required: true },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// export default User;


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
