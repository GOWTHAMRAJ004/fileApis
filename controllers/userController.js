const { saveAccount, getAccountData } = require("../database/database");

exports.createAccount = async (req, res) => {
    try {
        const { username, email, password, id } = req.body;
        const newData = { id , username, email, password };

        console.log(newData);
        const existingData = await getAccountData();
        existingData.push(newData);

        await saveAccount(existingData);

        return res.status(201).json({
            message: "User created successfully",
            user: existingData,
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(400).json({ error: error.message || "Invalid request" });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const existingData = await getAccountData();
        return res.status(200).json({
            message: "Successfully fetched all users",
            user: existingData,
        });
    } catch (error) {
        console.error("Error getting users:", error.message);
        return res.status(400).json({ error: error.message || "Invalid request" });
    }
};

exports.findById = async (req, res) => {
    try {
        const existingData = await getAccountData();
        const userId = parseInt(req.params.id);

        const user = existingData.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Successfully fetched user by ID",
            user,
        });
    } catch (error) {
        console.error("Error getting user:", error.message);
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const existingData = await getAccountData();
        const userId = parseInt(req.params.id);

        const userIndex = existingData.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedUser = existingData.splice(userIndex, 1);
        await saveAccount(existingData);

        return res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};
