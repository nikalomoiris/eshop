import { Card } from '@/components/ui/card';
import type { MetricDisplay } from '@/lib/types/metrics';

interface MetricCardProps {
  readonly metric: MetricDisplay;
}

export function MetricCard({ metric }: MetricCardProps) {
  const getStatusColorClass = (color?: string) => {
    switch (color) {
      case 'green':
        return 'border-green-500 bg-green-50';
      case 'yellow':
        return 'border-yellow-500 bg-yellow-50';
      case 'red':
        return 'border-red-500 bg-red-50';
      case 'blue':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getValueColorClass = (color?: string) => {
    switch (color) {
      case 'green':
        return 'text-green-700';
      case 'yellow':
        return 'text-yellow-700';
      case 'red':
        return 'text-red-700';
      case 'blue':
        return 'text-blue-700';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <Card className={`p-4 ${getStatusColorClass(metric.statusColor)}`}>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-600">{metric.label}</p>
        <div className="flex items-baseline gap-2">
          <p className={`text-2xl font-bold ${getValueColorClass(metric.statusColor)}`}>
            {metric.value || '—'}
          </p>
          {metric.unit && (
            <span className="text-sm text-gray-500">{metric.unit}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
