import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Candidates from "../components/Election/Candidates";
import Clusters from "../components/Election/Clusters";
import Edit from "../components/Election/Edit";
import RecoverConfirm from "../components/Election/RecoverConfirm";
import Results from "../components/Election/Results";
import SuspendConfirm from "../components/Election/SuspendConfirm";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import DashboardLayout from "../layouts/Dashboard";
import Candidate from "../models/candidate";
import Election from "../models/election";
import ElectionParty from "../models/election-party";
import { findAll } from "../services/candidate";
import { findOne as findElection } from "../services/election";
import { findAll as findElectionParties } from "../services/election-party";

const ElectionPage: React.FC = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [election, setElection] = useState<Election>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [electionParties, setElectionParties] = useState<ElectionParty[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchElection = async () => {
    try {
      const find = id ? await findElection(id) : "";
      setElection(find);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchElectionParties = async () => {
    try {
      const find = await findElectionParties();
      setElectionParties(find);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const items = id ? await findAll(id) : [];
      setCandidates(items);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchElection();
      fetchItems();
      fetchElectionParties();
    } else {
      navigate("/elections");
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <div className="flex items-center grow">
          <Link className="text-lg font-semibold md:text-2xl" to="/elections">
            <HomeIcon className="mx-2 h-5 w-5" />
          </Link>
          <ChevronRightIcon className="mx-2 h-5 w-5" />
          <p className="text-lg font-semibold md:text-2xl">
            {election ? election.description : ""}
          </p>
          <ChevronRightIcon className="mx-2 h-5 w-5" />
          <h1 className="text-lg font-semibold md:text-2xl">Manage Election</h1>
        </div>
        <div className="ml-auto flex-none items-center gap-2 mx-4">
          {election ? (
            <Edit election={election} refreshItems={fetchElection} />
          ) : (
            ""
          )}
        </div>
        <div className="ml-auto flex-none items-center gap-2">
          {election ? (
            election.isActive ? (
              <SuspendConfirm
                election={election}
                refreshItems={fetchElection}
              />
            ) : (
              <RecoverConfirm
                election={election}
                refreshItems={fetchElection}
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <Tabs defaultValue="Candidates">
        <div className="flex items-center justify-center">
          <TabsList className="flex items-center h-11 px-2 bg-slate-200 shadow-md">
            <TabsTrigger value="Candidates" className="text-base text-primary">
              Candidates
            </TabsTrigger>
            <TabsTrigger value="Clusters" className="text-base text-primary">
              Clusters
            </TabsTrigger>
            <TabsTrigger
              value="Results"
              className="text-base text text-primary"
            >
              Results
            </TabsTrigger>
          </TabsList>
        </div>
        <Candidates
          id={id ? parseInt(id) : 0}
          refreshItems={fetchItems}
          electionParties={electionParties}
          candidates={candidates}
          loading={loading}
        />
        {election && (
          <Clusters id={id ? parseInt(id) : 0} election={election} />
        )}
        {election && <Results id={id ? parseInt(id) : 0} election={election} />}
      </Tabs>

      <Toaster position="bottom-center" reverseOrder={false} />
    </DashboardLayout>
  );
};

export default ElectionPage;
