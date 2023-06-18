import { ObtainToken } from "../utils/getToken";
import { verifyToken } from "../utils/tokenVerification";

export const loggedIn = (req, res, next) => {
    try{
        const token = ObtainToken(req);
        const userAccess = verifyToken(token);
        req.userAuth = userAccess.id;
        next();
    }catch(err){
        return res.status(403).json
        ({
            message: err.message
        })
    }
}