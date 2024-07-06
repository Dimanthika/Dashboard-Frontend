import { isAxiosError } from "axios";
import Election from "../models/election";
import Node from "../models/node";
import axios from "./axiosInstance";

export const findAll = async () => {
  try {
    const response = await axios.get("node");

    return response.data.nodes;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const electionNodes = async (election: number) => {
  try {
    const response = await axios.get("election-node/" + election);

    return response.data.nodes;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const createElection = async (election: number, node: number) => {
  try {
    const response = await axios.post("election-node/", {
      election: election,
      node: node,
    });

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const deleteCluster = async (id: number) => {
  try {
    const response = await axios.delete("election-node/" + id);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const deleteNode = async (
  election: number,
  parent: string,
  node: string
) => {
  try {
    const response = await axios.post("disconnect-nodes", {
      election: election,
      parent: parent,
      node: node,
    });

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const create = async (node: Node) => {
  try {
    const response = await axios.post("node", node);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const update = async (node: Node) => {
  try {
    const response = await axios.put("node", node);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const suspend = async (id: number) => {
  try {
    const response = await axios.delete("node/" + id);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const recover = async (id: number) => {
  try {
    const response = await axios.patch("node/" + id);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const initialize = async (node: string) => {
  try {
    const response = await axios.post("initialize-node", {
      url: node,
    });

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const connectNodes = async (
  election: number,
  parent: string,
  node: string
) => {
  try {
    const response = await axios.post("connect-nodes", {
      election: election,
      parent: parent,
      node: node,
    });

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const syncNode = async (election: Election, node: string) => {
  try {
    const response = await axios.post("sync-election", {
      url: node,
      id: election.id,
      description: election.description,
    });

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const mineNode = async (election: Election, node: string) => {
  try {
    const response = await axios.post("mine", {
      url: node,
      election: election.id,
    });

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const resolveConflicts = async (election: Election, node: string) => {
  try {
    const response = await axios.post("resolve-conflicts", {
      url: node,
      election: election.id,
    });

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};
