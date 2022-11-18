import crypto from 'crypto';

export const generateHash = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { salt, hash };
};

export const generateVerificationHash = () =>
  crypto.randomBytes(128).toString('hex');
