export interface Employee {
  name: string;
  code: string;
  isSeller: boolean;
  whatsappName?: string;
  statusText?: string;
  role?: string;
  isBeheerder?: boolean;
  phone?: string;
  availability?: string;
}

export const EMPLOYEES: Employee[] = [
  { name: "Tom van Bienen", code: "921", isSeller: true, whatsappName: 'Jij', statusText: 'Voeg lidtag toe', role: 'Beheerder', isBeheerder: true, availability: 'Online' },
  { name: "Joep Morsink", code: "811", isSeller: true, whatsappName: 'Joep Morsink', statusText: 'Torn From Oblivion', role: 'Beheerder / CRM', isBeheerder: true, availability: 'Online' },
  { name: "Maick", code: "711", isSeller: true, whatsappName: 'Maick Hellotv', statusText: 'Having fun 🥂😎', role: 'Beheerder', isBeheerder: true, availability: 'Online' },
  { name: "Guido", code: "201", isSeller: false, whatsappName: '~ Guido', role: 'Beheerder / Directie', isBeheerder: true, phone: '+31 6 43027973', availability: 'Online' },
  { name: "Mike", code: "202", isSeller: false },
  { name: "Björn", code: "203", isSeller: true, whatsappName: 'Bjurn Hellotv', statusText: 'Aan het sporten', availability: 'Bezig' },
  { name: "Anita Rutjes", code: "204", isSeller: false, whatsappName: 'Anita Rutjes Werktelefoon', statusText: '☀️ Afwezig tot 11 mei', role: 'Staf', availability: 'Afwezig' },
  { name: "André Wendelaar", code: "205", isSeller: false, whatsappName: 'André Wendelaar', statusText: 'Beschikbaar', availability: 'Beschikbaar' },
  { name: "Anne", code: "401", isSeller: true, whatsappName: 'Anne Hellotv', statusText: '🔥', availability: 'Online' },
  { name: "Boris", code: "402", isSeller: true, whatsappName: 'Boris Hellotv', statusText: '🔴⚪', availability: 'Online' },
  { name: "Calvin", code: "403", isSeller: true, whatsappName: 'Calvin Htv', statusText: 'Kan het niet gewoon weer zomer wor...', availability: 'Online' },
  { name: "Chaima", code: "404", isSeller: false, whatsappName: 'Chaima', statusText: 'Delen is vermenigvuldigen 🧸', role: 'Reparatie / Service', availability: 'Online' },
  { name: "Danny", code: "405", isSeller: true, whatsappName: 'Danny hellotv', statusText: 'Bezig', availability: 'Bezig' },
  { name: "Denyon", code: "406", isSeller: true, whatsappName: 'Denyon', statusText: 'Beschikbaar', availability: 'Beschikbaar' },
  { name: "Eertwijn", code: "407", isSeller: true, whatsappName: 'Eertwijn', statusText: 'Beschikbaar', availability: 'Beschikbaar' },
  { name: "Farshid", code: "408", isSeller: true, whatsappName: 'Farshid', availability: 'Online' },
  { name: "Gosse", code: "409", isSeller: true, whatsappName: 'Gosse HTV', statusText: 'Eindelijk wakker', availability: 'Online' },
  { name: "Ronald Gebhardt", code: "410", isSeller: true, whatsappName: 'Ronald Gebhardt', statusText: 'Bezig', availability: 'Bezig' },
  { name: "Heleen", code: "411", isSeller: false, whatsappName: 'Heleen', statusText: 'Aan het slapen', role: 'Reparatie / Service', availability: 'Afwezig' },
  { name: "Ivo", code: "412", isSeller: true, whatsappName: 'Ivo Htv', statusText: 'Beschikbaar', availability: 'Beschikbaar' },
  { name: "Jari", code: "413", isSeller: true, whatsappName: 'Jari', availability: 'Online' },
  { name: "Joeri", code: "414", isSeller: false, whatsappName: 'Joeri Inkoper', statusText: 'Beschikbaar', role: 'Inkoop', availability: 'Beschikbaar' },
  { name: "Johan Kuivenhoven", code: "415", isSeller: true, whatsappName: 'Johan Kuivenhoven HTV', statusText: 'Beschikbaar', availability: 'Beschikbaar' },
  { name: "Josef dB", code: "416", isSeller: true, whatsappName: 'Josef dB Hellotv', statusText: 'Busy', availability: 'Bezig' },
  { name: "Loek Kok", code: "417", isSeller: true, whatsappName: 'Loek Kok', statusText: 'Loek Breda', availability: 'Online' },
  { name: "Kim", code: "418", isSeller: false, whatsappName: 'Kim', role: 'Staf', availability: 'Online' },
  { name: "Enjoy Life", code: "419", isSeller: true, whatsappName: 'Enjoy Life', availability: 'Online' },
  { name: "Kin Lam", code: "420", isSeller: true, whatsappName: 'Kin Lam', statusText: 'HKV', availability: 'Online' },
  { name: "Masie", code: "421", isSeller: true, whatsappName: 'Masie Hellotv', availability: 'Online' },
  { name: "Max", code: "422", isSeller: true, whatsappName: 'Max HelloTV', statusText: '🔒', availability: 'Online' },
  { name: "Menno", code: "423", isSeller: true, whatsappName: 'Menno HelloTV', availability: 'Online' },
  { name: "Michael D.", code: "424", isSeller: true, whatsappName: 'Michael!! D', statusText: 'Available', availability: 'Beschikbaar' },
  { name: "Nick F", code: "425", isSeller: true, whatsappName: 'Nick F', availability: 'Online' },
  { name: "Paul de Boer", code: "426", isSeller: true, whatsappName: 'Paul de Boer', statusText: 'Bezig', availability: 'Bezig' },
  
  // Previous dummy data to ensure no breakage
  { name: "Thijs Meijer", code: "101", isSeller: true },
  { name: "Wendy", code: "102", isSeller: true },
  { name: "Johan", code: "103", isSeller: true },
  { name: "Sophie de Vries", code: "104", isSeller: true },
  { name: "Daan Bakker", code: "105", isSeller: true },
  { name: "Julia Jansen", code: "106", isSeller: true },
  { name: "Lars Visser", code: "107", isSeller: true },
  { name: "René Wilhelm", code: "301", isSeller: true },
  { name: "Stephano", code: "302", isSeller: true },
  { name: "Chris Ridenberg", code: "303", isSeller: true },
  { name: "T. Khan", code: "304", isSeller: true },
  { name: "Jurre Hulsink", code: "305", isSeller: true },
  { name: "Luuc", code: "306", isSeller: true },
  { name: "Thomas Arts", code: "307", isSeller: true },
  { name: "Steve", code: "308", isSeller: true },
  { name: "marco", code: "309", isSeller: true },
  { name: "Collin", code: "310", isSeller: true },
  { name: "plait", code: "311", isSeller: true }
];

export const getMedewerkerByCode = (code: string) => {
  const emp = EMPLOYEES.find(e => e.code === code);
  if (emp) return emp.name;
  if (code.length >= 3) return 'Medewerker ' + code;
  return null;
};
