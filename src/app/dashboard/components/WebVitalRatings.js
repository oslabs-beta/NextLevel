import { useEffect, useState } from 'react';
import Rating from './Rating';

const WebVitalRatings = ({ data }) => {
    const ranges = {
        //we set the upper limits, may need to adjust
        "TTFB": [0, 800, 1800, 3000],
        "LCP": [0, 2500, 4000, 6000],
        "FCP": [0, 1800, 3000, 5000],
        "FID": [0, 100, 300, 600],
        "INP": [0, 200, 500, 1000],
        "CLS": [0, 0.1, 0.25, 1],
    }
    const averages = {
        "TTFB": [0, 0],
        "LCP": [0, 0],
        "FCP": [0, 0],
        "FID": [0, 0],
        "INP": [0, 0],
        "CLS": [0, 0],
    }
    const [vitalRatings, setVitalRatings] = useState([]);
    useEffect(() => {
        data.forEach(entry => {
            switch (entry.metricType) {
                case "TTFB":
                    averages["TTFB"][0] += entry.metricValue;
                    averages["TTFB"][1]++;
                    break;
                case "LCP":
                    averages["LCP"][0] += entry.metricValue;
                    averages["LCP"][1]++;
                    break;
                case "FCP":
                    averages["FCP"][0] += entry.metricValue;
                    averages["FCP"][1]++;
                    break;
                case "FID":
                    averages["FID"][0] += entry.metricValue;
                    averages["FID"][1]++;
                    break;
                case "INP":
                    averages["INP"][0] += entry.metricValue;
                    averages["INP"][1]++;
                    break;
                case "CLS":
                    averages["CLS"][0] += entry.metricValue;
                    averages["CLS"][1]++;
                    break;
                default:
                    break;
            }
        });

        const metrics = Object.keys(ranges);
        const vitals = metrics.map(metric => {
            const unrounded = averages[metric][0] / averages[metric][1];
            let val;
            if(metric === "CLS") {
                val = unrounded.toFixed(4);
            } else {
                val = Math.round(unrounded);
            }
            return (
                <Rating
                    goodRange={[ranges[metric][0],ranges[metric][1]]}
                    needsImprovementRange={[ranges[metric][1],ranges[metric][2]]}
                    poorRange={[ranges[metric][2],ranges[metric][3]]}
                    currentValue={val}
                    metricType={metric}
                />
            );
        });
        setVitalRatings(vitals);
    }, [data]);

    return (
        <div>
            {vitalRatings}
        </div>
    );
};

export default WebVitalRatings;