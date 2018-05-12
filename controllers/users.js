const User = require('../models/user');

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },
    getUser: async (req, res, next) => {
        const {userId} = req.params;
        const user = await User.findById(userId);
        res.status(201).json(user); 
    },
    replaceUser: async (req, res, next) => {
        // replace all the fields
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId,newUser)
        console.log('result', result);
        res.status(200).json({ success: true });
    },
    updateUser: async (req, res, next) => {
            // replace only the number of field that you need
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId,newUser)
        console.log('result', result);
        res.status(200).json({ success: true });
    }
};

/*

We can interact with in 3 diferent ways
1 - Callbacks
2 - Promises
3 - Async/Await (Promises) - DONE

*/