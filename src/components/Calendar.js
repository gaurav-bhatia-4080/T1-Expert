import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRecoilState } from 'recoil';
import { getPredictionExtraDetails } from '../store/atoms/patientDetails';

const localizer = momentLocalizer(moment);

const MyBigCalendar = () => {
  // const [predExtraDetailsList, setPredExtraDetails]=useRecoilState(getPredictionExtraDetails);
  // const [predExtraDetailsList, setPredExtraDetails]=useRecoilState(getPredictionExtraDetails);

  const [events, setEvents] = useState([
    { title: 'Check Health', type: 'checkup', start: new Date(2024, 8, 22, 9, 0), end: new Date(2024, 8, 22, 11, 0) },
    { title: 'Check Health', type: 'health', start: new Date(2024, 8, 23, 8, 0), end: new Date(2024, 8, 23, 10, 0) },
    { title: 'Check Health', type: 'control', start: new Date(2024, 8, 25, 12, 0), end: new Date(2024, 8, 25, 2, 0) },

    { title: 'Check Health', type: 'health', start: new Date(2024, 8, 28, 7, 0), end: new Date(2024, 8, 28, 10, 0) },
    { title: 'Heart Check-Up', type: 'checkup', start: new Date(2024, 8, 27, 8, 0), end: new Date(2024, 8, 27, 10, 0) },
    { title: 'Physical Control', type: 'control', start: new Date(2024, 8, 26, 9, 0), end: new Date(2024, 8, 26, 11, 0) },
  ]);

  // Function to dynamically set style for events based on type
  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    let borderColor = '';

    // Customize styles based on event type
    switch (event.type) {
      case 'health':
        backgroundColor = '#fcd3fcb9';  // Gold color for health events
        borderColor = '#a506a5';      // Darker shade
        break;
      case 'checkup':
        backgroundColor = '#ccfdccbb';  // Coral color for checkup events
        borderColor = '#24b924';      // Darker coral
        break;
      case 'control':
        backgroundColor = '#b5e6fab4';  // SkyBlue color for control events
        borderColor = '#46c0f0';      // Darker blue
        break;
      default:
        backgroundColor = '#808080';  // Default to gray
    }

    // Return style object
    return {
      style: {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: 'black',
        borderRadius: '5px',
        borderWidth: '2px',
        padding: '5px',
      }
    };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 }}
      eventPropGetter={eventStyleGetter} 
    />
  );
};

export default MyBigCalendar;
