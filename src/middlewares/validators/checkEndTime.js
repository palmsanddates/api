const checkEndTime = (value, { req }) => {
  return value.getTime() > req.body.startTime.getTime()
};

module.exports = checkEndTime;
