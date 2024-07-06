import { RotateCcw } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Voter from "../../models/voter";
import { recover } from "../../services/voter";
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

const Recover: React.FC<{
  item: Voter;
  refreshItems: () => void;
}> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  let recoverElection = async (id: number) => {
    try {
      setLoading(true);
      const response = await recover(id);
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
          <Button size="sm" className="h-7 gap-1" variant="success">
            <RotateCcw className="h-4 w-4" />
            <span className="hidden md:inline sm:whitespace-nowrap">
              Recover
            </span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will recover the Election. This action can reverted
              later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type="submit"
              loading={loading}
              variant="success"
              onClick={() => recoverElection(props.item.id)}
            >
              Yes, Recover it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default Recover;
