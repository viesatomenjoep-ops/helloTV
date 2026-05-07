import re

with open('src/app/components/MagicLinks.tsx', 'r') as f:
    content = f.read()

# Make sure useEffect is imported
if "useEffect" not in content[:150]:
    content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';")

# Add the useEffect for auto-response
effect = """
  useEffect(() => {
    if (callTranscript.length > 0 && callTranscript[callTranscript.length - 1].speaker === 'Jij') {
      const userText = callTranscript[callTranscript.length - 1].text;
      setTimeout(() => {
        let response = "Ik begrijp het. Laten we dat voor u uitzoeken.";
        if (userText.includes("TV is kapot") || userText.includes("TV kapot")) {
          response = "Wat vervelend! Voor reparaties kunt u het beste direct ons online reparatieformulier invullen, of zal ik u doorverbinden met Chaima van de service afdeling?";
        } else if (userText.includes("bestelling")) {
          response = "Natuurlijk. Mag ik uw ordernummer of postcode om uw bestelling op te zoeken in ons systeem?";
        }
        setCallTranscript(prev => [...prev, { speaker: 'Lisa', text: response }]);
      }, 1500);
    }
  }, [callTranscript]);
"""

content = content.replace("  const handleEndCall = () => {", effect + "\n  const handleEndCall = () => {")

with open('src/app/components/MagicLinks.tsx', 'w') as f:
    f.write(content)

