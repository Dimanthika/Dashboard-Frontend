import Electorate from "../../models/electorate";
import { Status, statusMap } from "../../models/enum";
import Voter from "../../models/voter";
import Edit from "../Voter/Edit";
import RecoverConfirm from "../Voter/RecoverConfirm";
import SuspendConfirm from "../Voter/SuspendConfirm";
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

const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const List: React.FC<{
  items: Voter[];
  status: Status;
  electorates: Electorate[];
  loading: boolean;
  refreshItems: () => void;
}> = (props) => {
  const filteredItems = props.items.filter((voter) => {
    if (props.status === Status.all) return true;
    if (props.status === Status.active) return voter.isActive;
    if (props.status === Status.inactive) return !voter.isActive;
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
                  <TableHead className="text-center hidden sm:table-cell">
                    Gender
                  </TableHead>
                  <TableHead className="text-center hidden xl:table-cell">
                    Date of Birth
                  </TableHead>
                  <TableHead>Polling Division</TableHead>
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
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {item.gender}
                    </TableCell>
                    <TableCell className="text-center hidden xl:table-cell">
                      {item.dateOfBirth}
                    </TableCell>
                    <TableCell>
                      {item.Electorate ? item.Electorate.name : ""}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <Badge variant={item.isActive ? "outline" : "secondary"}>
                        {item.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {formattedDate(item.createdAt)}
                    </TableCell>
                    {props.status !== Status.inactive ? (
                      <TableCell className="text-center">
                        <Edit
                          voter={item}
                          refreshItems={props.refreshItems}
                          electorates={props.electorates}
                        />
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell className="text-center">
                      {!item.isActive ? (
                        <RecoverConfirm
                          item={item}
                          refreshItems={props.refreshItems}
                        />
                      ) : (
                        <SuspendConfirm
                          item={item}
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
              {filteredItems.length > 1 ? "voters" : "voter"}
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
                  electorates={props.electorates}
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