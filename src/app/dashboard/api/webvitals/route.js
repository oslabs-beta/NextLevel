import dbConnect from '../../../lib/connectDB.js';
import User from '../../../models/User.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const metricType = searchParams.get('metricType');
    const start = searchParams.get('start');
    const end = searchParams.get('end');
  
    if (!username || !metricType || !start || !end) {
      return NextResponse.json({ message: 'Username, metric type, start date, and end date are required' }, { status: 400 });
    }
    const startDate = new Date(start);
    const endDate = new Date(end);

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return NextResponse.json({ message: "User not found in web vitals route" }, { status: 404 });
    }
    const metricData = [];

    foundUser[metricType].forEach(metric => {
      const metricDate = new Date(metric["metricDate"]);
      if (metricDate >= startDate && metricDate <= endDate) {
        metricData.push(metric);
      }
    });

    return NextResponse.json(metricData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  await dbConnect();
  try {
    const { metricType, metricValue, apiKey } = await request.json();
    console.log('API key:', apiKey);

    if (!metricType || !metricValue || !apiKey) {
      return NextResponse.json({ message: 'Missing infromation in the web vitals post' }, { status: 400 });
    }

    console.log('going into try web vitals post')
    const user = await User.findOne({ APIkey: apiKey });
    console.log('User:', user);
    
    if (!user) { 
      return NextResponse.json({ message: 'API key was not found' }, { status: 409 });
    }
    // maybe make new schema with buildDate
    const newMetric = {
      metricType,
      metricValue,
      metricDate: Date.now()
    }
    user[metricType].push(newMetric);
    
    await user.save();

    return NextResponse.json({ message: 'Web vitals updated successfully'}, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Internal server error in web vitals post request ${error}` }, { status: 500 });
  }
}
