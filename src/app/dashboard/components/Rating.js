import React, { useEffect, useRef } from 'react';

const Rating = ({ goodRange, needsImprovementRange, poorRange, metricType, currentValue }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const createChart = () => {
      const chart = JSC.chart(chartRef.current, {
        debug: true,
        type: 'gauge',
        legend_visible: false,
        chartArea_boxVisible: false,
        xAxis: {
          scale: { range: [0, 1], invert: true }
        },
        palette: {
          pointValue: '%yValue',
          ranges: [
            { value: [goodRange[0], goodRange[1]], color: '#008000' }, // Good range (lower values)
            { value: [needsImprovementRange[0], needsImprovementRange[1]], color: '#FFD221' }, // Needs Improvement range (medium values)
            { value: [poorRange[0], poorRange[1]], color: '#FF5353' } // Poor range (higher values)
          ]
        },
        yAxis: {
          defaultTick: { padding: 13, enabled: false },
          customTicks: [goodRange[1], needsImprovementRange[1]], // Updated customTicks to reflect correct ranges
          line: {
            width: 15,
            breaks_gap: 0.03,
            color: 'smartPalette'
          },
          scale: { range: [goodRange[0], poorRange[1]] } // Updated scale range
        },
        defaultSeries: {
          opacity: 1,
          shape: {
            label: {
              align: 'center',
              verticalAlign: 'middle'
            }
          }
        },
        series: [
          {
            type: 'marker',
            name: 'Score',
            shape_label: {
              text: `${currentValue}<br/> <span style='fontSize: 35'>${currentValue <= goodRange[1] ? 'Great!' : currentValue <= needsImprovementRange[1] ? 'Needs Improvement' : 'Poor'}</span>`, // Dynamic label based on currentValue
              style: { fontSize: 48 }
            },
            defaultPoint: {
              tooltip: '%yValue',
              marker: {
                outline: {
                  width: 10,
                  color: 'currentColor'
                },
                fill: 'white',
                type: 'circle',
                visible: true,
                size: 30
              }
            },
            points: [[1, currentValue]]
          }
        ]
      });
    };

    createChart();
  }, [poorRange, needsImprovementRange, goodRange, currentValue]);

  return (
    <div>
      <div id="chartDiv" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
      <h1>{metricType}</h1>
    </div>
  );
};

export default Rating;


// import React, { useEffect, useRef } from 'react';

// const Rating = ({ goodRange, needsImprovementRange, poorRange, metricType, currentValue }) => {
//     const chartRef = useRef(null);

//   useEffect(() => {
//     const createChart = () => {
//       const chart = JSC.chart(chartRef.current, {
//         debug: true,
//         type: 'gauge',
//         legend_visible: false,
//         chartArea_boxVisible: false,
//         xAxis: {
//           scale: { range: [0, 1], invert: true }
//         },
//         palette: {
//           pointValue: '%yValue',
//           ranges: [
//             { value: goodRange[1], color: '#008000' },
//             { value: needsImprovementRange[1], color: '#FFD221' },
//             { value: poorRange[1], color: '#FF5353' },
//           ]
//         },
//         yAxis: {
//           defaultTick: { padding: 13, enabled: false },
//           customTicks: [goodRange[1], needsImprovementRange[1], poorRange[1]],
//           line: {
//             width: 15,
//             breaks_gap: 0.03,
//             color: 'smartPalette'
//           },
//           scale: { range: [goodRange[0], poorRange[1]] }
//         },
//         defaultSeries: {
//           opacity: 1,
//           shape: {
//             label: {
//               align: 'center',
//               verticalAlign: 'middle'
//             }
//           }
//         },
//         series: [
//           {
//             type: 'marker',
//             name: 'Score',
//             shape_label: {
//               //text: `${currentValue}<br/> <span style='fontSize: 35'>Great!</span>`,
//               text: `${currentValue}<br/> <span style='fontSize: 35'>${currentValue <= goodRange[1] ? 'Great!' : currentValue <= needsImprovementRange[1] ? 'Needs Improvement' : 'Poor'}</span>`, // Dynamic label based on currentValue
//               style: { fontSize: 48 }
//             },
//             defaultPoint: {
//               tooltip: '%yValue',
//               marker: {
//                 outline: {
//                   width: 10,
//                   color: 'currentColor'
//                 },
//                 fill: 'white',
//                 type: 'circle',
//                 visible: true,
//                 size: 30
//               }
//             },
//             points: [[1, currentValue]]
//           }
//         ]
//       });
//     };

//     createChart();
//   }, [poorRange, needsImprovementRange, goodRange, currentValue]);

//   return (
//     <div>
//         <div id="chartDiv" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
//         <h1>{metricType}</h1>
//     </div>
//   );
// };

// export default Rating;