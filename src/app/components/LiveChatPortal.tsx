import React, { useState } from 'react';
import { MessageSquare, Send, Search, CheckCircle, Store, Box, CreditCard, ChevronRight, UserCircle, Bell, X, FileText, ShoppingCart } from 'lucide-react';

export function LiveChatPortal() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hoi, ik zoek een nieuwe 55 inch tv voor mijn woonkamer. Welke raden jullie aan?', sender: 'customer', time: '10:14' },
    { id: 2, text: 'Goedemorgen! Leuk dat je ons contacteert. Zoek je naar een OLED of meer een QLED?', sender: 'agent', time: '10:15' },
    { id: 3, text: 'Zeker OLED, we kijken veel films. Is de LG C3 toevallig nog beschikbaar?', sender: 'customer', time: '10:16' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [orderState, setOrderState] = useState<'idle' | 'creating' | 'sent' | 'paid'>('idle');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: inputMsg, sender: 'agent', time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) }]);
    setInputMsg('');
  };

  const createOrder = () => {
    setOrderState('creating');
    setTimeout(() => {
      setOrderState('sent');
      setMessages([...messages, { 
        id: Date.now(), 
        text: 'Ik heb hierbij een betaalverzoek klaargezet voor de LG OLED55C3. Klik op de link om veilig via iDEAL te betalen: https://pay.hellotv.nl/checkout/LG55C3-8273', 
        sender: 'agent', 
        time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) 
      }]);
      
      // Simulate customer paying
      setTimeout(() => {
        setOrderState('paid');
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: 'Bedankt! De betaling is gelukt. De bestelling is succesvol doorgegeven aan ons systeem en wordt morgen geleverd!', 
          sender: 'system', 
          time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) 
        }]);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar LiveChat Chats */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col hidden lg:flex shrink-0">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <MessageSquare size={20} className="text-[#FDCB2C]" /> LiveChat
          </h2>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Zoek chat..." className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#FDCB2C] outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-gray-100 bg-[#FDCB2C]/10 cursor-pointer border-l-4 border-l-[#FDCB2C]">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-gray-900">Bezoeker #8912</span>
              <span className="text-xs text-gray-500">10:16</span>
            </div>
            <p className="text-sm text-gray-600 truncate">Zeker OLED, we kijken veel films...</p>
          </div>
          <div className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-gray-900">Michiel de Boer</span>
              <span className="text-xs text-gray-500">09:42</span>
            </div>
            <p className="text-sm text-gray-600 truncate">Bedankt voor de info!</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <UserCircle size={24} className="text-gray-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Bezoeker #8912</h3>
              <p className="text-xs text-green-600 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online (Kijkt naar LG OLED55C3)</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">
              Chat Sluiten
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f9fa]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
              {msg.sender === 'system' ? (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">
                  <CheckCircle size={16} /> {msg.text}
                </div>
              ) : (
                <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${msg.sender === 'agent' ? 'bg-[#FDCB2C] text-black rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                  <p className="text-[15px]">{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.sender === 'agent' ? 'text-gray-700' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSend} className="flex gap-3">
            <input 
              type="text" 
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Typ een bericht..." 
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none"
            />
            <button type="submit" className="px-6 bg-[#1D6F42] hover:bg-green-800 text-white rounded-xl font-bold flex items-center justify-center transition-colors">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* HelloTV Custom LiveChat Widget */}
      <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <Store className="text-blue-600" /> HelloTV Smart Widget
          </h2>

          {/* CRM Profile */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <UserCircle size={16} className="text-gray-400" /> Klantprofiel
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Naam:</span>
                <span className="font-bold text-gray-900">Nog onbekend</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Huidige Pagina:</span>
                <span className="font-bold text-blue-600 truncate max-w-[150px]">/tv/lg-oled55c3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sessie Duur:</span>
                <span className="font-bold text-gray-900">4 min</span>
              </div>
            </div>
          </div>

          {/* Smart Inventory Match */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Box size={16} className="text-green-500" /> Context: VMS Voorraad
            </h3>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100 mb-3">
              <p className="font-bold text-green-800 text-sm mb-1">Product Match: LG OLED55C3</p>
              <p className="text-xs text-green-700">De klant bevindt zich momenteel op deze pagina.</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Centraal DC:</span>
                <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">142 op voorraad</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Amsterdam:</span>
                <span className="font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">2 op voorraad</span>
              </div>
            </div>
          </div>

          {/* Quick Order Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShoppingCart size={16} className="text-purple-500" /> Directe Ordercreatie
            </h3>
            
            <p className="text-xs text-gray-500 mb-4">
              Maak direct een bestelling aan vanuit de chat. De order wordt na betaling automatisch in VMS geplaatst.
            </p>

            {orderState === 'idle' && (
              <button 
                onClick={createOrder}
                className="w-full py-3 bg-[#FDCB2C] hover:bg-yellow-500 text-black font-black rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard size={18} /> Maak Betaallink (LG C3)
              </button>
            )}

            {orderState === 'creating' && (
              <div className="w-full py-3 bg-gray-100 text-gray-500 font-bold rounded-xl flex items-center justify-center gap-2">
                Order genereren...
              </div>
            )}

            {orderState === 'sent' && (
              <div className="w-full py-3 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-xl flex flex-col items-center justify-center gap-1">
                <span>Betaallink Verstuurd!</span>
                <span className="text-xs font-normal">Wachten op betaling klant...</span>
              </div>
            )}

            {orderState === 'paid' && (
              <div className="w-full p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl">
                <p className="font-black flex items-center justify-center gap-2 mb-2"><CheckCircle size={18}/> Betaling Geslaagd!</p>
                <p className="text-xs text-center font-bold text-green-700">Order is automatisch in Vendit geplaatst. Jouw target is zojuist geüpdatet.</p>
              </div>
            )}

            <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors mt-3 flex items-center justify-center gap-2 text-sm">
              <FileText size={16} /> Stuur PDF Offerte
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
