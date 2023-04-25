import {React, useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AsteroidHome = () => {

    const [ startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleEndDate = (e) => {
      const startD = e.target.value;
      console.log(startD)
    }

    const handleStartDate = (e) => {
      const endD =  e.target.value;
      console.log(endD)
    }

    
    
    return (
       <div className='container'>
        <h2 className='text-center'>Welcome Earthlings</h2>
        <div className='d-flex justify-content-around'>
           <div className='container'><span>Start Date</span> <input className='w-25 h-50' type='date' value={startDate} onChange={(e) => handleStartDate(e)}/></div>
           <div className='container'><span>End Date</span> <input className='w-25 h-50' type='date' value={endDate} onChange={(e) => handleEndDate(e)}/></div>
            <button type='button' className='btn btn-success w-25 h-50'>Submit</button>
        </div>
       </div>
    )
}

export {AsteroidHome};