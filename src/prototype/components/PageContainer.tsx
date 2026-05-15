import { type ReactNode } from 'react';

export default function PageContainer({ children }: { children: ReactNode }) {
  return <div className="space-y-6 animate-[fadeIn_0.2s_ease]">{children}</div>;
}
