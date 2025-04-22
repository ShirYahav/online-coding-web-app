import { Schema, model } from "mongoose";

const codeBlockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    template: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    hints: [
      {
        text: String,
        order: Number,
      },
    ],
    tests: [
      {
        name: String,
        args: [Schema.Types.Mixed],
        expected: Schema.Types.Mixed,
      },
    ],
  },
  {
    collection: "codeblocks",
  }
);

const CodeBlock = model("CodeBlock", codeBlockSchema);

export default CodeBlock;
