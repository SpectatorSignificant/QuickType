import mongoose from "mongoose";

const url = `mongodb://${process.env.MONGODB_PORT || '127.0.0.1'}/quicktype`;

mongoose.connect(url);

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    scores: {
        type: [
            {
                score: Number,
                time: Date
            }
        ],
        default: []
    },
    score: {
        type: [Number],
        default: []
    },
    time: {
        type: [Date],
        default: []
    } 

});

const User = mongoose.model("User", userSchema);

let userObject = {
    username: "user1", 
    password: "pass1", 
    name: "User One"
};


export async function createUser(userObject){
    try{
        const user  = await User.create(userObject);
        await user.save();
    } catch (e){
        console.log("Error creating user:", e.message);
    }
}

export async function updateUser(username, update){
    try{
        const user = await User.findOneAndUpdate({username: username}, update, {
            new: true
        });
        
        await user.save();
        return user;
    }
    catch (e){
        console.log("Error:", e.message);
    }
}

export async function findUser(username){
    try{
        const user = await User.where("username").equals(username);
        
        return user[0];
    }
    catch (e){
        console.log("Error:", e.message);
    }
}

export async function searchUsers(){
    try{
        const users = await User.find({}, {username: 1, name: 1, tags: 1});
        
        return users;
    }
    catch (e){
        console.log("Error:", e.message);
    }
}

// createUser(userObject)

// export { createUser, updateUser, findUser, searchUsers };