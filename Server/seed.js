import fs from "fs/promises";
import mongoose from "mongoose";
import path from "path";
import CodeBlock from "./src/models/codeblocks_model.js";
import config from "./src/utils/config.js";

async function seedCodeblocks() {
  const filePath = path.resolve(
    "..",
    "mongo-seed",
    "moveoapp",
    "codeblocks.json"
  );
  const raw = await fs.readFile(filePath, "utf8");
  const docs = JSON.parse(raw).map((doc) => {
    if (doc._id?.$oid) {
      doc._id = mongoose.Types.ObjectId.createFromHexString(doc._id.$oid);
    }
    return doc;
  });

  await CodeBlock.deleteMany({});
  if (docs.length) {
    await CodeBlock.insertMany(docs);
  }
}

async function run() {
  try {
    await mongoose.connect(config.connectionString);
    console.log("Connected to MongoDB for seeding");
    await seedCodeblocks();
    console.log("Done seeding codeblocks");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
