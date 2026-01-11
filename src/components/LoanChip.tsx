interface LoanChipProps {
	types: string[];
	selectedType: string;
	onSelect: (type: string) => void;
}

export function LoanChip({ types, selectedType, onSelect }: LoanChipProps) {
	return (
		<div className="w-full overflow-x-auto pb-2">
			<div className="flex gap-2 min-w-max px-4">
				{types.map((type) => (
					<button
						key={type}
						onClick={() => onSelect(type)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
							selectedType === type
								? "bg-red-500 text-white shadow-lg shadow-red-500/30"
								: "bg-gray-800 text-gray-300 hover:bg-gray-700"
						}`}
					>
						{type}
					</button>
				))}
			</div>
		</div>
	);
}
