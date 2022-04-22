import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './filterbar.scss';
import Toggle from './toggle';
import Filter from './filter.svg'


const FilterBar = (props) => {
  const [sidebar, setSidebar] = useState("");


  // Function that adjusts state to open or close sidebar by adding or removing the "open" class
  const sidebarTrigger = () => {
    if (sidebar) {
      setSidebar("")

    } else {
      setSidebar("open")
    }
  }



  return (
    <div className={["sidebar_left "] + sidebar} id="sideBarleft">

      <div className="sidebar_left--tab">
        <div className="sidebar_left--tab--trigger" onClick={sidebarTrigger}>
          <span>{props.title}</span>
          <i className="filter"><img src={Filter}/></i>

        </div>
      </div>

      <div className="sidebar_left--panel container">
        <h3>Filter by:</h3>
          <div className='sidebar_left--toggle--container'>
            <p>Crisis/need</p>
          <Toggle class='crisis-need' id='1'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Resources</p>
          <Toggle class='resources' id='2'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Need assisted</p>
          <Toggle class='need-assisted' id='3'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Hazard</p>
          <Toggle class='hazard' id='4'/>
          </div>
          <hr/>
        <h3>Category</h3>
        <div className='sidebar_left--toggle--container'>
            <p>Shelter</p>
          <Toggle class='catergory' id='5'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Food</p>
          <Toggle class='catergory' id='6'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Clothing</p>
          <Toggle class='catergory' id='7'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Sanitation</p>
          <Toggle class='catergory' id='8'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Communications</p>
          <Toggle class='catergory' id='9'/>
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Elecricity (charging)</p>
          <Toggle class='catergory' id='10'/>
          </div>
        {/**Need form */}

      </div>
    </div>

  );
}
export default FilterBar;

FilterBar.propTypes = {
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