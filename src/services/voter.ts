import { isAxiosError } from "axios";
import Voter from "../models/voter";
import axios from "./axiosInstance";

export const findAll = async () => {
  try {
    const response = await axios.get("voters");
    return response.data.voters;
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

export const create = async (voter: Voter) => {
  try {
    const response = await axios.post("voter", {
      nic: voter.nic,
      name: voter.name,
      gender: voter.gender,
      dateOfBirth: voter.dateOfBirth,
      email: voter.email,
      electorate: voter.electorate,
      password: voter.password,
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

export const update = async (voter: Voter) => {
  try {
    const response = await axios.put("voter", voter);

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
    const response = await axios.delete("voter/" + id);

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
    const response = await axios.patch("voter/" + id);

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
