import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SimpleReactValidator from "simple-react-validator";
import { cn } from "../../lib/utils";
import { create } from "../../services/election";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Create: React.FC<{ refreshItems: () => void; extraText?: string }> = (
  props
) => {
  const [description, setDescription] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const validator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState<boolean>(false);

  const onDateChange = (value: Date) => {
    setDate(value);
    validator.current.showMessageFor("date");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        setLoading(true);
        const response = await create({
          id: 0,
          description: description,
          electionDate: date.toISOString(),
          isComplete: false,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        toast.success(response);
        setIsDialogOpen(false);
        props.refreshItems();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      validator.current.showMessages();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <Pencil className="h-4 w-4" />
          <span className="hidden lg:inline sm:whitespace-nowrap">
            Create {props.extraText}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create election</DialogTitle>
          <DialogDescription>
            Make changes to election here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                required
                id="description"
                type="text"
                autoComplete="description"
                value={description}
                className={
                  validator.current.message(
                    "description",
                    description,
                    "required|min:4|max:255"
                  )
                    ? "border-rose-500 col-span-3"
                    : "col-span-3"
                }
                onChange={(e) => {
                  setDescription(e.target.value);
                  validator.current.showMessageFor("description");
                }}
                onBlur={() => validator.current.showMessageFor("description")}
              />
              <span></span>
              <span className="col-span-3 -mt-2">
                {validator.current.message(
                  "description",
                  description,
                  "required|min:4|max:255",
                  {
                    className: "text-rose-500 text-sm",
                  }
                )}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="electionDate" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      className="w-[280px]"
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={date}
                      onDayClick={onDateChange}
                      fromYear={2020}
                      toYear={2030}
                      initialFocus
                      defaultMonth={
                        new Date(date.getFullYear(), date.getMonth())
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <span></span>
              <span className="col-span-3 -mt-2">
                {validator.current.message("date", date, "required", {
                  className: "text-rose-500 text-sm",
                })}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" loading={loading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Dialog>
  );
};

export default Create;
