import re

with open('src/app/components/Orders.tsx', 'r') as f:
    content = f.read()

# Make sure we have Trash2 and Edit2 imported
if "Trash2" not in content[:300]:
    content = content.replace("Eye, Search", "Eye, Search, Trash2, Edit2")

# Add state for edit mode
state_search = "const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);"
new_state = """const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);"""
content = content.replace(state_search, new_state)

# Add edit and delete handlers
handlers = """
  const handleDeleteOrder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(window.confirm('Weet je zeker dat je deze order wilt verwijderen?')) {
      setOrdersList(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleEditOrder = (order: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingOrder(order);
  };

  const saveEditedOrder = () => {
    setOrdersList(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
  };
"""

content = content.replace("  const handleCreateUpsell = (e: React.FormEvent) => {", handlers + "\n  const handleCreateUpsell = (e: React.FormEvent) => {")

# Update table rows to include edit and delete buttons
row_actions = """<td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={(e) => handleEditOrder(order, e)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Bewerk Order"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={(e) => handleDeleteOrder(order.id, e)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Verwijder Order"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => setSelectedOrderId(order.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Bekijk Details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>"""

content = re.sub(r'<td className="px-6 py-4">\s*<button\s*onClick=\{\(\) => setSelectedOrderId\(order\.id\)\}.*?</button>\s*</td>', row_actions, content, flags=re.DOTALL)


# Add an edit overlay
edit_overlay = """
        {/* Edit Order Overlay */}
        {editingOrder && (
          <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-4">Order #{editingOrder.id} Bewerken</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <select 
                    value={editingOrder.status}
                    onChange={e => setEditingOrder({...editingOrder, status: e.target.value})}
                    className="w-full border p-2 rounded"
                  >
                    <option value="Afgehandeld - Nieuwe order">Afgehandeld - Nieuwe order</option>
                    <option value="Logistiek - Betaling Akkoord">Logistiek - Betaling Akkoord</option>
                    <option value="Klaar voor logistiek - Verzenden">Klaar voor logistiek - Verzenden</option>
                    <option value="Vervallen">Vervallen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Totaal Bedrag (€)</label>
                  <input 
                    type="number" 
                    value={editingOrder.order_totaal}
                    onChange={e => setEditingOrder({...editingOrder, order_totaal: Number(e.target.value)})}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setEditingOrder(null)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded">Annuleren</button>
                <button onClick={saveEditedOrder} className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Opslaan</button>
              </div>
            </div>
          </div>
        )}
"""

# Insert overlay before the final closing div
content = content.replace("    </div>\n  );\n}\n", edit_overlay + "    </div>\n  );\n}\n")

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(content)

