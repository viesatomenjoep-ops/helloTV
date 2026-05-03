export interface Employee {
  name: string;
  code: string;
  isSeller: boolean;
}

export const EMPLOYEES: Employee[] = [
  // Original
  { name: "Tom van Bienen", code: "921", isSeller: true },
  { name: "Joep Morsink", code: "811", isSeller: true },
  { name: "Maick", code: "711", isSeller: true },
  { name: "Thijs Meijer", code: "101", isSeller: true },
  { name: "Wendy", code: "102", isSeller: true },
  { name: "Johan", code: "103", isSeller: true },
  { name: "Sophie de Vries", code: "104", isSeller: true },
  { name: "Daan Bakker", code: "105", isSeller: true },
  { name: "Julia Jansen", code: "106", isSeller: true },
  { name: "Lars Visser", code: "107", isSeller: true },
  
  // Explicitly mentioned roles
  { name: "Guido", code: "201", isSeller: false },
  { name: "Mike", code: "202", isSeller: false },
  { name: "Björn", code: "203", isSeller: true },
  { name: "Anita", code: "204", isSeller: false },
  { name: "André", code: "205", isSeller: false },

  // From Screenshot
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
