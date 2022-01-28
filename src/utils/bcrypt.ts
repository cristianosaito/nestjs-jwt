import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const genHash = (pass): Promise<string> => {
  return bcrypt.hash(pass, saltOrRounds);
};

export const checkHash = (pass, hash): Promise<boolean> => {
  return bcrypt.compare(pass, hash);
};
