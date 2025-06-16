"use client";

interface ButtonProps {
  value: string;
  onClick: () => void;
  variant?: "number" | "operator" | "function";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  variant = "number",
  className = "",
}) => {
  const baseStyles =
    "flex items-center justify-center p-4 text-xl font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300";

  const variantStyles = {
    number: "text-gray-600 hover:bg-gray-200 border border-gray-200",
    operator:
      "bg-orange-500 text-white hover:bg-orange-600 border border-gray-200",
    function:
      "bg-gray-200 text-gray-600 hover:bg-gray-300 border border-gray-200",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={value}
    >
      {value}
    </button>
  );
};

export default Button;
