import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import Searchbar from "../../components/student/Searchbar";
import Coursecard from "../../components/student/Coursecard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const Courselist = () => {

const navigate = useNavigate();  //  Use useNavigate directly
const location = useLocation();  //  Use useLocation to get pathname
const {input} = useParams()
const {allCourses} = useContext(AppContext)
const [filteredCourse, setFilterCourse] = useState([])

useEffect(()=>{
    if(allCourses && allCourses.length > 0){
        const tempCourses = allCourses.slice()

        input ? 
          setFilterCourse(
            tempCourses.filter(
                item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilterCourse(tempCourses)
    }
},[allCourses, input])

    return (
        <>
        <div className="relative md:px-36 px-8 pt-20 text-left">
            <div className="flex md:flex-row flex-col gap-6 itemms-start justify-between w-full">
                <div>
                <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
                <p className="text-gray-500">
                    <span className="text-blue-600 cursor-pointer"
                    onClick={()=> navigate('/')}>Home</span> / <span>Course List</span>
                </p>
                </div>
                <Searchbar data={input}/>
            </div>
            
            { input && <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600">
                <p>{input}</p>
                <img src={assets.cross_icon} alt="" className="cursor-pointer" onClick={()=> 
                     navigate('/courselist')} />
            </div>

            }
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 1g:gird-cols-4 my-16 gap-3
            px-2 md:p-0" >
              {filteredCourse.map((course, index) => <Coursecard key={index} course={course}/>)}
            </div>
            
        </div>
        <Footer />
        </>
    )
}

export default Courselist