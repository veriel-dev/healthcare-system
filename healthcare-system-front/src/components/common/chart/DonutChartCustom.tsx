'use client';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function DonutChartCustom({ roles }: { roles: string[] }) {
  const chartConfig = {
    users: {
      label: 'Users',
    },
    admin: {
      label: 'Admin',
      color: 'hsl(var(--chart-1))',
    },
    doctor: {
      label: 'Doctor',
      color: 'hsl(var(--chart-2))',
    },
    nurse: {
      label: 'Nurse',
      color: 'hsl(var(--chart-3))',
    },
    receptionist: {
      label: 'Receptionist',
      color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig;
  /*
   * useMemo: Solamente necesitamos que el chartData cambie cuando cambie el array `roles` no cada vez que cargue
   * el componente incluso cuando se recarga la página
   */
  const chartData = React.useMemo(() => {
    const counts = roles.reduce(
      (acc, role) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return [
      { role: 'admin', value: counts.admin || 0, fill: 'var(--color-admin)' },
      { role: 'doctor', value: counts.doctor || 0, fill: 'var(--color-doctor)' },
      { role: 'nurse', value: counts.nurse || 0, fill: 'var(--color-nurse)' },
      { role: 'receptionist', value: counts.receptionist || 0, fill: 'var(--color-receptionist)' },
    ];
  }, [roles]);

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData],
  );

  const percentageData = React.useMemo(() => {
    return [
      {
        role: 'Admin',
        color: 'hsl(var(--chart-1))',
        percentage: Math.round((chartData[0].value / total) * 100),
      },
      {
        role: 'Doctors',
        color: 'hsl(var(--chart-2))',
        percentage: Math.round((chartData[1].value / total) * 100),
      },
      {
        role: 'Nurses',
        color: 'hsl(var(--chart-3))',
        percentage: Math.round((chartData[2].value / total) * 100),
      },
      {
        role: 'Receptionist',
        color: 'hsl(var(--chart-4))',
        percentage: Math.round((chartData[3].value / total) * 100),
      },
    ];
  }, [chartData, total]);

  return (
    <Card className="flex flex-col bg-transparent border-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] ">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="role" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col mt-2 space-y-4 w-full">
        {percentageData.map(item => (
          <div key={item.role} className="space-y-2 w-full">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{item.role}</span>
              <span className="text-white font-mono">{item.percentage}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-fillProgress"
                style={{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  '--target-width': `${item.percentage}%`,
                  background: `${item.color}`,
                  animation: 'fillProgress 1s ease-out forwards',
                }}
              />
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
