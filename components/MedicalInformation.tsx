"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Chip } from "@heroui/react";

import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

export default function MedicalInformation() {
  const accordionItems = [
    "Smoking",
    "Blood Type",
    "Body Information",
    "Allergy",
    "Chronic Disease",
    "Genetic Disease",
    "Previous Surgeries",
    "Medications",
    "Vaccines",
    "Head Circumference"
  ];

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // CSS for Accordion
  const itemClasses = {
    base: "px-2 sm:px-4 py-0 w-full", // Responsive padding
    title: "font-bold text-lg sm:text-xl flex-grow", // Responsive font size
    trigger:
      "py-8 sm:py-12 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center justify-center", // Responsive padding
    indicator: "p-2 transition-transform -rotate-90 data-[open=true]:rotate-90", // flip the indicator to only 90 and -90
    content: "text-xs font-normal px-2",
    subtitle: "data-[open=true]:hidden"
  };

  // State to track editing for each item
  const [editingStates, setEditingStates] = useState<{ [key: string]: boolean }>({});

  // Reset all editing states to false (handle close & open states)
  const resetEditingStates = accordionItems.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {} as { [key: string]: boolean });

  const handleEdit = (item: string) => {
    // Toggle the current item's editing state
    setEditingStates({
      ...resetEditingStates,
      [item]: !editingStates[item]
    });
  };


  return (
    <Accordion
      className="p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 w-full gap-4" // Responsive grid and gap
      itemClasses={itemClasses}
      showDivider={false}
    >
      {accordionItems.map((item) => (
        <AccordionItem
          className="text-lg sm:text-xl font-semibold" // Responsive font size
          key={item}
          aria-label={item}
          onPress={() => handleEdit(item)}
          title={
            <div className="flex flex-row items-center justify-between w-full">
              <span>{item}</span>
              {!editingStates[item] && (
                <div className="pt-3 sm:pt-5"> {/* Responsive padding */}
                  <Chip
                    size="sm"
                    className="bg-blue-100 p-2 py-3 rounded-2xl text-blue-500"
                    radius="sm"
                    startContent={<CreateOutlinedIcon sx={{
                      fontSize: "15px"
                    }} />}
                    variant="light"
                  >
                    <span className="hidden sm:inline">Edit</span>
                  </Chip>
                </div>
              )}
            </div>
          }
          subtitle="status"
        >
          {defaultContent}
        </AccordionItem>
      ))}
    </Accordion>
  );
};