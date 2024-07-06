import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Election from "../../models/election";
import {
  calculateResults,
  electionDistrictSummary,
  electionPollSummary,
  electionSummary,
} from "../../services/election";
import ElectoralSummaryPie from "../Results/ElectoralSummaryPie";
import SummaryPie from "../Results/SummaryPie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Candidates: React.FC<{
  election: Election;
  id: number;
}> = (props) => {
  const [calculating, setCalculating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pollLoading, setPollLoading] = useState<boolean>(false);
  const [districtLoading, setDistrictLoading] = useState<boolean>(false);
  const [electionData, setElectionData] = useState<any[]>([]);
  const [pollSummary, setPollSummary] = useState<any[]>([]);
  const [districtSummary, setDistrictSummary] = useState<any[]>([]);

  const calculate = async () => {
    try {
      setCalculating(true);
      const response = await calculateResults(props.election);
      loadSummary();
      toast.success(response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCalculating(false);
    }
  };

  const loadSummary = async () => {
    try {
      setLoading(true);
      const response = await electionSummary(props.election);
      setElectionData(response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPollingSummary = async () => {
    try {
      setPollLoading(true);
      const response = await electionPollSummary(props.election);
      setPollSummary(response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPollLoading(false);
    }
  };

  const loadDistrictSummary = async () => {
    try {
      setDistrictLoading(true);
      const response = await electionDistrictSummary(props.election);
      setDistrictSummary(response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDistrictLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
    loadPollingSummary();
    loadDistrictSummary();
  }, [props.election]);

  return (
    <TabsContent value="Results" className="mt-4">
      <div className="rounded-lg lg:p-4">
        <Tabs defaultValue="active">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2 mb-4">
              <p
                className="bg-green-100 text-green-700 font-semibold hover:bg-green-200 rounded-md px-4 py-2 shadow-sm border border-green-300 cursor-pointer flex items-center"
                onClick={calculate}
              >
                {calculating && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Calculate Results
              </p>
            </div>
          </div>
          {loading ? (
            <p className="text-2xl font-bold tracking-tight my-4 text-center">
              Loading...
            </p>
          ) : (
            <SummaryPie data={electionData} />
          )}

          <Tabs defaultValue="District" className="mt-6">
            <div className="flex items-center justify-center">
              <TabsList className="flex items-center h-11 px-2 bg-slate-200 shadow-md">
                <TabsTrigger
                  value="District"
                  className="text-base text-primary"
                >
                  Electoral District
                </TabsTrigger>
                <TabsTrigger value="Polling" className="text-base text-primary">
                  Polling Division
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="District" className="my-4">
              <h2 className="text-4xl font-bold text-center my-8">
                Electoral District Results
              </h2>
              <div>
                {districtLoading ? (
                  <p className="text-2xl font-bold tracking-tight my-4 text-center m-auto">
                    Loading...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {districtSummary.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 shadow-sm mx-2 rounded-md w-full border"
                      >
                        <h4 className="font-bold text-center text-2xl my-4">
                          {item.name}
                        </h4>
                        <ElectoralSummaryPie data={item.results} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="Polling" className="my-4">
              <h2 className="text-4xl font-bold text-center my-8">
                Polling Division Results
              </h2>
              <div>
                {pollLoading ? (
                  <p className="text-2xl font-bold tracking-tight my-4 text-center m-auto">
                    Loading...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {pollSummary.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 shadow-sm mx-2 rounded-md w-full border"
                      >
                        <h4 className="font-bold text-center text-2xl my-4">
                          {item.name}
                        </h4>
                        <ElectoralSummaryPie data={item.results} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Tabs>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </TabsContent>
  );
};

export default Candidates;
