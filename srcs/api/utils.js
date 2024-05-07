const respondJson = (response) => {
  return (statusCode, jsonData) => {
    response.status(statusCode).json(jsonData);
  };
};

const errMsgJson = (message) => {
  return { message };
};

module.exports = {
  respondJson,
  errMsgJson,
};
