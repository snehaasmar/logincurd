import { Container } from '@chakra-ui/react'
import React from 'react'
import "./Login.css"
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

 import Country from './Country';
 import Phone from './Phone';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom';






function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        state: '',
        country: '',
        zip: '',
      });
    
      const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address1:'',
        zip:'',
        
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        // Validate input and update errors
        validateInput(name, value);
      };
    
      
    
      const validateInput = (name, value) => {
        switch (name) {
          case 'firstname':
          case 'lastname':
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: value.length < 5 ? 'Minimum 5 characters required' : '',
            }));
            break;
          case 'email':
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: !isValidEmail(value) ? 'Invalid email address' : '',
            }));
            break;
          case 'address1':
            setErrors((prevErrors) => ({
              ...prevErrors,
              address1: value.length < 20 ? 'Minimum 20 characters required for address' : '',
            }));
            break;
          case 'zip':
            setErrors((prevErrors) => ({
              ...prevErrors,
              zip: isNaN(value) ? 'Zip code must contain only numbers' : '',
            }));
            break;
          default:
            break;
        }
      };
      
      
          
    
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate all fields before submitting
        const isFormValid = Object.values(errors).every((error) => !error);
    
        if (isFormValid) {
          // Perform form submission logic here
          console.log('Form submitted:', formData);
        } else {
          console.log('Form contains errors. Please fix them.');
        }
      };
    
    
      const [phoneNumber, setPhoneNumber] = useState('');
      const [valid, setValid] = useState(true);
    
      const handlePhoneChange = (value) => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value));
      };
      
    
      const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(phoneNumber);
      };
    
    

  return (
    <div>
        <center>

   
        <Container>
        <div className='one'>
            <h1 className=' login font-semibold ' >LOGIN</h1>
           
            </div>
            

            {/* <Row className="justify-content-center">
        <Col xs={12} md={6}> */}
          <form onSubmit={handleSubmit}>
          

          <MDBInput
 style={{marginTop:'20px'}}
  label=' First Name'
 
  id='firstname'
  type='text'
  name='firstname'
  value={formData.firstname}
  onChange={handleChange}
  onBlur={() => validateInput('firstname', formData.firstname)}
  width={'40px'}
 
/>
{errors.firstname && <p className="text-danger">{errors.firstname}</p>}


            <MDBInput style={{marginTop:'20px'}}
              label='Last Name'
              id='lastname'
              type='text'
              name='lastname'
              value={formData.lastname}
              onChange={handleChange}
              onBlur={() => validateInput('lastname', formData.lastname)}
            />
            {errors.lastname && <p className="text-danger">{errors.lastname}</p>}

            <MDBInput style={{marginTop:'20px'}}
              label='Email'
              id='typeEmail'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              onBlur={() => validateInput('email', formData.email)}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}

            {/* Include other form fields and validation as needed */}
 
              <Phone />
              
              <MDBInput style={{marginTop:'20px'}}
              label='Address 1'
              id='typeAddress'
              type='text'
              name='address1'
              value={formData.address1}
              onChange={handleChange}
              onBlur={() => validateInput('address1', formData.address1)}
            />
            {errors.address1 && <p className="text-danger">{errors.address1}</p>}

            <MDBInput style={{marginTop:'20px',marginBottom:'20px'}}
              label='Address 2(Optional)'
              id='typeAddress'
              type='text'
              name='address2'
              placeholder='Optional'
              value={formData.address2}
              onChange={handleChange}
              onBlur={() => validateInput('address2', formData.address2)}
            />
            <Country /> 
           
           
            <MDBInput
  style={{ marginTop: '20px' }}
  label='Zip Code'
  id='typeZipCode'
  type='text'
  name='zip'  // Change to 'zip'
  value={formData.zip}  // Change to 'zip'
  onChange={handleChange}
  onBlur={() => validateInput('zip', formData.zip)}  // Change to 'zip'
/>
{errors.zip && <p className="text-danger">{errors.zip}</p>}




            
            <center>
              <MDBBtn type='submit'
               className=' text-lg text-sky-600 active:text-sky-400 flex items-center'
               style={{ marginTop: '15px' }} onClick={() => navigate('/Home')}>
                Submit form
              </MDBBtn>
            </center>
          </form>
        {/* </Col>
      </Row> */}
                
 
     
        </Container>
        </center>
         
    </div>
  )
}

export default Login