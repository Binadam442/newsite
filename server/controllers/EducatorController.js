import { clerkClient } from '@clerk/express'
import Course from '../models/Course'
import { v2 as cloudinary } from 'cloudinary'
import { Purchase } from '../models/Purchase'
import User from '..models/User.js'

// update role to educator
export const updateRoleToEducator = async (req, res)=>{
    try {
        const userId = requestAnimationFrame.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator', 
            }
        })

        res.json({ success: true, message: 'you can publish a course now' })

    } catch (error) {
        res.json({ success: false, message: error.message })  
    }
}

// Add New Course
export const addCourse = async (req, res)=>{
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId

        if(!imageFile){
            return res.json({ success: false, message: 'Thumbnail not Attached' })
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId
        const newCourse = await Course.create(parsedCourseData)
        const imageupload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageupload.secure_url
        await newCourse.save()

        res.json({ success: true, message: 'Course Added' })


    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

// Get Educator Course
export const getEducatorCourse = async (req, res)=>{
    try {
        const educator = req.auth.userId

       const courses = await Course.find({educator})
       res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Educator Dashboard Data ( Total Earning, Enrolled Students, No. of Courses)

const educatorDashboardData = async (req, res)=>{
    try {
       const educator = req.auth.userId;
       const courses = await Courses.length;
       const totalCourses = courses.length;

       const courseIds = courses.map(course => course._id);

       // Calculate total earnings from purchase
       const purchases = await Purchase.find({
        courseId: {$in: courseIds},
        status: 'completed'
       });

       const totalEarnings = purchases.reduce((sum, purchase)=> sum + purchase.amount, 0);

       // Collect unique enrolled student IDs with their course titles
       const enrolledStudentsData = [];
       for(const course of courses){
        const students = await User.find({
            _id: {$in: course.enrollledStudents}
        }, 'name imageUrl');

           students.forEach(student => {
              enrolledStudentsData.push({
                courseTitle: course.courseTitle,
                student
              });
           });

       }

       res.json({success: true, dashboardData: {
        totalEarnings, enrolledStudentsData, totalCourses
       }})


    } catch (error) {
        res.json({ succcess: false, message: error.message });

    }
}

// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req, res)=>{
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const courseIds = courses.map(course => course._id); 

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }));

        res.json({success: true, enrolledStudents})

    } catch (error) {
        res.json({ success: false, message: error.message });

    }

}