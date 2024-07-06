import { isAxiosError } from "axios";
import Candidate from "../models/candidate";
import axios from "./axiosInstance";

export const findAll = async (election: string) => {
  try {
    const response = await axios.get("election-candidate/" + election);

    return response.data.candidates;
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

export const findAllActive = async () => {
  try {
    const response = await axios.get("active-candidate");
    return response.data.electorates;
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

export const create = async (candidate: Candidate) => {
  try {
    const response = await axios.post("candidate", candidate);

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

export const update = async (candidate: Candidate) => {
  try {
    const response = await axios.put("candidate", candidate);

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
    const response = await axios.delete("candidate/" + id);

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
    const response = await axios.patch("candidate/" + id);

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
