import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "reducers/application";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

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

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        dispatch({ type: SET_INTERVIEW,
          id: id,
          interview: interview
        });
      })
  }

  const cancelInterview = function(id, interview) {
  
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
