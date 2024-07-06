export const enum Status {
  all,
  active,
  inactive,
}

export const enum Gender {
  Male,
  Female,
}

export const statusMap = {
  [Status.all]: "all",
  [Status.active]: "active",
  [Status.inactive]: "inactive",
};

export const genderMap = {
  [Gender.Male]: "Male",
  [Gender.Female]: "Female",
};
