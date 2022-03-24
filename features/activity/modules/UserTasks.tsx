import { BodyNormal, BodySmall, Button } from "../../../components";
import { useEffect, useState } from "react";

import Image from "next/image";
import { ImgLoader } from "../../../modules";
import Link from "next/link";
import ModalContent from "./ModalContent";
import { UserOffer } from ".";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import styles from "./UserTasks.module.scss";
import { useAuth } from "../../../lib/auth.hook";
import { userActual } from "../../../api/userActual";

const UserTasks: React.FC = () => {
  const [actual] = userActual();
  const { token } = useAuth();
  const [stateArrayID, setStateArrayID] = useState<any>(null);
  const [cardsInstagram, setCardsInstagram] = useState<any>(null);
  const [stateViewOffer, setStateViewOffer] = useState<boolean>(false);
  const [checkTasks, setCheckTasks] = useState<boolean>(null);
  const [catchError, setCatchError] = useState<boolean>(null);
  const [check, setCheck] = useState<boolean>(false);
  const [errorSCK, setErrorSCK] = useState<boolean>(false);
  const [successSCK, setSuccessSCK] = useState<boolean>(false);
  const [stateWindow, setStateWindow] = useState<boolean>(false);
  const [isChengeID, setIsChengeID] = useState<number>();
  const [answerTasks, setAnswerTasks] = useState<boolean>(null);

  const socket = new W3CWebSocket(
    `wss://prclub.pro/ws/check-task/?token=${token}`
  );

  useEffect(() => {
    setSuccessSCK(false);
    setErrorSCK(false);
  }, [checkTasks]);

  useEffect(() => {
    if (successSCK || errorSCK) {
      setCheck(false);
      setStateWindow(false);
    }
  }, [successSCK, errorSCK]);

  useEffect(() => {
    if (!actual) return null;

    try {
      setStateArrayID(actual?.map((x) => x.id));
      if (!localStorage.getItem("viewOfferInTask")) {
        setCardsInstagram([{ id: 0 }, ...actual]);
      } else {
        setCardsInstagram(actual);
      }

      if (stateViewOffer) {
        setCardsInstagram(actual);
      }

      setCatchError(false);
    } catch (e) {
      setCatchError(true);
    }
  }, [actual, stateViewOffer]);

  useEffect(() => {
    try {
      if (!answerTasks) return null;
      socket.onopen = () => console.log("connected");
      socket.onmessage = (event) => {
        const dataFromServer = JSON.parse(event.data);
        if (dataFromServer.status === "ERROR") {
          setErrorSCK(true);
          setStateWindow(false);
          socket.onclose = () => {};
        }
        if (dataFromServer.status === "SUCCESS") {
          setSuccessSCK(true);
          setStateWindow(false);
          socket.onclose = () => {};
        }
      };
    } catch (e) {
      console.log(e);
    }
  }, [answerTasks]);

  useEffect(() => {
    if (!checkTasks) return null;

    try {
      setCheck(true);
      setStateWindow(true);
      const body = {
        actions_id: stateArrayID,
      };
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(body),
      };
      const checkTask = async () => {
        const res = await fetch(
          `${process.env.API_URL}/api/v1/actions/tasks-for-me/check-execution/`,
          requestOptions
        );
        if (res.ok) {
          const data = await res.json();
          setAnswerTasks(true);
          setCheckTasks(false);
        }
      };
      checkTask();
    } catch (e) {
      console.log(e);
    }
  }, [checkTasks]);

  const handleCheckTask = () => setCheckTasks(true);
  const handleClearID = () => setIsChengeID(null);
  const viewCloseOffer = () => setStateViewOffer(true);

  try {
    return (
      <>
        {isChengeID && (
          <ModalContent
            content="change_account"
            onOpen={!!isChengeID}
            valueID={isChengeID}
            handleClearID={handleClearID}
          />
        )}
        {catchError && (
          <div className={styles.CatchError}>
            <BodyNormal>Здесь появятся твои задания</BodyNormal>
          </div>
        )}
        <div className={styles.UserTasks}>
          {check && <ModalContent onOpen={check} content="task_check" />}
          {successSCK && (
            <ModalContent onOpen={successSCK} content="task_success" />
          )}
          {errorSCK && <ModalContent onOpen={errorSCK} content="task_error" />}
          <div className={styles.UserTasks__Cards}>
            {cardsInstagram?.length > 0 &&
              cardsInstagram?.map((card, i) => {
                return (
                  <div key={i}>
                    {card?.id === 0 ? (
                      <UserOffer viewCloseOffer={viewCloseOffer} />
                    ) : (
                      <section className={styles.Card}>
                        <div className={styles.Card__wrapper}>
                          <div className={styles.Card__user}>
                            <div className={styles.Card__user_img}>
                              {card?.inst_owner_image ? (
                                <Image
                                  loader={ImgLoader}
                                  src={`data:image/jpeg;base64,${card?.inst_owner_image}`}
                                  width={35}
                                  height={35}
                                  alt="my photo"
                                />
                              ) : (
                                <Image
                                  loader={ImgLoader}
                                  src={"/images/svg/default/user.svg"}
                                  width={35}
                                  height={35}
                                  alt="my photo"
                                />
                              )}
                            </div>
                            <div>
                              <div>
                                <BodyNormal className={styles.Card__text}>
                                  {card?.owner_name}&nbsp;
                                  {card?.owner_surname}
                                </BodyNormal>
                              </div>
                              <div>
                                <BodySmall className={styles.Card__text_grey}>
                                  {card?.link?.substr(12)}
                                </BodySmall>
                              </div>
                            </div>
                          </div>
                          <div className={styles.Card__body}>
                            <BodyNormal className={styles.Card__text}>
                              {card?.owner_about}
                            </BodyNormal>
                          </div>
                        </div>
                        <div className={styles.Card__buttons}>
                          <div className={styles.Card__buttons_wrapper}>
                            <Link href={card?.link}>
                              <a target="_blank">
                                <Button
                                  color={"pink"}
                                  className={styles.Card__buttons_conf}
                                >
                                  Выполнить
                                </Button>
                              </a>
                            </Link>
                            <div
                              className={styles.Change}
                              onClick={() => setIsChengeID(card?.id)}
                            >
                              <BodyNormal className={styles.Change__btn}>
                                Сменить
                              </BodyNormal>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
                );
              })}
          </div>
          {cardsInstagram && (
            <div className={styles.UserTasks__footer}>
              <div className={styles.UserTasks__Options}>
                <BodyNormal>
                  Подпишись в Instagram на 20 друзей, знакомых твоих знакомых
                  или людей которые зарегистрировались в PR Club до тебя и новые
                  участники в свою очередь подпишутся на тебя!
                </BodyNormal>
              </div>
              <div className={styles.UserTasks__btn}>
                <Button color={"pink"} onClick={handleCheckTask}>
                  Проверить выполнение
                </Button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    return <div>Обратитесь в поддержку, работа уже идет...</div>;
  }
};

export default UserTasks;
