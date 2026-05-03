import React from "react";

import React from 'react';
import { HelloTVLogo } from './ui/HelloTVLogo';
import { MessageSquare, Zap, Layers, Server } from 'lucide-react';

export function Showcase() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section with Laptop Mockup */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 pt-20 pb-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-white">
              <HelloTVLogo theme="dark" className="h-16 mb-8" />
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                HelloTV Backend System
                <span className="block text-blue-400 mt-2">Management Showcase</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Het oude systeem was uit zijn jasje gegroeid. Met de naamsverandering naar HelloTV was het tijd voor een grondige technische facelift van de achterkant. Na de afronding van de nieuwe merkstrategie was het tijd om te bouwen: een pijlsnel, nieuw CMS.
              </p>
            </div>
            
            {/* CSS Laptop Mockup showing the backend */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[236px] max-w-[400px] md:h-[354px] md:max-w-[600px] shadow-2xl">
                <div className="rounded-lg overflow-hidden h-[220px] md:h-[338px] bg-gray-100 flex items-center justify-center relative">
                   {/* Fake Dashboard UI inside laptop */}
                   <div className="absolute top-0 left-0 w-1/4 h-full bg-gray-900 border-r border-gray-800 flex flex-col p-4">
                      <div className="h-4 w-16 bg-gray-700 rounded mb-6"></div>
                      <div className="h-3 w-full bg-blue-600 rounded mb-3"></div>
                      <div className="h-3 w-3/4 bg-gray-800 rounded mb-3"></div>
                      <div className="h-3 w-5/6 bg-gray-800 rounded mb-3"></div>
                   </div>
                   <div className="absolute top-0 right-0 w-3/4 h-full bg-gray-100 p-6">
                      <div className="h-6 w-48 bg-gray-300 rounded mb-8"></div>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="h-16 bg-white rounded shadow-sm border border-gray-200"></div>
                        <div className="h-16 bg-white rounded shadow-sm border border-gray-200"></div>
                        <div className="h-16 bg-white rounded shadow-sm border border-gray-200"></div>
                      </div>
                      <div className="h-32 bg-white rounded shadow-sm border border-gray-200"></div>
                   </div>
                </div>
              </div>
              <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[480px] md:h-[21px] md:max-w-[720px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section based on scraped data */}
      <div className="max-w-4xl mx-auto px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Op basis van de briefing hebben we 3 belangrijke technische doelen gedestilleerd voor een succesvol CMS:
          </h2>
          
          <div className="space-y-12">
            {/* Point 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Communicatie (Conversation)</h3>
                <p className="text-gray-600 leading-relaxed">
                  Echte gesprekken vinden plaats op vele touchpoints in de klantreis. Dit is altijd de belangrijkste USP van HelloTV geweest. Om dit te ondersteunen moet het nieuwe systeem direct inzicht geven in klantgeschiedenis, live status van bestellingen (ingeladen vanuit Magento) en interne memo's, zodat elke medewerker de conversatie perfect kan voortzetten.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Zap className="text-yellow-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Snelle herkenning (Quick recognition)</h3>
                <p className="text-gray-600 leading-relaxed">
                  Om overzicht te houden in de grote stroom van orders en offertes, is het belangrijk om een dashboard te ontwikkelen dat snelle herkenbaarheid biedt. Dit is vertaald naar duidelijke KPI-kaarten, kleurgecodeerde ordestatussen en logische filtering. Geen onnodige clicks, maar direct overzicht.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Layers className="text-purple-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Flexibel (Flexible)</h3>
                <p className="text-gray-600 leading-relaxed">
                  Omdat het bedrijf snel groeit en processen veranderen, moet de achterkant net zo flexibel zijn als de voorkant. Daarom is gekozen voor een modulaire architectuur met React en Supabase. Het CMS kan eenvoudig worden uitgebreid met nieuwe modules (zoals een nieuwe Logistiek module of Fraud Checks) zonder dat het fundament wankelt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Implementation Section */}
      <div className="max-w-6xl mx-auto px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementatie van het CMS</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              De implementatie van de rebranding aan de achterkant wordt in 2 fases uitgevoerd, net als de frontend.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <div className="mt-1"><Server size={18} className="text-blue-500" /></div>
                <span><strong>Fase 1:</strong> Migratie van de bestaande database structuren, het opzetten van Supabase en het bouwen van de nieuwe React Dashboard interface.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1"><Server size={18} className="text-green-500" /></div>
                <span><strong>Fase 2:</strong> Koppelingen met externe systemen zoals Magento API's, automatische Fraud Checks en naadloze logistieke integratie (Ingenico & DC updates).</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Systeemarchitectuur</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Frontend</span>
                <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">React + Vite</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Styling</span>
                <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Database & Auth</span>
                <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">Supabase (PostgreSQL)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Deployment</span>
                <span className="text-gray-900 bg-gray-200 px-3 py-1 rounded-full text-sm">Vercel & Docker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
