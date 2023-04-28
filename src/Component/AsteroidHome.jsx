import {React, useEffect, useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  )

  
const AsteroidHome = () => {

    const [ startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const  [labels, setLabel] = useState([]);
    const asteroidLength= [];

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
            setData(data); 
            
            var date_data = data.near_earth_objects
            if (date_data){
                var DateLabel  = Object.keys(date_data)
                 setLabel(DateLabel) 
            } else {
                console.log('data is not requested yet')
            }
            
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    useEffect(() => {
       
    },[]);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };
      
      
      for (var i = 0; i< labels.length ; i++){
        asteroidLength.push(data.near_earth_objects[labels[i]].length)
    }
    
       const datas = {
        labels,
        datasets: [
          {
            label: 'No. of asteroids',
            data: asteroidLength?.map((item) => item),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          
        ],
      };
      
    return (
       <div className='container'>
        <h2 className='text-center'>Welcome Earthlings</h2>
        <div className='d-flex justify-content-around'>
           <div><span>Start Date</span> <input className='w-25 h-50' type='date' value={startDate} name='startdate' onChange={(e) => handleStartDate(e)}/></div>
           <div><span>End Date</span> <input className='w-25 h-50' type='date' value={endDate} name='enddate' onChange={(e) => handleEndDate(e)}/></div>
            <button type='button' className='btn btn-success w-25 h-50' onClick={() => getAsteroidStats()}>Submit</button>
        </div>
        <div>
           
            <Bar options={options} data={datas} />
        </div>
       </div>
    )
}

export {AsteroidHome};