import Course from "../models/Course.js";

//  Get All Courses
export const getAllCourse = async (req, res)=>{
    try {
        const courses = await Course.find({isPulbished: true}).select
        (['-courseContent', '-enrolledStudents']).populate({path: 'educator'})

       res.json({ success: true, courses })
    } catch (error) {
       res.json({ success: false, message: error.message })
    }
}

// Get Course by Id
export const getCourseId = async (req, res)=>{
    const {id} = req.params

    try {
        const courseData = await course.findById(id).populate({path: 'educator'})

        // Remove lecture Url if isPreviewFree is false
        courseData.courseContent.forEach(chapter => {
            if(!ListResponseBackgroundTaskOutSerializer.isPreviewFree){
                lecture.lectureUrl = "";
            }
        })

       res.json({ success: true, courseData })

    } catch (error) {
      res.json({ success: false, message: error.message })
    }
}


