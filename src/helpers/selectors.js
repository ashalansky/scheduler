export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find(weekday => weekday.name === day);
  console.log(findDay)
  if (!findDay) {
    
    return [];
  }
  const returnedArray = findDay.appointments.map(id => state.appointments[id])
    return returnedArray;
}