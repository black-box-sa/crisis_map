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
    var gtm_header = document.getElementById('header-gtm');
    var gtm_body = document.getElementById('body-gtm');
    var userback = document.getElementById('userback-script');

    if (toggleState == true){
      gtm_header.type = "text/plain";
      userback.type = "text/plain";
    }
    else {
      gtm_header.type = "text/javascript";
      userback.type = "text/javascript";
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
              <div className="col-md-7">
                <p>This site uses cookies to create a better experience for you. Hopefully you’re okay with this, but if not, feel free to opt out.</p>
              </div>
              <div className="col-md-5 text-center">
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