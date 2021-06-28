
const { User, Thought } = require ('../models')

const userController = {

    getAllUsers(req, res){
        User.find({})
        .sort({ _id: -1})
        .selected("_v")
        .then((dbUser) => res.json(dbUser))
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
    },


getUserById({ params }, res) {
    User.findOne({ _id: params.id})
    .populate({
        path: 'thought',
        select: '-__v',
    })
    .populate({
        path: 'friend',
        select: '-__v',
    })
    .select("-__v")
    .then((dbUser) => {
        if(!dbUser) {
            res.status(404).json ({message: " No User Found"})
            return
        }
        res.json(dbUser)
    })
    .catch((err) => {
        console.log(err)
        res.status(400).json(err)
    })
},

createUser({ body }, res){
    User.create(body)
    .then((dbUser) => res.json(dbUser))
    .catch ((err) => res.status(400).json(err));
},

updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then((dbUser) => {
            if(!dbUser) {
            res.status(400).json({ message: "No User found with that id" });
            return
         }
         res.json(dbUser)
       })
       .catch((err) => res.status(400).json(err));
    },

 deleteUser ({ params }, res) {
     User.findByIdAndRemove ({ _id: params.id})
        .then((dbUser) => {
            if(!dbUser) {
                res.status(404).json({ message: "No User with that ID"});
                return
            }
            res.json( dbUser);
        })
        .catch((err) => res.status(400).json(err))
    },

}





module.exports = userController;