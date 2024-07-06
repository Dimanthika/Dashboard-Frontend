import { isAxiosError } from "axios";
import Election from "../models/election";
import axios from "../services/axiosInstance";

export const findAll = async () => {
  try {
    const response = await axios.get("election");

    return response.data.elections;
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

export const findOne = async (id: string) => {
  try {
    const response = await axios.get("election/" + id);

    return response.data.elections[0];
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

export const create = async (election: Election) => {
  try {
    const response = await axios.post("election", election);

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

export const update = async (election: Election) => {
  try {
    const response = await axios.put("election", election);

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
    const response = await axios.delete("election/" + id);

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
    const response = await axios.patch("election/" + id);

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

export const calculateResults = async (election: Election) => {
  try {
    const response = await axios.get("calculateResults/" + election.id);

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

export const electionSummary = async (election: Election) => {
  try {
    const response = await axios.get("resultsSummary/" + election.id);

    return response.data.candidateResults;
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

export const electionPollSummary = async (election: Election) => {
  try {
    const response = await axios.get("resultsElectorate/" + election.id);

    return response.data.electorateResults;
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

export const electionDistrictSummary = async (election: Election) => {
  try {
    const response = await axios.get("resultsElectDist/" + election.id);

    return response.data.electDistResults;
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
