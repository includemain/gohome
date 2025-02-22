// import React from 'react';
// import * as echarts from 'echarts';
// const { useEffect } = React;

// interface MdStatisticsProps { }

// const MdStatistics: React.FC<MdStatisticsProps> = function () {
//   const xAxisData = [];
//   const data1 = [];
//   const data2 = [];
//   const data3 = [];
//   const index = (Math.random() * 50).toFixed(2);
//   for (let i = 0; i < 13; i++) {
//     xAxisData.push(i);
//     data1.push(+(Math.random() * 20).toFixed(2));
//     data2.push(+(Math.random() * 50).toFixed(2));
//     data3.push(index);
//   }
//   const emphasisStyle = {
//     itemStyle: {
//       shadowBlur: 10,
//       shadowColor: 'rgba(0,0,0,0.3)'
//     }
//   };
//   const option = {
//     title: {
//       text: 'MD统计分析',
//       padding: [12, 17],
//       textStyle: {
//         color: '#ffffff',
//         fontWeight: 500,
//         fontSize: 16,
//         lineHeight: 16
//       },
//     },
//     tooltip: {},
//     grid: {
//       left: 46,
//       bottom: 27
//     },
//     xAxis: {
//       data: xAxisData,
//       axisLine: {
//         onZero: true,
//         show: false
//       },
//       splitLine: {
//         show: false
//       },
//       splitArea: {
//         show: false
//       },
//       axisTick: {
//         show: false
//       },
//       axisLabel: {
//         textStyle: {
//           color: 'rgba(255,255,255,0.6)'
//         },
//         margin: 5,
//         fontSize: 10
//       },
//     },
//     yAxis: {
//       type: 'value',
//       axisLine: {
//         show: false
//       },
//       splitLine: {
//         show: false
//       },
//       axisTick: {
//         show: false
//       },
//       axisLabel: {
//         textStyle: {
//           color: 'rgba(255,255,255,0.6)'
//         },
//         fontSize: 10
//       },
//     },
//     series: [
//       {
//         name: '当前值',
//         type: 'bar',
//         stack: 'Total',
//         data: data1,
//         barWidth: '10',
//         itemStyle: {
//           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//             {
//               offset: 0, // offset范围是0~1，用于表示位置，0是指0%处的颜色
//               color: '#48FFFD'
//             }, {
//               offset: 1, // 指100%处的颜色
//               color: '#01A7DD'
//             }]
//           )
//         }
//       },
//       {
//         name: '移动平均值',
//         type: 'line',
//         // stack: 'Total',
//         data: data2,
//         symbol: 'circle',
//         lineStyle: {
//           // width:5,
//           color: '#ffdc00'
//         },
//         itemStyle: {
//           borderWidth: 2,
//           borderColor: '#ffdc00',
//           color: '#012445'
//         },
//         symbolSize: 8,
//       },
//       {
//         name: '目标值',
//         type: 'line',
//         // stack: 'Total',
//         data: data3,
//         lineStyle: {
//           color: '#00FF8A',
//           type: 'dashed',
//           width: 1,
//         },
//         itemStyle: {
//           borderWidth: 0,
//           color: '#00FF8A'
//         },
//         symbol: 'none',
//       },
//     ],
//     legend: [
//       {
//         data: [
//           {
//             name: '当前值'
//           }
//         ],
//         top: 11,
//         right: 174,
//         itemGap: 13,
//         itemWidth: 14,
//         itemHeight: 7,
//         textStyle: {
//           color: 'rgba(255,255,255,0.6)',
//           fontWeight: 500,
//           fontSize: 12
//         }
//       },
//       {
//         data: [
//           {
//             name: '目标值'
//           }
//         ],
//         top: 11,
//         right: 109,
//         itemGap: 13,
//         itemWidth: 14,
//         itemHeight: 7,
//         lineStyle: {
//           type: 'dashed',
//           width: 0.9
//         },
//         itemStyle: {
//           opacity: 0
//         },
//         textStyle: {
//           color: 'rgba(255,255,255,0.6)',
//           fontWeight: 500,
//           fontSize: 12
//         }
//       },
//       {
//         data: [
//           {
//             name: '移动平均值'
//           }
//         ],
//         top: 11,
//         right: 16,
//         itemGap: 13,
//         itemWidth: 14,
//         itemHeight: 7,
//         lineStyle: {
//           color: '#ffdc00',
//         },
//         itemStyle: {
//           borderWidth: 2,
//           borderColor: '#ffdc00',
//           color: '#fff'
//         },
//         textStyle: {
//           color: 'rgba(255,255,255,0.6)',
//           fontWeight: 500,
//           fontSize: 12
//         }
//       },
//     ],
//   };
//   useEffect(() => {
//     const myChart = echarts.init(document.getElementById('md-chart'));
//     myChart.setOption(option);
//   }, []);


//   return (
//     <div className={styles.mdStatistics}>
//       <div id='md-chart' className='md-chart' />
//     </div>
//   );
// };

// export default MdStatistics;
