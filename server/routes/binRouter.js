import { Router } from "express";

import { createListing, getListings } from "../controllers/bin.js";
import auth from "../middleware/auth.js";

const binRouter = Router();
binRouter.post("/", auth, createListing);
binRouter.get("/", getListings);
export default binRouter;
