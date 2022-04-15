import React, { Fragment, useEffect, useState } from 'react';
import Cookies from './Cookies';
import $ from 'jquery';
import './footer_thin.scss';
import Modal from './Modal';

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
    else if (display == false && time == 'modal') {
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
      <Cookies showModal={showModal} showBanner={showBanner} showPrivacyModal={showPrivacyModal} showPrivacyBanner={showPrivacyBanner} />
      <footer className={["container-fluid footer_thin " + props.className]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 info-menu">
                  <span className="copyright">
                    <Modal buttonLabel='about'>

                      <h3>About the tool</h3>
                      <p>The COVID-19 pandemic, civil unrest and flooding in KwaZulu Natal has illustrated the need for data-driven insights to help various stakeholders to find the necessary information to assist or be assisted in times of need. </p>

                      <p>Across KwaZulu Natal, important information is inaccessible to the public, or is difficult to locate, retrieve and analyse during a disaster. In some cases, the data simply does not exist yet. The Crisis Map serves to provide access to near real-time disaster-related information.</p>

                      <p>In so doing, the Crisis Map seeks to gather quality information to allow those needing assistance to connect with those with the ability to assist during a crisis.</p>

                      <h3>About the team</h3>
                      <p>This product is built and maintained by Black Box and PISTA:  </p>

                      <p><a href="https://black-box.io" target="blank">Black Box</a> is a product design and development company whose vision centres around the stewardship of African resources for African people, through the design and engineering of intuitive, human-centred digital tools.</p>

                      <p><a href="https://pista.co.za" target="blank">PISTA</a> is a research and design practice on a mission to create a better everyday life for people and  the planet. </p>
                      <p>This work is being done pro-bono, so we if you would like to contribute to it, please <a href="mailto:info@black-box.io?cc=hello@pista.co.za" target="blank">contact us</a></p>

                    </Modal> ·
                    <a href="mailto:info@black-box.io?cc=hello@pista.co.za" target="blank">contact</a> ·
                    <a href="/Black-Box_Privacy_Policy_April22v1.pdf" target="blank">privacy policy</a> ·
                    <a onClick={event => { showModal(true) }}>cookie settings</a>
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