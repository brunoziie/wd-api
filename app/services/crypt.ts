const jwt = require('jsonwebtoken');

interface DataObject {
  [key: string]: any;
}

const MINUTES = 1000 * 60;

export function sign(payload: DataObject, ttl: string | number = '5m') {
  return jwt.sign({ payload }, process.env.APP_SIGNING_KEY, { expiresIn: ttl });
}

export function verify(token: string) {
  try {
    const content = jwt.verify(token, process.env.APP_SIGNING_KEY);
  } catch (e) {
    throw new Error('Invalid or expired token.');
  }
}
