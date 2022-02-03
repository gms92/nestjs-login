import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

mongoose.pluralize(null);
