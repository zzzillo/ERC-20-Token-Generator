interface ChainCardProps {
  image: string; // image URL
  name: string;
}

export default function ChainCard({ image, name }: ChainCardProps) {
  return (
    <div className="flex flex-col h-80 w-50 items-center bg-[#1e1e1e] rounded-xl transition hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-50 h-50 my-5 object-contain mb-3 rounded-xl"
      />
      <p className="p-2 text-center text-white font-medium">{name}</p>
    </div>
  );
}
