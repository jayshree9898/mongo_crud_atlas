const db = require('../config/db.config');
const config = require('../config/config');
const User = require('../model/user.model');
const UserSession = require('../model/userSession.model');

const isAuth = async function (req, res, next) {
    const headerToken = req.headers.authorization ? req.headers.authorization : null;
    const isAuth = await UserSession.findOne({ token: headerToken });

    if (isAuth != null) {
        const ExistUser = await User.findOne({ _id: isAuth.user_id });
        if (ExistUser) {
            req.user = ExistUser;
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorize user"
            })
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorize user"
        })
    }
}
module.exports = { isAuth };