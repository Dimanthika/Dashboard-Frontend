import { Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SimpleReactValidator from "simple-react-validator";
import ElectionParty from "../../models/election-party";
import { create } from "../../services/candidate";
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
  election: number;
  extraText?: string;
  electionParties: ElectionParty[];
}> = (props) => {
  const [nic, setNIC] = useState<string>("");
  const [candidateNo, setCandidateNo] = useState<number>(0);
  const [electionParty, setElectionParty] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const validator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setElectionParty(
      props.electionParties[0] ? props.electionParties[0].id : 0
    );
  }, [props.electionParties]);

  let formReset = () => {
    setNIC("");
    setCandidateNo(0);
    setElectionParty(
      props.electionParties[0] ? props.electionParties[0].id : 0
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        setLoading(true);
        const response = await create({
          id: 0,
          candidateNo: candidateNo,
          election: props.election,
          voter: nic,
          electionParty: electionParty,
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
          <DialogTitle>Create candidate</DialogTitle>
          <DialogDescription>
            Make changes to candidate here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nic" className="text-right">
                Voter
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
                    ? "border-rose-500 col-span-3"
                    : "col-span-3"
                }
                onChange={(e) => {
                  setNIC(e.target.value);
                  validator.current.showMessageFor("nic");
                }}
                onBlur={() => validator.current.showMessageFor("nic")}
              />
              <span></span>
              <span className="col-span-3 -mt-2">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="candidateNo" className="text-right">
                Candidate No
              </Label>
              <Input
                required
                id="candidateNo"
                type="number"
                autoComplete="candidateNo"
                value={candidateNo}
                className={
                  validator.current.message(
                    "candidateNo",
                    candidateNo,
                    "required|numeric|min:1,num|max:99,num"
                  )
                    ? "border-rose-500 col-span-3"
                    : "col-span-3"
                }
                onChange={(e) => {
                  setCandidateNo(
                    parseInt(e.target.value ? e.target.value : "0")
                  );
                  validator.current.showMessageFor("candidateNo");
                }}
                onBlur={() => validator.current.showMessageFor("candidateNo")}
              />
              <span></span>
              <span className="col-span-3 -mt-2">
                {validator.current.message(
                  "candidateNo",
                  candidateNo,
                  "required|numeric|min:1,num|max:99,num",
                  {
                    className: "text-rose-500 text-sm",
                  }
                )}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="electionParty" className="text-right">
                Election Party
              </Label>
              <Select
                required
                autoComplete="electionParty"
                value={electionParty.toString()}
                onValueChange={(value) => {
                  setElectionParty(parseInt(value));
                }}
              >
                <SelectTrigger
                  className={
                    validator.current.message(
                      "electionParty",
                      electionParty,
                      "required"
                    )
                      ? "border-rose-500 col-span-3 "
                      : "col-span-3 "
                  }
                >
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {props.electionParties.map((electionParty) => (
                      <SelectItem
                        value={electionParty.id.toString()}
                        key={electionParty.id}
                      >
                        {electionParty.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span></span>
              <span className="col-span-3 -mt-2">
                {validator.current.message(
                  "electionParty",
                  electionParty,
                  "required",
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
