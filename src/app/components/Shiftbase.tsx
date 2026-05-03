import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Coffee, Calendar, Search, CheckCircle } from 'lucide-react';

const EMPLOYEES = [
  "Tom van Bienen",
  "Joep Morsink",
  "Thijs Meijer",
  "Maick",
  "Wendy",
  "Johan",
  "Sophie de Vries",
  "Daan Bakker",
  "Julia Jansen",
  "Lars Visser"
];

type ShiftState = 'UITGEKLOKT' | 'INGEKLOKT' | 'PAUZE';

export function Shiftbase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('Tom van Bienen');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [shiftState, setShiftState] = useState<ShiftState>('UITGEKLOKT');
  const [clockInTime, setClockInTime] = useState<Date | null>(null);

  // Filter employees for the search bar
  const filteredEmployees = EMPLOYEES.filter(emp => 
    emp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleClockIn = () => {
    setShiftState('INGEKLOKT');
    setClockInTime(new Date());
  };

  const handlePause = () => {
    setShiftState(shiftState === 'PAUZE' ? 'INGEKLOKT' : 'PAUZE');
  };

  const handleClockOut = () => {
    setShiftState('UITGEKLOKT');
    setClockInTime(null);
  };

  return (
    <div className="p-8 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shiftbase (Tijdregistratie)</h1>
          <p className="text-gray-600">Inklokken, urenregistratie en pauzebeheer voor HelloTV medewerkers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Selecteer Medewerker Widget */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="text-blue-500" size={20} />
                Selecteer Medewerker
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Zoek medewerker..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none font-semibold text-gray-800"
                />
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map(emp => (
                        <button
                          key={emp}
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setSearchTerm('');
                            setShowDropdown(false);
                            // Reset state for new user
                            setShiftState('UITGEKLOKT');
                            setClockInTime(null);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 font-medium border-b border-gray-50 last:border-0 ${
                            selectedEmployee === emp ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                          }`}
                        >
                          {emp}
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-sm text-gray-500 text-center">Geen medewerkers gevonden</div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Actieve Medewerker</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    {selectedEmployee.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{selectedEmployee}</p>
                    <p className="text-xs text-gray-500">ID: HTV-{Math.abs(selectedEmployee.hashCode() || 10293)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tijdklok Widget */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center relative overflow-hidden">
              {/* Dynamic Background based on state */}
              <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${
                shiftState === 'INGEKLOKT' ? 'bg-green-500' :
                shiftState === 'PAUZE' ? 'bg-[#FDCB2C]' : 'bg-gray-400'
              }`} />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 uppercase" style={{
                  backgroundColor: shiftState === 'INGEKLOKT' ? '#dcfce7' : shiftState === 'PAUZE' ? '#fef3c7' : '#f3f4f6',
                  color: shiftState === 'INGEKLOKT' ? '#166534' : shiftState === 'PAUZE' ? '#92400e' : '#4b5563'
                }}>
                  {shiftState === 'INGEKLOKT' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                  {shiftState === 'PAUZE' && <Coffee size={14} />}
                  {shiftState === 'UITGEKLOKT' && <Square size={14} />}
                  STATUS: {shiftState}
                </div>

                <div className="font-mono text-7xl md:text-8xl font-black text-gray-900 tracking-tighter mb-8">
                  {formatTime(currentTime)}
                </div>

                {clockInTime && (
                  <p className="text-gray-500 font-medium mb-8">
                    Ingeklokt sinds: {formatTime(clockInTime)}
                  </p>
                )}

                <div className="flex flex-wrap justify-center gap-4">
                  {shiftState === 'UITGEKLOKT' ? (
                    <button
                      onClick={handleClockIn}
                      className="px-8 py-4 bg-[#1D6F42] text-white rounded-xl font-black text-xl flex items-center gap-2 hover:bg-green-700 hover:scale-105 transition-all shadow-lg hover:shadow-green-500/30"
                    >
                      <Play fill="currentColor" />
                      INKLOKKEN
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handlePause}
                        className={`px-8 py-4 rounded-xl font-black text-xl flex items-center gap-2 transition-all shadow-lg hover:scale-105 ${
                          shiftState === 'PAUZE' 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30' 
                            : 'bg-[#FDCB2C] text-black hover:bg-yellow-400 hover:shadow-yellow-500/30'
                        }`}
                      >
                        <Coffee />
                        {shiftState === 'PAUZE' ? 'HERVATTEN' : 'PAUZE'}
                      </button>
                      <button
                        onClick={handleClockOut}
                        className="px-8 py-4 bg-red-600 text-white rounded-xl font-black text-xl flex items-center gap-2 hover:bg-red-700 hover:scale-105 transition-all shadow-lg hover:shadow-red-500/30"
                      >
                        <Square fill="currentColor" />
                        UITKLOKKEN
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-blue-500" size={20} />
                Rooster & Historie Vandaag
              </h3>
              {shiftState === 'UITGEKLOKT' && !clockInTime ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle size={40} className="mx-auto text-gray-300 mb-2" />
                  <p>Nog geen uren geregistreerd voor vandaag.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">Reguliere Dienst</p>
                      <p className="text-sm text-gray-500">{clockInTime ? formatTime(clockInTime) : '00:00:00'} - Heden</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">Lopend...</p>
                      <p className="text-xs text-gray-400">Filiaal Breda</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper to generate consistent mock IDs
declare global {
  interface String {
    hashCode(): number;
  }
}
String.prototype.hashCode = function() {
  let hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
