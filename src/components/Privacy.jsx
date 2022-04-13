import React, { useState } from 'react';
import Switch from './Switch'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import './privacy.scss'

const Privacy = (props) => {
  const [collape_one, setCollapseOne] = useState(false);
  const [collape_two, setCollapseTwo] = useState(false);

  return (
    
    <div>
      <div className="privacy--wrapper" >
        <div className='privacy--curtain'></div>
        <div className="container privacy">
          <a className="closes" onClick={event => { props.display(false, 'modal') }}>
            <FontAwesomeIcon icon={faTimes}/>
          </a>
          <div className="row">
            <div className="col-12 privacy--overview">
              <h5 className="privacy--title">PRIVACY OVERVIEW</h5>
              <div className="text-box">
                <p>
                  This website uses cookies to improve your experience while you navigate through the site. Cookies are categorised as mandatory (necessary) and optional. Mandatory cookies are stored on your browser as they are essential for the working of basic functionalities of the website. We also use third-party cookies, that help us analyze and understand how you use this website. These are the optional cookies that will be stored in your browser only with your consent. You also have the option to opt-out of these cookies. But opting out of some of these cookies may have an effect on your browsing experience.
                </p>
              </div>
              <a href="/static/dist/pdf/Black-Box_Privacy_Policy_Sept21v1.pdf" target="blank" className="policy">Privacy policy<i className="fas fa-external-link-alt"></i></a>
              <div className="collaps-btn">
                <a className="trigger" onClick={event => { setCollapseOne(!collape_one) }}></a>
                <span>
                  {collape_one ?
                    <i className="fas fa-chevron-up"></i> :
                    <i className="fas fa-chevron-down"></i>
                  }
                  <label>Mandatory </label>
                  <span className="indicator">Always enabled</span>
                </span>
              </div>
              {
                collape_one &&
                  <div className="collaps-content" >
                    <p>
                      Necessary cookies are essential for the website to function properly. This category only includes cookies that ensures basic functionalities and security features of the website. These cookies do not store any personal information.
                    </p>
                  </div> 
              }
              <div className="collaps-btn">
                <a className="trigger"
                  onClick={event => {
                    setCollapseTwo(!collape_two)
                  }}
                ></a>
                <span>
                  {
                    collape_two ?
                      <i className="fas fa-chevron-up"></i> :
                      <i className="fas fa-chevron-down"></i>
                  }
                  <label>Optional</label>
                  <span className={props.toggleState ? "note" :"note disabled"}>{props.toggleState ? "Enabled" : "Disabled"}</span> <span className="indicator">  <Switch handleToggle={props.handleToggle} toggleState={props.toggleState}/></span>
                </span>
              </div>
              {
                collape_two &&
                  <div className="collaps-content" >
                    <p>
                      Cookies that may not be essential for the website to function and that are used specifically
                      to collect user personal data via analytics, ads and other embedded content (such a <a href='https://analytics.google.com/analytics/web/provision/#/provision' target='_blank'>Google Analytics</a> and <a href='https://www.hotjar.com/' target='_blank'>Hotjar</a>) are termed as non-necessary, or optional cookies. It is mandatory to
                      request and receive user consent prior to running these cookies on your website.
                    </p>
                  </div>
              }
            </div>
          </div>
          <Button className="btn btn_secondary ml-auto mr-0" onClick={event => { props.display(false) }}>Accept</Button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;