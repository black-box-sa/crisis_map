import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './sidebar.scss';
import './inputs.scss';
import './button.scss'

const Sidebar = (props) => {
    const [sidebar, setSidebar] = useState("");
    const [value, setValue] = useState('need');

  // Function that adjusts state to open or close sidebar by adding or removing the "open" class
  const sidebarTrigger = () => {
    if (sidebar) {
      setSidebar("")

    } else {
        setSidebar("open")
    }
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  }
    return (
      <div className={["sidebar_right "] + sidebar} id="sideBarleft">

        <div className="sidebar_right--tab">
            <div className="sidebar_right--tab--trigger" onClick={sidebarTrigger}>
            <span>{props.title}</span>
             <i className="circle"><FontAwesomeIcon icon={faChevronLeft}/></i> 

          </div>
        </div>

        <div className="sidebar_right--panel container">
         <h3>I have a:</h3>
        {value === 'need' ?  
              <select className='select-need' value={value} onChange={handleChange}>
              <option value="need">Need</option>
              <option value="resource">Resource</option>
          </select>
        : value === 'resource'   ?  
        <select className='select-resource' value={value} onChange={handleChange}>
            <option value="need">Need</option>
            <option value="resource">Resource</option>
        </select> : ''}
        {/**Need form */}
         {value === "need" ? 

        <form onSubmit=''>
                  <label>Phone number</label>
                  <input  className='text-field' onChange='' value='' type="text" id="name" placeholder='Phone Number' /><br/>
                  <label>Full name</label>
                  <input  className='text-field' onChange='' value='' type="text" id="name" placeholder='Full Name' /><br/>
                  <label>location</label>
                  <input  className='text-field' onChange='' value='' type="text" id="name" placeholder='Location / Address *' /><br/>
                   <label>Need type:</label>
                  <select className='select-need' value={value} onChange={handleChange}>
                    <option value="Shelter">Shelter</option>
                    <option value="Food">Food</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Communications">Communications (Airtime / data)</option>
                    <option value="Electricity">Electricity (charging)</option>
                </select><br/>
                <label>Need description</label>
                <textarea  name="" rows="4" cols="">  </textarea>
                <div className='d-flex'>
                    <input className='' type="checkbox" id="checkbox1" name="checkbox1" onChange=''/>
                    <span>I agree to making my
mobile number public to those wanting to reach out to me, and theses term's and conditions. </span>
                </div>
                <button type='submit'>Submit</button>
        </form>
        : value === "resource" ? 
        <form onSubmit=''>
        <label>Phone number</label>
        <input  className='text-field' onChange='' value='' type="text" id="name" placeholder='Phone Number' /><br/>
        <label>Full name</label>
        <input  className='text-field' onChange='' value='' type="text" id="name" placeholder='Full Name' /><br/>
        <label>location</label>
        <input  className='text-field' onChange='' value='' type="text" id="name" placeholder='Location / Address *' /><br/>
         <label>Resource type:</label>
        <select className='select-resource' value={value} onChange={handleChange}>
          <option value="Shelter">Shelter</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Communications">Communications (Airtime / data)</option>
          <option value="Electricity">Electricity (charging)</option>
      </select><br/>
      <label>Resource description</label>
      <textarea  name="" rows="4" cols="">  </textarea>
      <div className='d-flex'>
          <input className='' type="checkbox" id="checkbox1" name="checkbox1" onChange=''/>
          <span>I agree to making my
mobile number public to those wanting to reach out to me, and theses term's and conditions. </span>
      </div>
      <button type='submit'>Submit</button>
</form>
        : value === "log_need" ? 
        <form onSubmit=''>
          <label className='tag tag--need'>
            Need
          </label>
         <h1>Need Type</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
         <h4>Logged  By:</h4>
          <p>Name Surname</p>
        <label>Phone number</label>
        <input  className='text-field filled-in' onChange='' value='' type="text" id="name" placeholder='Phone Number' /><br/>
        <label>Location / Address</label>
        <input  className='text-field filled-in' onChange='' value='' type="text" id="name" placeholder='Location Address' /><br/>

      <label>Assistance Logged</label>
      <textarea className='filled-in empty'  name="" rows="4" cols=""></textarea>

      <a onClick={() => setValue('assist')}>I want to assist</a>
    </form>
        :  
        <form onSubmit=''>
          <label className='tag tag--resource'>Resource</label>
         <h1>Resource Type</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
         <h4>Logged  By:</h4>
          <p>Name Surname</p>
        <label>Phone number</label>
        <input  className='text-field filled-in' onChange='' value='' type="text" id="name" placeholder='Phone Number' /><br/>
        <label>Location / Address</label>
        <input  className='text-field filled-in' onChange='' value='' type="text" id="name" placeholder='Location Address' /><br/>

      <a>Assist</a>
    </form>
    }
        </div>
      </div>

    );
  }
  export default Sidebar;

  Sidebar.propTypes = {
  /**
   * Title text for the modal
   */
  title: PropTypes.string,
  /**
   * Accepts children components
   */
  children: PropTypes.element,
  /**
   * Accepts content as well, if preffered over children
   */
  content: PropTypes.string
};