import CodeBlock from '../models/codeblocks_model.js'

const getAllCodeBlocks = async () => {
    return await CodeBlock.find().exec();
}

const getCodeBlockById = async (_id) => {
    const codeblock = await CodeBlock.findById(_id).exec();
    if (!codeblock) {
        return res.status(404).json({ message: "CodeBlock not found" });
    }
    return codeblock;
}

export default {
    getAllCodeBlocks,
    getCodeBlockById
};