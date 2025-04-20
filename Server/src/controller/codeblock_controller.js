import express from 'express';
import logic from '../logic/codeblock_logic.js';

const router = express.Router();

router.get('/all-codeblocks', async (req, res) => {
    try {
      const codeblocks = await logic.getAllCodeBlocks();
      res.json(codeblocks); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

export default router;