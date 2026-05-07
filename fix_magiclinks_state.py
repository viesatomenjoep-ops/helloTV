import re

with open('src/app/components/MagicLinks.tsx', 'r') as f:
    content = f.read()

state_additions = """
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [lisaPrompt, setLisaPrompt] = useState(`"Je bent Lisa, de telefonische assistent van HelloTV Filiaal Breda.\\n\\nBegroet klanten vriendelijk met: 'Welkom bij HelloTV Breda, u spreekt met Lisa. Wat kan ik voor u doen?'\\n\\nAls klanten vragen naar voorraad: controleer de SQL database.\\n\\nAls klanten een reparatie willen melden, verwijs ze door naar het online reparatieformulier of verbind ze door met Chaima.\\n\\nSluit af met de groet: 'Tot ziens in Breda!'"`);
  const [isCalling, setIsCalling] = useState(false);
  const [callState, setCallState] = useState<'dialing' | 'connected'>('dialing');
  const [callTranscript, setCallTranscript] = useState<{speaker: string, text: string}[]>([]);

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

content = content.replace("  const [copiedLink, setCopiedLink] = useState('');", "  const [copiedLink, setCopiedLink] = useState('');" + state_additions)

with open('src/app/components/MagicLinks.tsx', 'w') as f:
    f.write(content)

