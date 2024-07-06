import { Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SimpleReactValidator from "simple-react-validator";
import Node from "../../models/node";
import { createElection, findAll } from "../../services/node";
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
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Create: React.FC<{ refreshItems: () => void; election: number }> = (
  props
) => {
  const [node, setNode] = useState<number>(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const validator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNodes = async () => {
    try {
      const find = await findAll();
      setNodes(find);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  const addNode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        setLoading(true);
        const response = await createElection(props.election, node);
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
            Create Cluster
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create cluster</DialogTitle>
          <DialogDescription>
            Make changes to cluster here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addNode}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="node" className="text-right">
                Node
              </Label>
              <Select
                required
                autoComplete="node"
                value={node.toString()}
                onValueChange={(value) => {
                  setNode(parseInt(value));
                }}
              >
                <SelectTrigger
                  className={
                    validator.current.message("node", node, "required")
                      ? "border-rose-500 col-span-4 "
                      : "col-span-4"
                  }
                >
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {nodes.map((node) => (
                      <SelectItem value={node.id.toString()} key={node.id}>
                        {node.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span></span>
              <span className="col-span-4 -mt-2">
                {validator.current.message("node", node, "required", {
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
