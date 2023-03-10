import express from "express"
import { VideoController } from "../controller/VideoController"

export const videoRouter = express.Router()

const videoController = new VideoController()

videoRouter.get("/", videoController.getVideos )
videoRouter.post("/", videoController.createVideo )