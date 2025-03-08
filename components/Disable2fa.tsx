"use client";

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { useState } from "react";

interface Disable2FaProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void; // Corrected type for onOpenChange
}

interface Error {
  password: string[];
}

const Disable2Fa: React.FC<Disable2FaProps> = ({ isOpen, onOpenChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [Error, setError] = useState<Error>({
    password: []
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (value: string) => {
    const errors: string[] = [];
    if (!value) {
      errors.push("Password is required");
    }
    setError((prev) => ({
      ...prev,
      password: errors
    }));
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                errorMessage={() => (
                  <ul>
                    {Error.password.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                )}
                isInvalid={Error.password.length > 0}
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
                label="Password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                onValueChange={(value) => validatePassword(value)}
              />


            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Disable2Fa;