import { User as AuthUser } from "next-auth";

interface UserProfile extends AuthUser {
  avatarUrl: string | null;
}

export default UserProfile;
