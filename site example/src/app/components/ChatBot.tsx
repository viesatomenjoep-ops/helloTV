import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hallo! 👋 Ik ben je AI-assistent. Hoe kan ik je helpen bij het vinden van de perfecte TV?"
    }
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    "Wat is het verschil tussen OLED en QLED?",
    "Beste TV voor gaming?",
    "Welke maat past bij mijn kamer?",
    "Huidige aanbiedingen?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: "user", text: input }]);

    setTimeout(() => {
      const responses = [
        "Goede vraag! OLED TV's bieden perfecte zwartwaarden en ongeëvenaard contrast. Ik raad de LG OLED evo G4 aan - nu met €800 korting!",
        "Voor gaming raad ik de Samsung Neo QLED aan met 144Hz en VRR. Perfect voor PS5 en Xbox!",
        "Laat me je helpen! Wat is de afstand van je bank tot de TV? Dan kan ik de perfecte maat adviseren.",
        "We hebben geweldige deals! Tot 50% korting op geselecteerde modellen. Bekijk onze aanbiedingen sectie!"
      ];
      setMessages(prev => [
        ...prev,
        { type: "bot", text: responses[Math.floor(Math.random() * responses.length)] }
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}

        {/* Notification Dot */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950"
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold text-lg">HelloTV AI</div>
                  <div className="text-sm text-blue-100">Online • Direct antwoord</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "bot"
                      ? "bg-gradient-to-br from-blue-600 to-purple-600"
                      : "bg-gradient-to-br from-slate-700 to-slate-600"
                  }`}>
                    {message.type === "bot" ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>

                  <div className={`max-w-[75%] p-4 rounded-2xl ${
                    message.type === "bot"
                      ? "bg-slate-800 text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  }`}>
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <div className="text-xs text-slate-400 mb-2">Snelle vragen:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setInput(suggestion);
                        handleSend();
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-xs border border-slate-700"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-slate-800 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Typ je vraag..."
                  className="flex-1 px-4 py-3 bg-slate-900 rounded-full border border-slate-700 focus:border-blue-500 focus:outline-none text-white placeholder-slate-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
