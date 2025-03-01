"use client";
import { Container } from "@mui/material";
import { Tab, Tabs } from "@heroui/tabs";
import PersonIcon from "@mui/icons-material/PersonOutline";
import MedicalServicesIcon from "@mui/icons-material/MedicalServicesOutlined";
import SecurityIcon from "@mui/icons-material/ShieldOutlined";
import FamilyRestroomIcon from "@mui/icons-material/Groups2Outlined";
import PersonalInformation from "@/components/PersonalInformation";
import MedicalInformation from "@/components/MedicalInformation";
import Security from "@/components/Secuirty";
import FamilyMembers from "@/components/FamilyMembers";


export default function SettingsPage() {
  const info = [
    { name: "First Name", detail: "John" },
    { name: "Last Name", detail: "Doe" },
    { name: "Address", detail: "2972 Westheimer Rd, Santa Ana, Illionis 85486" },
    { name: "Email Address", detail: "Example@gmail.com" , verified: false },
    { name: "Phone Number", detail: "+20100024545", verified: true },
    { name: "Date of birth", detail: "April 08, 1995" },
    { name: "Gender", detail: "Male" }
  ];

  const tabs = [
    {
      id: "personalInfo",
      label: "Personal Information",
      icon: <PersonIcon className="mr-2" />,
      content: <PersonalInformation info={info} />
    },
    {
      id: "medicalInfo",
      label: "Medical Information",
      icon: <MedicalServicesIcon className="mr-2" />,
      content: <MedicalInformation />
    },
    {
      id: "security",
      label: "Security",
      icon: <SecurityIcon className="mr-2" />,
      content: <Security />
    },
    {
      id: "familymembers",
      label: "Family Members",
      icon: <FamilyRestroomIcon className="mr-2" />,
      content: <FamilyMembers />
    }
  ];


  return (
    <Container maxWidth="lg" sx={{
      boxShadow: 3, // Use Shadow effect
      padding: 4, // Add some padding
      borderRadius: 2, // Add rounded corners
      minHeight: "100vh"
    }}>
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold pb-2 pl-1">Settings</h1>

        <div className="flex flex-wrap">
          <div className="py-2 w-full">
            <Tabs className="flex flex-col sm:flex-row " size="lg" radius="sm" key="light"
                  aria-label="Tabs variants" variant="light"
                  classNames={{
                    tabList: "gap-0",
                    cursor: "w-full bg-[#DDE6ED] dark:bg-default-700",
                    tab: "max-w-fit px-5 py-6",
                    tabContent: "group-data-[selected=true]:text-[#19376D]"
                  }}
                  items={tabs}
              // selectedKey={pathname}
            >
              {tabs.map((tab) => (
                <Tab key={tab.id}
                     title={
                       <div className="flex items-center">
                         {tab.icon}
                         <span className="text-xs sm:text-sm">{tab.label}</span>
                       </div>
                     }
                     titleValue={tab.label}
                     className="text-sm sm:text-base"
                >
                  {tab.content}
                </Tab>
              ))}
            </Tabs>
          </div>


        </div>
      </div>
    </Container>
  );
}