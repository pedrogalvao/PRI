import "./filtermenu.css";
import React, { useState } from "react";

import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const FilterMenu = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  var newStartDate = urlParams.get("startDate");
  if (newStartDate !== null) {
    newStartDate = newStartDate.replace(".0Z", "");
    for (var i = 0; i < 10; i++) {
      newStartDate = newStartDate.replace("-" + i + "-", "-0" + i + "-");
      newStartDate = newStartDate.replace("-" + i + "T", "-0" + i + "T");
    }
    newStartDate = new Date(newStartDate);
  }

  var newEndDate = urlParams.get("endDate");
  if (newEndDate !== null) {
    newEndDate = newEndDate.replace(".0Z", "");
    for (var i = 0; i < 10; i++) {
      newEndDate = newEndDate.replace("-" + i + "-", "-0" + i + "-");
      newEndDate = newEndDate.replace("-" + i + "T", "-0" + i + "T");
    }
    newEndDate = new Date(newEndDate);
  }

  var minDate = new Date(2021, 4, 6);
  var maxDate = new Date(2021, 11, 17);

  return (
    <Container maxWidth="xl" className="mt-4">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          size="small"
          label="Start Date"
          value={startDate}
          onChange={(newDate) => {
            setStartDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          size="small"
          label="End Date"
          margin="dense" 
          value={endDate}
          onChange={(newDate) => {
            setEndDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default FilterMenu;
