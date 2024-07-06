import { createBrowserRouter } from "react-router-dom";

import Election from "../pages/Election";
import ElectionParty from "../pages/ElectionParty";
import Elections from "../pages/Elections";
import Electorate from "../pages/Electorate";
import ElectorateDistrict from "../pages/ElectorateDistrict";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Voter from "../pages/Voter";

import Guest from "../components/hoc/Guest";
import Protected from "../components/hoc/Protected";
import Nodes from "../pages/Nodes";

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <NotFound />
      </Protected>
    ),
  },
  {
    path: "/log-in",
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: "/elections",
    element: (
      <Protected>
        <Elections />
      </Protected>
    ),
  },
  {
    path: "/elections/:id",
    element: (
      <Protected>
        <Election />
      </Protected>
    ),
  },
  {
    path: "/election-parties",
    element: (
      <Protected>
        <ElectionParty />
      </Protected>
    ),
  },
  {
    path: "/nodes",
    element: (
      <Protected>
        <Nodes />
      </Protected>
    ),
  },
  {
    path: "/electorate-districts",
    element: (
      <Protected>
        <ElectorateDistrict />
      </Protected>
    ),
  },
  {
    path: "/electorates",
    element: (
      <Protected>
        <Electorate />
      </Protected>
    ),
  },
  {
    path: "/voters",
    element: (
      <Protected>
        <Voter />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
