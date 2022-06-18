import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; //   Chart.js 3 is tree-shakeable, so it necessary to import and register the controllers, 
                                   //   elements, scales, and plugins you're going to use
import { Typography, Box } from '@mui/material';
import moment from 'moment';


export default function BarChart({ pastYearOrders }) {
    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonthIndex = Months.indexOf(moment(Date.now()).format('MMMM'));
    const timeline = [];
    const profits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //  working backwards from current month, add a years worth of months to timeline
    for(let k = currentMonthIndex; k >= 0; k--) {
        timeline.push(Months[k]);
    }
    for(let l = 11; l > currentMonthIndex; l--) {
        timeline.push(Months[l]);
    }

    for(let i = 0; i < pastYearOrders?.length; i++) {
        const timelineIndex = moment(pastYearOrders[i]?.created_at).format('MMMM'); //  gets the month that the order was created, e.g. 'June'
        
        profits[ timeline.indexOf(timelineIndex) ] += pastYearOrders[i]?.orderTotal;  //  get the index of that month inside of timeline and then sum up the value at that index inside of sales
    }

    const data3 = {
        labels: timeline,
        datasets: [{
            label: 'Monthly Profits ($)',
            data: profits,
            backgroundColor: '#D87D4A'
        }]
    }

    const options3 = {
        scales: {
            x: {
                reverse: true
            }
        }
    }

    return (
        <div className='profits-chart' style={{ marginBottom: '2rem', backgroundColor: 'white', borderRadius: '7px', padding: '1rem' }}>
            <Box className='chart-header'>
                <Typography textAlign='center' fontWeight={600}>Past Year Monthly Profits </Typography>
            </Box>

            <Bar data={data3} options={options3} />
        </div>
    )
}