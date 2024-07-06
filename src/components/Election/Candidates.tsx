import React from "react";
import Candidate from "../../models/candidate";
import ElectionParty from "../../models/election-party";
import { Status } from "../../models/enum";
import Create from "../Candidate/Create";
import List from "../Candidate/List";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Candidates: React.FC<{
  refreshItems: () => void;
  electionParties: ElectionParty[];
  candidates: Candidate[];
  loading: boolean;
  id: number;
}> = (props) => {
  return (
    <TabsContent value="Candidates" className="mt-4">
      <div className="rounded-lg border border-dashed shadow-sm p-2 lg:p-4">
        <Tabs defaultValue="active">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Archived</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Create
                refreshItems={props.refreshItems}
                electionParties={props.electionParties}
                election={props.id}
              />
            </div>
          </div>
          <List
            election={props.id}
            electionParties={props.electionParties}
            items={props.candidates}
            status={Status.all}
            refreshItems={props.refreshItems}
            loading={props.loading}
          />
          <List
            election={props.id}
            electionParties={props.electionParties}
            items={props.candidates}
            status={Status.active}
            refreshItems={props.refreshItems}
            loading={props.loading}
          />
          <List
            election={props.id}
            electionParties={props.electionParties}
            items={props.candidates}
            status={Status.inactive}
            refreshItems={props.refreshItems}
            loading={props.loading}
          />
        </Tabs>
      </div>
    </TabsContent>
  );
};

export default Candidates;
