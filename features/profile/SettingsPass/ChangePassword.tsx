import { ApplyColorDiv, Button, Input } from "../../../components";
import { useEffect, useState } from "react";

import styles from "./ChangePassword.module.scss";
import { useAuth } from "../../../lib/auth.hook";
import { usePopup } from "../../../lib/popup.hook";

type ChangePasswordProps = {
  onDisabledHandle: (on: boolean) => void;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({
  onDisabledHandle,
}) => {
  const { token, login } = useAuth();
  const { createSnack } = usePopup();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pass1, setPass1] = useState<string>("");
  const [pass2, setPass2] = useState<string>("");
  const [condition1, setCondition1] = useState<boolean>(false);
  const [condition2, setCondition2] = useState<boolean>(false);
  const [condition3, setCondition3] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (disabled) onDisabledHandle(true);
  }, [disabled]);

  useEffect(() => {
    if (pass1.length >= 8) {
      setCondition1(true);
    } else {
      setCondition1(false);
    }

    const password_validate2 = (password: string) => {
      let re = {
        capital: /[A-Z]/,
        digit: /[0-9]/,
      };
      const validate = re.capital.test(password) && re.digit.test(password);
      if (validate !== false) {
        setCondition2(true);
      } else {
        setCondition2(false);
      }
    };

    const password_validate3 = (password: string) => {
      let re = { full: /^[A-Za-z0-9]{7,100}$/ };
      const validate = re.full.test(password);
      if (validate !== false) {
        setCondition3(true);
      } else {
        setCondition3(false);
      }
    };

    password_validate2(pass1);
    password_validate3(pass1);
  }, [pass1]);

  const onSubmit = async () => {
    const data = {
      new_password1: pass1,
      new_password2: pass2,
    };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(data),
      };

      setLoaded(true);
      const res = await fetch(
        `${process.env.API_URL}/api/v1/rest-auth/password/change/`,
        requestOptions
      );
      const getToken = await res.json();

      if (res.ok && getToken) {
        login(getToken.token);
        setDisabled(true);
        createSnack("Пароль успешно изменен", "success");
      }
      if (!res.ok) {
        createSnack("Произошла неизвестная ошибка", "error");
      }
      setLoaded(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.ChangePassword}>
      <form>
        <div className={styles.ChangePassword__load}>
          <div className={styles.ChangePassword__mean}>
            <Input
              maxLength={100}
              label="Новый пароль"
              autoComplete="off"
              type="password"
              name="password"
              className={styles.Input_options}
              disabled={disabled}
              typeInput={"secret"}
              placeholder={"●●●●●●●●"}
              onChange={(event) => setPass1(event.target.value)}
            />
          </div>
          <div className={styles.ChangePassword__mean}>
            <Input
              maxLength={100}
              label="Повторите пароль"
              autoComplete="off"
              type="password"
              name="password"
              typeInput={"secret"}
              className={styles.Input_options}
              disabled={!pass1 || !condition1 || !condition2}
              placeholder={"●●●●●●●●"}
              onChange={(event) => setPass2(event.target.value)}
            />
          </div>
          <div className={styles.ChangePassword__text}>
            <ApplyColorDiv apply={condition1}>Мин. 8 символов</ApplyColorDiv>
            <ApplyColorDiv apply={condition2}>
              Буквы заглавные и прописные, цифры и спецсимволы
            </ApplyColorDiv>
          </div>
        </div>
        <div className={styles.ChangePassword__buttons}>
          <Button
            size={15}
            color={"pink"}
            loader={disabled}
            disabled={!(pass1 === pass2) || pass1 === "" || loaded}
            onClick={onSubmit}
            className={styles.Button_options_save}
          >
            Сохранить
          </Button>
          <Button
            color={"dark"}
            className={styles.Button_options}
            onClick={() => setDisabled(true)}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
