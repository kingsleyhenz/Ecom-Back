export const isBlocked = (req, res, next) => {
    const accountStatus = req.user.accountStatus;
    if (accountStatus === 'Blocked') {
      return res.status(403).json({ message: 'Your account is blocked. Please contact support for assistance.' });
    }
    next();
  };
  