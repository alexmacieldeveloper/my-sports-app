interface TeamCardProps {
  name: string;
  code?: string;
  country?: string;
}

export function TeamCard({ name, code, country }: TeamCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white w-64">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">
        {code && <span>{code} </span>}
        {country && <span>- {country}</span>}
      </p>
    </div>
  );
}
