import { User as AuthUser } from "next-auth";

interface UserProfile extends AuthUser {
  avatarUrl: string | null;
}

export type AuthorField = {
  id: number;
  name: string;
};

export default UserProfile;
