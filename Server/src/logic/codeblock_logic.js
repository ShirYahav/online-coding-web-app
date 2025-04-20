import CodeBlock from '../models/codeblocks_model.js'

const getAllCodeBlocks = async () => {
    return await CodeBlock.find().exec();
}

export default {
    getAllCodeBlocks
};