const express = require("express");
const bodyParser = require("body-parser");
const { saveAccount, getAccountData } = require("./Database/dbOperation");

const app = express();
const router = express.Router(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", router);

app.listen(3000, () => {
    console.log("Listening at port: 3000");
});


router.post("/createAccount", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        newData = {
            username:username,
            email:email, 
            password:password};

        console.log(newData);
        const existingData = await getAccountData();
        existingData.push(newData);
        console.log(existingData);
        const createdAccount = await saveAccount(existingData);
        console.log(createdAccount);
        return res.status(201).json({
            message: "User created successfully",
            user: existingData,
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(400).json({
            error: error.message || "Invalid request",
        });
    }
});

router.get("/getAllUser", async(req, res) => {
    try{
        const existingData = await getAccountData();
        return res.status(201).json({
            message: "sucessfully fetched all the user",
            user: existingData,
        });
    }catch(error){
        console.error("Error getting  user:", error.message);
        return res.status(400).json({
            error: error.message || "Invalid request",
        });
    }
})
// To get user by the userId
router.get("/findById/:id", async (req, res) => {
    try {
        const existingData = await getAccountData(); 
        const userId = parseInt(req.params.id); 
        
        const user = existingData.find(user => user.id === userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Successfully fetched user by ID",
            user,
        });
    } catch (error) {
        console.error("Error getting user:", error.message);
        return res.status(500).json({
            error: error.message || "Internal server error",
        });
    }
});

// To delete the user based on the id
const fs = require("fs");
const dataPath = "./Database/db.json"; 

router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const existingData = await getAccountData(); 
        const userId = parseInt(req.params.id); 
        console.log(userId);
       
        const userIndex = existingData.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(userIndex);
        const deletedUser = existingData.splice(userIndex, 1);
        console.log(deletedUser);

       
        const deleted = await saveAccount(existingData);

        return res.status(200).json({
            message: "User deleted successfully",
            user: deleted, 
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return res.status(500).json({
            error: error.message || "Internal server error",
        });
    }
});





