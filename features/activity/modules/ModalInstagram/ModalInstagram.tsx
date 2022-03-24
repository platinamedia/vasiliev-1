import {
  BodyNormal,
  Button,
  CheckBox,
  InfoMiniIcon,
  Input,
  ModalUniversal,
  Subheader,
} from "../../../../components";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
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
  onExit,
  isOpen,
  onClose,
  className,
}) => {
  const [username, setUsername] = useState<string>("");
  const [condition1, setCondition1] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) setCondition1(false);
  }, [isOpen]);

  function handleSavingUsername() {
    if (!username) return;

    onExit(username);
  }

  const handleStateConditionOne = (e) => setCondition1(e);

  return (
    <>
      <ModalUniversal
        onOpen={isOpen}
        className={styles.InstagramModal__position}
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
              <Subheader className={styles.Text_dark}>
                Привязать личный Instagram
              </Subheader>
            </div>
            <div className={styles.InstagramModal__notice}>
              <div className={styles.InstagramModal__notice_img}>
                <InfoMiniIcon />
              </div>
              <div>
                <BodyNormal>
                  Добавляй именно свой личный аккаунт в Instagram (не бизнес)
                </BodyNormal>
              </div>
            </div>
            <div className={styles.InstagramModal__input}>
              <Input
                styleInput="white"
                autoComplete="off"
                maxLength={100}
                type="text"
                name="surname"
                defaultValue={""}
                className={styles.Input_options}
                placeholder="@Логин"
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
                      Подтверждаю, что ознакомлен с &nbsp;
                      <Link href="https://teletype.in/@prclub/account">
                        <a target="_blank" className={styles.Codition__account}>
                          требованием к аккаунту
                        </a>
                      </Link>
                    </BodyNormal>
                  }
                />
              </div>
            </div>
            <Button
              color={"pink"}
              onClick={handleSavingUsername}
              className={styles.InstagramModal__button}
              disabled={!condition1 || username === "" || username.length < 2}
            >
              Привязать аккаунт
            </Button>
          </div>
        </div>
      </ModalUniversal>
    </>
  );
};

export default ModalInstagram;
