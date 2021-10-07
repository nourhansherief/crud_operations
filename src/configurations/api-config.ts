import { environment } from "../environments/environment";

export const APIConfig = {
  listUsers: {
      url: (pageIndex) =>`${environment.api}api/users?page=${pageIndex}`
  }
};

