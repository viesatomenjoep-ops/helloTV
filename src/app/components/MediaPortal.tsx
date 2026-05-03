import React, { useState } from 'react';
import { Upload, Youtube, Instagram, Video, Image as ImageIcon, Link as LinkIcon, Plus, Save, Cloud } from 'lucide-react';

export function MediaPortal() {
  const [activeTab, setActiveTab] = useState<'upload' | 'bibliotheek'>('upload');
  const [mediaItems, setMediaItems] = useState([
    { id: 1, type: 'youtube', title: 'HelloTV Zomer Campagne', platform: 'YouTube', url: 'https://youtube.com/watch?v=123', date: '04-05-2026' },
    { id: 2, type: 'instagram', title: 'OLED 2026 Sneak Peek', platform: 'Instagram', url: 'https://instagram.com/p/123', date: '03-05-2026' },
    { id: 3, type: 'tiktok', title: 'Store Tour Breda', platform: 'TikTok', url: 'https://tiktok.com/@hellotv/123', date: '01-05-2026' },
    { id: 4, type: 'image', title: 'LG G6 OLED Banner', platform: 'MediaServer', url: 'media://img/lg-g6.jpg', date: '28-04-2026' },
  ]);

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
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 font-bold rounded-xl transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              Nieuwe Media
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
