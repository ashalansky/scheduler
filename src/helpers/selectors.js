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

const getInterviewersForDay = function(state, day) {
  const findDay = state.days.find(weekday => weekday.name === day);
  
  if (state.days.length === 0 || findDay === undefined) {  
    return [];
  }
  const returnedArray = findDay.interviewers.map(id => state.interviewers[id])
    return returnedArray;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }