import React from 'react';

interface ReportCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ReportCard({ title, description, children }: ReportCardProps) {
  return (
    <div className="bg-white border border-[#141414] p-8">
      <h3 className="text-xl font-bold font-serif italic mb-1">{title}</h3>
      <p className="text-xs opacity-50 mb-8">{description}</p>
      {children}
    </div>
  );
}
