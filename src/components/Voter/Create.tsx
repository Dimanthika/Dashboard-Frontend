import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SimpleReactValidator from "simple-react-validator";
import { cn } from "../../lib/utils";
import Electorate from "../../models/electorate";
import { create } from "../../services/voter";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Create: React.FC<{
  refreshItems: () => void;
  electorates: Electorate[];
  extraText?: string;
}> = (props) => {
  const [nic, setNIC] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [electorate, setElectorate] = useState<number>(0);
  const [district, setDistrict] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [date, setDate] = useState<Date>(addDays(new Date(), -365 * 18));
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const validator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState<boolean>(false);
  const [electorates, setElectorates] = useState<Electorate[]>([]);
  const [districts, setDistricts] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const districtMap = new Map();
    props.electorates.forEach((electorate) => {
      const district = electorate.ElectorateDistrict;
      if (district) {
        districtMap.set(district.id, district.name);
      }
    });

    const districts = Array.from(districtMap.entries()).map(([id, name]) => ({
      id,
      name,
    }));

    setDistricts(districts);
    setDistrict(districts.length > 0 ? districts[0].id : 0);
  }, [props.electorates]);

  useEffect(() => {
    let find = props.electorates.filter(
      (item) =>
        item.ElectorateDistrict && item.ElectorateDistrict.id === district
    );

    setElectorates(find);
    setElectorate(find.length > 0 ? find[0].id : 0);
  }, [district, props.electorates]);

  const onDateChange = (value: Date | undefined) => {
    if (value) {
      setDate(value);
      if (!ageCheck(value)) {
        validator.current.message(
          "date",
          date,
          `You must be at least 18 years old.`,
          { className: "text-rose-500 text-sm" }
        );
      }
    }
    validator.current.showMessageFor("date");
  };

  const ageCheck = (value: Date) => {
    const today = new Date();
    let age = today.getFullYear() - value.getFullYear();
    const month = today.getMonth() - value.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < value.getDate())) {
      age--;
    }
    if (age < 18) {
      return false;
    }
    return true;
  };

  const convertISOToDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formReset = () => {
    setNIC("");
    setName("");
    setEmail("");
    setGender("Male");
    setElectorate(0);
    setDistrict(0);
    setPassword("");
    setDate(addDays(new Date(), -365 * 18));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator.current.allValid() && ageCheck(date)) {
      try {
        setLoading(true);
        const response = await create({
          id: 0,
          nic: nic,
          name: name,
          email: email,
          gender: gender,
          electorate: electorate,
          password: password,
          dateOfBirth: convertISOToDate(date),
          isActive: true,
          createdAt: new Date().toISOString(),
        });
        toast.success(response);
        formReset();
        setIsDialogOpen(false);
        props.refreshItems();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      validator.current.showMessages();
      validator.current.message(
        "date",
        date,
        `You must be at least 18 years old.`,
        { className: "text-rose-500 text-sm" }
      );
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
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] ">
        <DialogHeader>
          <DialogTitle>Create voter</DialogTitle>
          <DialogDescription>
            Make changes to voter here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-3">
              <Label
                htmlFor="nic"
                className="text-right md:text-left md:col-span-5 md:-mb-2"
              >
                NIC
              </Label>
              <Input
                required
                id="nic"
                type="text"
                autoComplete="nic"
                value={nic}
                className={
                  validator.current.message(
                    "nic",
                    nic,
                    "required|min:10|max:12"
                  )
                    ? "border-rose-500 col-span-4 md:col-span-5"
                    : "col-span-4 md:col-span-5"
                }
                onChange={(e) => {
                  setNIC(e.target.value);
                  validator.current.showMessageFor("nic");
                }}
                onBlur={() => validator.current.showMessageFor("nic")}
              />
              <span className="md:hidden"></span>
              <span className="col-span-4 md:col-span-5 -mt-2">
                {validator.current.message(
                  "nic",
                  nic,
                  "required|min:10|max:12",
                  {
                    className: "text-rose-500 text-sm",
                  }
                )}
              </span>
            </div>
            <div className="grid grid-cols-5 items-center gap-3">
              <Label
                htmlFor="name"
                className="text-right md:text-left md:col-span-5 md:-mb-2"
              >
                Name
              </Label>
              <Input
                required
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                className={
                  validator.current.message(
                    "name",
                    name,
                    "required|min:4|max:235"
                  )
                    ? "border-rose-500 col-span-4 md:col-span-5"
                    : "col-span-4 md:col-span-5"
                }
                onChange={(e) => {
                  setName(e.target.value);
                  validator.current.showMessageFor("name");
                }}
                onBlur={() => validator.current.showMessageFor("name")}
              />
              <span className="md:hidden"></span>
              <span className="col-span-4 md:col-span-5 -mt-2">
                {validator.current.message(
                  "name",
                  name,
                  "required|min:4|max:235",
                  {
                    className: "text-rose-500 text-sm",
                  }
                )}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label
                htmlFor="gender"
                className="text-right md:text-left md:col-span-5 md:-mb-3"
              >
                Gender
              </Label>
              <Select
                required
                autoComplete="gender"
                value={gender}
                onValueChange={(value) => {
                  setGender(value);
                  validator.current.showMessageFor("gender");
                }}
              >
                <SelectTrigger
                  className={
                    validator.current.message("gender", gender, "required")
                      ? "border-rose-500 col-span-4 md:col-span-5 "
                      : "col-span-4 md:col-span-5 "
                  }
                >
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="md:hidden"></span>
              <span className="col-span-4 md:col-span-5 -mt-2">
                {validator.current.message("gender", gender, "required", {
                  className: "text-rose-500 text-sm",
                })}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label
                htmlFor="dateOfBirth"
                className="text-right md:text-left md:col-span-5 md:-mb-2"
              >
                Date of Birth
              </Label>
              <div className="col-span-4 md:col-span-5">
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
                      fromYear={1924}
                      toYear={2007}
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
            <div className="grid grid-cols-4 items-center gap-3">
              <Label
                htmlFor="district"
                className="text-right md:text-left md:col-span-5 md:-mb-3"
              >
                Electoral District
              </Label>
              <Select
                required
                autoComplete="district"
                value={district.toString()}
                onValueChange={(value) => {
                  setDistrict(parseInt(value));
                }}
              >
                <SelectTrigger
                  className={
                    validator.current.message("district", district, "required")
                      ? "border-rose-500 col-span-4 md:col-span-5 "
                      : "col-span-4 md:col-span-5 "
                  }
                >
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {districts
                      ? districts.map((district) => (
                          <SelectItem
                            value={district.id.toString()}
                            key={district.id}
                          >
                            {district.name}
                          </SelectItem>
                        ))
                      : null}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="md:hidden"></span>
              <span className="col-span-4 md:col-span-5 -mt-2">
                {validator.current.message("district", district, "required", {
                  className: "text-rose-500 text-sm",
                })}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label
                htmlFor="electorate"
                className="text-right md:text-left md:col-span-5 md:-mb-3"
              >
                Electorate
              </Label>
              <Select
                required
                autoComplete="electorate"
                value={electorate.toString()}
                onValueChange={(value) => {
                  setElectorate(parseInt(value));
                }}
              >
                <SelectTrigger
                  className={
                    validator.current.message(
                      "electorate",
                      electorate,
                      "required"
                    )
                      ? "border-rose-500 col-span-4 md:col-span-5 "
                      : "col-span-4 md:col-span-5 "
                  }
                >
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {electorates
                      ? electorates.map((electorate) => (
                          <SelectItem
                            value={electorate.id.toString()}
                            key={electorate.id}
                          >
                            {electorate.name}
                          </SelectItem>
                        ))
                      : null}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="md:hidden"></span>
              <span className="col-span-4 md:col-span-5 -mt-2">
                {validator.current.message(
                  "electorate",
                  electorate,
                  "required",
                  {
                    className: "text-rose-500 text-sm",
                  }
                )}
              </span>
            </div>
            <div className="grid grid-cols-5 items-center gap-3">
              <Label
                htmlFor="email"
                className="text-right md:text-left md:col-span-5 md:-mb-2"
              >
                Email
              </Label>
              <Input
                required
                id="email"
                type="text"
                autoComplete="email"
                value={email}
                className={
                  validator.current.message("email", email, "required|email")
                    ? "border-rose-500 col-span-4 md:col-span-5"
                    : "col-span-4 md:col-span-5"
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                  validator.current.showMessageFor("email");
                }}
                onBlur={() => validator.current.showMessageFor("email")}
              />
              <span className="md:hidden"></span>
              <span className="col-span-4 md:col-span-5 -mt-2">
                {validator.current.message("email", email, "required|email", {
                  className: "text-rose-500 text-sm",
                })}
              </span>
            </div>
            <div className="grid grid-cols-5 items-center gap-3">
              <Label
                htmlFor="password"
                className="text-right md:text-left md:col-span-5 md:-mb-2"
              >
                Password
              </Label>
              <Input
                required
                id="password"
                type="password"
                autoComplete="password"
                value={password}
                className={
                  validator.current.message(
                    "password",
                    password,
                    "required|min:6|max:30"
                  )
                    ? "border-rose-500 col-span-4 md:col-span-5"
                    : "col-span-4 md:col-span-5"
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  validator.current.showMessageFor("password");
                }}
                onBlur={() => validator.current.showMessageFor("password")}
              />
              <span className="md:hidden"></span>
              <span className="col-span-4 md:col-span-5 -mt-2">
                {validator.current.message(
                  "password",
                  password,
                  "required|min:6|max:30",
                  {
                    className: "text-rose-500 text-sm",
                  }
                )}
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
