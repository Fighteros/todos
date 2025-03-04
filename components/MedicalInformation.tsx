"use client";

import { Button } from "@heroui/button";
import { useState } from "react";

import { Accordion, AccordionItem } from "@heroui/react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";


// <h1 className="text-xl font-bold">{item}</h1>
//                   <Button
//                     color="primary"
//                     radius="full"
//                     size="sm"
//                     variant="flat"
//                     onPress={() => setIsEditing(true)}
//                   >
//                     <CreateOutlinedIcon fontSize="small" />
//                     <span className="hidden sm:inline"> Edit</span>
//                   </Button>

export default function MedicalInformation() {
  const info = [
    "Smoking",
    "Blood Type"
  ];

  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';



  // CSS for Accodion
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-bold text-xl",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium -rotate-90 ",
    content: "text-xs font-normal px-2"
  };

  const [isEditing, setIsEditing] = useState(false);


  return (
    <Accordion
      className="p-4 grid grid-cols-2 w-full"
      itemClasses={itemClasses}
      showDivider={false}
    >

      {info.map((item) => (

        <AccordionItem
          className="text-xl font-semibold"
          key={item}
          aria-label={item}
          title={
          <div className="flex flex-row items-center justify-between">
            {item}
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
          </div>
          }

          subtitle="status"
        >
          {defaultContent}
        </AccordionItem>
      ))}
    </Accordion>
  )
    ;
}
