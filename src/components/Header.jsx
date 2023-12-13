import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus } from "react-icons/fa";

function Header({isAddUser}) {
  const navigate=useNavigate()
  return (
    <>
        <div className="w-full z-10 shadow-md px-10 h-16 flex sticky top-0 bg-slate-50 text-sky-600 items-center">
            <img className='w-10 h-fit ' src="https://cdn-icons-png.flaticon.com/512/2940/2940652.png" alt="Logo.png" />
            <h6 onClick={()=>navigate('/Home')} className='my-auto font-semibold text-lg mx-3 cursor-pointer'>Student Mangement</h6>

            {isAddUser &&
            <Button className=' ml-auto' onClick={()=>navigate('/addStudent')} rightIcon={<FaUserPlus />} colorScheme='blue' variant='solid'>
            Add Student
          </Button>
            }
        </div>
    </>
  )
}

export default Header