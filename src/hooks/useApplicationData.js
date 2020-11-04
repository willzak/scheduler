import { useState, useEffect } from 'react';
import axios from 'axios';

// These functions create and alter state of interviews, as well as make axios requests to the DB

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    }).catch(err => console.log(err))
  }, [state.appointments]) // will update the spots available when the appointments change
  
  const setDay = day => setState({ ...state, day });

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const res = await axios({
      url: `/api/appointments/${id}`,
      method: 'PUT',
      data: appointment
    }).catch(err => console.log(err))
  
    setState({...state, appointments});
  
    return res;
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const res = await axios.delete(`/api/appointments/${id}`);
    
    setState({...state, appointments});
  
    return res;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

export default useApplicationData;