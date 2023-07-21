import express,{Router} from "express"
import { createUser, deleteOne, signInUser, updateOne, viewALl, viewOne } from "../Controller/authController"

const router =Router()

router.route("/register").post(createUser)
router.route("/sign-in").post(signInUser)
router.route("/:id/view-one").get(viewOne)
router.route("/view-all").get(viewALl)
router.route("/:id/delete-user").delete(deleteOne)
router.route("/:id/update-user").patch(updateOne)

export default router