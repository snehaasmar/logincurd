import { useState } from "react";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
  } from "react-country-state-city";
  import "react-country-state-city/dist/react-country-state-city.css";
  
  
  function Country() {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    return (
      <div>
        
        <CountrySelect
          onChange={(e) => {
            setCountryid(e.id);
          }}
          placeHolder="Select Country"
        />
      <br />
        <StateSelect 
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id);
          }}
          placeHolder="Select State"
        />
        <br />
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            console.log(e);
          }}
          placeHolder="Select City"
        />
       
      </div>
    );
  }
  export default Country