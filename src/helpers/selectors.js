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
  console.log(schedule)

  for (let app in appointments) {
    if (schedule.includes(Number(app))) {
      appointmentsForDay.push(appointments[app])
    }
  }

  return appointmentsForDay;
}