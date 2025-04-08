import express from 'express'
import { addCourse, getEducatorCourse, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/EducatorController.js';
import { protectEducator } from '../middleware/authmiddleware.js';


const educatorRouter = express.Router()


//Add Educator Role
educatorRouter.get('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course', upload.single('image', protectEducator, addCourse))
educatorRouter.get('/courses', protectEducator, getEducatorCourse)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)



export default educatorRouter;
