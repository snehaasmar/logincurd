import React, { useState } from 'react'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Button, Text, StackDivider, Box } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteStudents } from '../Redux/Slices/studentSlice';
import { MdBuild, MdDelete } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Lottie from 'react-lottie-player'
import studentLottieJSON from '../Assets/Lottie Animations/Animation - 1700895865350.json'

function ViewStudent() {
    const { id } = useParams()
    const studentsArray = useSelector(state => state.studentKey)
    const [student, setStudent] = useState(studentsArray.find(stud => stud.rollno === id))
    console.log(student);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <>
            <Button variant={'ghost'} colorScheme='blue' className='absolute top-8 left-10' onClick={() => navigate(-1)} leftIcon={<IoMdArrowRoundBack />} >
                Back
            </Button>
            <div className='py-2 px-10 md:px-44'>
                <h1 className='text-3xl font-mono font-bold text-sky-600 text-center my-10'>Student Details</h1>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    {/* <Image
                        objectFit='cover'
                        className='w-full md:w-2/5'
                        maxW={{ base: '100%', sm: '50%' }}
                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                        alt='Caffe Latte'
                    /> */}
                    <Lottie
                        loop
                        animationData={studentLottieJSON}
                        play
                        className='w-full md:w-7/12  object-cover'
                    />
                    <Stack className='w-full ml-5' >
                        <CardBody >


                            <Stack divider={<StackDivider />} spacing='4'>
                                <Heading size='md' className='mb-5'>{student.name}</Heading>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Roll Number
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {student.rollno}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Mail
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {student.mail}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Department
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {student.department}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Address
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {student.address}
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>

                        <CardFooter>
                            <Button onClick={() => navigate(`/editStudent/${id}`)} leftIcon={<MdBuild />} colorScheme='blue' variant='solid'>
                                Edit
                            </Button>
                            <Button ml={2} onClick={() => {dispatch(deleteStudents(student.rollno))
                            navigate('/')}} rightIcon={<MdDelete />} colorScheme='pink' variant='solid'>
                                Delete
                            </Button>
                        </CardFooter>
                    </Stack>
                </Card>
            </div>
        </>
    )
}

export default ViewStudent