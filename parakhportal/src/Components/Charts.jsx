import React from 'react'
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip,ArcElement,  Filler,  RadialLinearScale,PointElement,LineElement, } from 'chart.js';
import {HStack,Box} from '@chakra-ui/react'
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
const Charts = () => {
    ChartJS.register(CategoryScale, RadialLinearScale,
        PointElement,
        LineElement,LinearScale, BarElement,Title,Tooltip,Legend,ArcElement, Filler, PointElement,);


        const data = {
            labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
            datasets: [
              {
                label: '# of Votes',
                data: [2, 9, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          };
    const barOption = {
        responsive: true,
        plugins: {
          legend: { position: "chartArea" },
          title: {
            display: true,
            text: "Modular Bar Chart",
          },
        },
      };
      
      const barData = {
        labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Product A",
            data: [ 20, 30, 40, 50, 60,70],
            backgroundColor: "green",
          },
          {
            label:'Product B',
            data:[15,20,25,40,45,60],
            backgroundColor:'blue'
          },
      
        ],
      
      };
      
     const doughnetData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };


      const pieData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
  return (
    <>

<Box w={"100%"} >
    <HStack w={"100%"} justifyContent={"space-between"}>
        <HStack w={"350px"}>
    <Doughnut data={doughnetData} /></HStack>
    <HStack w={"350px"}>
    <Pie data={pieData} />
    </HStack>
    </HStack>

    <HStack w={"100%"} justifyContent={"space-between"}>
        <HStack w={"300px"}>
    <Bar options={barOption} data={barData} /> </HStack>
    <HStack w={"50%"}>
    <Radar data={data} />
    </HStack>
    </HStack>
    </Box>
    </>
  )
}

export default Charts