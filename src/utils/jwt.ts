import * as crypto from 'crypto';
import * as base64url from 'base64-url';

const header = {
  alg: 'HS256',
  type: 'JWT',
};

const payload = {
  username: 'test@test.com',
  name: 'Jonh Doe',
  exp: new Date().getTime(),
};

const key = 'abcde123456';

const headerEncoded = base64url.encode(JSON.stringify(header));
const payloadEncoded = base64url.encode(JSON.stringify(payload));

const signature = crypto
  .createHmac('sha256', key)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest('base64');

const b64url = base64url.encode(signature);

const token = `${headerEncoded}.${payloadEncoded}.${b64url}`;

export const genToken = () => {
  return token;
};
