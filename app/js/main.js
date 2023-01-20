
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('.header__burger, .header__nav, body'),
    burger = document.querySelector('.header__burger'),
    header = document.querySelector('.header');


body.addEventListener('click', function (event) {

    function $(elem) {
      return event.target.closest(elem)
    }

    // =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

    if ($('.header__burger')) {
        menu.forEach(element => {
            element.classList.toggle('_active')
        })
    }

    // =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-

})



function getDay() {
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];
  let d = new Date();
  let n = d.getDay();
  return days[n];
}

const thisDay = document.querySelectorAll('.this-day');
thisDay.forEach(thisDay => {
  thisDay.textContent = getDay();
})

const thisFullDate = document.querySelectorAll('.this-full-date');
thisFullDate.forEach(thisFullDate => {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC'
  };

  let date = new Date().toLocaleString("ru", options).slice(0, -3);
  
  thisFullDate.textContent = date;
})


let fontSize = 18, paddingRight = 100, padding = 130;
const aside = document.querySelector('.aside'),
      asidePlace = document.querySelector('.main__aside-place'),
      wrapper = document.querySelector('.wrapper');


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
  if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
    resizeCheck[String(size)] = false;
    maxWidth(); // < size
  }

  if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
    resizeCheck[String(size)] = true;
    minWidth(); // > size
  }
}

function resize() {

  windowSize = window.innerWidth;

  resizeCheckFunc(500,
    function () {  // screen >

      padding = 130;

  },
  function () {  // screen <

    padding = 70;

  });
  
  resizeCheckFunc(992,
    function () {  // screen > 992px

      fontSize = 18;
      paddingRight = 100;
      wrapper.appendChild(aside);

  },
  function () {  // screen < 992px

    fontSize = 14;
    paddingRight = 30;
    asidePlace.appendChild(aside)

  });

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <chart> -=-=-=-=-=-=-=-=-=-=-=-=

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function closedVacancies() {
  let dataList = [];
  for(let index = 0; index < 17; index++) {
    dataList.push(randomInteger(50, 250))
  }

  const labels = [0,25,50,75,100,125,150,175,200,225,250,275,300,325,350,375,400];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Vacancies by closing date',
        data: dataList,
        backgroundColor: '#2F80ED',
        borderRadius: 35,
        borderSkipped: false,
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          
          title: {
            display: true,
            text: "Количество закрытых вакансий",
            color: "#A3A3A3",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 700,
            },
          },
          ticks: {
            display: false,
          }
        },
        
        x: {
          display: true,
          title: {
            display: true,
            text: 'Срок закрытия вакансии, дни',
            color: '#A3A3A3',
            align: "start",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 'bold',
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          },
          ticks: {
            color: "#A3A3A3",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 700,
            },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          }
        },
    },
    },
  };

  let closedVacancies = document.querySelector('#closed-vacancies');
  closedVacancies = closedVacancies.getContext("2d");
  
  new Chart(closedVacancies, config)
}

closedVacancies();

function topRecruiters() {

  const innerBarText = {
    id: 'innerBarText',
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data, chartArea: { left, right }, scales: { x, y } } = chart;

      ctx.save();

      ctx.font = `bolder ${fontSize}px "Poppins", sans-serif`;
      ctx.fillStyle = '#464255';

      Array.from(data.labels).forEach((label, index) => {
        const heightBar = chart.getDatasetMeta(0).data[0].height;

        ctx.fillText(`${data.labels[index]}`, left, y.getPixelForValue(index) - heightBar)
        if(chart.getDatasetMeta(0).data[0].width) {
          ctx.fillText(`${data.datasets[0].data[index]}`, chart.getDatasetMeta(0).data[index].width + 15, y.getPixelForValue(index) + (heightBar / 6))  
        }
        
      })
    }
  }

  let dataList = [18,13,12,10,8];

  const labels = ["Вася Иванов","Вася Иванов","Вася Иванов","Вася Иванов","Вася Иванов"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Топ рекрутеров по закрытию вакансий',
        data: dataList,
        backgroundColor: '#2F80ED',
        borderRadius: 35,
        barPercentage: 0.4,
        borderWidth: 1,
        borderColor: "#9B51E0",
        borderSkipped: false,
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      animation: {
        duration: 0
      },
      layout: {
        padding: {
          right: paddingRight,
          top: 30,
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      indexAxis: 'y',
      scales: {
        y: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          
          /* title: {
            display: true,
            text: "Количество закрытых вакансий",
            color: "#A3A3A3",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 700,
            },
          }, */
          ticks: {
            display: false,
          }
        },
        
        x: {
          display: true,
          /* title: {
            display: true,
            text: 'Срок закрытия вакансии, дни',
            color: '#A3A3A3',
            align: "start",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 'bold',
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          }, */
          ticks: {
            color: "#A3A3A3",
            
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 700,
            },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          }
        },
      },
    },
    plugins: [innerBarText],
  };

  let top = document.querySelector('#top');
  top = top.getContext("2d");
  
  const chart = new Chart(top, config);

}

topRecruiters();

function traffic() {

  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;
  
      legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
  };
  
  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);
  
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }
  
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
  
      items.forEach(item => {
        const li = document.createElement('li');
  
        li.onclick = () => {
          const {type} = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };
  
        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.setProperty('--bg-color', item.fillStyle);
  
        // Text
        const textContainer = document.createElement('b');
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
  
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);
  
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };

  const doughnutLabelsLine = {
    id: 'doughnutLabelsLine',
    afterDraw(chart, args, options) {
      const { ctx, chartArea: { top, bottom, left, right, width, height} } = chart;

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition();
          
          if(datapoint.circumference != 0) {
            const dataInPercent = getPercents();

            const halfSize = window.innerWidth > 500 ? 100 : 40;

            const halfWidth = width / 2 + halfSize;
            const halfHeight = height / 2 + halfSize;

            let xSize = window.innerWidth > 500 ? 75 : 35;
            let ySize = window.innerWidth > 500 ? 15 : 0;
  
            const xLine = x >=  halfWidth ? x + xSize : x - xSize;
            const yLine = y >=  halfHeight ? y + ySize : y - ySize;
            const extraLine = y >= halfHeight ? 15 : -15;
            const typePos = y >= halfHeight ? 'top' : 'bottom';
  
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(xLine, yLine);
            ctx.lineTo(xLine, yLine + extraLine);
            ctx.strokeStyle = datapoint.options.backgroundColor;
            ctx.lineWidth = 2;
            ctx.stroke();
  
            ctx.font = `bolder ${fontSize-3}px "Poppins", sans-serif`;
            ctx.fillStyle = '#464255';
  
            ctx.fillText(`+${dataInPercent[index]}% (${dataset.data[index]})`, xLine - 40, (typePos == 'top') ? yLine + 35 : yLine - 30)
          }
          
        })
      })
    }
  };

  let dataList = [3404,4653,7976];
  function getPercents() {
    let sum = 0, result = [];
    for(let index = 0; index < dataList.length; index++) {
      sum+=dataList[index];
    }
    for(let index = 0; index < dataList.length; index++) {
      result.push(Math.round(dataList[index] / sum * 100));
    }
    return result;
  }

  const labels = ["Work.ua", "grc.ua", "Lheubt"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Источник трафика',
        data: dataList,
        backgroundColor: ['#F1E6B9', '#AB54DB', '#EF9A91'],
        hoverBackgroundColor: ['#F1E6B9', '#AB54DB', '#EF9A91'],
        //borderRadius: 35,
        cutout: "75%",
        borderWidth: 0,
        borderSkipped: false,
      }
    ]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      layout: {
        padding: padding
      },
      animation: {
        duration: 0,
      },
      responsive: true,
      plugins: {
        htmlLegend: {
          // ID of the container to put the legend in
          containerID: 'legend-container',
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      
      },
      
      /* scales: {
        y: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          
          title: {
            display: true,
            text: "Количество закрытых вакансий",
            color: "#A3A3A3",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 700,
            },
          },
          ticks: {
            display: false,
          }
        },
        
        x: {
          display: true,
          title: {
            display: true,
            text: 'Срок закрытия вакансии, дни',
            color: '#A3A3A3',
            align: "start",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 'bold',
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          },
          ticks: {
            color: "#A3A3A3",
            font: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: 700,
            },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          }
        },
    }, */
    },
    plugins: [htmlLegendPlugin, doughnutLabelsLine],
  };

  let traffic = document.querySelector('#traffic');
  traffic = traffic.getContext("2d");
  
  new Chart(traffic, config)
  
}

traffic();


// =-=-=-=-=-=-=-=-=-=-=-=- </chart> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	//disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
