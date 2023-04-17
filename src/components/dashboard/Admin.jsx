import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';

import { Bar,Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/* Nomina Colaboradores */
const optionsA = {
  plugins: {
    title: {
      display: true,
      text: 'Nomina Colaboradores'
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    }
  }
};

const dataA = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  datasets: [
    {
      label: 'Fundacion Renal',
      data: [ 1689276080,1707381107,1707367879,1707367879,1686356626],
      backgroundColor: 'rgba(75, 192, 192, 1)',
    },
    {
      label: 'GEIPAS',
      data: [218892785,218461134,218461134,215509840],
      backgroundColor: 'rgba(53, 162, 235, 1)',
    },
  ],
};

/* Pago Ultimo Mes */
const dataB = {
  labels: ['Fundación Renal', 'Geipas'],
  datasets: [
    {
      label: 'Valor Total',
      data: [215509840, 1686356626],      
      backgroundColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2,
    },
  ],
};


const optionsB = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Nomina Ultimo Mes'
      }
    }
};

/* Total Colaboradores Empresas */
const optionsC = {
  plugins: {
    title: {
      display: true,
      text: 'Total Colaboradores'
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};

const dataC = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  datasets: [
    {
      label: 'Fundacion Renal',
      data: [10,20,5,6,8,9,9],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'GEIPAS',
      data: [5,10,9,8,6,5,5],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

/* Total Colaboradores */
const dataD = {
  labels: ['Sovel', 'Geipas', 'Fundación Renal', 'Workservices'],
  datasets: [
    {
      label: '# de Colaboradores',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2,
    },
  ],
};

const optionsD = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Colaboradores'
      }
    }
};

/* Pagos Extras */

const footer = (tooltipItems) => {
  let sum = 0;

  tooltipItems.forEach(function(tooltipItem) {
    sum += tooltipItem.parsed.y;
  });
  
  return 'Total: ' + ' $' + sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const optionsE = {
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    title: {
      display: true,
      text: 'Nomina Extras'
    },
    tooltip: {
      callbacks: {
        footer: footer,
      }
    }
  },
  responsive: true
};

const dataE = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  datasets: [
    {
      label: 'Auxilio Transporte',
      data: [ 37433999,37433999,37433999,37433999],
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Horas Extras',
      data: [21909599,21909599,21909599,21909599],
      fill: false,
      backgroundColor: 'rgba(54, 162, 235, 1)',
    },
    {
      label: 'Recargo Nocturno',
      data: [73519752,73519752,73519752,73519752],
      fill: false,
      backgroundColor: 'rgba(255, 206, 86, 1)',
    },
    {
      label: 'Otros Auxilios',
      data: [220000,220000,220000,220000],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 1)',
    },
    {
      label: 'Otros Pagos',
      data: [51239159,51239159,51239159,51239159],
      fill: false,
      backgroundColor: 'rgba(153, 102, 255, 1)',
    },
  ],
};

export default function Admin() {

  return (
          <div className=" sm:mx-auto sm:w-full">
            <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
                <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
                  Nomina
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div><Bar options={optionsA} data={dataA} /></div>
                  <div><Doughnut options={optionsB} data={dataB} /></div>
                  <div><Bar options={optionsE} data={dataE} /></div>
                </div>
                <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
                  Colaboradores
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div><Bar options={optionsC} data={dataC} /></div>
                  <div><Doughnut options={optionsD} data={dataD} /></div>
                </div>
            </div>
        </div>
    )
}
