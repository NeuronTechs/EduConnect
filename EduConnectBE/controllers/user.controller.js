const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const { PRIVATE_KEY } = require('../config/environment');
let refreshTokens = []
const generateAccessToken = (userId, role) => {
    return jwt.sign(
        {
            userId: userId,
            role: role
        },
        PRIVATE_KEY,
        { expiresIn: "10s" }
    )
}
const generatefreshToken = (userId, role) => {
    return jwt.sign(
        {
            userId: userId,
            role: role
        },
        PRIVATE_KEY,
        { expiresIn: "7d" }
    )
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await UserService.login(username, password);
        const accessToken = generateAccessToken(result[0]?.userId, result[0]?.role);
        const refreshToken = generatefreshToken(result[0]?.userId, result[0]?.role);
        refreshTokens.push(refreshToken)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: "strict"
        })
        res.status(200).json({
            status: 200,
            data: { result, accessToken },
            message: "get value success"
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: {},
            message: error
        });
    }
};
const refreshToken = async (req, res) => {
    console.log(req.headers.cookie)

    const cookiesHeader = req.headers.cookie;
    if (cookiesHeader) {
        const refreshToken = cookiesHeader.replace('refreshToken=', '');
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("refresh token is not valid")
        }
        else {
            jwt.verify(refreshToken, PRIVATE_KEY, (error, user) => {
                if (error) {
                    console.log(error)
                }
                else {
                    refreshTokens.filter(token => token !== refreshToken)
                    const newAccessToken = generateAccessToken(user?.userId, user?.role)
                    const newRefreshToken = generatefreshToken(user?.userId, user?.role)
                    refreshTokens.push(newRefreshToken)
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: "strict"
                    })
                    res.status(200).json({ accessToken: newAccessToken })
                }
            })
        }
    }
    else{
        return res.status(401).json("you're not authenticated")
    }
};

const logout = async (req, res) => {
    res.clearCookie("refreshToken")
    refreshTokens = refreshTokens.filter(token => token !== req.headers.cookie.replace('refreshToken=', ''))
    res.status(200).json("Log out success")
};

module.exports = {
    login,
    refreshToken,
    logout
};