import React from 'react';
import { ArrowLeft, Package, User, Calendar, Printer, CheckCircle, RefreshCw } from 'lucide-react';
import { HelloTVLogo } from './ui/HelloTVLogo';

interface Props {
  quote: any;
  onBack: () => void;
  onConvertToOrder: (quoteId: string) => void;
}

export function QuoteDetailView({ quote, onBack, onConvertToOrder }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 pb-20">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Terug naar offertes</span>
        </button>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <Printer size={18} />
            Print als PDF
          </button>
          {quote.status !== 'Omgezet naar Order' && (
            <button
              onClick={() => onConvertToOrder(quote.id)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors shadow-sm"
            >
              <RefreshCw size={18} />
              Zet om in Order
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 print:shadow-none print:border-none print:p-0">
        {/* Header for PDF / Print */}
        <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-8">
          <div>
            <HelloTVLogo className="h-12 mb-4" />
            <div className="text-sm text-gray-500">
              <p>HelloTV Nederland B.V.</p>
              <p>KVK: 12345678</p>
              <p>BTW: NL123456789B01</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black text-gray-900 mb-2">OFFERTE</h1>
            <p className="text-xl text-gray-500 font-medium mb-1">#{quote.id}</p>
            <p className="text-sm text-gray-400">Datum: {quote.aanschaf_datum.toLocaleDateString('nl-NL')}</p>
            <p className="text-sm text-gray-400">Geldig tot: {quote.geldig_tot.toLocaleDateString('nl-NL')}</p>
            
            <div className="mt-4 inline-block">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                quote.status === 'Omgezet naar Order' ? 'bg-purple-100 text-purple-800' :
                quote.status === 'Goedgekeurd door klant' ? 'bg-green-100 text-green-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {quote.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <User size={18} className="text-[#FDCB2C]" /> Offerte voor:
            </h3>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="font-bold text-gray-800">{quote.klant_naam}</p>
              <p className="text-gray-600 text-sm mt-1">Klant ID: {quote.klant_id}</p>
            </div>
          </div>
          
          {/* Terms */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar size={18} className="text-[#FDCB2C]" /> Voorwaarden:
            </h3>
            <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
              <p>Prijzen zijn inclusief 21% BTW.</p>
              <p>Levering en installatie in overleg.</p>
              <p>Deze offerte is 14 dagen geldig.</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={18} className="text-[#FDCB2C]" /> Geoffreerde Producten
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 font-bold text-gray-700">Omschrijving</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-center">Aantal</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-right">Prijs per stuk</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-right">Totaal</th>
              </tr>
            </thead>
            <tbody>
              {quote.producten.map((prod: any, idx: number) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-800">{prod.naam}</td>
                  <td className="py-4 px-4 text-center text-gray-600">{prod.aantal}</td>
                  <td className="py-4 px-4 text-right text-gray-600">€{prod.prijs.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-4 text-right font-bold text-gray-900">
                    €{(prod.prijs * prod.aantal).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-72 bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotaal</span>
              <span>€{((quote.order_totaal || 0) * 0.79).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600 border-b border-gray-200 pb-4">
              <span>BTW (21%)</span>
              <span>€{((quote.order_totaal || 0) * 0.21).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-900">
              <span>Totaal</span>
              <span>€{(quote.order_totaal || 0).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for printing to make sure the sidebar and other parts are hidden */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .p-8, .bg-gray-50, .bg-white {
            background-color: white !important;
          }
          .p-8 > div:nth-child(2), .p-8 > div:nth-child(2) * {
            visibility: visible;
          }
          .p-8 > div:nth-child(2) {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}
