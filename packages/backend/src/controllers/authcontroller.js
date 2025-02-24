const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
} = require('../services/authService');

const signup = async (req, res) => {
    try {
        const { email, password, name, bio, profileImageUrl } = req.body;
        const result = await registerUser(
            email,
            password,
            name,
            bio,
            profileImageUrl
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Token not provided');
        }
        const result = await logoutUser(token);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const me = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is added to req.user by middleware
        const user = await getUserProfile(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    signup,
    login,
    logout,
    me
};
