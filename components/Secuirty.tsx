"use client";
import Container from "@mui/material/Container";
import { Switch } from "@heroui/switch";
import { FormEvent, useState } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Button, Form, Progress } from "@heroui/react";

import PasswordInput from "./PasswordInput";

import { SafeLockIcon } from "@/components/icons";


interface Errors {
  currentPassword: string[];
  newPassword: string[];
  repNewPassword: string[];
}

export default function Security() {
  const [isSelected, setIsSelected] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repNewPassword, setRepNewPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isStrong, setIsStrong] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    currentPassword: [],
    newPassword: [],
    repNewPassword: []
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleNewVisibility = () => setIsNewVisible(!isNewVisible);

  const validateCurrentPassword = (value: string) => {
    const currentErrors: string[] = [];
    if (!value) {
      currentErrors.push("Current password is required");
    }
    setErrors((prev) => ({ ...prev, currentPassword: currentErrors }));

  };


  const validateNewPassword = (value: string) => {
    const newErrors: string[] = [];
    if (!value) {
      newErrors.push("New password is required");
    }
    if (value.length < 8) {
      newErrors.push("Password must be at least 8 characters");
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      newErrors.push("Password must include at least 1 upper case letter");
    }
    if ((value.match(/[^a-z0-9]/gi) || []).length < 1) {
      newErrors.push("Password must include at least 1 symbol.");
    }

    if (newErrors.length == 0) {
      // Set password to strong
      setIsStrong(true);
    } else {
      setIsStrong(false);
    }

    setErrors((prev) => ({ ...prev, newPassword: newErrors }));

  };

  const validateConfirmPassword = (value: string) => {
    const newErrors: string[] = [];
    if (!value) {
      newErrors.push("Repeat Password is required");
    }
    if (newPassword.length !== value.length || newPassword !== value) {
      newErrors.push("New password mismatch");
    }

    setErrors((prev) => ({ ...prev, repNewPassword: newErrors }));
  };

  const handlePasswordChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // logic to handle password change!!
  };

  return (
    <Container maxWidth="xl">
      <div className="flex flex-row items-center px-6 pt-24 pb-14">
        <div className="p-2 bg-green-100 rounded-3xl">
          <SafeLockIcon />
        </div>
        <h1 className="text-xl font-bold p-4">Two-factor authentication</h1>
        <Switch
          color="success"
          isSelected={isSelected}
          size="md"
          onValueChange={setIsSelected}
        />
      </div>

      <div>
        <div className="flex flex-row items-center">
          <h1 className="text-xl font-bold pr-5 py-5">Change your password</h1>
          <Button
            className={!isEditing ? ("bg-blue-100 rounded-2xl text-blue-500") : ("bg-red-100 rounded-2xl text-red-500")}
            radius="sm"
            size="sm"
            startContent={<CreateOutlinedIcon sx={{ fontSize: "15px" }} />}
            variant="light"
            onPress={() => setIsEditing(!isEditing)}
          >
            {!isEditing ? (<span className="hidden sm:inline">Edit</span>) : (
              <span className="hidden sm:inline">Cancel</span>)}
          </Button>
        </div>

        <Form
          className="w-full flex flex-col"
          onSubmit={(e) => handlePasswordChange(e)}
        >
          <PasswordInput
            errors={errors.currentPassword}
            isVisible={isVisible}
            label="Current Password"
            toggleVisibility={toggleVisibility}
            value={currentPassword}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentPassword(value);
              validateCurrentPassword(value);
            }}
            isDisabled={!isEditing}
          />

          <PasswordInput
            errors={errors.newPassword}
            isVisible={isNewVisible}
            label="New Password"
            toggleVisibility={toggleNewVisibility}
            value={newPassword}
            onChange={(e) => {
              const value = e.target.value;
              setNewPassword(value);
              validateNewPassword(value);
            }}
            isDisabled={!isEditing}
          />

          {!isStrong ? (<div className="flex flex-row items-center max-w-[150px] w-full pl-3">
            <Progress color="danger" size="sm" value={100} />
            <span className="pl-2">Poor</span>
          </div>) : (<div className="flex flex-row items-center max-w-[250px] w-full pl-3">
            <Progress color="success" size="sm" value={100} />
            <span className="pl-2">Strong</span>
          </div>)}

          <PasswordInput
            errors={errors.repNewPassword}
            isVisible={isNewVisible}
            label="Repeat New Password"
            toggleVisibility={toggleNewVisibility}
            value={repNewPassword}
            onChange={(e) => {
              const value = e.target.value;
              setRepNewPassword(value);
              validateConfirmPassword(value);
            }}
            isDisabled={!isEditing}
          />

          <div className="pt-14">
            <Button
              className="rounded-md px-14"
              color="primary"
              size="lg"
              type={isEditing ? "submit" : "button"}
            >
              Save changes
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
