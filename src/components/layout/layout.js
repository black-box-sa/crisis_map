import React, { Component, Fragment } from 'react';
import Sidebar from '../sidbar/sidebar'

// Default static menus to be passed in as props
const primaryMenu = [["dashboards", "#", "active"],["about","/#/about", ""]] // replaced urls with hash for disabled nav items
const secondaryMenu =[["login", "/login"]]
const socialMenu =[["https://www.instagram.com/black_box_durban/", "fab fa-instagram"], ["https://www.facebook.com/blackbox.io/", "fab fa-facebook-f"], ["https://www.linkedin.com/company/37061856/admin/", "fab fa-linkedin-in"]] // Link, Font Awesome Class
const logoPath = './../../../../static/dist/img/logo_city_ekurhuleni_header-nav.svg'

export class Layout extends Component {

  render() {
    return (

      // Using fragment as to not cause unnecessary DOM bloat
      <Fragment>
        <Sidebar/>
      </Fragment>
    )
  }
}