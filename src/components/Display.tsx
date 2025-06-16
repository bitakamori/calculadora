"use client";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div
      className="bg-black text-white p-4 rounded-lg text-right"
      role="textbox"
      aria-label="Calculator display"
    >
      <div className="text-3xl font-mono overflow-hidden">{value || "0"}</div>
    </div>
  );
};

export default Display;
