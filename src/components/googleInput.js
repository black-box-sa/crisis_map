import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './google-input.scss'
const GoogleInput = (props) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if(value){
    //   props.getLocation(value.label)
    }
  }, [value])
    return(
        <GooglePlacesAutocomplete
        
        autocompletionRequest={{
          bounds: [
            { lat: -33.918861, lng: 18.423300 }
          ],
          componentRestrictions: {
          country: ['za'],
          }
        }}
        selectProps={{
          value,
          onChange: setValue,
          placeholder:"Enter Location"
        }}
        apiKey="AIzaSyCivMgKEzuRKyLBEooOHHGK7i7cmkWkFq8"
      />
    )
}

export default GoogleInput