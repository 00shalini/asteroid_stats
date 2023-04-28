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
    const [loading, setLoading] = useState(false);

    const asteroidLength= [];
    const fastestAsteroid =[];
    const closestAsteroid = [];
    const averageSizeOfAsteroid = [];
    const averageSizeOfAsteroidOfAllAsteroids = [];
    const asteroidData = []
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
            setLoading(true)
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`); // Replace with your API endpoint
            const data = await response.json();
            
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
          } finally {
            setLoading(false)
          }
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Asteroid Data Bar chart',
          },
        },
      };
      
      for (var i = 0; i< labels.length ; i++){
        asteroidLength.push(data.near_earth_objects[labels[i]].length)
        var asteroid_object = data.near_earth_objects[labels[i]]
        // console.log(asteroid_object)
         var max_array = [];
         var min_dis = [];

         for ( var j=0 ; j< asteroid_object.length ; j++){
            max_array.push(asteroid_object[j].close_approach_data[0].relative_velocity.kilometers_per_hour)
            min_dis.push(asteroid_object[j].close_approach_data[0].miss_distance.kilometers);
            var dia_max_for_one_aster = asteroid_object[j].estimated_diameter.kilometers.estimated_diameter_max;
            var dia_min_for_one_aster = asteroid_object[j].estimated_diameter.kilometers.estimated_diameter_min;

            var average_dia_for_one_aster = (dia_max_for_one_aster+dia_min_for_one_aster)/2;
            averageSizeOfAsteroidOfAllAsteroids.push(average_dia_for_one_aster)
       }
       var max = Math.max(...max_array)
       var min = Math.min(...min_dis);
       
       var averageSizeOfAsteroidOfOneAsteroid =  averageSizeOfAsteroidOfAllAsteroids.reduce((a,b) => a+b,0)/ averageSizeOfAsteroidOfAllAsteroids.length;
      
       fastestAsteroid.push(max);  
       closestAsteroid.push(min);
       averageSizeOfAsteroid.push(averageSizeOfAsteroidOfOneAsteroid)

       
    }

    
     
       const data1 = {
        labels,
        datasets: [
          {
            label: 'No. of asteroids',
            data: asteroidLength?.map((item) => item),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
         
          
        ],
      };

      const data2 = {
        labels,
        datasets: [
          {
            label: 'Fastest Asteroid in km/h',
            data: fastestAsteroid?.map((item) => item),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          
          
        ],
      };

      const data3 = {
        labels,
        datasets: [
         
          {
            label: 'Closest Asteroid',
            data: closestAsteroid?.map((item) => item),
            backgroundColor: 'rgba(22, 105, 142, 0.5)',
          },
          
          
        ],
      };

      const data4 = {
        labels,
        datasets: [
         
          {
            label: 'Average Size of Asteroid in kms',
            data: averageSizeOfAsteroid?.map((item) => item ),
            backgroundColor: 'rgba(177, 99, 132, 0.5)',
          },
          
        ],
      };
      
    return (
       <div className='container'>
        <h2 className='text-center fw-semibold' style={{margin:30}}>Welcome Earthlings</h2>
        <div className='d-flex justify-content-around'>
           <div><span className='fw-semibold'>Start Date</span> <input className='w-70 h-60' type='date' value={startDate} name='startdate' onChange={(e) => handleStartDate(e)}/></div>
           <div><span className='fw-semibold'>End Date</span> <input className='w-70 h-60' type='date' value={endDate} name='enddate' onChange={(e) => handleEndDate(e)}/></div>
            <button type='button' className='btn btn-success w-25 h-50' onClick={() => getAsteroidStats()}>Submit</button>
        </div>
        <div style={{marginTop:20}}>
            <ul className='list-group fw-bolder'>Instructions
               <li class="list-group-item list-group-item-warning">The data will took some to load</li>
               <li class="list-group-item list-group-item-info">You can see max of 8 data</li>
            </ul>
        </div>
        <div class="spinner-border" style={{width: '3rem', height: '3rem',display : loading? 'block': 'none', marginTop:50, marginLeft:600 }} role="status">
           <span class="visually-hidden">Loading...</span>
        </div> 
        <div style={{display:'flex',maxWidth:1300,flexWrap:'wrap',justifyContent:'space-between',margin:10}}>
           
            <Bar options={options} data={data1}  style={{maxHeight:400,minHeight:400,border:'2px solid gray', marginTop:30, maxWidth:600,minWidth:600 }}/>
            <Bar options={options} data={data2}  style={{maxHeight:400,minHeight:400,border:'2px solid gray', marginTop:30, maxWidth:600,minWidth:600 }}/>
            <Bar options={options} data={data3}  style={{maxHeight:400,minHeight:400,border:'2px solid gray', marginTop:30, maxWidth:600,minWidth:600 }}/>
            <Bar options={options} data={data4}  style={{maxHeight:400,minHeight:400,border:'2px solid gray', marginTop:30, maxWidth:600,minWidth:600 }}/>
        </div>
       
        
       </div>
    )
}

export {AsteroidHome};