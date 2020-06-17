import {
  USER_PASS_API,
  AUTH_TOKEN,
  USER_LIKE_API,
  USER_LOCATION_API,
} from "../../../common/contants.ts";
import { FormatString } from "../../../common/strings.ts";

interface IUserService {
  hateUserAction: (userId: string) => Promise<boolean>;
  loveUserAction: (userId: string) => Promise<boolean>;
  changeLocationAction: (
    data: { lat: number; lon: number },
  ) => Promise<boolean>;
}

class UserService implements IUserService {
  defaultHeader: any = null;
  constructor() {
    this.defaultHeader = {
      "Content-Type": "application/json",
      "X-Auth-Token": AUTH_TOKEN,
    };
  }
  hateUserAction = async (userId: string): Promise<boolean> => {
    console.log(
      `Implementing hate action to user with id :${userId}`,
    );
    try {
      const res = await fetch(FormatString(USER_PASS_API, userId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": AUTH_TOKEN,
        },
      });

      if (res.status < 200 || res.status >= 300) {
        console.log(`Can't implement hating user with id: ${userId}`);
        return false;
      }
    } catch (error) {
      console.log(`Can't handle hate action: ${error} with id: ${userId}`);
      return false;
    }

    return true;
  };

  loveUserAction = async (userId: string): Promise<boolean> => {
    console.log(
      `Implementing love action to user with id :${userId}`,
    );

    try {
      const res = await fetch(FormatString(USER_LIKE_API, userId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": AUTH_TOKEN,
        },
      });

      if (res.status < 200 || res.status >= 300) {
        console.log(`Can't implement liking user with id: ${userId}`);
        return false;
      }
    } catch (error) {
      console.log(`Can't handle like action: ${error} with id: ${userId}`);
      return false;
    }

    return true;
  };

  changeLocationAction = async (
    data: { lat: number; lon: number },
  ): Promise<boolean> => {
    console.log(`Implementing change user location: ${JSON.stringify(data)}`);

    try {
      const res = await fetch(USER_LOCATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": AUTH_TOKEN,
        },
        body: JSON.stringify(data),
      });

      if (res.status < 200 || res.status >= 300) {
        console.log(
          `Can't hanle changing user location to ${JSON.stringify(data)}`,
        );

        return false;
      }
    } catch (error) {
      console.log(`Can't change location to ${JSON.stringify(data)}`);
      return false;
    }
    return true;
  };
}

export { IUserService, UserService };
