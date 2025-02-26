"use client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Spinner } from "@heroui/spinner";

export const CreateTask = () => {
  const [task, setTask] = useState();
  const [submitting, setSubmitting] = useState(false);

  // @ts-ignore
  const handleChange = (e) => {
    // @ts-ignore
    setTask({ ...task, task: e.target.value });
  };

  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // logic to submit
    try {

    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    } finally {
      setSubmitting(false);
    }
  };


  // @ts-ignore
  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row relative  w-96">
          <Input
            className="flex-grow px-4 py-2 pr-21"
            label="Add a new Task"
            labelPlacement="inside"
            type="task"
            onChange={handleChange}
          />
          <Button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-7 rounded-lg bg-gradient-to-tr from-pink-500 to-yellow-500 text-default shadow-lg"
            radius="full"
            type="submit"
          >
            {submitting ?
              <Spinner color="current" variant="simple" /> : "Add"}
          </Button>
        </div>
      </form>

    </div>
  );
};