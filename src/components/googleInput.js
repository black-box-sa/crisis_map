import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './google-input.scss'
const GoogleInput = (props) => {
  const [value, setValue] = useState(props.address);
  useEffect(() => {
    if(props.address){
    //  props.getLocation(value.label)
    setValue(props.address)
    }
  }, [props.address])
    return(
        <GooglePlacesAutocomplete
        autocompletionRequest={{
          bounds: [
            { lat: -28.5305539 , lng: 30.8958242}
          ],
          fields: ["address_components", "geometry", "icon", "name"],
          componentRestrictions: {
          country: ['za'],
          }
        }}
        selectProps={{
          onChange: props.getLocation,
          placeholder:"Enter Location"
        }}
        apiKey="AIzaSyAsICHbBOfdz4fNJzAYWigBM7oI0hR9Iu8"
      />
    )
}

export default GoogleInput