// MyDatePicker.js
import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ name = "", setDate }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  // Set the date in the parent component
  const handleDateChange = (date) => {
    setValue(date);
    setDate(date);
  };

  return (
    <div>
      <DatePicker {...field} selected={value} onChange={handleDateChange} />
    </div>
  );
};

export default MyDatePicker;
