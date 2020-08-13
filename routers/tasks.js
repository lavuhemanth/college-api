const { Task } = require("../models/task");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
    });

    const result = await task.save();
    res.send({ task: result });
  } catch (ex) {
    throw ex;
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Task.find().sort({ name: 1 });
    res.send({
      tasks: result,
    });
  } catch (ex) {
    throw ex;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Task.findById({ _id: req.params.id });
    res.send({
      task: result,
    });
  } catch (ex) {
    throw ex;
  }
});

router.delete("/:id", async (req, res) => {
  // console.log("REquest params ", req.params);
  try {
    const result = await Task.findByIdAndDelete({ _id: req.params.id });
    res.send({
      task: result,
    });
  } catch (ex) {
    throw ex;
  }
});

router.put("/:id", async (req, res) => {
  console.log("REquest params ", req.params);

  try {
    // console.log("Request data update", requestData);
    const data = await Task.findById(req.params.id);

    if (data) {
      const result = await Task.updateOne(
        { _id: req.params.id },
        {
          $set: {
            _id: req.params.id,
            ...req.body,
            $addToSet: { students: req.body.students },
          },
        },
        { new: true }
      );
      console.log("Result :: ", result);
      res.send(result);
    } else {
      throw new Error("Document not found!");
    }
  } catch (ex) {
    throw ex;
  }
});

module.exports = router;
