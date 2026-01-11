export interface EMICalculation {
  emi: number;
  totalAmount: number;
  totalInterest: number;
}

export function calculateEMI(principal: number, annualRate: number, years: number): EMICalculation {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  
  if (monthlyRate === 0) {
    const emi = principal / months;
    return {
      emi,
      totalAmount: principal,
      totalInterest: 0
    };
  }
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  
  return {
    emi,
    totalAmount,
    totalInterest
  };
}

export function formatIndianCurrency(amount: number): string {
  const crores = Math.floor(amount / 10000000);
  const lakhs = Math.floor((amount % 10000000) / 100000);
  const thousands = Math.floor((amount % 100000) / 1000);
  const hundreds = amount % 1000;
  
  if (crores > 0) {
    return `₹${crores},${lakhs.toString().padStart(2, '0')},${thousands.toString().padStart(3, '0')},${hundreds.toString().padStart(3, '0')}`;
  } else if (lakhs > 0) {
    return `₹${lakhs},${thousands.toString().padStart(3, '0')},${hundreds.toString().padStart(3, '0')}`;
  } else if (thousands > 0) {
    return `₹${thousands},${hundreds.toString().padStart(3, '0')}`;
  } else {
    return `₹${hundreds}`;
  }
}

export function formatCompactIndianCurrency(amount: number): string {
  const crores = Math.floor(amount / 10000000);
  const lakhs = Math.floor((amount % 10000000) / 100000);
  const thousands = Math.floor((amount % 100000) / 1000);
  
  if (crores > 0) {
    return `₹${crores}.${Math.floor(lakhs / 10)}Cr`;
  } else if (lakhs > 0) {
    return `₹${lakhs}.${Math.floor(thousands / 100)}L`;
  } else if (thousands > 0) {
    return `₹${thousands}K`;
  } else {
    return `₹${amount}`;
  }
}