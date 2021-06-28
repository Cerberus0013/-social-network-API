const { Thought } = require('../models')

const thoughtController = {
  
    getAllThought(req, res) {
    User.find({})
      .sort({ _id: -1 })
      .selected("_v")
      .then((dbThought) => res.json(dbThought))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    User.findOne({ _id: params.id }) 
      .select("-__v")
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: " No User Found" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought({ body }, res) {
    User.create(body)
      .then((dbThought) => res.json(dbThought))
      .catch((err) => res.status(400).json(err));
  },

  updateThought({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(400).json({ message: "No User found with that id" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought({ params }, res) {
    User.findByIdAndRemove({ _id: params.id })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No User with that ID" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
