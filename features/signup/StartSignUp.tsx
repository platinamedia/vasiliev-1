import { Block, BodyNormal, Button, Input, Title } from "../../components";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import styles from "./StartSignUp.module.scss";
import { usePopup } from "../../lib/popup.hook";
import { useReg } from "../../lib/reg.hook";

type StartSignUpProps = {
  signUpHandler: (email: string) => void;
  referral?: string;
};

const StartSignUp: React.FC<StartSignUpProps> = ({
  signUpHandler,
  referral,
}) => {
  const { createSnack } = usePopup();
  const { loading, request, error, success } = useReg();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setDisabled(loaded);
  }, [loaded]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    const body = { email };

    if (referral) {
      body["promo"] = referral;
    }

    if (body?.email === "") {
      setLoaded(false);
      createSnack("Введите e-mail.", "warning");
      return null;
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

  useEffect(() => {
    if (error) {
      if (error?.email) {
        setLoaded(false);
        createSnack(error?.email?.[0], "warning");
      }
    }
    if (success) {
      signUpHandler(email);
      setLoaded(false);
    }
  }, [error, success]);

  return (
    <Block>
      <div className={styles.StartSignUp}>
        <div className={styles.StartSignUp__header}>
          <Title>Регистрация</Title>
        </div>
        <div className={styles.StartSignUp__input}>
          <Input
            autoComplete="off"
            maxLength={100}
            className={styles.Input_options}
            placeholder={"Введите электронную почту"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.StartSignUp__button}>
          <Button
            color={"pink"}
            loader={loaded}
            onClick={onSubmit}
            disabled={disabled}
            className={styles.Button_options}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.StartSignUp__terms}>
          <div className={styles.StartSignUp__accept}>
            <div>
              <BodyNormal>Нажимая кнопку, Вы принимаете условия</BodyNormal>
            </div>
            <div className={styles.StartSignUp__link}>
              <Link href={"https://web.prclub.pro/static/terms.pdf"}>
                <a target={"_blank"}>
                  <BodyNormal>
                    <span className={styles.Text_blue}>
                      Пользовательского соглашения
                    </span>
                  </BodyNormal>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default StartSignUp;
