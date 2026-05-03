import React, { useState } from 'react';
import { Settings, MessageSquare, AlertTriangle, PenTool as Tool, Search, Clock, Mail, CheckCircle, Smartphone, MapPin, Printer, Bot, Sparkles, Send, X, ArrowLeft, Send as SendIcon } from 'lucide-react';
import { mockOrders } from '../../utils/mockOrders';
import { HelloTVLogo } from './ui/HelloTVLogo';

export function Reparatie() {
  const [activeTab, setActiveTab] = useState<'overzicht' | 'ai_inbox' | 'nieuw_formulier' | 'mail_adviesportaal'>('overzicht');
  
  // States voor Nieuw Formulier
  const [selectedOrder, setSelectedOrder] = useState('');
  const [type, setType] = useState('Reparatie');
  const [klacht, setKlacht] = useState('');
  const [accessoires, setAccessoires] = useState('Nee');
  const [schade, setSchade] = useState('Krasvrij');
  const [verpakking, setVerpakking] = useState('Originele doos aanwezig');
  const [locatie, setLocatie] = useState('Filiaal Breda');
  const [formSuccess, setFormSuccess] = useState(false);

  // States voor Bekijk Details & Adviesportaal
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [showMailPortal, setShowMailPortal] = useState(false);
  const [mailBericht, setMailBericht] = useState('');

  // AI Gemini Integration State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [sentToWhatsapp, setSentToWhatsapp] = useState(false);

  // Mock Tickets State
  const [tickets, setTickets] = useState([
    {
      id: 'REP-2026-001',
      order_id: 'ORD-2026-042',
      klant: 'Janssen',
      type: 'Reparatie',
      status: 'Aangemeld bij CE Repair',
      dagen_in_verwerking: 16,
      deadline_kleur: 'rood',
      locatie: 'Filiaal Breda',
      bron: 'Winkel',
      afgerond: false,
      details: 'Klant klaagt over strepen in het beeld. CE Repair geeft aan te wachten op onderdelen uit Korea.'
    },
    {
      id: 'DOA-2026-089',
      order_id: 'ORD-2026-112',
      klant: 'De Vries',
      type: 'DOA',
      status: 'In behandeling',
      dagen_in_verwerking: 8,
      deadline_kleur: 'oranje',
      locatie: 'Logistiek Duiven',
      bron: 'WhatsApp AI Bot',
      afgerond: false,
      details: 'TV start niet meer op. DOA geclaimd.'
    },
    {
      id: 'REP-2026-045',
      order_id: 'ORD-2026-140',
      klant: 'Bakker',
      type: 'Reparatie',
      status: 'Wacht op pick-up',
      dagen_in_verwerking: 2,
      deadline_kleur: 'geel',
      locatie: 'Filiaal Amsterdam',
      bron: 'Winkel',
      afgerond: false,
      details: 'Aansluiting HDMI defect.'
    }
  ]);

  const STORES = ['Filiaal Breda', 'Filiaal Eindhoven', 'Logistiek Duiven', 'Filiaal Rotterdam', 'Filiaal Amsterdam'];

  const handleOpenMailPortal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTicketId(id);
    setShowMailPortal(true);
    const ticket = tickets.find(t => t.id === id);
    setMailBericht(`Beste ${ticket?.klant},\n\nWe willen u graag een update geven over uw reparatie (${ticket?.id}).\n\nMomenteel duurt de reparatie iets langer dan verwacht omdat...\n\nMet vriendelijke groet,\nHelloTV Service Team`);
  };

  const handleSendMail = () => {
    alert('Mail verzonden via het Adviesportaal naar de klant!');
    setShowMailPortal(false);
  };

  const toggleAfgerond = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTickets(tickets.map(t => t.id === id ? { ...t, afgerond: !t.afgerond, status: !t.afgerond ? 'Afgerond' : 'In behandeling' } : t));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      id: `${type === 'DOA' ? 'DOA' : 'REP'}-2026-${Math.floor(Math.random() * 900) + 100}`,
      order_id: selectedOrder,
      klant: mockOrders.find(o => o.id === selectedOrder)?.klant_id || 'Onbekend',
      type: type,
      status: 'Aangemeld bij CE Repair',
      dagen_in_verwerking: 0,
      deadline_kleur: 'geel',
      locatie: locatie,
      bron: 'Reparatieformulier',
      afgerond: false,
      details: klacht
    };
    
    setTickets([newTicket, ...tickets]);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('overzicht');
      setSelectedOrder('');
      setKlacht('');
      setAiAnalysis('');
    }, 3000);
  };

  const handleGeminiAnalysis = () => {
    if (!klacht) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiAnalysis(`Oorzaak Analyse (Gemini AI):\nDit klinkt als een bekend firmware- of hardwareprobleem met de Ambient/Achterspiegels van de 99F serie. \n\nDirecte Oplossingen:\n1. Voer een harde reset uit (stekker 5 min eruit).\n2. Update naar firmware v1.42 via USB.\n3. Als dit niet werkt, is het een defect moederbord (DOA/Reparatie nodig).`);
    }, 1500);
  };

  const handleSendToWhatsapp = () => {
    setSentToWhatsapp(true);
    setTimeout(() => setSentToWhatsapp(false), 3000);
  };

  const getDeadlineColorClass = (color: string) => {
    if (color === 'rood') return 'bg-red-100 text-red-800 border-red-200';
    if (color === 'oranje') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  if (activeTicketId && !showMailPortal) {
    const ticket = tickets.find(t => t.id === activeTicketId);
    if (ticket) {
      return (
        <div className="p-8 min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setActiveTicketId(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 font-bold">
              <ArrowLeft size={18} /> Terug naar overzicht
            </button>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-black text-gray-900">{ticket.id}</h1>
                  <p className="text-gray-500 font-bold">Gekoppelde Order: {ticket.order_id}</p>
                </div>
                <div className={`px-4 py-2 rounded-xl border font-bold ${getDeadlineColorClass(ticket.deadline_kleur)}`}>
                  Dagen lopend: {ticket.dagen_in_verwerking}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Klant</p>
                  <p className="font-bold text-lg">{ticket.klant}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Status</p>
                  <p className="font-bold text-lg">{ticket.status}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs text-gray-400 uppercase font-bold mb-2">Klacht Omschrijving & Details</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700">
                  {ticket.details}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={(e) => handleOpenMailPortal(ticket.id, e)}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-blue-700"
                >
                  <Mail size={18} /> Open Mail Adviesportaal
                </button>
                <button 
                  onClick={(e) => toggleAfgerond(ticket.id, e)}
                  className={`px-6 py-3 font-bold rounded-xl flex items-center gap-2 ${
                    ticket.afgerond ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <CheckCircle size={18} /> {ticket.afgerond ? 'Markeer als onvoltooid' : 'Markeer als Afgerond'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="p-8 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service & Reparatie Portaal</h1>
            <p className="text-gray-600">Beheer voor DOA's, reparaties, deadlines en communicatie met de klant.</p>
          </div>
          <button 
            onClick={() => setActiveTab('nieuw_formulier')}
            className="px-6 py-3 bg-[#1D6F42] text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <Tool size={20} /> Nieuwe Aanmelding
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('overzicht')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'overzicht' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Clock size={18} /> Lopend Overzicht & Deadlines
          </button>
          <button
            onClick={() => setActiveTab('ai_inbox')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'ai_inbox' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={18} /> WhatsApp / Mail AI Inbox
          </button>
        </div>

        {activeTab === 'overzicht' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">
            
            {/* Mail Adviesportaal Modal */}
            {showMailPortal && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center p-8 rounded-2xl">
                <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-2xl flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black flex items-center gap-2">
                      <Mail className="text-blue-600" /> Mail Adviesportaal
                    </h3>
                    <button onClick={() => setShowMailPortal(false)} className="text-gray-400 hover:text-gray-800"><X size={24} /></button>
                  </div>
                  <p className="text-sm text-gray-500 font-bold mb-4">Verstuur een update naar de klant (Ticket {activeTicketId})</p>
                  <textarea 
                    value={mailBericht}
                    onChange={(e) => setMailBericht(e.target.value)}
                    className="w-full h-48 p-4 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowMailPortal(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-lg">Annuleren</button>
                    <button onClick={handleSendMail} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2">
                      <SendIcon size={16} /> Verzenden
                    </button>
                  </div>
                </div>
              </div>
            )}

            <h2 className="text-lg font-bold text-gray-800 mb-4">Actieve Reparaties & DOA's</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="p-4 font-bold">Ticket ID</th>
                    <th className="p-4 font-bold">Type</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Doorlooptijd</th>
                    <th className="p-4 font-bold">Klant Update</th>
                    <th className="p-4 font-bold text-center">Afgerond</th>
                    <th className="p-4 font-bold">Actie</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {tickets.map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      onClick={() => setActiveTicketId(ticket.id)}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${ticket.afgerond ? 'opacity-50' : ''}`}
                    >
                      <td className="p-4 font-bold text-gray-900">{ticket.id}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          ticket.type === 'DOA' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 font-medium">{ticket.status}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDeadlineColorClass(ticket.deadline_kleur)}`}>
                          {ticket.dagen_in_verwerking} dagen
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={(e) => handleOpenMailPortal(ticket.id, e)}
                          className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Mail size={14} /> Mail Adviesportaal
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={(e) => toggleAfgerond(ticket.id, e)}
                          className={`w-6 h-6 rounded border flex items-center justify-center mx-auto transition-colors ${
                            ticket.afgerond ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-gray-400 text-transparent'
                          }`}
                        >
                          <CheckCircle size={14} className={ticket.afgerond ? 'text-white' : 'text-gray-300'} />
                        </button>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-400 hover:text-gray-900 font-bold text-xs">Bekijk Details &rarr;</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Andere tabs blijven hetzelfde, behalve "Mail CE Repair" -> is nu "Mail Adviesportaal" via de main tab */}
        {activeTab === 'ai_inbox' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
              <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={24} />
                  <span className="font-bold text-lg">HelloTV Service Bot (WhatsApp)</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto bg-[#e5ddd5] space-y-4 text-sm">
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-tr-xl rounded-b-xl max-w-[80%] shadow-sm">
                    <p className="font-bold text-green-600 text-xs mb-1">HelloTV Service Bot</p>
                    <p>Welkom bij HelloTV! Kies een van de volgende opties om snel geholpen te worden:</p>
                    <ul className="list-disc ml-4 mt-2 space-y-1">
                      <li>Wilt u een medewerker spreken?</li>
                      <li>Wilt u reparatieformulieren invullen?</li>
                      <li>Heeft u een andere vraag?</li>
                      <li>Heeft u een tv die binnen 8 dagen kapot is?</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#dcf8c6] p-3 rounded-tl-xl rounded-b-xl max-w-[80%] shadow-sm">
                    <p>Heeft u een tv die binnen 8 dagen kapot is?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-tr-xl rounded-b-xl max-w-[80%] shadow-sm">
                    <p className="font-bold text-green-600 text-xs mb-1">HelloTV Service Bot</p>
                    <p>Wat vervelend! Dit valt onder onze DOA (Dead On Arrival) regeling. Mag ik uw ordernummer?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#dcf8c6] p-3 rounded-tl-xl rounded-b-xl max-w-[80%] shadow-sm">
                    <p>ORD-2026-112</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-tr-xl rounded-b-xl max-w-[80%] shadow-sm">
                    <p className="font-bold text-green-600 text-xs mb-1">HelloTV Service Bot</p>
                    <p>Bedankt. Ik heb ticket <strong>DOA-2026-089</strong> aangemaakt in ons systeem. Breng de tv inclusief originele verpakking naar Filiaal Breda of stuur hem retour.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" /> Geautomatiseerde Acties
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Mail className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Directe Mail naar CE Repair</p>
                    <p className="text-sm">Bij de keuze "reparatieformulier" mailt de bot direct alle benodigde API-data door naar de CA Repair database in Dordrecht.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <MapPin className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Locatie Routering</p>
                    <p className="text-sm">Klanten worden altijd verwezen naar de juiste winkel of hub (bijv. testcase: breda@hellotv.nl).</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Tool className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Scenario: "DOA" ipv "Reparatie"</p>
                    <p className="text-sm">De AI-bot koppelt de term "&lt; 8 dagen kapot" automatisch in de Supabase database aan het label "DOA" i.p.v. "Reparatie".</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'nieuw_formulier' && (
          <div className="max-w-3xl mx-auto">
            {formSuccess ? (
               <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
                 <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                 <h2 className="text-2xl font-bold text-green-900 mb-2">Formulier Verzonden & Aangemeld</h2>
                 <p className="text-green-700">De reparatie is succesvol geregistreerd en de automatische mail naar CE Repair Dordrecht is verzonden. Er is ook een bevestiging naar breda@hellotv.nl gegaan.</p>
               </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Formulier Header met Logo */}
                <div className="bg-gray-900 p-8 flex justify-between items-center text-white">
                  <div>
                    <HelloTVLogo className="h-8 mb-2" theme="dark" />
                    <h2 className="text-xl font-bold">Officieel Reparatieformulier</h2>
                    <p className="text-sm text-gray-400">T.b.v. inname & transport naar CE Repair Dordrecht</p>
                  </div>
                  <Printer className="text-gray-400 opacity-50 cursor-not-allowed" size={32} />
                </div>
                
                <form className="p-8 space-y-6" onSubmit={handleSubmitForm}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Koppel aan bestaande Order</label>
                      <select required value={selectedOrder} onChange={(e) => setSelectedOrder(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">-- Selecteer een Order --</option>
                        {mockOrders.slice(0, 10).map(o => (
                          <option key={o.id} value={o.id}>{o.id} - {o.klant_id}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Type Service</label>
                      <select required value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Reparatie">Reparatie (Regulier)</option>
                        <option value="DOA">DOA (Dead on Arrival &lt; 8 dgn)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Locatie Inname / Pick-up adres</label>
                    <select value={locatie} onChange={(e) => setLocatie(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                      {STORES.map(s => <option key={s} value={s}>{s} ({s.toLowerCase().replace('filiaal ', '')}@hellotv.nl)</option>)}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-700">Uitgebreide Klachtomschrijving</label>
                    <div className="flex gap-4">
                      <textarea 
                        required 
                        value={klacht}
                        onChange={(e) => setKlacht(e.target.value)}
                        placeholder="Wat is het probleem? (Bijv: een 99F, de achterspiegels doen het niet...)"
                        className="flex-1 h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FDCB2C]"
                      />
                      <div className="w-48 flex flex-col gap-2">
                        <button 
                          type="button" 
                          onClick={handleGeminiAnalysis}
                          disabled={!klacht || isAnalyzing}
                          className="flex-1 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                          {isAnalyzing ? <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" /> : <Sparkles size={24} />}
                          <span className="text-xs">Gemini Analyse</span>
                        </button>
                      </div>
                    </div>

                    {/* AI Output Area */}
                    {aiAnalysis && (
                      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot size={18} className="text-indigo-600" />
                          <h4 className="font-bold text-indigo-900 text-sm">Gemini Diagnostiek Resultaat</h4>
                        </div>
                        <p className="text-indigo-800 text-sm whitespace-pre-line mb-4 font-medium">{aiAnalysis}</p>
                        <div className="flex justify-end">
                          <button 
                            type="button"
                            onClick={handleSendToWhatsapp}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                              sentToWhatsapp 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-[#25D366] hover:bg-green-600 text-white shadow-sm'
                            }`}
                          >
                            {sentToWhatsapp ? (
                              <><CheckCircle size={16} /> Verzonden naar Klant (WhatsApp)</>
                            ) : (
                              <><Send size={16} /> Stuur Direct Oplossing (WhatsApp)</>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Accessoires mee?</label>
                      <select value={accessoires} onChange={(e) => setAccessoires(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Nee</option>
                        <option>Ja, afstandsbediening</option>
                        <option>Ja, stroomkabel</option>
                        <option>Ja, soundbar + AB</option>
                        <option>Alles Compleet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Schade bij inname?</label>
                      <select value={schade} onChange={(e) => setSchade(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Krasvrij (Geen Schade)</option>
                        <option>Lichte krassen scherm</option>
                        <option>Lichte krassen bezels</option>
                        <option>Zware schade (gebroken)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Staat v/d Verpakking</label>
                      <select value={verpakking} onChange={(e) => setVerpakking(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Originele doos aanwezig</option>
                        <option>Geen doos (Blanco ophalen)</option>
                        <option>Alternatieve doos gebruikt</option>
                      </select>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setActiveTab('overzicht')} className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Annuleren</button>
                    <button type="submit" className="px-8 py-3 bg-[#1D6F42] text-white font-bold rounded-xl hover:bg-green-700 shadow-md">
                      Meld Aan & Verzend (CE Repair)
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
