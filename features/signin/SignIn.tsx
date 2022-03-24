import { Block, BodyNormal, Button, Input, Title } from "../../components";
import { useEffect, useState } from "react";

import Link from "next/link";
import React from "react";
import Router from "next/router";
import styles from "./SignIn.module.scss";
import { useAuth } from "../../lib/auth.hook";
import { useHttp } from "../../lib/http.hook";
import { usePopup } from "../../lib/popup.hook";

const SignIn: React.FC = () => {
  const { login } = useAuth();
  const { success, error, request } = useHttp();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { createSnack } = usePopup();

  useEffect(() => {
    setDisabled(loaded);
  }, [loaded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    if (password === "" && email === "") {
      createSnack("Введите электронную почту и пароль", "warning");
      return null;
    }
    if (password === "") {
      createSnack("Введите пароль", "warning");
      return null;
    }
    if (email === "") {
      createSnack("Введите электронную почту", "warning");
      return null;
    }
    try {
      setLoaded(true);
      const res = await request(
        `${process.env.API_URL}/api/v1/rest-auth/login/`,
        "POST",
        body
      );
      if (res.user) {
        login(res.token);
        Router.push(`/${process.env.FIRST_PAGE}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (error) {
      setLoaded(false);
      if (error?.email) {
        createSnack(error?.email, "warning");
      }
      if (error?.non_field_errors) {
        if (
          error?.non_field_errors?.[0] ===
          "Невозможно войти в систему с указанными учётными данными."
        ) {
          createSnack("Неверный логин или пароль", "warning");
        } else {
          createSnack(error?.non_field_errors?.[0], "warning");
        }
      }
    }
  }, [error, success]);

  return (
    <Block>
      <Title>Вход в PR Club</Title>
      <div className={styles.SignIn__input}>
        <Input
          autoComplete="off"
          maxLength={100}
          placeholder={"Введите электронную почту"}
          type={"email"}
          name={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.SignIn__input}>
        <Input
          typeInput={"secret"}
          autoComplete="off"
          maxLength={100}
          placeholder={"●●●●●●●●"}
          name={"password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.SignIn__reset}>
        <Link href="/reset-password">
          <a>
            <BodyNormal className={styles.Text_blue}>Забыли пароль</BodyNormal>
          </a>
        </Link>
      </div>
      <div className={styles.SignIn__button}>
        <Button
          color={"pink"}
          disabled={disabled}
          loader={loaded}
          onClick={onSubmit}
          flyImg={true}
          className={styles.Btn_options}
        >
          Войти
        </Button>
      </div>
    </Block>
  );
};

export default SignIn;
