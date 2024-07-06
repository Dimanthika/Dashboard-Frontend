import { Pencil } from "lucide-react";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SimpleReactValidator from "simple-react-validator";
import Electorate from "../../models/electorate";
import { update } from "../../services/electorate";
import { Button } from "../ui/button";
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

const Edit: React.FC<{ item: Electorate; refreshItems: () => void }> = (
  props
) => {
  const [name, setName] = useState<string>(props.item.name);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const validator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        setLoading(true);
        const response = await update({
          id: props.item.id,
          name: name,
          currentVoters: props.item.currentVoters,
          electorateDistrict: props.item.electorateDistrict,
          isActive: props.item.isActive,
          createdAt: props.item.createdAt,
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
          <span className="hidden lg:inline sm:whitespace-nowrap">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Electoral District</DialogTitle>
          <DialogDescription>
            Make changes to Electoral District here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
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
                    "required|min:4|max:255"
                  )
                    ? "border-rose-500 col-span-3"
                    : "col-span-3"
                }
                onChange={(e) => {
                  setName(e.target.value);
                  validator.current.showMessageFor("name");
                }}
                onBlur={() => validator.current.showMessageFor("name")}
              />
              <span></span>
              <span className="col-span-3 -mt-2">
                {validator.current.message(
                  "name",
                  name,
                  "required|min:4|max:255",
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

export default Edit;
