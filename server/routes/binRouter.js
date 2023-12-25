import { Router } from "express";

import { createListing } from "../controllers/bin.js";
import auth from "../middleware/auth.js";

const binRouter = Router();
binRouter.post("/", auth, createListing);
export default binRouter;
