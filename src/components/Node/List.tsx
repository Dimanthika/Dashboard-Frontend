import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Status, statusMap } from "../../models/enum";
import Node from "../../models/node";
import { initialize } from "../../services/node";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TabsContent } from "../ui/tabs";
import Create from "./Create";
import Edit from "./Edit";
import RecoverConfirm from "./RecoverConfirm";
import SuspendConfirm from "./SuspendConfirm";

const formattedDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .concat(" ")
    .concat(
      new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
};

const List: React.FC<{
  items: Node[];
  status: Status;
  loading: boolean;
  refreshItems: () => void;
}> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const filteredItems = props.items.filter((node) => {
    if (props.status === Status.all) return true;
    if (props.status === Status.active) return node.isActive;
    if (props.status === Status.inactive) return !node.isActive;
  });

  const initializeNode = async (node: string) => {
    try {
      setLoading(true);
      const response = await initialize(node);
      toast.success(response);
      props.refreshItems();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value={statusMap[props.status]} className="mt-4">
      {filteredItems.length > 0 ? (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  {props.status == Status.all ? (
                    <TableHead className="text-center hidden md:table-cell">
                      Status
                    </TableHead>
                  ) : (
                    ""
                  )}
                  <TableHead className="text-center hidden lg:table-cell">
                    Created At
                  </TableHead>
                  <TableHead className="text-center hidden lg:table-cell">
                    Availability
                  </TableHead>
                  {props.status !== Status.inactive ? (
                    <TableHead>
                      <span className="sr-only">Edit</span>
                    </TableHead>
                  ) : (
                    ""
                  )}
                  <TableHead>
                    <span className="sr-only">Suspend</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((node) => (
                  <TableRow key={node.id}>
                    <TableCell className="font-medium">{node.name}</TableCell>
                    <TableCell>{node.url}</TableCell>
                    {props.status == Status.all ? (
                      <TableCell className="text-center hidden md:table-cell">
                        <Badge
                          variant={node.isActive ? "outline" : "secondary"}
                        >
                          {node.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell className="text-center hidden lg:table-cell">
                      {formattedDate(node?.createdAt || "")}
                    </TableCell>
                    {node.availability ? (
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className="h-7 gap-1"
                          variant="success"
                        >
                          Available
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          type="submit"
                          loading={loading}
                          onClick={() => initializeNode(node.url)}
                        >
                          Initialize
                        </Button>
                      </TableCell>
                    )}
                    {props.status !== Status.inactive ? (
                      <TableCell className="text-center">
                        <Edit item={node} refreshItems={props.refreshItems} />
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell className="text-center">
                      {!node.isActive ? (
                        <RecoverConfirm
                          item={node}
                          refreshItems={props.refreshItems}
                        />
                      ) : (
                        <SuspendConfirm
                          item={node}
                          refreshItems={props.refreshItems}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{filteredItems.length}</strong>{" "}
              {filteredItems.length > 1 ? "nodes" : "node"}
            </div>
          </CardFooter>
        </Card>
      ) : props.status !== Status.inactive ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-16">
          <div className="flex flex-col items-center gap-1 text-center">
            {props.loading ? (
              <p className="text-2xl font-bold tracking-tight">Loading...</p>
            ) : (
              <>
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no voters
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  You can manage voters as soon as you add a voter.
                </p>
                <Create refreshItems={props.refreshItems} extraText="Node" />
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </TabsContent>
  );
};

export default List;
