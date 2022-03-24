import Community from "./Community/Community";
import { useUserContext } from "../../context/userContext";

const Clients: React.FC = () => {
  const { userState } = useUserContext();

  return <>{userState?.profile?.confirm && <Community />}</>;
};
export default Clients;
