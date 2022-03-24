import { Button, Title } from "../../components";
import { ImgLoader, ProcessInstagram } from "../../modules/";
import { useEffect, useState } from "react";

import Image from "next/image";
import { ModalInstagram } from "./modules";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import magnitism from "/public/images/svg/magnitism.svg";
import styles from "./AddInstagram.module.scss";
import { useAuth } from "../../lib/auth.hook";
import { useUserContext } from "../../context/userContext";

const AddInstagram: React.FC = () => {
  const { userState } = useUserContext();
  const { token } = useAuth();
  const [addInstagram, setAddInstagram] = useState<string>("");
  const [postInstagram, setPostInstagram] = useState(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorNotExist, setErrorNotExist] = useState<boolean>(false);
  const [stateBackDrop, setStateBackDrop] = useState<boolean>(false);
  const [errorHasSystem, setErrorHasSystem] = useState<boolean>(false);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);

  const [veryfiedInstagramInServer, setVeryfiedInstagramInServer] =
    useState<boolean>(null);

  const saveUsername = (username: string) => {
    setShowUsernameModal(false);
    setAddInstagram(username);
  };

  const handleInstagram = (event) => {
    event.preventDefault();
    setShowUsernameModal(true);
  };

  useEffect(() => {
    try {
      const socket = new W3CWebSocket(
        `${process.env.WEB_SOCKET}/ws/user/?token=${token}`
      );
      socket.onopen = () => {};
      if (veryfiedInstagramInServer) {
        socket.onmessage = (message) => {
          const getData = JSON.parse(message.data);
          console.log(getData.msg);
          if (getData.msg === "INSTAGRAM_ACCOUNT_NOT_EXISTS") {
            setStateBackDrop(false);
            setErrorNotExist(true);
          }
          if (getData.msg === "INSTAGRAM_ACCOUNT_EXISTS") {
            setStateBackDrop(false);
            setSuccess(true);
          }
        };
      }
    } catch (e) {
      console.log("Не удается получить ответ по Socket", e);
    }
  }, [veryfiedInstagramInServer]);

  useEffect(() => {
    if (!userState) return null;
    if (!addInstagram) return null;
    try {
      const getDataInstagram = userState;
      getDataInstagram.profile.insta_link = addInstagram;
      setPostInstagram(getDataInstagram);
      setStateBackDrop(true);
    } catch (e) {
      console.log(e);
    }
  }, [addInstagram]);

  useEffect(() => {
    setSuccess(false);
    setErrorNotExist(false);
    setErrorHasSystem(false);
    setVeryfiedInstagramInServer(false);
    try {
      if (postInstagram) {
        const body = {
          insta_link: addInstagram,
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(body),
        };
        const postNewData = async () => {
          const res = await fetch(
            `${process.env.API_URL}/api/v1/change-insta-link/`,
            requestOptions
          );
          if (res.ok) {
            setVeryfiedInstagramInServer(true);
          }
          if (!res.ok) {
            setErrorHasSystem(true);
            setStateBackDrop(false);
            setAddInstagram("");
          }
        };
        postNewData();
      }
    } catch (e) {
      console.log(e);
    }
  }, [postInstagram]);

  return (
    <div className={styles.AddInstagram}>
      {success && <ProcessInstagram stateWindow={success} success={success} />}
      {errorHasSystem && (
        <ProcessInstagram
          stateWindow={errorHasSystem}
          errorHasSystem={errorHasSystem}
        />
      )}
      {errorNotExist && (
        <ProcessInstagram
          stateWindow={errorNotExist}
          errorNotExist={errorNotExist}
        />
      )}
      <ModalInstagram
        isOpen={showUsernameModal}
        openContent={null}
        onOpen={() => setShowUsernameModal(true)}
        onClose={() => setShowUsernameModal(false)}
        onExit={saveUsername}
      />
      <div className={styles.AddInstagram__IMG}>
        <Image
          loader={ImgLoader}
          src={magnitism}
          width={331}
          height={81}
          layout="fixed"
        />
      </div>
      <div className={styles.AddInstagram__body}>
        <div className={styles.AddInstagram__body_text}>
          <Title>
            Привяжи свой Личный аккаунт Instagram, чтобы получать подписчиков и
            активность от других участников
          </Title>
        </div>
        <div className={styles.AddInstagram__body_next}>
          <Button
            color={"pink"}
            className={styles.Button_options}
            onClick={handleInstagram}
            disabled={stateBackDrop}
            loader={stateBackDrop}
          >
            Привязать
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddInstagram;
