import ElectionParty from "../../models/election-party";
import { Status, statusMap } from "../../models/enum";
import { Badge } from "../ui/badge";
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
  items: ElectionParty[];
  status: Status;
  loading: boolean;
  refreshItems: () => void;
}> = (props) => {
  const filteredItems = props.items.filter((electionParty) => {
    if (props.status === Status.all) return true;
    if (props.status === Status.active) return electionParty.isActive;
    if (props.status === Status.inactive) return !electionParty.isActive;
  });

  return (
    <TabsContent value={statusMap[props.status]} className="mt-4">
      {filteredItems.length > 0 ? (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center hidden md:table-cell">
                    Status
                  </TableHead>
                  <TableHead className="text-center hidden lg:table-cell">
                    Created At
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
                {filteredItems.map((electionParty) => (
                  <TableRow key={electionParty.id}>
                    <TableCell className="font-medium">
                      {electionParty.name}
                    </TableCell>
                    <TableCell>{electionParty.description}</TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <Badge
                        variant={
                          electionParty.isActive ? "outline" : "secondary"
                        }
                      >
                        {electionParty.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {formattedDate(electionParty?.createdAt || "")}
                    </TableCell>
                    {props.status !== Status.inactive ? (
                      <TableCell className="text-center">
                        <Edit
                          item={electionParty}
                          refreshItems={props.refreshItems}
                        />
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell className="text-center">
                      {!electionParty.isActive ? (
                        <RecoverConfirm
                          item={electionParty}
                          refreshItems={props.refreshItems}
                        />
                      ) : (
                        <SuspendConfirm
                          item={electionParty}
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
              {filteredItems.length > 1 ? "election parties" : "election party"}
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
                <Create
                  refreshItems={props.refreshItems}
                  extraText="Election Party"
                />
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </TabsContent>
  );
};

export default List;
