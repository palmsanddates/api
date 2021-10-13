const checkRole = async (req, res, next, roleName) => {
  try {
    console.log(roleName);
    console.log(req.user)
  } catch (e) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = checkRole;
