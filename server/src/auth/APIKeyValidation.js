const APIKeyValidation = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.EXPECTED_API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };
  
  
  module.exports = APIKeyValidation;