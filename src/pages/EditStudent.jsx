import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editStudent } from '../Redux/Slices/studentSlice'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button, Stack, useDisclosure } from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Radio,
    RadioGroup,
} from '@chakra-ui/react'

function EditStudent() {
    // alertDialog
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const students = useSelector(state => state.studentKey)
    const [editIndex, setEditIndex] = useState(-1);
    const [student, setStudent] = useState({
        rollno: null,
        name: '',
        mail: '',
        department: '',
        address: '',
    })

    useEffect(() => {
        const studentRollNo = params.id; // Adjusting index
        setEditIndex(studentRollNo);
        if (studentRollNo && students.length > 0) {
            const existingStudent = students.find(stud => stud.rollno === studentRollNo)
            // console.log(existingStudent);
            setStudent({
                rollno: existingStudent.rollno,
                name: existingStudent.name,
                mail: existingStudent.mail,
                department: existingStudent.department,
                address: existingStudent.address,

            });
        }
    }, [params.id, students]);
    const handleEdit = () => {

        if (student.name === "" || student.mail === "" || student.address === "" || student.rollno === null || student.department === "") {
            onOpen();
            return
        }
        else {
            dispatch(editStudent({
                data: student,
            }))
            setEditIndex(0);
            navigate(-1)
        }

    }

    const handleDepartmentChange = (value) => {
        setStudent({ ...student, department: value });
    };
    // array of departments
    const departments = ['Computer Science','Physics','Mathematics']

    return (
        <>
            <div className="bg-slate-100 w-full h-full relative">
                <Button className='absolute top-8 left-10' onClick={() => navigate(-1)} leftIcon={<IoMdArrowRoundBack />} >
                    Back
                </Button>
                <div className='flex flex-col gap-3 w-full h-full  pt-36 items-center text-slate-500'>
                    <h2 className='text-3xl  text-slate-700 my-3'>Student Details</h2>
                    <input value={student.rollno} disabled onChange={(e) => setStudent({ ...student, rollno: e.target.value })}
                        placeholder='Enter Roll Number' type="number" className='md:w-2/6 w-5/6 shadow p-2 border-2 border-slate-300 outline-none rounded bg-slate-50  focus:outline-slate-300 hover:bg-yellow-50 active:border-2 active:border-yellow-100' />
                    <input value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        placeholder='Enter Student Name' type="text" className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' />
                    <input value={student.mail} onChange={(e) => setStudent({ ...student, mail: e.target.value })}
                        placeholder='Enter Student Mail' type="text" className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' />
                    {/* if needed input for department */}
                    {/* <input value={student.department} onChange={(e) => setStudent({ ...student, department: e.target.value })}
                        placeholder='Enter Student Department' type="text" className='md:w-2/6 w-5/6 shadow p-2 border-0 outline-none rounded bg-white  focus:outline-slate-300 hover:bg-slate-50' /> */}
                    <textarea value={student.address} onChange={(e) => setStudent({ ...student, address: e.target.value })}
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
                    <button onClick={handleEdit}
                        className="bg-blue-500 py-2 px-4 rounded text-white active:bg-blue-600">
                        Edit User</button>
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
                            Empty Fields!
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Fill all the fields.
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

export default EditStudent