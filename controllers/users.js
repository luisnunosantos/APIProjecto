const User = require('../models/user');
const Car = require('../models/car');

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
        res.status(200).json({ success: true });
    },
    getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        // o populate vai permitir ir buscar os dados todos dos carros
        const user = await User.findById(userId).populate('cars');
        console.log('user', user);
        res.status(200).json(user.cars);
    },
    newUserCar: async (req, res, next) => {
        const { userId } = req.params;
        // Creat New Car
        const newCar = new Car(req.body)
        // Get User
        const user = await User.findById(userId);
        // Assign user as a car´s seller
        newCar.seller = user;
        // Save the Car
        await newCar.save();
        // Add Car to the user´s selling array 'car'
        user.cars.push(newCar);
        // Save the User
        await user.save();
        res.status(201).json(newCar);
    },
};

/*

We can interact with in 3 diferent ways
1 - Callbacks
2 - Promises
3 - Async/Await (Promises) - DONE

*/