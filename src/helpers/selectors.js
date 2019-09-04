const getAppointmentsForDay = function(state, day) {
  const findDay = state.days.find(weekday => weekday.name === day);
  
  if (!findDay) {  
    return [];
  }
  const returnedArray = findDay.appointments.map(id => state.appointments[id])
    return returnedArray;
}

const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObj = {};
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];

  return interviewObj;
}

module.exports = { getAppointmentsForDay, getInterview }