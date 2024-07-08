export async function GET(request) {
  const data = [
    { timestamp: '2024-07-08T12:00:00Z', ttfb: 200 },
    { timestamp: '2024-07-08T12:05:00Z', ttfb: 180 },
    { timestamp: '2024-07-08T12:10:00Z', ttfb: 220 },
    // Add more mock data here
  ];
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}