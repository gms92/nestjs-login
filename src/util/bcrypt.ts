import * as bcrypt from 'bcrypt';

const hashPassword = (user) => {
  return bcrypt.hashSync(user.obj.password, 10);
};

export default hashPassword;
