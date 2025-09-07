import Image from "next/image";

interface TeamCardProps {
  name: string;
  code?: string;
  country?: string;
  logo?: string;
}

export function TeamCard({ name, code, country, logo }: TeamCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white w-64 flex flex-col items-center">
      {logo && (
        <Image
          src={logo}
          alt={name}
          width={64}      
          height={64}     
          className="mb-2"
          priority={false}
        />
      )}
      <h2 className="text-xl font-bold text-center">{name}</h2>
      <p className="text-gray-600 text-center">
        {code && <span>{code} </span>}
        {country && <span>- {country}</span>}
      </p>
    </div>
  );
}
