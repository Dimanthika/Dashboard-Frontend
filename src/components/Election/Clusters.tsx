import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Election from "../../models/election";
import { electionNodes } from "../../services/node";
import Create from "../Cluster/Create";
import List from "../Cluster/List";
import { Tabs, TabsContent } from "../ui/tabs";

const Candidates: React.FC<{
  election: Election;
  id: number;
}> = (props) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNodes = async () => {
    try {
      setLoading(true);
      const find = await electionNodes(props.id);
      setItems(find);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  return (
    <TabsContent value="Clusters" className="mt-4">
      <div className="rounded-lg border border-dashed shadow-sm p-2 lg:p-4">
        <Tabs defaultValue="active">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2 mb-4">
              <Create refreshItems={fetchNodes} election={props.id} />
            </div>
          </div>
          <List
            items={items}
            id={props.id}
            refreshItems={fetchNodes}
            loading={loading}
            election={props.election}
          />
        </Tabs>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </TabsContent>
  );
};

export default Candidates;
