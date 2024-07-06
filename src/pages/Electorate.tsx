import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Create from "../components/Electorate/Create";
import List from "../components/Electorate/List";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import DashboardLayout from "../layouts/Dashboard";
import Electorate from "../models/electorate";
import { Status } from "../models/enum";
import { findAll } from "../services/electorate";

const ElectorateDistrictPage: React.FC = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [electorates, setDistricts] = useState<Electorate[]>([]);
  const [district, setDistrict] = useState<{ name: string; id: number }>({
    id: 0,
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const districtId = searchParams.get("district");
    const districtName = searchParams.get("name");

    if (!districtId || !districtName) {
      navigate("/electorate-districts");
    } else {
      setDistrict({
        name: districtName,
        id: parseInt(districtId),
      });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (district.id !== 0) {
      fetchItems();
    }
  }, [district]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const fetchedItems = await findAll(district.id);
      setDistricts(fetchedItems);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <Link
          className="text-lg font-semibold md:text-2xl"
          to="/electorate-districts"
        >
          <HomeIcon className="mx-2 h-5 w-5" />
        </Link>
        <ChevronRightIcon className="mx-2 h-5 w-5" />
        <p className="text-lg font-semibold md:text-2xl">{district.name}</p>
        <ChevronRightIcon className="mx-2 h-5 w-5" />
        <h1 className="text-lg font-semibold md:text-2xl">Polling Divisions</h1>
      </div>
      <Tabs defaultValue="active">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Archived</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Create refreshItems={fetchItems} district={district.id} />
          </div>
        </div>
        <List
          items={electorates}
          status={Status.all}
          refreshItems={fetchItems}
          district={district.id}
          loading={loading}
        />
        <List
          items={electorates}
          status={Status.active}
          refreshItems={fetchItems}
          district={district.id}
          loading={loading}
        />
        <List
          items={electorates}
          status={Status.inactive}
          refreshItems={fetchItems}
          district={district.id}
          loading={loading}
        />
      </Tabs>
      <Toaster position="bottom-center" reverseOrder={false} />
    </DashboardLayout>
  );
};

export default ElectorateDistrictPage;
