import React, { useState, useEffect } from 'react';
import Privacy from './Privacy';
import $ from 'jquery';
import Button from './Button'
import './cookies.scss'


const Cookies = (props) => {

  const [toggleState, setToggleState] = useState(true)


  // On initial load
  useEffect (() => {  
    setTimeout(() => {
      props.showBanner(true);
    }, 2000)
  }, [])

  const handleToggle = () => {
    //Set off cookies 
    var ga = document.getElementById('google-analytics');
    var hotjar = document.getElementById('hotjar');

    if (toggleState == true){
      ga.type = "text/plain";
      hotjar.type = "text/plain";
    }
    else {
      ga.type = "text/javascript";
      hotjar.type = "text/javascript";
    }
    
    setToggleState(prevState => !prevState);
    
  }



  return (
    <>
      {props.showPrivacyModal && <Privacy display={props.showModal} toggleState={toggleState} handleToggle={handleToggle} /> }

      {props.showPrivacyBanner &&

        <div className="cookies show-cookie-container" >
          <div className="container">
            <div className="row">
              <div className="col-md-7 d-flex align-items-center">
                <p>This site uses cookies to create a better experience for you. Click settings to disable them.</p>
              </div>
              <div className="col-md-5 text-right pr-0">
                <Button className="btn--settings btn_link" onClick={event => {props.showModal(true)}}>Cookie Settings</Button>
                <Button className="btn--accept" onClick={event => {props.showBanner(false)}}>Accept</Button>
              </div>
            </div>
          </div>
        </div> }
    </>
  );
};

export default Cookies;