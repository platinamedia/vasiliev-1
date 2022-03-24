import {
  BodyBold,
  BodyNormal,
  Button,
  Title,
  YesIcon,
} from "../../../../components";
import { useEffect, useState } from "react";

import Router from "next/router";
import styles from "./ApplyPaymets.module.scss";
import { useUserContext } from "../../../../context/userContext";

type ApplyPaymetsProps = {
  onClose: () => void;
};

const ApplyPaymets: React.FC<ApplyPaymetsProps> = ({ onClose }) => {
  const { userState } = useUserContext();
  const [typeTariff, setTypeTariff] = useState(null);

  useEffect(() => {
    if (!userState) {
      setTypeTariff(false);
      return null;
    }

    setTypeTariff(userState?.profile?.user_tariff?.tariff_type);
  }, [userState]);

  return (
    <>
      {userState?.profile?.insta_link && (
        <>
          <div className={styles.ApplyPaymets}>
            <div className={styles.ApplyPaymets__icon}>
              <YesIcon />
            </div>
            <div className={styles.ApplyPaymets__header}>
              <Title>Тариф {typeTariff} оплачен!</Title>
            </div>
            <div className={styles.ApplyPaymets__link}>
              <BodyNormal>Твой Instagram </BodyNormal>
              <BodyBold>{userState?.profile?.insta_link}</BodyBold>
            </div>
            <div className={styles.ApplyPaymets__button}>
              <Button
                border={true}
                color={"green"}
                onClick={onClose}
                className={styles.Button_options}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </>
      )}
      {!userState?.profile?.insta_link && (
        <>
          <div className={styles.ApplyPaymets}>
            <div className={styles.ApplyPaymets__icon}>
              <YesIcon />
            </div>
            <div className={styles.ApplyPaymets__header}>
              <Title>Тариф {typeTariff} оплачен!</Title>
            </div>
            <div className={styles.ApplyPaymets__button}>
              <Button
                color={"white"}
                onClick={() => Router.push("/instagram-activity")}
                className={styles.Button_options}
              >
                Хорошо
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ApplyPaymets;
