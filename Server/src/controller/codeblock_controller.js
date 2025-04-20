import express from 'express';
import logic from '../logic/codeblock_logic.js';

const router = express.Router();

router.get("/codeblocks", async (req, res) => {
    try {
      const codeblocks = await logic.getAllCodeBlocks();
      res.json(codeblocks); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

router.get("/codeblocks/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const codeblock = await logic.getCodeBlockById(_id);
    res.json(codeblock); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export default router;