export function getAppointmentsForDay(state, day) {
  if (!day) {
    return [];
  }
  
  const appointmentsForDay = [];
  const { days, appointments } = state;

  const selectedDays = days.filter(dayItem => dayItem.name === day);
  const [ selectedDay ] = selectedDays;
  if (selectedDay === undefined) {
    return [];
  }
  const schedule = selectedDay.appointments;

  for (let app in appointments) {
    if (schedule.includes(Number(app))) {
      appointmentsForDay.push(appointments[app])
    }
  }
  
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    let appointmentData = null;
    return appointmentData;
  }

  const interviewerID = interview.interviewer;
  
  const interviewerData = state.interviewers[interviewerID];
  
  const appointmentData = {
    ...interview,
    interviewer: interviewerData
  };
  
  return(appointmentData);
}

export function getInterviewersForDay(state, day) {
  const interviewersForDay = [];
  const { days, interviewers } = state;
  const selectedDay = days.find(dayItem => dayItem.name === day);

  if (!day) {
    return interviewersForDay;
  }

  if (selectedDay === undefined) {
    return interviewersForDay;
  }
  const interviewerIDs = selectedDay.interviewers;
  
  for (let num of interviewerIDs) {
    if(!interviewersForDay.includes(interviewers[String(num)])) {
      interviewersForDay.push(interviewers[String(num)]);
    }
  }

  return interviewersForDay;
}