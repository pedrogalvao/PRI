import "./filtermenu.css";
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {
  faSearch,
  faImage,
  faNewspaper,
  faMapMarkerAlt,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const FilterMenu = () => {

  const queryString = window.location.search;
   
  const urlParams = new URLSearchParams(queryString);
  var newStartDate = urlParams.get("date")
  if (newStartDate !== null){
    newStartDate = newStartDate.replace(".0Z","")
    for (var i=0; i<10; i++) {
      newStartDate = newStartDate.replace("-"+i+"-","-0"+i+"-");
      newStartDate = newStartDate.replace("-"+i+"T","-0"+i+"T");
    }
    newStartDate = new Date(newStartDate);
  }


  return (
    <div className="filter-menu">
      <div className="filter-menu-items">
        {/* <NavLink
          className="filter-menu-item"
          to="/all"
          activeClassName="item-active"
        >
          <FontAwesomeIcon className="icon" icon={faSearch} />
          <span> All </span>
        </NavLink> */}
        {/* <NavLink
          to="/projects"
          activeClassName="item-active"
          className="filter-menu-item fmi"
        >
          <FontAwesomeIcon className="icon" icon={faBriefcase} />
          <span> Projects </span>
        </NavLink> */}
        {/* <NavLink
          className="filter-menu-item fmi"
          to="/images"
          activeClassName="item-active"
        >
          <FontAwesomeIcon className="icon" icon={faImage} />
          <span> Images </span>
        </NavLink> */}
        <NavLink
          className="filter-menu-item fmi"
          to="/blog"
          activeClassName="item-active"
        >
          <FontAwesomeIcon className="icon" icon={faNewspaper} />
          <span> News </span>
        </NavLink>
        {
          <DatePicker selected={newStartDate} onChange={
            (date) => {
              var date_str = "" + date.getUTCFullYear();
              date_str += "-" + (date.getUTCMonth() + 1);
              date_str += "-" + date.getUTCDate();
              date_str += "T" + date.toTimeString().split(" ")[0] + ".0Z"
              var prev_href = window.location.href;
              var splited = prev_href.split("?")
              window.location.href = splited[0] + "?date=" + date_str;
              /*const history = useHistory();              
              let path = document.querySelector(".search-input").value;
              console.log(path)*/
              //if (path) {
                //history.push(path);
                //history.go(0)
              //}
            }
          } value={newStartDate}></DatePicker>
        }

        {/* <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider> */}
        {/* <NavLink
          className="filter-menu-item"
          exact
          to="/maps"
          activeClassName="item-active"
        >
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
          <span> Maps </span>
        </NavLink> */}
      </div>
    </div>
  );
};

export default FilterMenu;
