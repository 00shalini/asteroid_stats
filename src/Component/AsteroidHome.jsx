import {React, useEffect, useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AsteroidHome = () => {

    const [ startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const API_KEY = 'flnlJxR2uZfnCMtnIiFTtcC1WfvbDlIqbk57aBbU';
    const handleStartDate = (e) => {
      const startD = e.target.value;
      setStartDate(startD);
    }

    const handleEndDate = (e) => {
      const endD =  e.target.value;
      setEndDate(endD)
    }

    const getAsteroidStats = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`); // Replace with your API endpoint
            const data = await response.json();
            console.log(data)
            //setData(data); // Set the fetched data in state
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    return (
       <div className='container'>
        <h2 className='text-center'>Welcome Earthlings</h2>
        <div className='d-flex justify-content-around'>
           <div><span>Start Date</span> <input className='w-25 h-50' type='date' value={startDate} name='startdate' onChange={(e) => handleStartDate(e)}/></div>
           <div><span>End Date</span> <input className='w-25 h-50' type='date' value={endDate} name='enddate' onChange={(e) => handleEndDate(e)}/></div>
            <button type='button' className='btn btn-success w-25 h-50' onClick={() => getAsteroidStats()}>Submit</button>
        </div>
       </div>
    )
}

export {AsteroidHome};