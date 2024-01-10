import Bin from "../models/Bin.js";
import tryCatch from "./utils/tryCatch.js";

export const createListing = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newBin = new Bin({ ...req.body, uid, uName, uPhoto });
  await newBin.save();
  res.status(201).json({ success: true, result: newBin });
});
