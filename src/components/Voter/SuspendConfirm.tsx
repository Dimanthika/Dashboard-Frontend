import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Voter from "../../models/voter";
import { suspend } from "../../services/voter";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const Suspend: React.FC<{
  item: Voter;
  refreshItems: () => void;
}> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  let suspendElection = async (id: number) => {
    try {
      setLoading(true);
      const response = await suspend(id);
      toast.success(response);
      setIsDialogOpen(false);
      props.refreshItems();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="h-7 gap-1" variant="destructive">
            <Trash2 className="h-4 w-4" />
            <span className="hidden md:inline sm:whitespace-nowrap">
              Suspend
            </span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will suspend the Election. This action can reverted
              later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="">Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              type="submit"
              loading={loading}
              onClick={() => suspendElection(props.item.id)}
            >
              Yes, Suspend it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default Suspend;
