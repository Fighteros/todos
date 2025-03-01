import { Avatar } from "@heroui/react";
import { Button } from "@heroui/button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

interface PersonalInfoDetail {
  name: string;
  detail: string;
}

interface PersonalInformationProps {
  info: PersonalInfoDetail[];
}

export default function PersonalInformation({ info }: PersonalInformationProps) {

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
          {/*  the edit button   */}
          <Button color="primary" radius="full" size="sm" variant="flat">
            <CreateOutlinedIcon fontSize="small" />
            Edit
          </Button>
        </div>
        {/* Personal Info  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {info.map((detail, index) => (
            <div key={index}>
              <div className="text-gray-500">{detail.name}</div>
              <div>{detail.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
