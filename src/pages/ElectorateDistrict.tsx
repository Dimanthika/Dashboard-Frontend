import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Create from "../components/ElectorateDistrict/Create";
import List from "../components/ElectorateDistrict/List";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import DashboardLayout from "../layouts/Dashboard";
import ElectorateDistrict from "../models/electorate-district";
import { Status } from "../models/enum";
import { findAll } from "../services/electorate-district";

const ElectorateDistrictPage: React.FC = () => {
  const [districts, setDistricts] = useState<ElectorateDistrict[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const fetchedItems = await findAll();
      setDistricts(fetchedItems);
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
        <h1 className="text-lg font-semibold md:text-2xl">
          Electoral Districts
        </h1>
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
        <List
          items={districts}
          status={Status.all}
          refreshItems={fetchItems}
          loading={loading}
        />
        <List
          items={districts}
          status={Status.active}
          refreshItems={fetchItems}
          loading={loading}
        />
        <List
          items={districts}
          status={Status.inactive}
          refreshItems={fetchItems}
          loading={loading}
        />
      </Tabs>
      <Toaster position="bottom-center" reverseOrder={false} />
    </DashboardLayout>
  );
};

export default ElectorateDistrictPage;
