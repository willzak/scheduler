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
    return null;
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
  if (!day) {
    return [];
  }
  
  const interviewersForDay = [];
  const { days, appointments, interviewers } = state;

  const selectedDays = days.filter(dayItem => dayItem.name === day);
  const [ selectedDay ] = selectedDays;
  if (selectedDay === undefined) {
    return [];
  }
  const schedule = selectedDay.appointments;
  let interviewerIDs = [];

  //get interviewer IDs into one array
  for (let item of schedule) {
    let instance = appointments[item];
    if (instance.interview) {
      interviewerIDs.push(instance.interview.interviewer);
    }
  }

  for (let num of interviewerIDs) {
    interviewersForDay.push(interviewers[num]);
  }

  return interviewersForDay;
}