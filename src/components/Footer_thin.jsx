import React, { Fragment, useEffect, useState } from 'react';
import Cookies from './Cookies';
import $ from 'jquery';
import './footer_thin.scss';

const Footer_mobile_light = (props) => {

  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(false)

  // Get the currect date
  var a = new Date();
  var b = a.getFullYear();
  const [c] = useState(b);

  const showModal = (display, time) => {
    if (display) {
      setShowPrivacyModal(true);
      toggleScroll();
    }
    // Close modal but not banner || Used for when user closes modal but doesn't accept // needs to keep cookie banner active with same state
    else if (display == false && time == 'modal'){
      setShowPrivacyModal(false);
      toggleScroll();
    }
    // Used for when user accepts and closes cookie banner completely
    else {
      setShowPrivacyModal(false);
      toggleScroll();
      showBanner(false)
    }
  }
  
  const showBanner = (display) => {
    setShowPrivacyBanner(display)
  }

    // Add or remove no-scroll toggle on viewport
    const toggleScroll = () => {
      $('html').toggleClass('no-scroll')
    }

  return (
    <Fragment>
    <Cookies showModal={showModal} showBanner={showBanner} showPrivacyModal={showPrivacyModal} showPrivacyBanner={showPrivacyBanner}/>
    <footer className={["container-fluid footer_thin " + props.className]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 info-menu">
                <span className="copyright">
                  <a href="/Black-Box_Privacy_Policy_April22v1.pdf" target="blank">privacy policy</a> · 
                   <a onClick={event => {showModal(true)}}>cookie settings</a>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </Fragment>
  )
}

export default Footer_mobile_light;