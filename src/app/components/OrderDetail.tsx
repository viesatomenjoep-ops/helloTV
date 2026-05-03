import { OrderDetail } from '../../types/database';
import { ArrowLeft, Package, CreditCard, Truck, ShieldCheck, MessageSquare, Printer } from 'lucide-react';
import { HelloTVLogo } from './ui/HelloTVLogo';

interface Props {
  order: OrderDetail;
  onBack: () => void;
}

export function OrderDetailView({ order, onBack }: Props) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Terug naar orders</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          <Printer size={18} />
          Print als PDF
        </button>
      </div>

      {/* Header for PDF / Print */}
      <div className="hidden print:flex justify-between items-start mb-8 border-b border-gray-100 pb-8">
        <div>
          <HelloTVLogo className="h-12 mb-4" />
          <div className="text-sm text-gray-500">
            <p>HelloTV Nederland B.V.</p>
            <p>KVK: 12345678</p>
            <p>BTW: NL123456789B01</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-4xl font-black text-gray-900 mb-2">ORDER</h1>
          <p className="text-xl text-gray-500 font-medium mb-1">#{order.id}</p>
          <p className="text-sm text-gray-400">Datum: {order.aanschaf_datum.toLocaleDateString('nl-NL')}</p>
        </div>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order #{order.id}</h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {order.status}
            </span>
            <span className="text-gray-500 text-sm">
              Aangeschaft op {order.aanschaf_datum.toLocaleString('nl-NL')}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">Totaalbedrag</div>
          <div className="text-3xl font-bold text-gray-900">
            €{order.order_totaal.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Customer & Payment Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-4">
            <CreditCard size={20} className="text-blue-500" />
            <span>Betaling & Klant</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Klant ID</span>
              <span className="font-medium">{order.klant_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Betaalmethode</span>
              <span className="font-medium">{order.betaalmethode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Magento Order</span>
              <span className="font-medium">{order.magento_ordernummer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Kanaal</span>
              <span className="font-medium capitalize">{order.communicatiekanaal}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-4">
            <Truck size={20} className="text-orange-500" />
            <span>Logistiek</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Methode</span>
              <span className="font-medium">{order.verzending}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bezorgdatum</span>
              <span className="font-medium">
                {order.bezorg_datum ? order.bezorg_datum.toLocaleDateString('nl-NL') : 'Niet gepland'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Label</span>
              <span className="font-medium">{order.label}</span>
            </div>
          </div>
        </div>

        {/* Fraud Check */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-4">
            <ShieldCheck size={20} className="text-green-500" />
            <span>Fraud Check</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">AAV Check</span>
              <span className="font-medium text-green-600">{order.fraud_check.aavcheck}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">CVC Check</span>
              <span className="font-medium text-green-600">{order.fraud_check.cvccheck}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Landkaart (CC)</span>
              <span className="font-medium">{order.fraud_check.cccty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Landkaart (IP)</span>
              <span className="font-medium">{order.fraud_check.ipcty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Lines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2 text-gray-800 font-semibold">
          <Package size={20} className="text-purple-500" />
          <span>Producten ({order.order_regels.length})</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Aantal</th>
                <th className="px-6 py-4 font-medium">Prijs (ex)</th>
                <th className="px-6 py-4 font-medium">Totaal (inc)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {order.order_regels.map((regel, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{regel.productnaam}</td>
                  <td className="px-6 py-4 text-gray-600">{regel.model_type}</td>
                  <td className="px-6 py-4 text-gray-600">{regel.aantal}x</td>
                  <td className="px-6 py-4 text-gray-600">€{regel.prijs_ex.toFixed(2)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">€{regel.totaal_inc.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal Memos */}
      {order.interne_memos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-6">
            <MessageSquare size={20} className="text-yellow-500" />
            <span>Interne Memo's</span>
          </div>
          <div className="space-y-4">
            {order.interne_memos.map(memo => (
              <div key={memo.id} className="p-4 bg-yellow-50/50 rounded-lg border border-yellow-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{memo.auteur}</span>
                  <span className="text-xs text-gray-500">{memo.datum.toLocaleString('nl-NL')}</span>
                </div>
                <p className="text-gray-700 text-sm">{memo.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS for printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          .hidden.print\\:flex {
            display: flex !important;
            visibility: visible !important;
          }
          .hidden.print\\:flex * {
            visibility: visible !important;
          }
          .p-8, .bg-gray-50, .bg-white {
            background-color: white !important;
            box-shadow: none !important;
          }
          .p-8 > div:nth-child(n+2), .p-8 > div:nth-child(n+2) * {
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
