import { useState } from "react";
import { Avatar, Chip } from "@heroui/react";
import { Button } from "@heroui/button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
// Define the type for the `info` prop
interface PersonalInfoDetail {
  name: string;
  detail: string;
  verified?: boolean; // Add a verified flag
}

// Define the type for the component's props
interface PersonalInformationProps {
  info: PersonalInfoDetail[];
}

export default function PersonalInformation({ info }: PersonalInformationProps) {
  // State to track edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to store editable information
  const [editedInfo, setEditedInfo] = useState<PersonalInfoDetail[]>(info);

  // Function to handle input changes
  const handleInputChange = (index: number, value: string) => {
    const updatedInfo = [...editedInfo];
    updatedInfo[index].detail = value;
    setEditedInfo(updatedInfo);
  };

  // Function to save changes
  const handleSave = () => {
    setIsEditing(false);
    // Here, you can add logic to save the changes to an API or state management system
    console.log("Saved changes:", editedInfo);
  };

  // Function to cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo(info); // Reset to original info
  };

  return (
    <div className="flex flex-col w-full py-5">
      <h1 className="text-2xl font-bold pb-2 pl-1">Personal Information</h1>
      <div className="border border-gray-200 rounded-lg px-5 min-h-80 pb-7">
        <div className="flex flex-row justify-between py-5">
          <div className="flex items-center">
            <Avatar
              className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 text-large"
              src="https://i.pravatar.cc/150?u=a04258114e29026302d"
            />
            <div className="flex flex-col px-2 items-start">
              <h1 className="text-xs font-black px-4 py-1 sm:text-lg text-left">
                John Duo
              </h1>
              <p className="text-xs sm:text-sm px-4 text-gray-400 text-left">
                Joined Since: Oct 19, 2023
              </p>
            </div>
          </div>
          {/* Edit/Save/Cancel Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {isEditing ? (
              <>
                <Button
                  color="primary"
                  radius="full"
                  size="sm"
                  variant="flat"
                  onPress={handleSave}
                >
                  <SaveIcon fontSize="small" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
                <Button
                  color="danger"
                  radius="full"
                  size="sm"
                  variant="flat"
                  onPress={handleCancel}
                  className="text-sm sm:text-base"
                >
                  <CancelIcon fontSize="small" />
                  <span className="hidden sm:inline">Cancel</span>
                </Button>
              </>
            ) : (
              <Button
                color="primary"
                radius="full"
                size="sm"
                variant="flat"
                onPress={() => setIsEditing(true)}
              >
                <CreateOutlinedIcon fontSize="small" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            )}
          </div>
        </div>
        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {editedInfo.map((detail, index) => (
            <div key={index}>
              <div className="text-gray-500">{detail.name}</div>
              {isEditing ? (
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    value={detail.detail}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="border border-gray-300 rounded-md p-1 w-full"
                  />
                  {/* Verified Badge for Email and Phone */}
                  {(detail.name === "Email Address" || detail.name === "Phone Number") && (
                      <Chip
                        className={detail.verified? "bg-green-100" : "bg-red-100"}
                        radius="sm" color={detail.verified ? "success" : "danger"}
                        startContent={detail.verified ? <CheckIcon fontSize="small" /> : <ClearIcon fontSize="small" />}
                        variant="light">
                        <p className="text-xs hidden sm:inline">{detail.verified ? "Verified" : "Not verified"}</p>
                      </Chip>
                    )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div>{detail.detail}</div>
                  {/* Verified Badge for Email and Phone */}
                  {(detail.name === "Email Address" || detail.name === "Phone Number") && (
                      <Chip
                        size="sm"
                        className={detail.verified? "bg-green-100" : "bg-red-100"}
                        radius="sm" color={detail.verified ? "success" : "danger"}
                        startContent={detail.verified ? <CheckIcon fontSize="small" /> : <ClearIcon fontSize="small" />}
                        variant="light"
                      >
                        <p className="text-xs hidden sm:inline">{detail.verified ? "Verified" : "Not verified"}</p>
                      </Chip>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}