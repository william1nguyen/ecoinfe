import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  icon: Icon,
  onClick,
}) => {
  const buttonStyles: React.CSSProperties = {
    opacity: disabled ? 0.7 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "0.375rem", // Rounded-md equivalent
    transition: "opacity 0.3s",
    width: "100%",
    border: "1px solid #778899", // Border-slate-700 equivalent
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem", // Gap-2 equivalent
    backgroundColor: outline ? "#fff" : "#778899", // Background color equivalents
    color: outline ? "#778899" : "#fff", // Text color equivalents
    fontSize: small ? "0.875rem" : "1rem", // Text size equivalents
    padding: small ? "0.25rem 0.5rem" : "0.75rem 1rem", // Padding equivalents
  };

  return (
    <button onClick={onClick} disabled={disabled} style={buttonStyles}>
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};
