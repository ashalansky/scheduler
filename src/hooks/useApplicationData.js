import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return {  ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      let appointment = {}
      if (action.interview) {
        appointment = {...state.appointments[action.id], interview: { ...action.interview }}
      } else {
        appointment = {...state.appointments[action.id], interview: action.interview }
      }
      const appointments = {...state.appointments, [action.id]: appointment}
   
    const daysArray = state.days.map((day) => {
      for (let appointment of day.appointments) {
        if (action.id === appointment) {
          if (action.interview && !state.appointments[action.id].interview) {
            day.spots--;
          } else if (!action.interview && state.appointments[action.id].interview){
            day.spots++;
          }
        }
      }
      return day
    })
      return { ...state,  appointments, days: daysArray }
  }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}



export default function useApplicationData() {
  const [state, dispatch] = useReducer( reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day: day});

  useEffect(() => {
    const apiDays = axios.get("/api/days");
    const apiAppt = axios.get("/api/appointments");
    const apiInt = axios.get("/api/interviewers");
    
    Promise.all([apiDays, apiAppt, apiInt])
    .then((all)=> {
      dispatch({ type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, []);

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        dispatch({ type: SET_INTERVIEW,
          id: id,
          interview: interview
        });
      })
  }

  const cancelInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return axios.delete(`/api/appointments/${id}`, { interview })
    .then(response => {
      dispatch({ type: SET_INTERVIEW,
      id: id,
      interview: null});
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
