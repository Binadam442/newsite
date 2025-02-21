import React from "react";
import Hero from '../../components/student/Hero'
import Companies from "../../components/student/Companies";
import Coursesection from "../../components/student/Coursesection";
import Testimonialsection from "../../components/student/Testimonialsection";
import Calltoaction from "../../components/student/Calltoaction";
import Footer from "../../components/student/Footer";

const Home = () => {
    return (
        <div className="flex flex-col items-center space-y-7 text-center">
            <Hero />
            <Companies />
            <Coursesection />
            <Testimonialsection />
            <Calltoaction />
            <Footer />
    
        </div>
    )
}

export default Home