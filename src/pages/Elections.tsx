import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Create from "../components/Election/Create";
import ElectionList from "../components/Election/List";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import DashboardLayout from "../layouts/Dashboard";
import Election from "../models/election";
import { Status } from "../models/enum";
import { findAll } from "../services/election";

const ElectionPage: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const fetchedItems = await findAll();
      setElections(fetchedItems);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Elections</h1>
      </div>
      <Tabs defaultValue="active">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Archived</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Create refreshItems={fetchItems} />
          </div>
        </div>
        <ElectionList
          items={elections}
          status={Status.all}
          refreshItems={fetchItems}
          loading={loading}
        />
        <ElectionList
          items={elections}
          status={Status.active}
          refreshItems={fetchItems}
          loading={loading}
        />
        <ElectionList
          items={elections}
          status={Status.inactive}
          refreshItems={fetchItems}
          loading={loading}
        />
      </Tabs>
      <Toaster position="bottom-center" reverseOrder={false} />
    </DashboardLayout>
  );
};

export default ElectionPage;
