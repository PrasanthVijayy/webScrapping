import jwt from "jsonwebtoken";
import db from "../../config/database.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the access token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        // If token has expired or is invalid
        if (err.name === "TokenExpiredError") {
          const refreshToken = req.headers.refresh_token;
          if (!refreshToken) {
            return res.status(401).json({
              error:
                "Unauthorized: Access token expired and no refresh token provided",
            });
          }

          try {
            // Verify the refresh token
            const decodedRefreshToken = jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET
            );
            // If refresh token is valid, issue a new access token and proceed
            const newAccessToken = jwt.sign(
              { uid: decodedRefreshToken.uid },
              process.env.SECRET_KEY,
              { expiresIn: constants.TOKENS.ACCESS_TOKEN_EXPIRY }
            );
            req.headers.authorization = `Bearer ${newAccessToken}`;
            decoded = decodedRefreshToken;
          } catch (refreshTokenError) {
            // If refresh token is invalid or expired
            return res.status(401).json({
              error: "Unauthorized: Refresh token invalid or expired",
            });
          }
        } else {
          // Other token verification errors
          return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
      }

      // Token is valid, extract user data and proceed
      const { uid } = decoded;
      const userData = await db.user.findOne({
        where: { uid },
      });

      if (!userData) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }

      req.user = decoded;
      req.userData = userData;
      return next();
    });
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
