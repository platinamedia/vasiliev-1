import {
  BackDrop,
  BodyBold,
  BodyNormal,
  Button,
  Input,
  PickInterests,
} from "../../components";
import { ImgLoader, ProcessInstagram } from "../../modules";
import { useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import Image from "next/image";
import { Interests } from "../../components/PickInterests/PickInterests";
import Stack from "@mui/material/Stack";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import pen from "/public/images/svg/pen.svg";
import styles from "./MyInstagram.module.scss";
import { useAuth } from "../../lib/auth.hook";
import { useUserContext } from "../../context/userContext";

const MyInstagram = () => {
  const { token } = useAuth();
  const { userState } = useUserContext();
  const [stateWindow, setStateWindow] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorHasSystem, setErrorHasSystem] = useState<boolean>(false);
  const [errorNotExist, setErrorNotExist] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [stateBackDrop, setStateBackDrop] = useState<boolean>(false);

  const [instagram, setInstagram] = useState<string>("");

  const [addInstagram, setAddInstagram] = useState(null);
  const [addInteres, setAddInteres] = useState(null);
  const [postInstagram, setPostInstagram] = useState(null);
  const [interesChange, setInteresChange] = useState(null);
  const [interesIdsChange, setInteresIdsChange] = useState(null);
  const [instagramChange, setInstagramChange] = useState(null);

  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);
  const [showInterestsModal, setShowInterestsModal] = useState<boolean>(false);
  const [showInterestsChange, setShowInterestsChange] =
    useState<boolean>(false);

  const [veryfiedInstagramInServer, setVeryfiedInstagramInServer] =
    useState(null);
  const [stateShowAddInstagram, setStateShowAddInstagram] = useState(null);
  const [interes, setInteres] = useState([]);
  const [interestsIds, setInterestsIds] = useState(null);
  const [truePostInterests, setTruePostInterests] = useState<boolean>(false);

  // проверка аккаунта если не нашли по базе
  useEffect(() => {
    try {
      const socket = new W3CWebSocket(
        `${process.env.WEB_SOCKET}/ws/user/?token=${token}`
      );

      socket.onopen = () => {};
      if (veryfiedInstagramInServer) {
        socket.onmessage = (message) => {
          const getData = JSON.parse(message.data);
          if (getData.msg === "INSTAGRAM_ACCOUNT_NOT_EXISTS") {
            setStateBackDrop(false);
            setStateWindow(true);
            setErrorNotExist(true);
          }
          if (getData.msg === "INSTAGRAM_ACCOUNT_EXISTS") {
            setStateBackDrop(false);
            setStateWindow(true);
            setSuccess(true);
          }
        };
      }
    } catch (e) {
      console.log("При добавлении/изменении Instagram произошла ошибка", e);
    }
  }, [veryfiedInstagramInServer]);

  // Получили новое изменения на аккаунт
  useEffect(() => {
    if (!userState) {
      return null;
    } else {
      try {
        if (instagramChange) {
          setInstagram(instagramChange);
        } else {
          setInstagram(userState?.profile?.insta_link || "");
        }
        if (interesChange) {
          setInteres(interesChange);
        } else {
          setInteres(userState?.profile?.preferences);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }),
    [disabled];

  const handleDisabled = (e) => {
    e.preventDefault();
    setDisabled((prev) => !prev);
  };

  const handleInterestsChange = (e) => {
    e.preventDefault();
    setShowInterestsChange(true);
  };

  function saveUsername(username: string) {
    setShowUsernameModal(false);
    setShowInterestsModal(true);
    setAddInstagram(username);
  }

  function goBack() {
    setShowInterestsModal(false);
    setShowUsernameModal(true);
  }
  function goBackChange() {
    setShowInterestsChange(false);
  }

  function saveInterests(interests: Interests) {
    const { names, ids } = interests;
    setAddInteres(names);
    setInterestsIds(ids);
  }
  function saveInterestsChange(interests: Interests) {
    const { names, ids } = interests;
    setShowInterestsChange(false);
    setInteresChange(names);
    setInteresIdsChange(ids);
  }

  const handleInstagramChange = (e) => {
    e.preventDefault();
    setInstagramChange(e.target.value);
  };

  const handleInstagram = (e) => {
    e.preventDefault();
    setShowUsernameModal(true);
  };

  //   Добавление интересов
  useEffect(() => {
    try {
      setSuccess(false);
      setStateWindow(false);
      setErrorNotExist(false);
      setErrorHasSystem(false);
      setVeryfiedInstagramInServer(false);
      if (addInstagram && interestsIds && userState) {
        const getDataInstagram = userState;
        getDataInstagram.profile.insta_link = addInstagram;

        setPostInstagram(getDataInstagram);

        const body = {
          ids: interestsIds,
        };
        setShowInterestsModal(false);
        setStateBackDrop(true);
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(body),
        };
        const postNewData = async () => {
          const res = await fetch(
            `${process.env.API_URL}/api/v1/preferences/`,
            requestOptions
          );
          if (res.status === 200) {
            setTruePostInterests(true);
          }
        };
        postNewData();
      }
    } catch (e) {
      console.log(e);
    }
  }, [interestsIds]);

  // Отправка нового инстаграмм
  useEffect(() => {
    try {
      if (postInstagram && truePostInterests) {
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
          if (res.status === 202) {
            setVeryfiedInstagramInServer(true);
          }
          if (res.status === 400) {
            setStateWindow(true);
            setErrorHasSystem(true);
            setStateBackDrop(false);
          }
        };
        postNewData();
      }
    } catch (e) {
      console.log(e);
    }
  }, [postInstagram, truePostInterests]);

  // Отправка изменения инстаграмм
  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setStateWindow(false);
    setErrorNotExist(false);
    setErrorHasSystem(false);
    setVeryfiedInstagramInServer(false);
    try {
      setStateBackDrop(true);
      setDisabled((prev) => !prev);
      if (instagram !== userState?.profile?.insta_link && instagram !== "") {
        const body = {
          insta_link: instagram,
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
          if (res.status === 202) {
            if (interesIdsChange) {
              setTruePostInterests(true);
            }
            setVeryfiedInstagramInServer(true);
          }
          if (res.status === 400) {
            setStateWindow(true);
            setErrorHasSystem(true);
            setStateBackDrop(false);
          }
        };
        postNewData();
      }

      // Отправка интересов
      if (interesIdsChange) {
        const body = {
          ids: interesIdsChange,
        };
        setShowInterestsModal(false);
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(body),
        };
        const postNewData = async () => {
          const res = await fetch(
            `${process.env.API_URL}/api/v1/preferences/`,
            requestOptions
          );
          if (res.status === 200) {
            if (instagram === userState?.profile?.insta_link) {
              setStateBackDrop(false);
            }
          }
        };
        postNewData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (userState) {
        if (instagram) return null;
        setStateShowAddInstagram(
          <>
            <Button
              color={"pink"}
              className={styles.MyInstagram__connectInst_btn}
            >
              <BodyNormal>Привязать личный аккаунт Instagram</BodyNormal>
            </Button>
          </>
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [userState]);

  return (
    <div className={styles.MyInstagram}>
      <BackDrop openState={stateBackDrop} />
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
      {check && <ProcessInstagram stateWindow={check} check={check} />}

      <div className={styles.MyInstagram__first}>
        <div></div>
        {instagram!! &&
          (disabled ? (
            <div
              className={styles.MyInstagram__changed}
              onClick={handleDisabled}
            >
              <div className={styles.MyInstagram__changed_img}>
                <Image
                  loader={ImgLoader}
                  src={pen}
                  alt="play"
                  height={18}
                  width={18}
                />
              </div>
              <div className={styles.MyInstagram__changed_text}>
                <BodyNormal>Изменить</BodyNormal>
              </div>
            </div>
          ) : null)}
      </div>
      <section className={styles.MyInstagram__solo}>
        <form className={styles.MyInstagram__form} onSubmit={onSubmit}>
          <div className={styles.MyInstagram__form_user}>
            <div className={styles.MyInstagram__InstagramView_wrapp}>
              {!instagram && disabled ? (
                <div
                  className={styles.MyInstagram__connectInst}
                  onClick={handleInstagram}
                >
                  {stateShowAddInstagram}
                </div>
              ) : null}
              {/* <ModalInstagram
                isOpen={showUsernameModal}
                openContent={null}
                onOpen={() => setShowUsernameModal(true)}
                onClose={() => setShowUsernameModal(false)}
                onExit={saveUsername}
              /> */}
              <PickInterests
                isOpen={showInterestsModal}
                openContent={null}
                onOpen={() => setShowInterestsModal(true)}
                onClose={() => setShowInterestsModal(false)}
                onGoingBack={goBack}
                onSelectFinished={saveInterests}
              />
              <div className={styles.MyInstagram__InstagramView_wrapp}>
                {instagram && disabled && (
                  <>
                    <div className={styles.MyInstagram__InstagramView_head}>
                      <BodyBold>Привязанный аккаунт Instagram</BodyBold>
                    </div>
                    <div className={styles.MyInstagram__InstagramView}>
                      <div className={styles.MyInstagram__InstagramView_prof}>
                        <div className={styles.MyInstagram__InstagramView_IMG}>
                          {userState?.profile?.user_image ? (
                            <Image
                              loader={ImgLoader}
                              src={`data:image/jpeg;base64,${userState?.profile?.user_image}`}
                              width={32}
                              height={32}
                              alt="my photo"
                            />
                          ) : (
                            <Image
                              loader={ImgLoader}
                              src={"/images/svg/default/user.svg"}
                              width={32}
                              height={32}
                              alt="my photo"
                            />
                          )}
                        </div>
                        <div>
                          <BodyNormal>
                            {userState?.profile?.insta_link}
                          </BodyNormal>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!disabled && (
                  <>
                    <div className={styles.MyInstagram__InstagramView}>
                      <Input
                        maxLength={50}
                        type="text"
                        name="instagram"
                        defaultValue={instagram}
                        className={styles.MyInstagram__mean}
                        disabled={disabled}
                        placeholder="instagram"
                        onChange={handleInstagramChange}
                      />
                    </div>
                  </>
                )}
              </div>
              {/* Рендер интересов для изменения */}
              {!disabled && (
                <Stack direction="row" className={styles.InterestsPicker}>
                  {interes &&
                    interes.map((item, i) => (
                      <Chip
                        key={i}
                        label={item.interests || item}
                        variant="outlined"
                      />
                    ))}
                </Stack>
              )}

              {disabled && (
                <Stack direction="row" className={styles.InterestsPicker}>
                  {userState?.profile?.preferences &&
                    userState?.profile?.preferences?.map((item, i) => (
                      <Chip
                        key={i}
                        label={item.interests || item}
                        variant="outlined"
                      />
                    ))}
                </Stack>
              )}
            </div>
            <div>
              {!disabled && (
                <>
                  <Button
                    color={"pink"}
                    className={styles.MyInstagram__connectInst_btn}
                    onClick={handleInterestsChange}
                  >
                    <BodyNormal>Изменить интересы</BodyNormal>
                  </Button>
                  <PickInterests
                    isOpen={showInterestsChange}
                    openContent={null}
                    onOpen={() => setShowInterestsChange(true)}
                    onClose={() => setShowInterestsChange(false)}
                    onGoingBack={goBackChange}
                    onSelectFinished={saveInterestsChange}
                    showGoBackButton={false}
                  />
                </>
              )}
            </div>
          </div>
          {disabled ? null : (
            <div className={styles.MyInstagram__change}>
              <div className={styles.MyInstagram__save}>
                <Button color={"pink"} type="submit">
                  Сохранить
                </Button>
              </div>
              <div className={styles.MyInstagram__save}>
                <Button color={"pink"} type="button" onClick={handleDisabled}>
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default MyInstagram;
