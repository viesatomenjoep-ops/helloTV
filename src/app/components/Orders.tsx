import { useState } from 'react';
import { Eye, Search, Filter } from 'lucide-react';
import { mockOrders } from '../../utils/mockOrders';
import { OrderDetailView } from './OrderDetail';

export function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (selectedOrderId) {
    const order = mockOrders.find(o => o.id === selectedOrderId);
    if (order) {
      return <OrderDetailView order={order} onBack={() => setSelectedOrderId(null)} />;
    }
  }

  const filteredOrders = mockOrders.filter(order => 
    order.id.includes(searchTerm) || order.klant_id.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orderbeheer</h1>
          <p className="text-gray-500 text-sm mt-1">Beheer en volg alle HelloTV orders</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Zoeken op ordernummer of klant..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order Nr.</th>
                <th className="px-6 py-4">Datum</th>
                <th className="px-6 py-4">Bedrag</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Verzending</th>
                <th className="px-6 py-4">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">#{order.id}</td>
                  <td className="px-6 py-4">{order.aanschaf_datum.toLocaleDateString('nl-NL')}</td>
                  <td className="px-6 py-4 font-medium">€{order.order_totaal.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.verzending}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Bekijk Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Geen orders gevonden.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
