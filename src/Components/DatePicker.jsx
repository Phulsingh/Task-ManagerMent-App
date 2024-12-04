import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CalendarModal({ selectedDate, onClose, onSelectDate }) {
  const [date, setDate] = useState(selectedDate);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onSelectDate(newDate);
    onClose(); // Close the modal after selecting the date
  };

  // Close the modal when clicking outside of the calendar modal
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="calendar-overlay" onClick={handleOverlayClick}>
      <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          inline
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    </div>
  );
}

export default CalendarModal;
