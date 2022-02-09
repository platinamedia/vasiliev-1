import { BackDrop, BodyNormal, Input, PinkButtonLarge, Title } from "../..";
import React, { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import styles from "./ModalWindowMessage.module.scss";
import { useAuth } from "../../../lib/auth.hook";
import { userData } from "../../../api/userData";

const ModalWindowMessage = ({ openContent }: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, { mutate }] = userData();
  const { token } = useAuth();
  const [addName, setAddName] = useState(null);
  const [addSurname, setAddSurname] = useState(null);
  const [postDataName, setPostDataName] = useState(null);
  const [stateBackDrop, setStateBackDrop] = useState(false);

  useEffect(() => {
    if (!user) return null;
    setAddName(user?.profile?.name || "");
    setAddSurname(user?.profile?.surname || "");
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    setStateBackDrop(true);
    if (addName && addSurname && user) {
      const getData = user;
      getData.profile.name = addName;
      getData.profile.surname = addSurname;
      setPostDataName(getData);
      mutate(getData);
    }
  };

  useEffect(() => {
    if (postDataName) {
      setStateBackDrop(true);
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + token,
        },
        body: JSON.stringify(postDataName),
      };
      const postNewData = async () => {
        const res = await fetch(
          `${process.env.API_URL}/api/v1/rest-auth/user/`,
          requestOptions
        );
        if (res.status === 200) {
          setStateBackDrop(false);
        }
      };
      postNewData();
    }
  }, [postDataName]);

  return (
    <>
      <div onClick={handleOpen}>{openContent}</div>
      <BackDrop openState={stateBackDrop} />
      <Modal open={open} onClose={handleClose}>
        <div className={styles.ModalWindowMessage__box}>
          <div className={styles.ModalWindowMessage__position_x}>
            <div
              onClick={handleClose}
              className={styles.ModalWindowMessage__close}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.32191 14.1276C-0.106452 14.556 -0.106386 15.2504 0.322042 15.6788C0.75047 16.1071 1.44502 16.1071 
                  1.87337 15.6787L8.00014 9.55129L14.1274 15.6781C14.5558 16.1064 15.2504 16.1064 15.6787 15.6781C16.1071 
                  15.2498 16.1071 14.5552 15.6787 14.1269L9.55135 7.99998L15.6783 1.87242C16.1065 1.44402 16.1065 0.749525 
                  15.6781 0.321206C15.2497 -0.107123 14.5551 -0.107058 14.1268 0.321338L7.99992 6.44878L1.87262 0.321864C1.44424 
                  -0.106487 0.74968 -0.106487 0.321296 0.321864C-0.107099 0.750227 -0.107099 1.44472 0.321296 1.87309L6.44882 8.00009L0.32191 14.1276Z"
                  fill="#8B97AE"
                />
              </svg>
            </div>
          </div>
          <div className={styles.Message}>
            <form onSubmit={onSubmit}>
              <div className={styles.Message__head}>
                <Title className={styles.Message__text}>Заполни поля</Title>
              </div>
              <div className={styles.Message__about}>
                <BodyNormal className={styles.Message__text}>
                  Нам надо знать твои Имя и Фамилию, чтобы отправить чек об
                  оплате
                </BodyNormal>
              </div>
              <div className={styles.Message__input}>
                <div className={styles.Message__input_label}>
                  <BodyNormal className={styles.Message__text}>Имя</BodyNormal>
                </div>
                <Input
                  maxLength={30}
                  type="text"
                  defaultValue={addName}
                  className={styles.Message__input_config}
                  placeholder=""
                  onChange={(e) => setAddName(e.target.value)}
                />
              </div>
              <div className={styles.Message__input}>
                <div className={styles.Message__input_label}>
                  <BodyNormal className={styles.Message__text}>
                    Фамилия
                  </BodyNormal>
                </div>
                <Input
                  maxLength={30}
                  type="text"
                  defaultValue={addSurname}
                  className={styles.Message__input_config}
                  placeholder=""
                  onChange={(e) => setAddSurname(e.target.value)}
                />
              </div>
              <div className={styles.Message__submit}>
                <PinkButtonLarge
                  className={styles.Message__submit_config}
                  flyImg={false}
                  type="submit"
                  disabled={!addSurname || !addName}
                >
                  Перейти к оплате
                </PinkButtonLarge>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalWindowMessage;
