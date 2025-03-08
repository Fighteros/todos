import { Input } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVisible: boolean;
  toggleVisibility: () => void;
  errors: string[];
  isDisabled: boolean;
}


const PasswordInput: React.FC<PasswordInputProps> = ({
                                                       label,
                                                       value,
                                                       onChange,
                                                       isVisible,
                                                       toggleVisibility,
                                                       errors,
                                                       isDisabled
                                                     }) => {


  return (
    <Input
      errorMessage={() => (
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )
      }
      aria-label={label}
      isInvalid={errors.length > 0}
      isDisabled={isDisabled}
      label={label}
      labelPlacement="outside"
      name="password"
      value={value}
      className="flex w-full flex-wrap max-w-md p-2"
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      placeholder={`Enter ${label.toLowerCase()}`}
      size="lg"
      radius="sm"
      onChange={onChange}
      type={isVisible ? "text" : "password"}
    />);
};


export default PasswordInput;