import React, { useEffect, useRef } from 'react';
import styles from '../dashboard.module.css';

const Rating = ({ goodRange, needsImprovementRange, poorRange, metricType, currentValue }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const createChart = () => {
      const chart = JSC.chart(chartRef.current, {
        debug: true,
        type: 'gauge',
        legend_visible: false,
        chartArea_boxVisible: true,
        width: 175,
        height: 150,
        defaultFont: 'Poppins, sans-serif',
        xAxis: {
          scale: { range: [0, 1], invert: true }
        },
        palette: {
          pointValue: '%yValue',
          ranges: [
            { value: [goodRange[0], goodRange[1]], color: '#008000' },
            { value: [needsImprovementRange[0], needsImprovementRange[1]], color: '#FFD221' }, 
            { value: [poorRange[0], poorRange[1]], color: '#FF5353' } 
          ]
        },
        yAxis: {
          defaultTick: { padding: 3, enabled: false },
          customTicks: [goodRange[0], goodRange[1], needsImprovementRange[1], poorRange[1]],
          // customTicks: [goodRange[0], poorRange[1]], // Updated customTicks to reflect correct ranges
          line: {
            width: 15,
            breaks_gap: 0.05,
            color: 'smartPalette'
          },
          scale: { range: [goodRange[0], poorRange[1]] }
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
              text: `${currentValue ? `<span style='fontWeight: bold'>${metricType !== 'CLS' ? `${currentValue} ms` : currentValue}</span>` : ''}<br/> <span style='fontSize: 12px'>${currentValue ? (currentValue <= goodRange[1] ? 'Great!' : currentValue <= needsImprovementRange[1] ? 'Needs Work' : 'Poor') : `No Data`}</span>`,
              style: { fontSize: 20, fontFamily: 'Poppins, sans-serif' }
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
    <div className={styles.ratingDiv}>
      <h2 className={styles.ratingHeading}>{metricType}</h2>
      <div className={styles.ratingGauge} ref={chartRef}></div>
    </div>
  );
};

export default Rating;