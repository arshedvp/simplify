import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const PageHeader = ({ title, hasBack = false, onBack }) => (
  <div className="flex items-center mb-6">
    {hasBack && (
      <button onClick={onBack} className="mr-4">
        <ArrowLeft className="text-gray-800" />
      </button>
    )}
    <h2 className="text-xl font-bold text-gray-700">{title}</h2>
  </div>
);
