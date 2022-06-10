import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; //   Chart.js 3 is tree-shakeable, so it necessary to import and register the controllers, 
                                   //   elements, scales, and plugins you're going to use
import { Typography, Box } from '@mui/material';
import moment from 'moment';


export default function BarChart({ pastYearOrders }) {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'My first Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderWidth: 1
        }]
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    const orderTimeStamps = [];
    const ordersPrices = [];
    const times = [];

    /* for(let i = 0; i < pastYearOrders?.length; i++) {
        orderTimeStamps.push(moment(pastYearOrders[i]?.created_at).format('MMMM YYYY'));
        ordersPrices.push(pastYearOrders[i]?.orderTotal);
    } */

    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monts = [];
    const pris = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    console.log('index of current month: ', Months.indexOf(moment(Date.now()).format('MMMM')))
    const currentMonthIndex = Months.indexOf(moment(Date.now()).format('MMMM'));
    //const currentMonthIndex = 4;
    const timeline = [];
    const sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(let k = currentMonthIndex; k >= 0; k--) {
        timeline.push(Months[k])
    }
    for(let l = 11; l > currentMonthIndex; l--) {
        timeline.push(Months[l])
    }

    console.log(timeline)


    /* monts.push(Months[5])
    monts.push(Months[4])
    monts.push(Months[3])
    monts.push(Months[2])
    monts.push(Months[1])
    monts.push(Months[0])
    monts.push(Months[11])
    monts.push(Months[10])
    monts.push(Months[9])
    monts.push(Months[8])
    monts.push(Months[7])
    monts.push(Months[6]) */
    //console.log('orders', pastYearOrders)
    //console.log(orderTimeStamps, ordersPrices)
    //console.log(moment(Date.now()).format('MMMM YYYY'))
    //console.log(monts)

    /* for(let i = 0; i < monts.length; i++) {
        for(let j = 0; j < pastYearOrders?.length; j++) {
            if(moment(pastYearOrders[j]?.created_at).format('MMMM') === monts[i]) {
                pris[i] += pastYearOrders[j]?.orderTotal
            }
        }
    } */

    for(let i = 0; i < timeline.length; i++) {
        for(let j = 0; j < pastYearOrders?.length; j++) {
            if(moment(pastYearOrders[j]?.created_at).format('MMMM') === timeline[i]) {
                sales[i] += pastYearOrders[j]?.orderTotal
            }
        }
    }

    console.log(sales)
    

    //console.log('pris', pris)

    const data2 = {
        labels: orderTimeStamps,
        datasets: [{
            label: 'Sales',
            data: ordersPrices,
            fill: true
        }]
    }

    const options2 = {
        grouped: true
    }

    const data3 = {
        labels: timeline,
        datasets: [{
            label: 'sales',
            data: sales
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
        <>
            <Box className='chart-header'>
                <Typography>Bar Chart</Typography>
            </Box>

            {/* <Bar data={data} options={options} /> */}

            {/* <Bar data={data2} options={options2} /> */}

            <Bar data={data3} options={options3} />
        </>
    )
}