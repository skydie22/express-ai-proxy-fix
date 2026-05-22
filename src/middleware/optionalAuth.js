import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(); // tidak ada token, lanjut tanpa user
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true },
    });

    req.user = user || null;
    next();
  } catch (error) {
    // token invalid/expired, tetap lanjut tanpa user
    req.user = null;
    next();
  }
};

export { optionalAuth };