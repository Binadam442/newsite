import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import Courselist from './pages/student/Courselist'
import Coursedetail from './pages/student/Coursedetail'
import Myenrolment from './pages/student/Myenrolment'
import Player from './pages/student/Player'
import Educator from './pages/educator/Educator'
import Loading from './components/student/Loading'
import Addcourse from './pages/educator/Addcourse'
import Dashboard from './pages/educator/Dashboard'
import Mycourse from './pages/educator/Mycourse'
import StudentEnroled from './pages/educator/StudentEnroled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";
const App = () => {

    const isEducatorRoute = useMatch('/educator/*')


    return (
        <div className='text-default min-h-screen bg-white'>
            {!isEducatorRoute && <Navbar />}

            
            <Routes>
             <Route path='/' element={<Home />}/>
             <Route path='/Courselist/:input' element={<Courselist />}/>
             <Route path='/Courselist' element={<Courselist />}/>
             <Route path='/Course/:id' element={<Coursedetail />}/>
             <Route path='/Myenrolment' element={<Myenrolment />}/>
             <Route path='/Player/:courseId' element={<Player />}/>
             <Route path='/Loading/:path' element={<Loading />}/>
             <Route path='/educator' element={<Educator />}>
                   <Route path='/educator' element={<Dashboard />}/>
                   <Route path='add-course' element={<Addcourse />}/>
                   <Route path='mycourse' element={<Mycourse />}/>
                   <Route path='student-enroled' element={<StudentEnroled />}/>
             </Route>
            </Routes>

        </div>
    )
}

export default App