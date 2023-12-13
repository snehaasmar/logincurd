import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'


function Phone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div>
      <label>
           <br />
        <PhoneInput  inputStyle={{width:'490px',marginTop:'15px'}}
        country={'us'}
        value={phoneNumber}
         onChange={handleChange} 
         inputProps={
            {
                required:true,
            }
         }/>
      </label>
      {!valid && <p className='text-danger'>Enter the valid phoneNumber </p>}
    </div>
  );
}

export default Phone;
