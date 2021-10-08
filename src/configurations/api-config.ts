import { environment } from "../environments/environment";

export const APIConfig = {
  listUsers: {
    url: (pageIndex) => `${environment.api}api/users?page=${pageIndex}`
  },
  userDetails: {
    url: (userId) => `${environment.api}api/users/${userId}`
  },
  createNewUser: {
    url: `${environment.api}api/users`
  },
  login:{
    url: `${environment.api}api/login`
  }
};

