import UserMod from '../models/UserModel.js';

export const isBlocked = (req, res, next) => {
  if (!req.userAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const userId = req.userAuth;
  UserMod.findById(userId)
    .then((user) => {
      if (user && user.accountStatus !== 'Suspended') {
        next();
      } else {
        return res.status(403).json({ message: 'Your account has been suspended. Please contact customer support for assistance' });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
};
