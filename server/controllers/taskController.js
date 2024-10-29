const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    //get details from req
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
    });
    await task.save();

    //return res
    res.status(201).json(task);
  } catch (error) {
    console.log("Error in creating task");
    res.status(500).jsoan({ message: "Server Error", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id, title, description } = req.body; //id which is task._id from mongodb DB
    const task = Task.findOne({ _id: id });
    task.updateOne({
      title: title,
      description: description,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log("Error in updating task");
    res.status(500).jsoan({ message: "Server Error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const task = Task.findOne({ _id: id });
    await task.deleteOne();
    res.status(200).json({ message: "task Deleted" });
  } catch (error) {
    console.log("Error in deleting task");
    res.status(500).jsoan({ message: "Server Error", error: error.message });
  }
};

module.exports = { createTask, updateTask, deleteTask };
