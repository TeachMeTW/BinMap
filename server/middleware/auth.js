import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const googleToken = token.length > 1000;
    // google verif
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoURL: payload.picture,
      };
    }
    // jwt verif
    else {
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Auth Error Occured" });
  }
};

export default auth;
