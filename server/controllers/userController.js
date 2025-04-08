import User from "../models/User.js"
import { Purchase } from "../models/Purchase.js";
import stripe from "stripe";
import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";

// Get User Data
export const getUserData = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)

        if(!user){
            return res.json({ success: false, message: 'User Not Found' })
        }

        res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

// User Enrolled Courses with Lecture Links
export const userEnrolledCourses = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate('enrolledCourses')

      res.json({success: true, userEnrolledCourses: userData.userEnrolledCourses})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Purchase Course
export const purchaseCourse = async (req, res)=>{
    try {
     const { courseId } = req.body
     const { origin } = req.headers
     const userId = req.auth.userId
     const userData = await User.findById(userId)
     const courseData = await Course.findById(courseId) 


     if(!userData  ||  !courseData){
         return res.json({ success: false, message: 'Data Not Found' })
     }

     const purchaseData = {
         courseId: courseData._id,
         userId,
         amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed
         (2),
     }

     const newPurchase = await purchaseCourse.create(purchaseData)

     //Stripe Gateway Initiate
     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

     const currency = process.env.CURRENCY.toLowerCase()

     //Creating line items for stripe
     const line_items = [{
        price_data:{
            currency,
            product_data: {
                name: courseData.courseTitle
            },
            unit_amount: Math.floor(newPurchase.amount) * 100
        },
        quantity: 1 
     }]

     const session = await stripeInstance.checkout.sessions.created({
        success_url:`${origin}/loading/my-enrollments`,
        cancel_url:`${origin}/`,
        line_items: line_items,
        node: `payment`,
        metadata: {
            purchaseId: newPurchase._id.toString()
        }
     })

     res.json({success: true, session_url: session.url})


    } catch (error) {
        res.json({success: false, message: error.message });


    }
}

// Update User Course Progress
const updateUserCourseProgress = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body
        const ProgressData = await CourseProgress.findOne({userId, courseId })

        if(ProgressData){
            if(ProgressData.lectureCompleted.includes(lectureId)){
                return res.json({success: true, message: 'Lecture Already Completed'})
            }

            ProgressData.lectureCompleted.push(lectureId)
            await ProgressData.save()
        } else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lecture]
            })
        }

        res.json({success: true, message: 'Progress Update'})

    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

// get User course Progress
export const getUserCourseProgress = async (req, res) =>{
    try {
        const userId = req.auth.userId
        const { courseId } = req.body
        const ProgressData = await CourseProgress.findOne({userId, courseId })
        res.json({success: true, ProgressData})

    } catch (error) {
      res.json({success: false, message: error.message })
    }
}

// Add a Rating to Course
 
export const addUserRating = async()=>{
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if(!courseId || !userId || !rating || rating < 1 || rating > 5){
        return res.json({ success: false, message: 'Invalid Detail' });
    }

    try {
        const course = await Course.findById(courseId);

        if(!course){
            return res.json({ success: false, message: 'Course not found.'});
        }

        const user = await User.findById(userId);

        if(!user || user.enrolledCourses.includes(courseId)){
            return res.json({ success: false, message: 'User has not purchased this course.'});
        }

        const existingRatingIndex = course.courseRatings.findById(r => r.userId === userId)

        if(existingRatingIndex > -1){
            course.courseRatings[existingRatingIndex].rating = rating;
        }else{
            course.courseRatings.push({userId, rating});
        }
        await course.save();

        return res.json({ success: true, message: 'Rating added'})

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}
 