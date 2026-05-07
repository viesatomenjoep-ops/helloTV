import React, { useState } from 'react';
import { MessageSquare, Send, Search, CheckCircle, Store, Box, CreditCard, ChevronRight, UserCircle, Bell, X, FileText, ShoppingCart, Maximize2, Minimize2, Server } from 'lucide-react';

const MOCK_VISITORS = [
  { id: '8912', name: 'Bezoeker #8912', time: '10:16', preview: 'Zeker OLED, we kijken veel films...', status: 'Online (Kijkt naar LG OLED55C3)', context: 'LG OLED55C3', duration: '4 min', url: '/tv/lg-oled55c3' },
  { id: '8913', name: 'Michiel de Boer', time: '09:42', preview: 'Bedankt voor de info!', status: 'Inactief', context: 'Samsung Neo QLED', duration: '12 min', url: '/tv/samsung-qe65qn90c' },
  { id: '8914', name: 'Sanne', time: '10:20', preview: 'Hebben jullie deze ook in 65 inch?', status: 'Online', context: 'Philips Ambilight', duration: '2 min', url: '/tv/philips-55oled808' },
  { id: '8915', name: 'Bezoeker #8915', time: '10:22', preview: 'Ik zoek een soundbar', status: 'Online (Kijkt naar Sonos)', context: 'Sonos Arc', duration: '1 min', url: '/audio/sonos-arc' },
  { id: '8916', name: 'Johan', time: '10:25', preview: 'Is de levering gratis?', status: 'Online', context: 'Algemeen', duration: '8 min', url: '/klantenservice/levering' },
  { id: '8917', name: 'Bezoeker #8917', time: '10:26', preview: 'Wat is het verschil tussen OLED en QLED?', status: 'Online', context: 'Advies', duration: '5 min', url: '/advies/oled-vs-qled' },
  { id: '8918', name: 'Linda V.', time: '10:30', preview: 'Kan ik mijn oude tv inruilen?', status: 'Online', context: 'Inruil', duration: '3 min', url: '/service/inruilen' },
  { id: '8919', name: 'Bezoeker #8919', time: '10:35', preview: 'Hoi, werkt deze muurbeugel voor...', status: 'Online', context: 'Accessoires', duration: '1 min', url: '/accessoires/vogels-thin' },
  { id: '8920', name: 'Peter', time: '10:40', preview: 'Ik heb een vraag over mijn bestelling', status: 'Online', context: 'Klantenservice', duration: '10 min', url: '/mijn-account' },
  { id: '8921', name: 'Bezoeker #8921', time: '10:45', preview: 'Wow wat een mooie korting', status: 'Online', context: 'Aanbiedingen', duration: '2 min', url: '/acties' }
];

export function LiveChatPortal() {
  const [activeChatId, setActiveChatId] = useState<string | null>('8912');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSmartWidgetExpanded, setIsSmartWidgetExpanded] = useState(false);
  const [addressExtracted, setAddressExtracted] = useState(false);
  const [pdfState, setPdfState] = useState<'idle' | 'generating_offerte' | 'sent_offerte' | 'generating_order' | 'sent_order'>('idle');

  const extractAddress = () => {
    // Simulatie van AI extractie van naam en adres uit chat
    alert("AI heeft adresgegevens succesvol uit de chat gehaald: Tom van Biene, Breda. Deze zijn direct in Vendit gekoppeld aan de order.");
    setAddressExtracted(true);
  };

  const sendPdfOfferte = () => {
    if (!activeChatId) return;
    setPdfState('generating_offerte');
    setTimeout(() => {
      setPdfState('sent_offerte');
      
      // Voeg bericht toe aan chat
      const botMsg = { id: Date.now(), sender: 'agent', text: 'Hierbij de PDF Offerte. Laat gerust weten als u vragen heeft.', time: new Date().toLocaleTimeString('nl-NL', {hour: '2-digit', minute:'2-digit'}), isSystem: true, pdf: 'Offerte_HelloTV.pdf' };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), botMsg]
      }));

      setTimeout(() => setPdfState('idle'), 4000);
    }, 1500);
  };

  const sendPdfOrder = () => {
    if (!activeChatId) return;
    setPdfState('generating_order');
    setTimeout(() => {
      setPdfState('sent_order');
      
      // Voeg bericht toe aan chat
      const botMsg = { id: Date.now(), sender: 'agent', text: 'Gefeliciteerd met uw aankoop! Hierbij de officiële PDF Order.', time: new Date().toLocaleTimeString('nl-NL', {hour: '2-digit', minute:'2-digit'}), isSystem: true, pdf: 'Order_HelloTV.pdf' };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), botMsg]
      }));

      setTimeout(() => setPdfState('idle'), 4000);
    }, 1500);
  };
  const [messages, setMessages] = useState<Record<string, any[]>>({
    '8912': [
      { id: 1, text: 'Hoi, ik zoek een nieuwe 55 inch tv voor mijn woonkamer. Welke raden jullie aan?', sender: 'customer', time: '10:14' },
      { id: 2, text: 'Goedemorgen! Leuk dat je ons contacteert. Zoek je naar een OLED of meer een QLED?', sender: 'agent', time: '10:15' },
      { id: 3, text: 'Zeker OLED, we kijken veel films. Is de LG C3 toevallig nog beschikbaar?', sender: 'customer', time: '10:16' }
    ]
  });
  
  const [inputMsg, setInputMsg] = useState('');
  const [orderState, setOrderState] = useState<'idle' | 'creating' | 'sent' | 'paid'>('idle');

  const activeChat = MOCK_VISITORS.find(v => v.id === activeChatId);
  const activeMessages = messages[activeChatId || ''] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeChatId) return;
    
    setMessages({
      ...messages,
      [activeChatId]: [
        ...(messages[activeChatId] || []),
        { id: Date.now(), text: inputMsg, sender: 'agent', time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) }
      ]
    });
    setInputMsg('');
  };

  const createOrder = () => {
    if (!activeChatId) return;
    setOrderState('creating');
    setTimeout(() => {
      setOrderState('sent');
      setMessages({
        ...messages,
        [activeChatId]: [
          ...(messages[activeChatId] || []),
          { 
            id: Date.now(), 
            text: `Ik heb hierbij een betaalverzoek klaargezet voor de ${activeChat?.context}. Klik op de link om veilig via iDEAL te betalen: https://pay.hellotv.nl/checkout/${activeChatId}`, 
            sender: 'agent', 
            time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) 
          }
        ]
      });
      
      // Simulate customer paying
      setTimeout(() => {
        setOrderState('paid');
        setMessages(prev => ({
          ...prev,
          [activeChatId]: [
            ...(prev[activeChatId] || []),
            { 
              id: Date.now(), 
              text: 'Bedankt! De betaling is gelukt. De bestelling is succesvol doorgegeven aan ons systeem en wordt morgen geleverd!', 
              sender: 'system', 
              time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) 
            }
          ]
        }));
      }, 5000);
    }, 1500);
  };

  const closeChat = () => {
    setActiveChatId(null);
    setOrderState('idle');
  };

  const openChat = (id: string) => {
    setActiveChatId(id);
    setOrderState('idle');
    if (!messages[id]) {
      setMessages({
        ...messages,
        [id]: [{ id: Date.now(), text: `Welkom bij HelloTV! Kan ik u helpen met ${MOCK_VISITORS.find(v => v.id === id)?.context}?`, sender: 'agent', time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) }]
      });
    }
  };

  return (
    <div className={`flex bg-gray-50 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'}`}>
      {/* Sidebar LiveChat Chats */}
      {!isFullscreen && (
        <div className={`w-full lg:w-80 bg-white border-r border-gray-200 flex-col shrink-0 ${activeChatId ? "hidden lg:flex" : "flex"}`}>
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
            {MOCK_VISITORS.map((visitor) => (
              <div 
                key={visitor.id}
                onClick={() => openChat(visitor.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${activeChatId === visitor.id ? 'bg-[#FDCB2C]/10 border-l-4 border-l-[#FDCB2C]' : 'hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-gray-900">{visitor.name}</span>
                  <span className="text-xs text-gray-500">{visitor.time}</span>
                </div>
                <p className={`text-sm truncate ${activeChatId === visitor.id ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{visitor.preview}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className={`flex-1 flex-col bg-white ${!activeChatId ? "hidden lg:flex" : "flex"}`}>
        {activeChatId ? (
          <>
            <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserCircle size={24} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{activeChat?.name}</h3>
                  <p className="text-xs text-green-600 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> {activeChat?.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)} 
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  {isFullscreen ? 'Klein Scherm' : 'Groot Scherm'}
                </button>
                <button onClick={closeChat} className="px-3 py-1.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <X size={16} /> Terug / Sluiten
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f9fa]">
              {activeMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
                  {msg.sender === 'system' ? (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">
                      <CheckCircle size={16} /> {msg.text}
                    </div>
                  ) : (
                    <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${msg.sender === 'agent' ? 'bg-[#FDCB2C] text-black rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                      <p className="text-[15px]">{msg.text}</p>
                      {msg.pdf && (
                        <div className="mt-3 inline-flex items-center gap-2 bg-white/50 border border-black/10 text-black px-4 py-2 rounded-lg text-sm font-bold shadow-sm cursor-pointer hover:bg-white/80">
                          <FileText size={16} /> {msg.pdf}
                        </div>
                      )}
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
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
            <MessageSquare size={64} className="mb-4 opacity-50" />
            <h2 className="text-xl font-bold mb-2">Geen Actieve Chat</h2>
            <p>Selecteer een chat uit de lijst of wacht op nieuwe bezoekers.</p>
          </div>
        )}
      </div>

      {/* HelloTV Custom LiveChat Widget */}
      {activeChatId && !isFullscreen && (
        <div className={`${isSmartWidgetExpanded ? 'fixed inset-0 z-[9999] w-full p-8' : 'w-96'} bg-gray-50 border-l border-gray-200 flex-col shrink-0 overflow-y-auto transition-all duration-300 hidden xl:flex`}>
          {isSmartWidgetExpanded && (
            <div className="absolute top-4 right-4">
               <button onClick={() => setIsSmartWidgetExpanded(false)} className="p-2 bg-white shadow-md rounded-lg text-gray-500 hover:bg-gray-100"><X size={24}/></button>
            </div>
          )}

          <div className={`p-6 ${isSmartWidgetExpanded ? "max-w-6xl mx-auto w-full grid grid-cols-2 gap-8" : ""}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Store className="text-blue-600" /> Smart Menu
              </h2>
              <button 
                onClick={() => setIsSmartWidgetExpanded(!isSmartWidgetExpanded)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title={isSmartWidgetExpanded ? "Verklein" : "Vergroot"}
              >
                {isSmartWidgetExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>

            {/* CRM Profile */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <UserCircle size={16} className="text-gray-400" /> Klantprofiel
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Naam:</span>
                  <span className="font-bold text-gray-900">{activeChat?.name.includes('#') ? 'Nog onbekend' : activeChat?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Huidige Pagina:</span>
                  <span className="font-bold text-blue-600 truncate max-w-[150px]">{activeChat?.url}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sessie Duur:</span>
                  <span className="font-bold text-gray-900">{activeChat?.duration}</span>
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
                <p className="font-bold text-green-800 text-sm mb-1">Product Match: {activeChat?.context}</p>
                <p className="text-xs text-green-700">De klant bevindt zich momenteel op deze pagina.</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Centraal DC:</span>
                  <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">{Math.floor(Math.random() * 200)} op voorraad</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Amsterdam:</span>
                  <span className="font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">{Math.floor(Math.random() * 5)} op voorraad</span>
                </div>
              </div>
            </div>

            {/* Quick Order Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShoppingCart size={16} className="text-purple-500" /> Directe Ordercreatie
              </h3>
              
              <button 
                onClick={extractAddress}
                className={`w-full py-2 mb-4 border font-bold rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2 ${addressExtracted ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                <Server size={16} /> 
                {addressExtracted ? 'Klantgegevens Gekoppeld' : 'Klantgegevens & Adres Ophalen'}
              </button>

              {orderState === 'idle' && (
                <button 
                  onClick={createOrder}
                  className="w-full py-3 bg-[#FDCB2C] hover:bg-yellow-500 text-black font-black rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} /> Maak Betaallink
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
                <div className="w-full p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl mb-3">
                  <p className="font-black flex items-center justify-center gap-2 mb-2"><CheckCircle size={18}/> Betaling Geslaagd!</p>
                  <p className="text-xs text-center font-bold text-green-700">Order is automatisch in Vendit geplaatst.</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 mt-3">
                <button 
                  onClick={sendPdfOfferte}
                  disabled={pdfState !== 'idle'}
                  className="py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-1 text-xs"
                >
                  <FileText size={16} /> 
                  {pdfState === 'generating_offerte' ? 'Genereren...' : pdfState === 'sent_offerte' ? 'Verzonden!' : 'Stuur PDF Offerte'}
                </button>
                <button 
                  onClick={sendPdfOrder}
                  disabled={pdfState !== 'idle'}
                  className="py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-1 text-xs"
                >
                  <FileText size={16} /> 
                  {pdfState === 'generating_order' ? 'Genereren...' : pdfState === 'sent_order' ? 'Verzonden!' : 'Stuur PDF Order'}
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
