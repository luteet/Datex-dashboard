
const body = document.querySelector('body'),
	html = document.querySelector('html');

/* function getDay() {
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
}) */


let fontSize = 17, paddingRight = 100, padding = 130;
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

			padding = 100;

		});

	resizeCheckFunc(992,
		function () {  // screen > 992px

			fontSize = 17;
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

function getMaxOfArray(numArray) {
	return Math.max.apply(null, numArray);
}

function closedVacancies() {
	let dataList = [];
	for (let index = 0; index < 17; index++) {
		dataList.push(randomInteger(50, 250))
	}

	const labels = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400];
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Вакансии по сроку закрытия',
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
			/* padding: {
				bottom: 30,
			}, */
			animation: {
				duration: 0,
			},
			legend: {
				display: false,
			},
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				/* yAxes: {
					grid: {
						display: false,
					},
					border: {
						display: false,
					},
				  
					title: {
						display: false,
					},
					ticks: {
						display: false,
					}
				}, */
				yAxes: [{
					display: false,

					grid: {
						display: false,
					},
					gridLines: {
						display: false,
					},
					ticks: {
						//display: false,
						max: getMaxOfArray(dataList),
						min: 0
					}
				}],
				xAxes: [{
					gridLines: {
						display: false,
					},

					ticks: {
						//display: false,
						fontSize: fontSize - 2,
						fontFamily: '"Poppins", sans-serif',
						max: getMaxOfArray(dataList),
						min: 0
					}
				}],

				/* x: {
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
				}, */
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
		afterDatasetsDraw: function (chart, args, pluginOptions) {
			//const { ctx, data, chartArea: { left, right }, scales: { x, y } } = chart;
			const ctx = chart.ctx,
				data = chart.data,
				left = chart.chartArea.left,
				right = chart.chartArea.right,
				x = chart.scales["x-axis-0"],
				y = chart.scales["y-axis-0"];

			ctx.save();

			ctx.font = "bolder " + fontSize + "px \"Poppins\", sans-serif";
			ctx.fillStyle = '#464255';

			/* Array.from(data.labels).forEach((label, index) => {
			  
			}) */
			//console.log(y.getPixelForValue(0))

			for (let index = 0; index < data.labels.length; index++) {
				const heightBar = chart.getDatasetMeta(0).data[0]._view.height;
				//console.log(chart.getDatasetMeta(0).data[0]._view.height)
				//console.log(y.getPixelForValue(index) - heightBar - 5)
				//ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - heightBar - 5)
				ctx.fillText(data.labels[index] + " (" + data.datasets[0].data[index] + ")", left, y.getPixelForValue(index) - heightBar - 5)
				//ctx.fillText(data.datasets[0].data[index], left, y.getPixelForValue(index) - heightBar - 5)
			}
		}
	}

	let dataList = [20, 18, 16, 14, 10];

	const labels = ["Вася Иванов", "Вася Иванов", "Вася Иванов", "Вася Иванов", "Вася Иванов"];
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Test',
				data: dataList,
				backgroundColor: '#2F80ED',
				borderRadius: 35,
				barPercentage: 0.35,
				borderWidth: 1,
				borderColor: "#9B51E0",
				borderSkipped: false,
			}
		]
	};

	const config = {
		type: 'horizontalBar',
		data: data,
		options: {
			//scaleLineColor: "rgba(0,0,0,0)",
			responsive: true,
			animation: {
				duration: 0
			},
			layout: {
				padding: {
					//right: paddingRight,
					top: 30,
				}
			},
			legend: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					enabled: false,
				},
			},
			scales: {
				/* yAxes: {
					grid: {
						display: false,
					},
					border: {
						display: false,
					},
					ticks: {
						display: false,
					}
				}, */

				/* xAxes: {
					display: true,
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
				}, */

				yAxes: [{
					display: false,

					grid: {
						display: false,
					},
					gridLines: {
						display: false,
					},
					ticks: {
						//display: false,
						max: getMaxOfArray(dataList),
						min: 0
					}
				}],
				xAxes: [{
					gridLines: {
						display: false,
					},
					ticks: {
						//display: false,
						max: getMaxOfArray(dataList),
						min: 0
					}
				}]
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

	/* const getOrCreateLegendList = function (chart, id) {
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
		afterUpdate: function (chart, args, options) {
			const ul = getOrCreateLegendList(chart, options.containerID);

			// Remove old legend items
			while (ul.firstChild) {
				ul.firstChild.remove();
			}

			// Reuse the built-in legendItems generator
			const items = chart.options.plugins.legend.labels.generateLabels(chart),
				itemsArray = Array.prototype.slice.call(items);

			itemsArray.forEach(function(item) {
				const li = document.createElement('li');

				li.onclick = function() {
					const type = chart.config.type;
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
	}; */

	const doughnutLabelsLine = {
		id: 'doughnutLabelsLine',
		afterDraw: function(chart, args, options) {
			//const { ctx, chartArea: { top, bottom, left, right, width, height} } = chart;
			const ctx = chart.ctx,
				top = chart.chartArea.top,
				bottom = chart.chartArea.bottom,
				left = chart.chartArea.left,
				right = chart.chartArea.right,
				width = chart.controller.width,
				height = chart.controller.height;

			chart.data.datasets.forEach(function(dataset, i) {
				chart.getDatasetMeta(i).data.forEach(function(datapoint, index) {
					const x = datapoint.tooltipPosition().x,
								y = datapoint.tooltipPosition().y;

					if (datapoint.circumference != 0) {
						const dataInPercent = getPercents();

						let halfSize;
						if(window.innerWidth > 500) {
							halfSize = 100
						} else {
							halfSize = 40
						}

						const halfWidth = width / 2;
						const halfHeight = height / 2;

						let xSize;
						let ySize;

						if(window.innerWidth > 600) {
							xSize = 95
						} else {
							xSize = 45
						}

						if(window.innerWidth > 500) {
							ySize = 15
						} else {
							ySize = 0
						}

						let xLine;
						//console.log(x >= halfWidth)
						if(x >= halfWidth) {
							xLine = x + xSize;
						} else {
							xLine = x - xSize;
						}

						let yLine;
						if(y >= halfHeight) {
							yLine = y + ySize;
						} else {
							yLine = y - ySize;
						}
						
						let extraLine;
						if(y >= halfHeight) {
							extraLine = 15;
						} else {
							extraLine = -15;
						}
						
						const typePos = y >= halfHeight ? 'top' : 'bottom';

						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(xLine, yLine);
						ctx.lineTo(xLine, yLine + extraLine);
						ctx.strokeStyle =  dataset.backgroundColor[index];//datapoint.options.backgroundColor;
						//console.log(dataset.backgroundColor)
						ctx.lineWidth = 2;
						ctx.stroke();

						ctx.font = 'bolder ' + fontSize + 'px "Poppins", sans-serif';
						ctx.fillStyle = '#464255';

						ctx.fillText('+' + dataInPercent[index] + '% (' + dataset.data[index] + ')', xLine - 50, (typePos == 'top') ? yLine + 35 : yLine - 30)
					}

				})
			})
		}
	};

	let dataList = [3404, 4653, 7976];
	function getPercents() {
		let sum = 0, result = [];
		for (let index = 0; index < dataList.length; index++) {
			sum += dataList[index];
		}
		for (let index = 0; index < dataList.length; index++) {
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
			legend: {
				display: false,
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul>');
				for (var i=0; i<chart.legend.legendItems.length; i++) {
					console.log(chart.legend.legendItems); // see what's inside the obj.
					text.push('<li>');
					text.push('<span style="background:' + chart.legend.legendItems[i].fillStyle + '"></span>');
					text.push('<p>' + chart.legend.legendItems[i].text + '</p>')
					text.push('</li>');
				}
				text.push('</ul>');
				return text.join("");
			},
			animation: {
				duration: 0,
			},
			responsive: true,
			plugins: {
				/* htmlLegend: {
					// ID of the container to put the legend in
					containerID: 'legend-container',
				}, */
				legend: {
					display: false,
				},
				tooltip: {
					enabled: false,
				},

			},

		},
		plugins: [/* htmlLegendPlugin, */ doughnutLabelsLine],
	};

	let traffic = document.querySelector('#traffic');
	traffic = traffic.getContext("2d");

	const myChart = new Chart(traffic, config)

	document.getElementById('legend-container').innerHTML = myChart.generateLegend();

}

traffic();


// =-=-=-=-=-=-=-=-=-=-=-=- </chart> -=-=-=-=-=-=-=-=-=-=-=-=
