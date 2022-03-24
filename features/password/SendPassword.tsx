import { Block, Button, Input, Title } from "../../components";
import { useEffect, useState } from "react";

import Image from "next/image";
import { ImgLoader } from "../../modules";
import Link from "next/link";
import left_back from "/public/images/svg/left_back.svg";
import styles from "./SendPassword.module.scss";
import { usePopup } from "../../lib/popup.hook";
import { useReg } from "../../lib/reg.hook";

type SendPasswordProps = {
  sendEmailHandler: (email: string) => void;
};

const SendPassword: React.FC<SendPasswordProps> = ({ sendEmailHandler }) => {
  const { createSnack } = usePopup();
  const { loading, request, error, success } = useReg();
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => setDisabled(loaded), [loaded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);
    const body = { email };
    if (body.email === "") {
      setLoaded(false);
      createSnack("Введите e-mail.", "warning");
      return null;
    }
    try {
      const res = await request(
        `${process.env.API_URL}/api/v1/rest-auth/password/reset/`,
        "POST",
        body
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (error) {
      setLoaded(false);
      if (error?.email) {
        if (error?.email?.[0] === "Invalid email address") {
          createSnack("Неверный адрес электронной почты", "warning");
        } else {
          createSnack(error?.email?.[0], "warning");
        }
      }
    }
    if (success) {
      sendEmailHandler(email);
      setLoaded(false);
    }
  }, [error, success]);

  return (
    <Block>
      <div className={styles.SendPassword}>
        <div className={styles.SendPassword__back}>
          <Link href="/">
            <a>
              <Image
                loader={ImgLoader}
                src={left_back}
                width={18}
                height={20}
                alt={"back"}
                priority
              />
            </a>
          </Link>
        </div>
        <div className={styles.SendPassword__header}>
          <Title>Выслать новый пароль</Title>
        </div>
        <div className={styles.SendPassword__input}>
          <Input
            autoComplete="off"
            maxLength={100}
            className={styles.Input_options}
            placeholder={"Введите электронную почту"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.SendPassword__button}>
          <Button
            color={"pink"}
            className={styles.Button_options}
            loader={loaded}
            disabled={disabled}
            onClick={onSubmit}
          >
            Выслать новый пароль
          </Button>
        </div>
      </div>
    </Block>
  );
};

export default SendPassword;
