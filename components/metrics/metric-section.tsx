import type { ReactNode } from 'react';

interface MetricSectionProps {
  readonly title: string;
  readonly description?: string;
  readonly icon?: ReactNode;
  readonly children: ReactNode;
}

export function MetricSection({ title, description, icon, children }: MetricSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}
