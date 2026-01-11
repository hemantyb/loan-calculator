import { calculateEMI, formatIndianCurrency } from "./utils/calculateEMI";
import { SliderInput } from "./components/SliderInput";
import { LoanChip } from "./components/LoanChip";
import { useState, useEffect } from "react";

interface LoanConfig {
	defaultAmount: number;
	defaultRate: number;
	defaultYears: number;
}

const loanConfigs: Record<string, LoanConfig> = {
	"Fixed Deposit": { defaultAmount: 500000, defaultRate: 8.5, defaultYears: 5 },
	"Car Loan": { defaultAmount: 800000, defaultRate: 9.5, defaultYears: 7 },
	"Bike Loan": { defaultAmount: 150000, defaultRate: 10.5, defaultYears: 5 },
	"Home Loan": { defaultAmount: 2500000, defaultRate: 9.0, defaultYears: 20 },
	"Personal Loan": {
		defaultAmount: 300000,
		defaultRate: 11.0,
		defaultYears: 5,
	},
};

export default function App() {
	const [selectedLoan, setSelectedLoan] = useState("Home Loan");
	const [principal, setPrincipal] = useState(
		loanConfigs["Home Loan"].defaultAmount,
	);
	const [rate, setRate] = useState(loanConfigs["Home Loan"].defaultRate);
	const [years, setYears] = useState(loanConfigs["Home Loan"].defaultYears);
	const [emiCalculation, setEmiCalculation] = useState(
		calculateEMI(principal, rate, years),
	);

	useEffect(() => {
		setEmiCalculation(calculateEMI(principal, rate, years));
	}, [principal, rate, years]);

	useEffect(() => {
		const config = loanConfigs[selectedLoan];
		setPrincipal(config.defaultAmount);
		setRate(config.defaultRate);
		setYears(config.defaultYears);
	}, [selectedLoan]);

	return (
		<div className="min-h-screen bg-gray-950 text-white">
			<div className="container mx-auto px-4 py-6 max-w-md">
				{/* Header */}
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold text-white mb-2">
						Loan Calculator
					</h1>
				</div>

				{/* Loan Type Selector */}
				<div className="mb-8">
					<LoanChip
						types={Object.keys(loanConfigs)}
						selectedType={selectedLoan}
						onSelect={setSelectedLoan}
					/>
				</div>

				{/* Sliders */}
				<div className="space-y-6 mb-8">
					<SliderInput
						label="Loan Amount"
						value={principal}
						min={100000}
						max={10000000}
						step={50000}
						onChange={setPrincipal}
						format="currency"
					/>

					<SliderInput
						label="Interest Rate"
						value={rate}
						min={8.0}
						max={11.0}
						step={0.1}
						onChange={setRate}
						format="percentage"
					/>

					<SliderInput
						label="Duration"
						value={years}
						min={1}
						max={20}
						step={1}
						onChange={setYears}
						format="years"
					/>
				</div>

				{/* Summary Card */}
				<div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
					<h2 className="text-lg font-semibold text-white mb-4">
						Loan Summary
					</h2>

					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-gray-400 text-sm">Monthly EMI</span>
							<span className="text-white font-bold text-lg">
								{formatIndianCurrency(Math.round(emiCalculation.emi))}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-gray-400 text-sm">Total Amount</span>
							<span className="text-white font-semibold">
								{formatIndianCurrency(Math.round(emiCalculation.totalAmount))}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-gray-400 text-sm">Total Interest</span>
							<span className="text-red-400 font-semibold">
								{formatIndianCurrency(Math.round(emiCalculation.totalInterest))}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-gray-400 text-sm">Duration</span>
							<span className="text-white font-semibold">
								{years} year{years > 1 ? "s" : ""}
							</span>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}
