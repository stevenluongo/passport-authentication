import crypto from 'crypto';

export function validatePassword(user, inputPassword) {
    const inputHash = crypto
      .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
      .toString('hex');
    const passwordsMatch = user.hash === inputHash;
    return passwordsMatch;
}
  