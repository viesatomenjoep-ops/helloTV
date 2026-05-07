import React, { useState } from 'react';
import { Upload, Youtube, Instagram, Video, Image as ImageIcon, Link as LinkIcon, Plus, Save, Cloud, Server, MonitorPlay, Activity, Tv, Youtube as YoutubeIcon, Calculator, Check, CheckCircle, Presentation, Database } from 'lucide-react';

export function MediaPortal() {
  const [activeTab, setActiveTab] = useState<'upload' | 'bibliotheek' | 'loud_media'>('upload');
  const [mediaItems, setMediaItems] = useState([
    { id: 1, type: 'youtube', title: 'HelloTV Zomer Campagne', platform: 'YouTube', url: 'https://youtube.com/watch?v=123', date: '04-05-2026' },
    { id: 2, type: 'instagram', title: 'OLED 2026 Sneak Peek', platform: 'Instagram', url: 'https://instagram.com/p/123', date: '03-05-2026' },
    { id: 3, type: 'tiktok', title: 'Store Tour Breda', platform: 'TikTok', url: 'https://tiktok.com/@hellotv/123', date: '01-05-2026' },
    { id: 4, type: 'image', title: 'LG G6 OLED Banner', platform: 'MediaServer', url: 'media://img/lg-g6.jpg', date: '28-04-2026' },
  ]);

  const [laudItems, setLaudItems] = useState([
    { id: 1, title: 'Zomer_Sale_4K.mp4', status: 'Live (Web + 18 Stores)' },
    { id: 2, title: 'OLED_Promo_2026.mp4', status: 'Live (Web + 18 Stores)' }
  ]);

  const [laudInput, setLaudInput] = useState('');
  const [laudText, setLaudText] = useState('');
  
  const [loudTarget, setLoudTarget] = useState('Alle Filialen - Hoofdschermen');
  const [loudContentType, setLoudContentType] = useState<'upload' | 'youtube' | 'offerte'>('upload');
  const [loudYoutubeLink, setLoudYoutubeLink] = useState('');
  const [offerteKlant, setOfferteKlant] = useState('Dhr. Jansen');
  const [offerteModel, setOfferteModel] = useState('LG OLED65G45LW');
  const [offertePrijs, setOffertePrijs] = useState('2.499');
  
  const [showTvPreview, setShowTvPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const handleLaudUpload = () => {
    if (!laudInput) return;
    const newItem = {
      id: Date.now(),
      title: laudInput.split('\\\\').pop()?.split('/').pop() || 'Nieuwe_Upload.mp4',
      status: 'Synchroniseren...'
    };
    setLaudItems([newItem, ...laudItems]);
    setLaudInput('');
    setLaudText('');
    
    setPreviewData({
      target: loudTarget,
      type: loudContentType,
      content: loudContentType === 'youtube' ? loudYoutubeLink : loudContentType === 'offerte' ? { klant: offerteKlant, model: offerteModel, prijs: offertePrijs } : laudInput.split('\\').pop()?.split('/').pop() || 'Nieuwe_Upload.mp4',
      text: laudText
    });
    setShowTvPreview(true);
    
    // Simuleer upload & sync process
    setTimeout(() => {
      setLaudItems(prev => prev.map(item => 
        item.id === newItem.id ? { ...item, status: `Live (${loudTarget})` } : item
      ));
    }, 2000);
  };

  const [formData, setFormData] = useState({
    title: '',
    type: 'youtube',
    url: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      platform: formData.type === 'youtube' ? 'YouTube' : formData.type === 'instagram' ? 'Instagram' : formData.type === 'tiktok' ? 'TikTok' : 'MediaServer',
      url: formData.url,
      date: new Date().toLocaleDateString('nl-NL')
    };
    setMediaItems([newItem, ...mediaItems]);
    setFormData({ title: '', type: 'youtube', url: '', description: '' });
    setActiveTab('bibliotheek');
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'youtube': return <Youtube className="text-red-600" size={24} />;
      case 'instagram': return <Instagram className="text-pink-600" size={24} />;
      case 'tiktok': return <Video className="text-black" size={24} />;
      case 'image': return <ImageIcon className="text-blue-500" size={24} />;
      default: return <LinkIcon className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Cloud className="text-blue-500" size={36} />
              Media & Content Portaal
            </h1>
            <p className="text-gray-600">Beheer al je YouTube, Instagram, TikTok video's en MediaServer afbeeldingen centraal.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 font-bold rounded-xl transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              Nieuwe Media
            </button>
            <button
              onClick={() => setActiveTab('loud_media')}
              className={`px-6 py-3 font-bold rounded-xl transition-all flex items-center gap-2 ${activeTab === 'loud_media' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <MonitorPlay size={18} />
              Loud Media (LAUD API)
            </button>
            <button
              onClick={() => setActiveTab('bibliotheek')}
              className={`px-6 py-3 font-bold rounded-xl transition-all ${activeTab === 'bibliotheek' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              Mediabibliotheek
            </button>
          </div>
        </div>

        {activeTab === 'upload' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Upload className="text-blue-500" /> Content Toevoegen
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Platform / Soort Media</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['youtube', 'instagram', 'tiktok', 'image'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, type})}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                            formData.type === type ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {getIcon(type)}
                          <span className="text-xs font-bold capitalize">{type === 'image' ? 'Afbeelding' : type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Titel van Content</label>
                    <input
                      type="text" required
                      placeholder="Bijv. Nieuwe QLED Campagne..."
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {formData.type === 'image' ? 'Upload Afbeelding (MediaServer)' : 'Video URL / Link'}
                    </label>
                    {formData.type === 'image' ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                        <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-sm font-bold text-gray-600">Klik of sleep afbeeldingen hierheen</p>
                        <p className="text-xs text-gray-400 mt-1">Direct uploaden naar database</p>
                      </div>
                    ) : (
                      <input
                        type="url" required
                        placeholder="https://..."
                        value={formData.url}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Beschrijving / AI Tekst</label>
                    <textarea
                      rows={4}
                      placeholder="Schrijf hier de beschrijving of genereer met AI..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#FDCB2C] hover:text-black transition-colors shadow-lg"
                  >
                    <Save size={20} />
                    Opslaan in Bibliotheek
                  </button>
                </form>
              </div>
              
              <div className="bg-gray-50 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-64 h-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-800">
                  <div className="bg-gray-100 h-8 flex items-center px-4 border-b border-gray-200">
                    <div className="text-[10px] font-bold text-gray-500">Live Preview</div>
                  </div>
                  <div className="p-4 aspect-[9/16] bg-gray-900 flex flex-col items-center justify-center text-white relative">
                    {getIcon(formData.type)}
                    <p className="text-xs mt-4 opacity-50 px-4 text-center">
                      Voeg een URL of media toe om de live preview te zien van hoe dit op de schermen of socials getoond wordt.
                    </p>
                    {formData.title && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded backdrop-blur text-left">
                        <p className="text-sm font-bold truncate">{formData.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'loud_media' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-8">
              <div>
                <h2 className="text-2xl font-black text-indigo-900 flex items-center gap-2 mb-2">
                  <MonitorPlay className="text-indigo-600" /> Loud Media (LAUD API) Controlepaneel
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Bepaal exact wat er op de TV's in de winkels draait. Push direct video's, YouTube links of live prijsoffertes naar specifieke schermen of volledige filialen.
                </p>
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm border border-green-200">
                <Activity size={16} /> LAUD API Verbonden (Live)
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-6 flex items-center gap-2">
                  <Tv /> Content Casten naar TV
                </h3>
                
                {/* Target Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-indigo-900 mb-2">Kies Doelscherm(en)</label>
                  <select 
                    value={loudTarget}
                    onChange={(e) => setLoudTarget(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-bold text-gray-800 outline-none"
                  >
                    <option value="Alle Filialen - Hoofdschermen">Alle Filialen - Hoofdschermen</option>
                    <option value="Breda - TV Wand 1">Breda - TV Wand 1</option>
                    <option value="Breda - Offerte Scherm (Balie)">Breda - Offerte Scherm (Balie)</option>
                    <option value="Amsterdam - Etalage">Amsterdam - Etalage</option>
                  </select>
                </div>

                {/* Content Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-indigo-900 mb-2">Wat wil je casten?</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => setLoudContentType('upload')}
                      className={`py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 font-bold text-sm transition-all ${loudContentType === 'upload' ? 'border-indigo-600 bg-indigo-100 text-indigo-800' : 'border-indigo-200 bg-white text-gray-500 hover:bg-indigo-50'}`}
                    >
                      <Upload size={20} /> Media Upload
                    </button>
                    <button 
                      onClick={() => setLoudContentType('youtube')}
                      className={`py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 font-bold text-sm transition-all ${loudContentType === 'youtube' ? 'border-red-500 bg-red-50 text-red-700' : 'border-indigo-200 bg-white text-gray-500 hover:bg-red-50'}`}
                    >
                      <YoutubeIcon size={20} /> YouTube Link
                    </button>
                    <button 
                      onClick={() => setLoudContentType('offerte')}
                      className={`py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 font-bold text-sm transition-all ${loudContentType === 'offerte' ? 'border-green-500 bg-green-50 text-green-700' : 'border-indigo-200 bg-white text-gray-500 hover:bg-green-50'}`}
                    >
                      <Calculator size={20} /> Live Offerte
                    </button>
                  </div>
                </div>

                {/* Dynamic Input based on Type */}
                {loudContentType === 'upload' && (
                  <div className="border-2 border-dashed border-indigo-300 rounded-xl p-6 text-center bg-white hover:bg-indigo-50/50 transition-colors mb-4 relative overflow-hidden animate-in fade-in">
                    <input 
                      type="file" 
                      accept="video/*,image/*" 
                      onChange={(e) => setLaudInput(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Video size={36} className="mx-auto text-indigo-400 mb-2" />
                    <p className="font-bold text-indigo-900 mb-1 text-sm">Klik of sleep MP4/MOV/JPG hierheen</p>
                    <p className="text-xs text-gray-500 mb-2">Max 5GB per bestand</p>
                    <div className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-colors inline-block">
                        {laudInput ? laudInput.split('\\').pop()?.split('/').pop() : 'Bestand Selecteren'}
                    </div>
                  </div>
                )}

                {loudContentType === 'youtube' && (
                  <div className="mb-4 animate-in fade-in">
                    <label className="block text-sm font-bold text-gray-700 mb-2">YouTube URL</label>
                    <input
                      type="text"
                      placeholder="https://youtube.com/watch?v=..."
                      value={loudYoutubeLink}
                      onChange={e => setLoudYoutubeLink(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                )}

                {loudContentType === 'offerte' && (
                  <div className="space-y-4 mb-4 animate-in fade-in bg-white p-4 rounded-xl border border-green-200">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Klantnaam (Titel op TV)</label>
                      <input type="text" value={offerteKlant} onChange={e => setOfferteKlant(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-green-500 outline-none font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">TV Model</label>
                      <input type="text" value={offerteModel} onChange={e => setOfferteModel(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Speciale Actieprijs (€)</label>
                      <input type="text" value={offertePrijs} onChange={e => setOffertePrijs(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-green-500 outline-none font-black text-green-700 text-lg" />
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleLaudUpload}
                  disabled={loudContentType === 'upload' && !laudInput}
                  className={`w-full py-4 mt-4 font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-lg ${
                    (loudContentType === 'upload' && !laudInput) 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-[#FDCB2C] hover:bg-yellow-400 text-black transform hover:scale-[1.02]'
                  }`}
                >
                  <Presentation size={24} /> 
                  CAST NAAR {loudTarget.split('-')[0].toUpperCase()}
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl shadow-inner">
                  <h3 className="text-lg font-bold text-yellow-900 mb-2">Actieve Schermen (Loud Media)</h3>
                  <p className="text-sm text-yellow-800 mb-4">Er draaien momenteel {laudItems.length + 21} streams via de API.</p>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {laudItems.map((item, idx) => (
                      <div key={item.id} className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <span className="font-black text-gray-900">{item.title}</span>
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Live
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Doel: {item.status.replace('Live', '').replace(/[()]/g, '')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TV Simulatie Overlay */}
            {showTvPreview && (
              <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
                <div className="w-full max-w-6xl aspect-video bg-gray-900 rounded-xl border-[16px] border-black shadow-2xl overflow-hidden relative flex flex-col">
                  {/* TV Bezel branding */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-600 font-bold tracking-widest text-[10px]">helloTV</div>
                  
                  {/* TV Content */}
                  <div className="flex-1 bg-white relative overflow-hidden flex flex-col items-center justify-center">
                    
                    {previewData?.type === 'upload' && (
                      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white">
                        <MonitorPlay size={64} className="text-[#FDCB2C] mb-4 animate-pulse" />
                        <h1 className="text-4xl font-black mb-2">{previewData.content}</h1>
                        <p className="text-xl text-gray-400">Speelt nu af op: {previewData.target}</p>
                      </div>
                    )}

                    {previewData?.type === 'youtube' && (
                      <div className="absolute inset-0 bg-red-600 flex flex-col items-center justify-center text-white">
                        <YoutubeIcon size={80} className="mb-4" />
                        <h1 className="text-4xl font-black mb-2">YouTube Stream Geactiveerd</h1>
                        <p className="text-xl opacity-80">{previewData.content || 'https://youtube.com/watch?v=...'}</p>
                      </div>
                    )}

                    {previewData?.type === 'offerte' && (
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 bg-gray-50 flex items-center justify-center p-12 relative">
                           <img src="/HelloTV.png" alt="Logo" className="absolute top-8 left-8 h-8 opacity-50" />
                           <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800" alt="TV" className="w-full rounded-2xl shadow-2xl mix-blend-multiply" />
                        </div>
                        <div className="w-1/2 bg-[#FDCB2C] p-16 flex flex-col justify-center">
                          <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-wide">Exclusieve Aanbieding Voor:</h2>
                          <h1 className="text-6xl font-black text-black mb-8 leading-tight">{previewData.content.klant}</h1>
                          
                          <div className="bg-black text-white p-8 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform">
                            <p className="text-gray-400 font-bold mb-1">Jouw Droom TV:</p>
                            <p className="text-3xl font-bold mb-6">{previewData.content.model}</p>
                            
                            <div className="flex items-end gap-4 border-t border-gray-800 pt-6 mt-6">
                              <div>
                                <p className="text-gray-400 font-bold mb-1 text-sm">Speciale Deal</p>
                                <p className="text-7xl font-black text-[#FDCB2C]">€ {previewData.content.prijs}</p>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-black font-bold mt-12 flex items-center gap-2 text-xl">
                            <CheckCircle /> Vandaag nog meenemen
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                <button 
                  onClick={() => setShowTvPreview(false)}
                  className="absolute top-6 right-6 text-white hover:text-[#FDCB2C] bg-black/50 p-3 rounded-full backdrop-blur transition-colors"
                >
                  SLUITEN (X)
                </button>
              </div>
            )}
          </div>
        )}



        {activeTab === 'bibliotheek' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in">
            {mediaItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                  <div className="relative z-10 p-4 bg-white/80 backdrop-blur rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    {getIcon(item.type)}
                  </div>
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold text-gray-600 shadow-sm">
                    {item.platform}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">Toegevoegd: {item.date}</p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800">Bewerken</button>
                    <button className="text-xs font-bold text-red-600 hover:text-red-800">Verwijderen</button>
                  </div>
                </div>
              </div>
            ))}
            
            <div 
              onClick={() => setActiveTab('upload')}
              className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-blue-500 hover:border-blue-300 transition-colors cursor-pointer min-h-[250px]"
            >
              <Plus size={48} className="mb-2" />
              <span className="font-bold">Nieuwe toevoegen</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
