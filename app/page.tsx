import { ListIcon } from "@/components/icons";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { CreateTask } from "@/components/CreateTask";

export default function Home() {

  return (
    <section>
      {/* Form to create the todo */}
      <div className="flex items-center justify-center w-full mb-2 py-4">
        <h1 className="font-bold text-3xl leading-tight pr-3">
          To Do List
        </h1>
        <ListIcon className="text-default-500" />
      </div>
      {/* Form to create a task   */}
      <CreateTask />
    </section>
  );
}
