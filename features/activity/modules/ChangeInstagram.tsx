import { Button, Input } from "../../../components";
import { useEffect, useState } from "react";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import styles from "./ChangeInstagram.module.scss";
import { useAuth } from "../../../lib/auth.hook";
import { usePopup } from "../../../lib/popup.hook";
import { useRoot } from "../../../lib/root.hook";
import { useUserContext } from "../../../context/userContext";

type ChangeInstagramProps = {
  onChangeHandler: (save: boolean) => void;
  linkInstagram: string;
};

const ChangeInstagram: React.FC<ChangeInstagramProps> = ({
  onChangeHandler,
  linkInstagram = "",
}) => {
  const { token } = useAuth();
  const { setUserState, userState } = useUserContext();
  const { createSnack } = usePopup();
  const { loading, request, error, success } = useRoot();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [instagram, setInstagram] = useState<string>(linkInstagram);
  const [veryfiedInServer, setVeryfiedInServer] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      createSnack("Instagram аккаунта не существует", "error");
      onChangeHandler(false);
    }
    if (isSuccess) {
      createSnack("Instagram аккаунт изменен", "success");
      onChangeHandler(false);
      setUserState({
        ...userState,
        profile: { ...userState?.profile, insta_link: instagram },
      });
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    try {
      if (veryfiedInServer) {
        const socket = new W3CWebSocket(
          `${process.env.WEB_SOCKET}/ws/user/?token=${token}`
        );
        socket.onopen = () => {};
        socket.onmessage = (message) => {
          const getData = JSON.parse(message.data);
          if (getData.msg === "INSTAGRAM_ACCOUNT_NOT_EXISTS") {
            setIsError(true);
            setLoaded(false);
            socket.onclose = () => {};
          }
          if (getData.msg === "INSTAGRAM_ACCOUNT_EXISTS") {
            setLoaded(false);
            setIsSuccess(true);
            socket.onclose = () => {};
          }
        };
      }
    } catch (e) {
      console.log("При добавлении/изменении Instagram произошла ошибка", e);
    }
  }, [veryfiedInServer]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);
    setIsError(false);
    setIsSuccess(false);
    setVeryfiedInServer(false);
    if (linkInstagram === instagram || instagram === "") {
      onChangeHandler(false);
      return null;
    }
    try {
      const res = await request(
        `${process.env.API_URL}/api/v1/change-insta-link/`,
        "POST",
        { insta_link: instagram }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (error) {
      setLoaded(false);
      onChangeHandler(false);
      if (error?.info) {
        createSnack(error?.info, "warning");
      }
    }
    if (success) {
      setVeryfiedInServer(true);
    }
  }, [error, success]);

  useEffect(() => setDisabled(loaded), [loaded]);

  return (
    <>
      <div className={styles.ChangeInstagram}>
        <div className={styles.ChangeInstagram__input}>
          <Input
            autoComplete="off"
            maxLength={50}
            type="text"
            name="instagram"
            defaultValue={instagram}
            className={styles.Input_options}
            disabled={loaded}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        <div className={styles.ChangeInstagram__button}>
          <Button
            color={"dark"}
            size={15}
            loader={loaded}
            disabled={disabled}
            className={styles.Button_options}
            onClick={onSubmit}
          >
            {linkInstagram === instagram || instagram === ""
              ? "Отмена"
              : "Сохранить"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangeInstagram;
