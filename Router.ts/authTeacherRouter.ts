import express,{Router} from "express"
import { createTeacher, deleteOneTeacher, signInTeacher, updateOneTeacher, viewAllTeacher, viewOneTeacher } from "../Controller/teacherController"

const router =Router()

router.route("/register-teacher").post(createTeacher)
router.route("/sign-in-teacher").post(signInTeacher)
router.route("/:id/view-one-teacher").get(viewOneTeacher)
router.route("/view-all-teacher").get(viewAllTeacher)
router.route("/:id/delete-user-teacher").delete(deleteOneTeacher)
router.route("/:id/update-user-teacher").patch(updateOneTeacher)

export default router