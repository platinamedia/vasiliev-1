import {
  BackDrop,
  BodyBold,
  BodyNormal,
  GreenButtonMedium,
  Input,
  NoIcon,
  WhiteButtonMedium,
  YesIcon,
} from "../..";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Modal from "@mui/material/Modal";
import { Title } from "../..";
import styles from "./ModalApply.module.scss";
import { userData } from "../../../api/userData";

const ModalApply = ({ apply, stateWindow = false }: any) => {
  const [user] = userData();
  const [open, setOpen] = useState(stateWindow);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [typeTariff, setTypeTariff] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [newInstagram, setNewInstagram] = useState(null);
  const [stateBackDrop, setStateBackDrop] = useState(false);

  useEffect(() => {
    if (!user) {
      setInstagram(false);
      setTypeTariff(false);
      setStateBackDrop(true);
      return null;
    }
    if (user?.profile?.insta_link === null) {
      setNewInstagram(true);
    }

    setStateBackDrop(false);
    setInstagram(user?.profile?.insta_link);
    setTypeTariff(user?.profile?.user_tariff?.tariff_type);
  }, [user]);

  return (
    <div>
      <BackDrop openState={stateBackDrop} />
      <div onClick={handleOpen}></div>
      {!stateBackDrop && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.Modal}>
            {apply === true ? (
              <div id="success" className={styles["Modal-success"]}>
                <div>
                  <div className={styles.Modal__content}>
                    <div className={styles.Modal__content_img}>
                      <YesIcon />
                    </div>
                    <div className={styles.Modal__content_title}>
                      <Title>Тариф {typeTariff} оплачен!</Title>
                    </div>
                    {instagram ? (
                      <>
                        <div className={styles.Apply__Instagram}>
                          <div className={styles.Apply__Instagram_link}>
                            <BodyNormal>Твой Instagram </BodyNormal>
                            <BodyBold>{user?.profile?.insta_link}</BodyBold>
                          </div>
                          <div className={styles.Apply__Instagram_close}>
                            <GreenButtonMedium
                              flyImg={false}
                              className={styles.Button__close}
                              onClick={handleClose}
                            >
                              Закрыть
                            </GreenButtonMedium>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {newInstagram ? (
                      <>
                        <div className={styles.Modal__content_text}></div>
                        <div className={styles.Input}></div>
                        <div className={styles.Button}>
                          <Link href={"/instagram-activity"}>
                            <a className={styles.Button__close}>
                              <WhiteButtonMedium
                                flyImg={false}
                                className={styles.Button__close}
                              >
                                Хорошо
                              </WhiteButtonMedium>
                            </a>
                          </Link>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div id="error" className={styles["Modal-error"]}>
                <div>
                  <div className={styles.Modal__content}>
                    <div className={styles.Modal__container}>
                      <div className={styles.Modal__content_img}>
                        <NoIcon />
                      </div>
                      <div className={styles.Modal__content_title}>
                        <Title>Эх! Ошибка!</Title>
                      </div>
                      <div className={styles.Apply__Instagram}>
                        <div className={styles.Modal__content_text}>
                          <BodyNormal>Повторите снова</BodyNormal>
                        </div>
                        <div className={styles.Button}>
                          <WhiteButtonMedium
                            flyImg={false}
                            onClick={handleClose}
                            className={styles.Button__close}
                          >
                            Закрыть
                          </WhiteButtonMedium>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ModalApply;
