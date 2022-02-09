import { BodyNormal, CheckBox, PinkButtonLarge } from "../..";
import React, { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import classnames from "classnames";
import styles from "./ModalInstagram.module.scss";

interface ModalInstagramProps {
  isOpen: boolean;
  openContent: any;
  className?: string;
  onOpen: () => void;
  onClose: () => void;
  onExit: (username: string) => void;
}

const ModalInstagram: React.FC<ModalInstagramProps> = ({
  openContent,
  onOpen,
  onExit,
  isOpen,
  onClose,
  className,
}) => {
  const [username, setUsername] = useState<string>("");
  const [condition1, setCondition1] = useState<boolean>(false);
  const [condition2, setCondition2] = useState<boolean>(false);
  const [condition3, setCondition3] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCondition1(false);
      setCondition2(false);
      setCondition3(false);
    }
  }, [isOpen]);

  function handleSavingUsername() {
    if (!username) {
      return;
    }

    onExit(username);
  }

  const handleStateConditionOne = (e) => {
    setCondition1(e);
  };

  const handleStateConditionTwo = (e) => {
    setCondition2(e);
  };

  const handleStateConditionThree = (e) => {
    setCondition3(e);
  };

  return (
    <>
      <div onClick={onOpen}>{openContent}</div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isOpen}
        // onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <div className={classnames(styles.InstagramModal, className)}>
          <div className={styles.InstagramModal__heading}>
            <div onClick={onClose} className={styles.InstagramModal__closeIcon}>
              <Image
                src="/images/svg/close.svg"
                alt="Close"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className={styles.InstagramModal__content}>
            <div>
              <div className={styles.InstagramModal__text}>
                Добавляй именно свой{" "}
                <strong className={styles.InstagramModal__boldText}>
                  личный аккаунт
                </strong>{" "}
                в Instagram (не бизнес)
              </div>
            </div>
            <div className={styles.InstagramModal__form}>
              <label htmlFor="username-input">Ник Instagram аккаунта</label>
              <input
                type="text"
                placeholder="@Логин"
                className={styles.InstagramModal__usernameInput}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.CheckBox}>
              <div className={styles.CheckBox__item}>
                <CheckBox
                  className={styles.CheckBox__label}
                  checkState={condition1}
                  idBox={"condition1"}
                  nameBox={"condition1"}
                  handleCheckBox={(e) => handleStateConditionOne(e)}
                  children={
                    <BodyNormal className={styles.CheckBox__text}>
                      Аккаунт зарегистрирован более 3-х месяцев назад (на
                      аккаунт, которому менее 3-х месяцев, НЕ РЕКОМЕНДУЕМ
                      активный трафик)
                    </BodyNormal>
                  }
                />
              </div>
              <div className={styles.CheckBox__item}>
                <CheckBox
                  className={styles.CheckBox__label}
                  checkState={condition2}
                  idBox={"condition2"}
                  nameBox={"condition2"}
                  handleCheckBox={(e) => handleStateConditionTwo(e)}
                  children={
                    <BodyNormal className={styles.CheckBox__text}>
                      Аккаунт открыт (закрытые аккаунты не получают подписки и
                      активность)
                    </BodyNormal>
                  }
                />
              </div>
              <div className={styles.CheckBox__item}>
                <CheckBox
                  className={styles.CheckBox__label}
                  checkState={condition3}
                  idBox={"condition3"}
                  nameBox={"condition3"}
                  handleCheckBox={(e) => handleStateConditionThree(e)}
                  children={
                    <BodyNormal className={styles.CheckBox__text}>
                      Не использую сервисы по накрутке ботов, которые негативно
                      влияют на аккаунт (при использовании чётко осознаю, что
                      вся ответственность на мне)
                    </BodyNormal>
                  }
                />
              </div>
            </div>
            <PinkButtonLarge
              onClick={handleSavingUsername}
              flyImg={false}
              className={styles.InstagramModal__button}
              disabled={
                !condition1 ||
                !condition2 ||
                !condition3 ||
                username === "" ||
                username.length < 2
              }
            >
              Привязать аккаунт
            </PinkButtonLarge>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalInstagram;
