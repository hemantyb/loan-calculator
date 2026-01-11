import { formatIndianCurrency } from "../utils/calculateEMI";

interface SliderInputProps {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	onChange: (value: number) => void;
	format?: "currency" | "percentage" | "years";
}

export function SliderInput({
	label,
	value,
	min,
	max,
	step,
	onChange,
	format = "currency",
}: SliderInputProps) {
	const percentage = ((value - min) / (max - min)) * 100;

	const displayValue = () => {
		switch (format) {
			case "currency":
				return formatIndianCurrency(value);
			case "percentage":
				return `${value.toFixed(1)}%`;
			case "years":
				return `${value} year${value > 1 ? "s" : ""}`;
			default:
				return value.toString();
		}
	};

	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-2">
				<label className="text-sm font-medium text-gray-300">{label}</label>
				<span className="text-sm font-bold text-white bg-gray-800 px-3 py-1 rounded-full">
					{displayValue()}
				</span>
			</div>
			<div className="relative">
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
					style={{
						background: `linear-gradient(to right, #FF3B30 0%, #FF3B30 ${percentage}%, #333333 ${percentage}%, #333333 100%)`,
					}}
				/>
				<div className="flex justify-between mt-1 text-xs text-gray-500">
					<span>
						{format === "currency"
							? "₹1L"
							: format === "percentage"
								? "8%"
								: "1"}
					</span>
					<span>
						{format === "currency"
							? "₹1Cr"
							: format === "percentage"
								? "11%"
								: "20"}
					</span>
				</div>
			</div>
		</div>
	);
}
