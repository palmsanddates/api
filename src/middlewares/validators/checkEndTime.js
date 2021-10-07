const checkEndTime = (value, { req }) => {
  return value.getTime() > req.body.start_time.getTime()
};

module.exports = checkEndTime;
