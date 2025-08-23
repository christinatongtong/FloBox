import { SafeAreaView, View, Text } from "react-native";
import { CartesianChart, Line, Scatter, AreaRange } from "victory-native";
import { useMemo, useState, useEffect } from "react";
import { useFonts } from 'expo-font';

// Helper to generate a single glucose reading with realistic variations
const generateGlucoseReading = (previousValue = 100) => {
  const maxChange = 10;  // Increased from 4 to 10 for testing
  const change = (Math.random() - 0.5) * maxChange;
  const newValue = Math.max(80, Math.min(400, previousValue + change));
  return newValue;
};

const last_hours = 24;
const new_data_every_min = 5;
const num_data_points = 60 * last_hours / new_data_every_min;

export default function App() {
  const [fontLoaded] = useFonts({
    "SuperAdorable": require("../../assets/fonts/SuperAdorable-MAvyp.ttf"),
  });

  // State to hold our time-series data
  const [glucoseData, setGlucoseData] = useState(() => {
    const now = new Date();
    const initialData = [];

    // Generate last xx hour of data (360 points at 10-sec intervals)
    for (let i = num_data_points; i >= 0; i--) {
      const t = new Date(now.getTime() - i * new_data_every_min *60*1000);
      const value = generateGlucoseReading(
        initialData[initialData.length - 1]?.value ?? 100
      );
      initialData.push({ ts: t.getTime(), value, t });
    }
    return initialData;
  });

  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGlucoseData(currentData => {
        const lastReading = currentData[currentData.length - 1];
        const now = new Date();
        // Make changes more dramatic for testing
        const newValue = generateGlucoseReading(lastReading.value);

        setLastUpdate(now.toLocaleTimeString()); // Add this

        // Add new reading, remove oldest if > 1 hour of data
        const newData = [...currentData, {
          ts: now.getTime(),
          value: newValue,
          t: now
        }];

        // Keep last hour of readings (360 points)
        if (newData.length > num_data_points) {
          newData.shift();
        }

        return newData;
      });
    }, new_data_every_min * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const targetLow = 70;
  const targetMid = 130;
  const targetHigh = 180;
  const yMin = 40;
  const yMax = 205;

  const FUTURE_PAD_MIN = 300;
  const FUTURE_PAD_MS = FUTURE_PAD_MIN * 60 * 1000;

  const xMin = glucoseData[0]?.ts ?? Date.now() - 24*60*60*1000;
  const xMax = glucoseData[glucoseData.length - 1]?.ts ?? Date.now();
  const domainX: [number, number] = [xMin, xMax + FUTURE_PAD_MS];

  const timeOfDay = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return "Morning";
    if (hours < 18) return "Afternoon";
    return "Evening";
  }, []);

  const firstName = "Christina";

  const xTicks = useMemo(() => {
    const baseTime = new Date(xMin);
    baseTime.setMinutes(0, 0, 0); // Round to hour

    const ticks = [];
    for (let i = 0; i <= 24; i += 6) { // Show every 6 hours (5 ticks)
      const tickTime = new Date(baseTime);
      tickTime.setHours(tickTime.getHours() + i);
      ticks.push(tickTime.getTime());
    }
    return ticks;
  }, [xMin]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 40, fontWeight: "600", color: "black", textAlign: "center", fontFamily: "SuperAdorable" }}>
          Good {timeOfDay}, {firstName}!
        </Text>

        <Text style={{ fontSize: 12, color: "gray", textAlign: "center", marginTop: 4 }}>
          Last update: {lastUpdate}
        </Text>

      </View>

      <CartesianChart
        data={glucoseData}
        xKey="ts"
        yKeys={["value"]}
        domain={{ x: domainX, y: [yMin, yMax] }}
        padding={{ left: 30, right: 30, top: 16, bottom: 450 }}

        axisOptions={{
          tickValues: { x: xTicks, y: [0] },
          formatXLabel: (ts: number) =>
            new Date(ts).toLocaleTimeString([], {
              hour: "numeric",
              hour12: true
            }),
        }}

        frame={{ lineWidth: { top: 3, right: 3, bottom: 3, left: 3 }, lineColor: "rgba(0, 0, 0, 0.73)" }}
      >
        {({ points, xScale, yScale }) => {
          const pts = points.value;
          const xLeft  = pts[0]?.x ?? xScale(domainX[0]);           // left edge
          const xRight = xScale(domainX[1]);                         // right edge (future pad)
          const lastPt = pts[pts.length - 1];

          return (
            <>
              <AreaRange
                lowerPoints={[{ x: xLeft, y: yScale(targetMid) }, { x: xRight, y: yScale(targetMid) }]}
                upperPoints={[{ x: xLeft, y: yScale(targetHigh) }, { x: xRight, y: yScale(targetHigh) }]}
                color="rgb(255,174,0)"
                opacity={0.15}
              />

              <AreaRange
                lowerPoints={[{ x: xLeft, y: yScale(targetLow), xValue: xLeft, yValue: targetLow }, { x: xRight, y: yScale(targetLow), xValue: xRight, yValue: targetLow }]}
                upperPoints={[{ x: xLeft, y: yScale(targetMid), xValue: xLeft, yValue: targetMid }, { x: xRight, y: yScale(targetMid), xValue: xRight, yValue: targetMid }]}
                color="green"
                opacity={0.08}
              />

              <Line points={pts} color="rgb(0,121,46)" strokeWidth={1.5} />

              {lastPt && <Scatter points={[lastPt]} radius={5} color="red" />}
            </>
          );
        }}
      </CartesianChart>

    </SafeAreaView>
  );
}
