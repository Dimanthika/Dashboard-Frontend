import { Link } from "react-router-dom";
import Election from "../../models/election";
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
  return `${new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })} ${new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const List: React.FC<{
  items: Election[];
  status: Status;
  loading: boolean;
  refreshItems: () => void;
}> = (props) => {
  const filteredElections = props.items.filter((election) => {
    if (props.status === Status.all) return true;
    if (props.status === Status.active) return election.isActive;
    if (props.status === Status.inactive) return !election.isActive;
  });

  return (
    <TabsContent value={statusMap[props.status]} className="mt-4">
      {filteredElections.length > 0 ? (
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center hidden md:table-cell">
                    Status
                  </TableHead>
                  <TableHead className="text-center">Completion</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">
                    Created At
                  </TableHead>
                  {props.status !== Status.inactive && (
                    <TableHead>
                      <span className="sr-only">Edit</span>
                    </TableHead>
                  )}
                  <TableHead>
                    <span className="sr-only">Suspend</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredElections.map((election) => (
                  <TableRow key={election.id}>
                    <TableCell className="font-medium">
                      {election.description}
                    </TableCell>
                    <TableCell>
                      {new Date(election.electionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <Badge
                        variant={election.isActive ? "outline" : "secondary"}
                      >
                        {election.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={election.isComplete ? "secondary" : "default"}
                      >
                        {election.isComplete ? "Complete" : "Incomplete"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {formattedDate(
                        election.createdAt ? election.createdAt : ""
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-3 text-sm h-7"
                        to={"/elections/" + election.id}
                      >
                        <span className="sm:hidden md:inline lg:hidden">
                          Manage
                        </span>
                        <span className="hidden sm:inline md:hidden lg:inline">
                          Manage Election
                        </span>
                      </Link>
                    </TableCell>
                    {props.status !== Status.inactive && (
                      <TableCell className="text-center">
                        <Edit
                          election={election}
                          refreshItems={props.refreshItems}
                        />
                      </TableCell>
                    )}
                    <TableCell className="text-center">
                      {!election.isActive ? (
                        <RecoverConfirm
                          election={election}
                          refreshItems={props.refreshItems}
                        />
                      ) : (
                        <SuspendConfirm
                          election={election}
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
              Showing <strong>{filteredElections.length}</strong>{" "}
              {filteredElections.length > 1 ? "elections" : "election"}
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
                  extraText="Election"
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
