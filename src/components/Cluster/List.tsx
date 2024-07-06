import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Election from "../../models/election";
import { mineNode, resolveConflicts, syncNode } from "../../services/node";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AddNode from "./AddNode";
import Create from "./Create.tsx";
import SuspendConfirm from "./SuspendConfirm";
import SuspendNodeConfirm from "./SuspendNodeConfirm";

// const formattedDate = (date: string) => {
//   return new Date(date)
//     .toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     })
//     .concat(" ")
//     .concat(
//       new Date(date).toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     );
// };

const List: React.FC<{
  items: any[];
  id: number;
  loading: boolean;
  election: Election;
  refreshItems: () => void;
}> = (props) => {
  const [mining, setMining] = useState<any>({});
  const [syncing, setSyncing] = useState<any>({});
  const [resolving, setResolving] = useState<any>({});

  let sync = async (url: string, node: string) => {
    try {
      setSyncing({ ...syncing, [node]: true });
      const response = await syncNode(props.election, url);
      toast.success(response);
      props.refreshItems();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSyncing({ ...syncing, [node]: false });
    }
  };

  let mine = async (url: string, node: string) => {
    try {
      setMining({ ...mining, [node]: true });
      const response = await mineNode(props.election, url);
      toast.success(response);
      props.refreshItems();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setMining({ ...mining, [node]: false });
    }
  };

  let resolve = async (url: string, node: string) => {
    try {
      setResolving({ ...resolving, [node]: true });
      const response = await resolveConflicts(props.election, url);
      toast.success(response);
      props.refreshItems();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setResolving({ ...resolving, [node]: false });
    }
  };

  return (
    <div className="space-y-4">
      {props.items.length > 0 ? (
        props.items.map((node) => (
          <Card className="" key={node.Node.id}>
            <CardHeader className="p-4 pb-2 border-b border-slate-200 ">
              <div className="flex items-center">
                <div className="grow">
                  <CardTitle className="text-lg">{node.Node.name}</CardTitle>
                  <CardDescription className="text-base">
                    URL: {node.Node.url}
                  </CardDescription>
                </div>
                <div className="flex-none text-sm flex items-center ">
                  <div>
                    {node.conflicts && (
                      <p
                        className="bg-rose-100 text-rose-700 font-semibold hover:bg-rose-200 rounded-md px-4 py-2 shadow-sm border border-rose-300 cursor-pointer"
                        onClick={() => resolve(node.Node.url, node.node)}
                      >
                        {resolving[node.node] && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Resolve Conflicts
                      </p>
                    )}
                  </div>
                  <div className="ml-2">
                    {node.minable && (
                      <p
                        className="bg-green-100 text-green-700 font-semibold hover:bg-green-200 rounded-md px-4 py-2 shadow-sm border border-green-300 cursor-pointer flex items-center"
                        onClick={() => mine(node.Node.url, node.node)}
                      >
                        {mining[node.node] && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Mine
                      </p>
                    )}
                  </div>
                  <div className="ml-2">
                    {node.isOnline ? (
                      <p className="bg-green-100 text-green-700 font-semibold shadow-sm hover:bg-green-200 rounded-md px-4 py-2">
                        Online
                      </p>
                    ) : (
                      <p className="bg-red-100 text-rose-700 font-semibold shadow-sm hover:bg-rose-200 rounded-md px-4 py-2">
                        Offline
                      </p>
                    )}
                  </div>
                  <div className="ml-2">
                    {node.isSynced && node.isOnline ? (
                      <p className="bg-green-100 text-green-700 font-semibold shadow-sm hover:bg-green-200 rounded-md px-4 py-2">
                        Synced
                      </p>
                    ) : node.isOnline ? (
                      <p
                        className="bg-red-100 text-rose-700 font-semibold shadow-sm hover:bg-rose-200 rounded-md px-4 py-2 cursor-pointer"
                        onClick={() => sync(node.Node.url, node.node)}
                      >
                        {syncing[node.node] && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sync with Server
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            {node.connectedNodes.length > 0 ? (
              <CardContent className="py-3">
                <p className="text-base font-semibold mb-2">Connected Nodes</p>
                <div>
                  {node.connectedNodes.map((connectedNode: any) => (
                    <div
                      key={connectedNode}
                      className="flex items-center bg-slate-100 rounded-lg p-2 mb-2"
                    >
                      <p className="grow">{connectedNode}</p>
                      <SuspendNodeConfirm
                        election={props.id}
                        parent={node.Node.url}
                        node={connectedNode}
                        refreshItems={props.refreshItems}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            ) : (
              ""
            )}
            <CardFooter className="flex justify-between flex-row-reverse p-4 pt-3 border-t border-slate-200">
              <SuspendConfirm id={node.id} refreshItems={props.refreshItems} />
              <AddNode
                refreshItems={props.refreshItems}
                election={props.id}
                cluster={node.Node.url}
              />
              {/* <CardDescription>{formattedDate(node.createdAt)}</CardDescription> */}
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center gap-1 text-center py-16">
          {props.loading ? (
            <p className="text-2xl font-bold tracking-tight">Loading...</p>
          ) : (
            <>
              <h3 className="text-2xl font-bold tracking-tight">
                You have no clusters
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                You can manage clusters as soon as you add a voter.
              </p>
              <Create refreshItems={props.refreshItems} election={props.id} />
            </>
          )}
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default List;
