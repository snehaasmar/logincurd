import React, { useState } from 'react'
import StudentsCard from '../components/StudentsCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tilt } from 'react-tilt'
import { MdAdd } from 'react-icons/md'
import Header from '../components/Header'
import studentsImg from '../Assets/images/High School-rafiki.svg'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
} from '@chakra-ui/react'

const defaultOptions = {
    reverse: false,  // reverse the tilt direction
    max: 35,     // max tilt rotation (degrees)
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

function Home() {
    const navigate = useNavigate()
    const students = useSelector(state => state.studentKey)
    const [search, setSearch] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('All')
    // Filter students based on the search input
    // Filter students based on the selected department
    // this is for filtering students based on the selected department from the menu list
    const departmentFilteredStudents = selectedDepartment !== 'All'
    ? students.filter((student) => student.department === selectedDepartment)
    : students;
    
    // Apply search filter on department filtered students
    const filteredStudents = departmentFilteredStudents.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );
    // array of departments
    const departments = ['Computer Science','Physics','Mathematics']

    return (
        <>
            <Header isAddUser />
            <div className='w-full h-full bg-slate-100 p-6 '>
                {/* <h2 className='text-slate-600 text-3xl mb-5 text-center mx-auto'>Students List</h2> */}
                <div className='w-full mb-8 flex flex-row justify-center '>

                    <div className='md:w-2/5 w-5/6  bg-slate-50 outline-none border-2 border-slate-200 rounded p-2 focus:border-sky-300 flex items-center justify-around'>
                        <input type="text" placeholder='student name' value={search} onChange={(e) => setSearch(e.target.value)}
                            className=' placeholder:text-slate-400  bg-transparent outline-none border-none w-11/12 ' />
                        <FaSearch className='text-slate-400' />
                    </div>

                    <Menu >
                        {({ isOpen }) => (
                            <>
                                <MenuButton colorScheme='telegram' ml={3} isActive={isOpen} as={Button} rightIcon={<FaChevronDown />}>
                                    {selectedDepartment}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => {
                                        setSelectedDepartment('All')
                                    }}>All</MenuItem>
                                    {departments.length > 0 && departments.map((dpmnt,index)=>(
                                        <MenuItem key={index} onClick={() => {
                                            setSelectedDepartment(dpmnt)
                                        }}>{dpmnt}</MenuItem>
                                    ))}
                                </MenuList>
                            </>
                        )}
                    </Menu>


                </div>
                {
                    filteredStudents.length > 0 ?
                        <div className="grid md:grid-cols-4 md:grid-flow-row md:gap-4  grid-cols-1  grid-flow-row  gap-2">
                            {/* list of students */}
                            {
                                filteredStudents.length > 0 && filteredStudents.map((student, index) => (
                                    <Tilt key={index} options={defaultOptions} className='w-full h-full'>
                                        <StudentsCard index={index} student={student} />
                                    </Tilt>
                                ))
                            }
                        </div>
                        :
                        <div className=" flex flex-col items-center w-full">
                            <img className='w-3/12' src={studentsImg} alt="studentsimage.jpg" />
                            <p className='text-xl'>No students start adding one</p>
                            <button onClick={() => navigate('/addStudent')} className='bg-transparent text-lg text-sky-600 active:text-sky-400 flex items-center '>Add student <MdAdd /></button>
                        </div>
                }
            </div>
        </>
    )
}

export default Home