import WindowWithdrawalOfMoney from "./WindowWithdrawalOfMoney";
import WindowWithdrawalUsers from "./WindowWithdrawalUsers";

type ViewWindowActionProps = {
  openStateWindow?: string;
};

const ViewWindowAction: React.FC<ViewWindowActionProps> = ({
  openStateWindow,
}) => {
  return (
    <>
      {openStateWindow === "a" && <WindowWithdrawalOfMoney />}
      {openStateWindow === "b" && <WindowWithdrawalUsers />}
    </>
  );
};

export default ViewWindowAction;
