import React, { useEffect, useRef } from 'react';

const Rating = ({ poorRange, needsImprovementRange, goodRange, metricType, currentValue }) => {
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
            { value: poorRange[1], color: '#FF5353' },
            { value: needsImprovementRange[1], color: '#FFD221' },
            { value: goodRange[1], color: '#77E6B4' }
          ]
        },
        yAxis: {
          defaultTick: { padding: 13, enabled: false },
          customTicks: [needsImprovementRange[1], goodRange[1], goodRange[1] + (goodRange[1] - needsImprovementRange[1])],
          line: {
            width: 15,
            breaks_gap: 0.03,
            color: 'smartPalette'
          },
          scale: { range: [poorRange[0], goodRange[1] + (goodRange[1] - needsImprovementRange[1])] }
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
              text: `${currentValue}<br/> <span style='fontSize: 35'>Great!</span>`,
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