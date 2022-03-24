import { Block, BodyNormal, Button, Title } from "../../components";
import React, { useEffect, useState } from "react";

import styles from "./AgainSignUp.module.scss";
import { usePopup } from "../../lib/popup.hook";
import { useReg } from "../../lib/reg.hook";

type AgainSignUpProps = {
  againUpHandler: (again: boolean) => void;
  email: string;
  referral?: string;
};

const AgainSignUp: React.FC<AgainSignUpProps> = ({
  email,
  againUpHandler,
  referral,
}) => {
  const { loading, request, error, success } = useReg();
  const { createSnack } = usePopup();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmitAgain = async (e) => {
    e.preventDefault();
    setLoaded(true);
    const body = { email };
    if (referral) {
      body["promo"] = referral;
    }
    try {
      const res = await request(
        `${process.env.API_URL}/api/v1/rest-auth/registration/`,
        "POST",
        body
      );
    } catch (e) {
      console.log(e);
    }
  };
  const changeEmailHandler = () => {
    againUpHandler(false);
  };

  useEffect(() => {
    if (loaded) {
      setDisabled(loaded);
    }
    const timer = setTimeout(() => setDisabled(false), 5000);
    return () => clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    if (error) {
      setLoaded(false);
      if (error?.email) {
        if (
          error?.email?.[0] ===
          "Пользователь с таким e-mail адресом уже зарегистрирован."
        ) {
          createSnack("Данный пользователь уже зарегистрирован", "success");
        } else {
          createSnack(error?.email?.[0], "warning");
        }
      }
    }
    if (success) {
      setLoaded(false);
    }
  }, [error, success]);

  return (
    <Block>
      <div className={styles.SubmitAgain}>
        <div className={styles.TextLabel}>
          <Title>Проверьте почту</Title>
        </div>
        <div className={styles.SubmitAgain__path1}>
          <BodyNormal>
            На адрес {email} отправлено письмо. Кликните на ссылку в письме для
            начала работы с системой
          </BodyNormal>
        </div>
        <div className={styles.SubmitAgain__path2}>
          <BodyNormal>
            Если письмо не пришло, проверьте папку спам, запросите новое письмо
            или измените почту
          </BodyNormal>
        </div>
        <div className={styles.SubmitAgain__buttons}>
          <Button
            color={"dark"}
            onClick={changeEmailHandler}
            className={styles.Btn_options}
          >
            Изменить адрес почты
          </Button>
          <Button
            color={"dark"}
            className={styles.Btn_options}
            loader={loaded}
            disabled={disabled}
            onClick={onSubmitAgain}
          >
            Отправить новое письмо
          </Button>
        </div>
      </div>
    </Block>
  );
};

export default AgainSignUp;
