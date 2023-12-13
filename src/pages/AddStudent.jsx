import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStudents } from '../Redux/Slices/studentSlice'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, useDisclosure } from '@chakra-ui/react'
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Radio,
  RadioGroup
} from '@chakra-ui/react'

function AddStudent() {
  // alertDialog
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  // state for alertDialog
  const [userExist, setUserExist] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [student, setStudent] = useState({
    rollno: null,
    name: '',
    mail: '',
    department: '',
    address: '',
  })
  const studentsArray = useSelector(state => state.studentKey)
  const existingStudent = studentsArray.find(stud => stud.rollno === student.rollno)
  const handleAdd = () => {
    setUserExist(false)
    if (existingStudent) {
      setUserExist(true)
      onOpen();
      return
    };
    if (student.name === "" || student.mail === "" || student.address === "" || student.rollno === null || student.department === "") {
      setUserExist(false)
      onOpen();
      return
    }
    else {
      dispatch(addStudents(student))
      navigate('/Home')
    }

  }

  const handleDepartmentChange = (value) => {
    setStudent({ ...student, department: value });
  };
  // array of departments
  const departments = ['Computer Science','Physics','Mathematics']

  return (
    <>
      <div className="bg-slate-100 w-full h-full">
        <Button className='absolute top-8 left-10' onClick={() => navigate(`/Home`)} leftIcon={<IoMdArrowRoundBack />} >
          Back
        </Button>
        <div className='flex flex-col gap-3 w-full h-full  pt-36 items-center text-slate-500'>
          <h2 className='my-3 text-3xl font-semibold text-slate-600'>Student Details</h2>
          <input onChange={(e) => setStudent({ ...student, rollno: e.target.value })}
            placeholder='Enter Roll Number' type="number" className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' />
          <input onChange={(e) => setStudent({ ...student, name: e.target.value })}
            placeholder='Enter Student Name' type="text" className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' />
          <input onChange={(e) => setStudent({ ...student, mail: e.target.value })}
            placeholder='Enter Student Mail' type="text" className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' />
          {/* if needed input for department */}
          {/* <input onChange={(e)=>setStudent({...student,department:e.target.value})}
                     placeholder='Enter Student Department' type="text" className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' /> */}
          <textarea onChange={(e) => setStudent({ ...student, address: e.target.value })}
            placeholder='Enter Student Address' className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' />
          <RadioGroup  className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none text-slate-400 rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' 
           value={student.department} onChange={handleDepartmentChange}>
            <h3 className='text-lg text-slate-500 mb-1'>Department:</h3>
            <Stack direction='row' flexWrap={'wrap'}>
              {departments.length > 0 && departments.map((dpmnt,index) =>(
                <Radio colorScheme='linkedin' key={index}  value={dpmnt}>{dpmnt}</Radio>
                ))}
            </Stack>
          </RadioGroup>
          <button onClick={handleAdd}
            className="bg-blue-500 py-2 px-4 rounded text-white active:bg-blue-600 my-2">
            Add User</button>
        </div>
      </div>


      {/* alert dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {userExist ? 'Student already exist!' : 'Empty Fields!'}
            </AlertDialogHeader>

            <AlertDialogBody>
              {userExist ? `Student with Roll Number:${student.rollno} already exists` : 'Fill all the fields.'}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AddStudent