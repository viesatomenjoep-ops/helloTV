import React, { useState, useEffect } from 'react';
import { Database, Terminal, CheckCircle } from 'lucide-react';

export function SqlTerminal({ onComplete, query }: { onComplete: () => void, query: string }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const sequence = [
      "Connecting to PostgreSQL database...",
      "Connected to host: db.hellotv.internal",
      "Authenticating as user: api_service",
      "BEGIN TRANSACTION;",
      query,
      "Query OK, 1 row affected (0.04 sec)",
      "COMMIT;",
      "Transaction complete. Disconnecting...",
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setLines(prev => [...prev, sequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        setTimeout(onComplete, 800);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete, query]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] w-full max-w-2xl rounded-xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col">
        <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
          <Terminal size={16} className="text-gray-400" />
          <span className="text-gray-300 text-xs font-mono">hellotv-db-sync-service</span>
        </div>
        <div className="p-6 font-mono text-sm h-64 overflow-y-auto">
          {lines.map((line, idx) => (
            <div key={idx} className={`${line.includes('ERROR') ? 'text-red-400' : line.includes('OK') || line.includes('COMMIT') ? 'text-green-400' : line.startsWith('INSERT') || line.startsWith('BEGIN') ? 'text-blue-400' : 'text-gray-300'} mb-1`}>
              <span className="text-gray-600 mr-2">{'>'}</span>{line}
            </div>
          ))}
          {!isDone && (
            <div className="animate-pulse text-gray-400 mt-2">_</div>
          )}
          {isDone && (
            <div className="mt-4 flex items-center gap-2 text-green-500 font-bold bg-green-500/10 p-2 rounded">
              <CheckCircle size={16} /> Database Sync Succesvol
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
