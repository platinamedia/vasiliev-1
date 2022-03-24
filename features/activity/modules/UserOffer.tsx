import { BodyNormal, Button, Headline, Title } from "../../../components";
import { useEffect, useState } from "react";

import classNames from "classnames";
import styles from "./UserOffer.module.scss";

type UserOfferProps = {
  viewCloseOffer: () => void;
};

const UserOffer: React.FC<UserOfferProps> = ({ viewCloseOffer }) => {
  const [styleView, setStaleView] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("viewOfferInTask")) {
      setStaleView(false);
    }
    if (!styleView) {
      viewCloseOffer();
    }
  }, [styleView]);

  const handleViewOffer = () => {
    setStaleView(false);
    localStorage.setItem("viewOfferInTask", JSON.stringify(styleView));
  };

  const isStyleView = (viewBox) => {
    return viewBox ? "" : styles.UserOffer__none;
  };
  return (
    <>
      <div className={classNames(isStyleView(styleView))}>
        {styleView && (
          <div className={styles.UserOffer}>
            <div className={styles.Box}>
              <div className={styles.Box__options}>
                <BodyNormal className={styles.Text_pink}>
                  Бонус за выполнение заданий
                </BodyNormal>
              </div>
              <div className={styles.Box__head}>
                <div>
                  <Headline>20</Headline>
                </div>
                <div className={styles.Box__text}>
                  <Title>Подписчиков на твой Instagram</Title>
                </div>
              </div>
              <div className={styles.Box__button}>
                <Button
                  color={"white"}
                  className={styles.Btn_options}
                  onClick={handleViewOffer}
                >
                  Ок, супер!
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserOffer;
