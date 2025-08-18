import React from 'react';
export default function Tooltip({ text }){
  return (
    <span role="tooltip" className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 px-2 py-1 rounded border border-white/10">{text}</span>
  );
}