import Bin from "../models/Bin.js";
import tryCatch from "./utils/tryCatch.js";

export const createListing = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newBin = new Bin({ ...req.body, uid, uName, uPhoto });
  await newBin.save();
  res.status(201).json({ success: true, result: newBin });
});

export const getListings = tryCatch(async (req, res) => {
  const bins = await Bin.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: bins });
});
