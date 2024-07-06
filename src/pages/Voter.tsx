import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Create from "../components/Voter/Create";
import List from "../components/Voter/List";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import DashboardLayout from "../layouts/Dashboard";
import Electorate from "../models/electorate";
import { Status } from "../models/enum";
import Voter from "../models/voter";
import { findAllActive } from "../services/electorate";
import { findAll } from "../services/voter";

const VoterPage: React.FC = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [electorates, setElectorates] = useState<Electorate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const fetchedItems = await findAll();
      setVoters(fetchedItems);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchElectorates = async () => {
    try {
      const find = await findAllActive();
      setElectorates(find);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchElectorates();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Voters</h1>
      </div>
      <Tabs defaultValue="active">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Archived</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Create refreshItems={fetchItems} electorates={electorates} />
          </div>
        </div>
        <List
          items={voters}
          status={Status.all}
          refreshItems={fetchItems}
          electorates={electorates}
          loading={loading}
        />
        <List
          items={voters}
          status={Status.active}
          refreshItems={fetchItems}
          electorates={electorates}
          loading={loading}
        />
        <List
          items={voters}
          status={Status.inactive}
          refreshItems={fetchItems}
          electorates={electorates}
          loading={loading}
        />
      </Tabs>
      <Toaster position="bottom-center" reverseOrder={false} />
    </DashboardLayout>
  );
};

export default VoterPage;
