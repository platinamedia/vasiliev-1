import {
  ChoiceWindow,
  HistoryPayments,
  ViewWindowAction,
  WithdrawalMoney,
} from "./modules";
import { useEffect, useState } from "react";

import styles from "./Payments.module.scss";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/userContext";

const Payments: React.FC = () => {
  const { userState } = useUserContext();
  const router = useRouter();
  const [many, setMany] = useState<string>("");
  const [valuts, setValuts] = useState<number>(1);
  const [openStateWindow, setOpenStateWindow] = useState<string>("a");
  const handleChangeWindow = (event) => setOpenStateWindow(event);


  useEffect(() => {
    if (router.query) {
      const getPay = async () => {
        const query = router.query;
        if (query?.open_payments) {
          router.replace("/partners", undefined, { shallow: true });
        }
      };
      getPay();
    }
  }, [router]);

  useEffect(() => {
    if (!userState) return null;

    setMany(userState?.profile?.balance);
  }, [userState]);

  return (
    <div className={styles.Payments}>
      <WithdrawalMoney many={many} valuts={valuts} />
      <ChoiceWindow handleChangeWindow={handleChangeWindow} />
      <ViewWindowAction openStateWindow={openStateWindow} />
      <HistoryPayments />
    </div>
  );
};

export default Payments;
