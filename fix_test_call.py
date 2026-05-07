import re

with open('src/app/components/MagicLinks.tsx', 'r') as f:
    content = f.read()

# Make sure Mic is imported from lucide-react
lucide_import_search = "import { Play, Pause, Square, FileVideo, Music, Download, Settings, Copy, Link, Send, Eye, Shield, Key, FileText, BarChart, Smartphone, Laptop, Tv, Speaker, Database, Search, ArrowRight, Zap, ArrowRightCircle, PhoneCall, Bot, MessageSquare } from 'lucide-react';"
lucide_import_replace = "import { Play, Pause, Square, FileVideo, Music, Download, Settings, Copy, Link, Send, Eye, Shield, Key, FileText, BarChart, Smartphone, Laptop, Tv, Speaker, Database, Search, ArrowRight, Zap, ArrowRightCircle, PhoneCall, Bot, MessageSquare, Mic, PhoneOff } from 'lucide-react';"
content = content.replace(lucide_import_search, lucide_import_replace)

# Add state variables inside MagicLinks function
state_search = "const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');"
state_replace = """const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [lisaPrompt, setLisaPrompt] = useState(`"Je bent Lisa, de telefonische assistent van HelloTV Filiaal Breda.\\n\\nBegroet klanten vriendelijk met: 'Welkom bij HelloTV Breda, u spreekt met Lisa. Wat kan ik voor u doen?'\\n\\nAls klanten vragen naar voorraad: controleer de SQL database.\\n\\nAls klanten een reparatie willen melden, verwijs ze door naar het online reparatieformulier of verbind ze door met Chaima.\\n\\nSluit af met de groet: 'Tot ziens in Breda!'"`);
  const [isCalling, setIsCalling] = useState(false);
  const [callState, setCallState] = useState<'dialing' | 'connected'>('dialing');
  const [callTranscript, setCallTranscript] = useState<{speaker: string, text: string}[]>([]);"""
content = content.replace(state_search, state_replace)

# Helper function to start the test call
call_logic = """
  const handleStartCall = () => {
    setIsCalling(true);
    setCallState('dialing');
    setCallTranscript([]);
    
    setTimeout(() => {
      setCallState('connected');
      setCallTranscript([{ speaker: 'Lisa', text: "Welkom bij HelloTV Breda, u spreekt met Lisa. Wat kan ik voor u doen?" }]);
    }, 2000);
  };
  
  const handleEndCall = () => {
    setIsCalling(false);
    setCallState('dialing');
    setCallTranscript([]);
  };
"""

content = content.replace("  const [activeTab, setActiveTab] = useState<'magic_links' | 'ai_calls' | 'hessey_api' | 'twilio_logs'>('magic_links');", "  const [activeTab, setActiveTab] = useState<'magic_links' | 'ai_calls' | 'hessey_api' | 'twilio_logs'>('magic_links');" + call_logic)


# Replace the prompt display
old_prompt_display = """                  <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm h-48 overflow-y-auto mb-6">
                    <p>SYSTEM PROMPT:</p>
                    <p className="mt-2 text-gray-300">"Je bent Lisa, de telefonische assistent van HelloTV Filiaal Breda.</p>
                    <p className="text-gray-300">Begroet klanten vriendelijk met: 'Welkom bij HelloTV Breda, u spreekt met Lisa. Wat kan ik voor u doen?'</p>
                    <p className="text-gray-300">Als klanten vragen naar voorraad: controleer de SQL database.</p>
                    <p className="text-gray-300">Als klanten een reparatie willen melden, verwijs ze door naar het online reparatieformulier of verbind ze door met Chaima.</p>
                    <p className="text-gray-300">Sluit af met de groet: 'Tot ziens in Breda!'"</p>
                  </div>"""

new_prompt_display = """                  {isEditingPrompt ? (
                    <div className="mb-6">
                      <textarea 
                        value={lisaPrompt}
                        onChange={(e) => setLisaPrompt(e.target.value)}
                        className="w-full h-48 bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm border border-gray-700 outline-none focus:border-green-500"
                      />
                      <div className="flex justify-end mt-2">
                        <button onClick={() => setIsEditingPrompt(false)} className="px-4 py-2 bg-[#FDCB2C] text-black font-bold rounded-lg hover:bg-yellow-500">Opslaan</button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm h-48 overflow-y-auto mb-6 whitespace-pre-wrap">
                      <p>SYSTEM PROMPT:</p>
                      <p className="mt-2 text-gray-300">{lisaPrompt}</p>
                    </div>
                  )}"""

content = content.replace(old_prompt_display, new_prompt_display)

# Replace the buttons
old_buttons = """                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        alert("Bellen met +31 76 123 4567...");
                        setTimeout(() => {
                          alert("Lisa: 'Welkom bij HelloTV Breda, u spreekt met Lisa. Wat kan ik voor u doen?'");
                        }, 1000);
                      }}
                      className="flex-1 py-3 bg-[#1D6F42] text-white rounded-xl font-bold hover:bg-green-800 flex justify-center items-center gap-2"
                    >
                      <PhoneCall size={18} /> Test Bellen
                    </button>
                    <button className="flex-1 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 flex justify-center items-center gap-2">
                      Instellingen
                    </button>
                  </div>"""

new_buttons = """                  <div className="flex gap-4">
                    <button 
                      onClick={handleStartCall}
                      className="flex-1 py-3 bg-[#1D6F42] text-white rounded-xl font-bold hover:bg-green-800 flex justify-center items-center gap-2 shadow-md transition-colors"
                    >
                      <PhoneCall size={18} /> Test Bellen (Simulatie)
                    </button>
                    <button 
                      onClick={() => setIsEditingPrompt(true)}
                      className="flex-1 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 flex justify-center items-center gap-2 transition-colors"
                    >
                      <Settings size={18} /> Prompt Aanpassen
                    </button>
                  </div>"""

content = content.replace(old_buttons, new_buttons)

# Add the Call Overlay right before the final return div closing tag
overlay_jsx = """
      {/* Call Simulator Overlay */}
      {isCalling && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1A1A1A] rounded-[40px] border-[8px] border-gray-900 shadow-2xl overflow-hidden relative" style={{ height: '700px' }}>
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
            
            <div className="h-full flex flex-col justify-between pt-16 pb-8 px-6 relative">
              {/* Caller Info */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                  <Bot size={48} className="text-[#FDCB2C]" />
                  {callState === 'connected' && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#FDCB2C] animate-ping opacity-20"></div>
                  )}
                </div>
                <h2 className="text-white text-2xl font-light mb-1">Lisa - HelloTV Breda</h2>
                <p className="text-gray-400 text-sm">
                  {callState === 'dialing' ? 'Bellen...' : '00:00 - Verbonden'}
                </p>
              </div>

              {/* Transcript */}
              {callState === 'connected' && (
                <div className="flex-1 mt-8 overflow-y-auto space-y-4 px-2">
                  {callTranscript.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.speaker === 'Lisa' ? 'items-start' : 'items-end'}`}>
                      <span className="text-[10px] text-gray-500 font-bold mb-1 ml-1">{msg.speaker}</span>
                      <div className={`p-3 rounded-2xl text-sm ${msg.speaker === 'Lisa' ? 'bg-gray-800 text-gray-100 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-2 justify-center mt-4 pt-4 border-t border-gray-800">
                    <button 
                      onClick={() => setCallTranscript([...callTranscript, { speaker: 'Jij', text: 'Hallo, ik heb een vraag over een bestelling.' }])}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-full transition-colors"
                    >
                      "Ik heb een vraag..."
                    </button>
                    <button 
                      onClick={() => setCallTranscript([...callTranscript, { speaker: 'Jij', text: 'Mijn TV is kapot.' }])}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-full transition-colors"
                    >
                      "TV kapot"
                    </button>
                  </div>
                </div>
              )}

              {/* Call Controls */}
              <div className="mt-8 flex justify-center gap-6">
                <button className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <Mic size={24} />
                </button>
                <button 
                  onClick={handleEndCall}
                  className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  <PhoneOff size={24} />
                </button>
                <button className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <Speaker size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
"""

content = content.replace("    </div>\n  );\n}", overlay_jsx + "\n    </div>\n  );\n}")

with open('src/app/components/MagicLinks.tsx', 'w') as f:
    f.write(content)

