import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './filterbar.scss';
import Toggle from './toggle';
import Filter from './filter.svg'


const FilterBar = ({
  title,
  setToggleNeed,
  toggleNeed,
  setToggleResources,
  toggleResources,
  setToggleAssisted,
  toggleAssisted,
  setToggleHazard,
  toggleHazard,
  setToggleShelter,
  toggleShelter,
  setToggleFood,
  toggleFood,
  setToggleClothing,
  toggleClothing,
  setToggleSanitation,
  toggleSanitation,
  setToggleCommunications,
  toggleCommunications,
  setToggleElecricity,
  toggleElecricity,
  setToggleMissing,
  toggleMissing,
  setToggleOther,
  toggleOther
}) => {
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
          <span>{title}</span>
          <i className="filter"><img src={Filter}/></i>

        </div>
      </div>

      <div className="sidebar_left--panel container">
        <h3>Filter by:</h3>
          <div className='sidebar_left--toggle--container'>
            <p>Crisis/need</p>
          <Toggle class='crisis-need' id='1' onChange={setToggleNeed} toggle={toggleNeed} />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Resources</p>
          <Toggle class='resources' id='2' onChange={setToggleResources} toggle={toggleResources} />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Need assisted</p>
          <Toggle class='need-assisted' id='3' onChange={setToggleAssisted} toggle={toggleAssisted}  />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Hazard</p>
          <Toggle class='hazard' id='4'  onChange={setToggleHazard} toggle={toggleHazard}  />
          </div>
          <hr/>
        <h3>Category</h3>
        <div className='sidebar_left--toggle--container'>
            <p>Shelter</p>
          <Toggle class='catergory' id='5'  onChange={setToggleShelter} toggle={toggleShelter}  />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Food</p>
          <Toggle class='catergory' id='6'  onChange={setToggleFood} toggle={toggleFood}  />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Clothing</p>
          <Toggle class='catergory' id='7' onChange={setToggleClothing} toggle={toggleClothing} />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Sanitation</p>
          <Toggle class='catergory' id='8' onChange={setToggleSanitation} toggle={toggleSanitation} />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Communications</p>
          <Toggle class='catergory' id='9' onChange={setToggleCommunications} toggle={toggleCommunications} />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Elecricity (charging)</p>
          <Toggle class='catergory' id='10' onChange={setToggleElecricity} toggle={toggleElecricity} />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Missing person/s</p>
          <Toggle class='catergory' id='11' onChange={setToggleMissing} toggle={toggleMissing} />
          </div>
          <div className='sidebar_left--toggle--container'>
            <p>Other</p>
          <Toggle class='catergory' id='12' onChange={setToggleOther} toggle={toggleOther} />
          </div>
        {/**Need form */}

      </div>
    </div>

  );
}
export default FilterBar;