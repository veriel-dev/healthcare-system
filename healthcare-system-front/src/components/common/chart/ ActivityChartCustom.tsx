'use client';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  lastLogin: string[];
}
export function ActivityChartCustom({ lastLogin }: Props) {
  const [maxValueState, setMaxValueState] = useState(0);
  const [averageState, setAverageState] = useState(0.0);
  const [totalState, setTotalState] = useState(0);

  const chartConfig = {
    access: {
      label: 'Access',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  const processLoginData = (loginDates: string[]) => {
    const grouped = loginDates.reduce((acc, date) => {
      const dateObj = new Date(date);
      const timeKey = dateObj.toISOString().split('T')[1].slice(0, 12);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      acc[timeKey] = (acc[timeKey] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([time, access]) => ({
      time,
      access,
    }));
    return chartData.sort((a, b) => a.time.localeCompare(b.time));
  };
  const chartData = useMemo(() => processLoginData(lastLogin), [lastLogin]);
  const valuesAccess = useMemo(
    () => Object.values(chartData).map(value => value.access as number),
    [chartData],
  );
  const metrics = useMemo(() => {
    const total = valuesAccess.reduce((acc, value) => acc + value, 0);
    return {
      max: Math.max(...valuesAccess),
      average: (total / valuesAccess.length).toFixed(2),
      total,
    };
  }, [valuesAccess]);

  const generateAnimationIncrementalNumber = (
    value: number,
    setState: (value: React.SetStateAction<number>) => void,
    speed: number,
  ) => {
    let current = 0;
    const maxValue = value;
    const interval = setInterval(() => {
      if (current < maxValue) {
        setState(current + 1);
        current += 1;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    generateAnimationIncrementalNumber(metrics.max, setMaxValueState, 200);
    generateAnimationIncrementalNumber(Number(metrics.average), setAverageState, 200);
    generateAnimationIncrementalNumber(Number(metrics.total), setTotalState, 200);
  }, []);

  return (
    <Card className="bg-transparent border-none">
      <CardHeader></CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="access"
              type="natural"
              fill="var(--color-access)"
              fillOpacity={0.4}
              stroke="var(--color-access)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center w-full gap-4 py-2 border rounded-lg border-gray-800 mt-4">
          <div className="text-center border-r flex items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm font-medium">Pico</span>
              <span className="text-emerald-400 text-2xl font-bold">{maxValueState}</span>
            </div>
          </div>

          <div className="text-center border-r flex items-center justify-center w-full">
            <div className="flex flex-col items-center ">
              <span className="text-gray-400 text-sm font-medium">Promedio</span>
              <span className="text-emerald-400 text-2xl font-bold">{averageState}</span>
            </div>
          </div>
          <div className="text-center  flex items-center justify-center w-full">
            <div className="flex flex-col items-center ">
              <span className="text-gray-400 text-sm font-medium">Total</span>
              <span className="text-emerald-400 text-2xl font-bold">{totalState}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
