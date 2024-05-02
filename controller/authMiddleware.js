
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const { authorization } = req.headers;

  // Check if token is provided
  if (!authorization) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    
    // Attach the user ID from the token to the request object
    req.userId = userId;
    
    // Move to the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;

