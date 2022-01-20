import "./filtermenu.css";
import React, { useState, useEffect } from "react";

import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ptLocale from 'date-fns/locale/pt';
import DatePicker from "@mui/lab/DatePicker";


const FilterMenu = () => {
  const [startDate, setStartDate] = useState(new Date(2021, 4, 6));
  const [endDate, setEndDate] = useState(new Date(2021, 11, 17));

  let newEndDate = null;
  let newStartDate = null;

  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    newStartDate = urlParams.get("startDate");
    if (newStartDate !== null) {
      newStartDate = newStartDate.replace(".0Z", "");
      for (var i = 0; i < 10; i++) {
        newStartDate = newStartDate.replace("-" + i + "-", "-0" + i + "-");
        newStartDate = newStartDate.replace("-" + i + "T", "-0" + i + "T");
      }
      setStartDate(new Date(newStartDate))
    }

    newEndDate = urlParams.get("endDate");
    if (newEndDate !== null) {
      newEndDate = newEndDate.replace(".0Z", "");
      for (var i = 0; i < 10; i++) {
        newEndDate = newEndDate.replace("-" + i + "-", "-0" + i + "-");
        newEndDate = newEndDate.replace("-" + i + "T", "-0" + i + "T");
      }
      setEndDate(new Date(newEndDate))
      
    }
  }, []);
  

  return (
    <Container maxWidth="xl">
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
        <DatePicker
        sx={{
      marginBottom: 2
    }}
          size="small"
          label="Start Date"
          value={startDate}
          minDate={new Date(2021, 4, 6)}
          maxDate={new Date(2021, 11, 17)} 
          onChange={(date) => {
            let date_str_start = "" + date.getUTCFullYear();
            date_str_start += "-" + (date.getUTCMonth() + 1);
            date_str_start += "-" + (date.getUTCDate() + 1);
            date_str_start += "T" + date.toTimeString().split(" ")[0] + ".0Z"
              
            const queryString = window.location.search;    
            var urlParams = new URLSearchParams(queryString);
            urlParams.set("startDate", date_str_start);

            /* setStartDate(new Date(newStartDate)); */
            window.location.href = window.location.href.split("?")[0] + "?" + urlParams.toString();

            
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
        <DatePicker
        sx={{
      marginBottom: 2
    }}
          size="small"
          label="End Date"
          margin="dense" 
          value={endDate}
          onChange={(date) => {

            var date_str_end = "" + date.getUTCFullYear();
            date_str_end += "-" + (date.getUTCMonth() + 1);
            date_str_end += "-" +  (date.getUTCDate() + 1);
            date_str_end += "T" + date.toTimeString().split(" ")[0] + ".0Z"
              
            const queryString = window.location.search;    
            let urlParams = new URLSearchParams(queryString);
            urlParams.set("endDate", date_str_end);

            window.location.href = window.location.href.split("?")[0] + "?" + urlParams.toString();
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default FilterMenu;
