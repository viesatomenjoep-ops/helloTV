import re

with open('src/app/components/Shiftbase.tsx', 'r') as f:
    content = f.read()

# 1. Rename export function Shiftbase() to function ShiftbaseApp({ isTablet = false }: { isTablet?: boolean })
content = content.replace("export function Shiftbase() {", "function ShiftbaseApp({ isTablet = false }: { isTablet?: boolean }) {")

# 2. Modify the container to use isTablet
# from: <div className="flex justify-center md:bg-gray-100 min-h-[100dvh] md:pt-8 md:pb-24 bg-gray-50">
#       {/* Mobile App Container Simulation */}
#       <div className="w-full md:max-w-[400px] bg-gray-50 h-[100dvh] md:h-[800px] md:shadow-2xl md:rounded-[3rem] md:border-[8px] md:border-gray-900 relative overflow-hidden flex flex-col">
old_container = """  return (
    <div className="flex justify-center md:bg-gray-100 min-h-[100dvh] md:pt-8 md:pb-24 bg-gray-50">
      {/* Mobile App Container Simulation */}
      <div className="w-full md:max-w-[400px] bg-gray-50 h-[100dvh] md:h-[800px] md:shadow-2xl md:rounded-[3rem] md:border-[8px] md:border-gray-900 relative overflow-hidden flex flex-col">"""

new_container = """  return (
    <>
      {/* App Container Simulation */}
      <div className={`w-full bg-gray-50 h-[100dvh] md:h-[800px] md:shadow-2xl md:rounded-[3rem] md:border-[8px] md:border-gray-900 relative overflow-hidden flex flex-col shrink-0 ${isTablet ? 'md:w-[800px]' : 'md:w-[400px]'}`}>"""

content = content.replace(old_container, new_container)

# 3. Modify the closing divs
old_closing = """      </div>
    </div>
  );
}"""

new_closing = """      </div>
    </>
  );
}

export function Shiftbase() {
  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-12 bg-gray-100 min-h-[100dvh] pt-8 pb-24 overflow-x-auto w-full">
      <div>
        <h3 className="text-center font-bold text-gray-500 mb-4">MOBIEL WEERGAVE</h3>
        <ShiftbaseApp isTablet={false} />
      </div>
      <div className="hidden md:block">
        <h3 className="text-center font-bold text-gray-500 mb-4">TABLET WEERGAVE (ZAAK)</h3>
        <ShiftbaseApp isTablet={true} />
      </div>
    </div>
  );
}"""

content = content.replace(old_closing, new_closing)

# 4. Modify 'overflow-y-auto' to ensure the rooster list is scrollable
# Looking at "flex-1 overflow-y-auto bg-gray-50 pb-20 relative z-0"
# It's already there! But the user said "Dus dat rooster in de app van HelloBase uren, daar moet je nog wel naar beneden en naar boven te scrollen."
# Maybe they want the rooster items to have a specific height, or maybe they just didn't see the scrollbar.
# Let's add multiple fake days so it scrolls visibly!

rooster_days = """
              {/* Additional Mock Days for Scrolling */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">Wo 13 Mei</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">Vrij / Afwezig</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">Do 14 Mei</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-[#FDCB2C]">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-900">Filiaal Breda</p>
                    <span className="text-xs font-bold text-gray-500">10:00 - 18:00</span>
                  </div>
                  <p className="text-sm text-gray-600">Verkoop (8u)</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">Vr 15 Mei</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-[#FDCB2C]">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-900">Filiaal Breda</p>
                    <span className="text-xs font-bold text-gray-500">10:00 - 18:00</span>
                  </div>
                  <p className="text-sm text-gray-600">Verkoop (8u)</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">Za 16 Mei</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-[#FDCB2C]">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-900">Filiaal Breda</p>
                    <span className="text-xs font-bold text-gray-500">10:00 - 18:00</span>
                  </div>
                  <p className="text-sm text-gray-600">Weekend (8u)</p>
                </div>
              </div>
"""

# Insert these days into the rooster view.
# Looking for 'Di 12 Mei' block to insert after it.
di_12_mei = """<p className="text-sm text-gray-600">Klantenservice (8.5u)</p>
                </div>
              </div>"""

if di_12_mei in content:
    content = content.replace(di_12_mei, di_12_mei + rooster_days)

with open('src/app/components/Shiftbase.tsx', 'w') as f:
    f.write(content)

