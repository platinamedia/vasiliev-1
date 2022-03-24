import {
  BodyNormal,
  Button,
  Headline,
  HelioseXtcBold,
  Input,
  Title,
} from "../../components";
import { Element, Link as LinkDown } from "react-scroll";
import { useEffect, useState } from "react";

import { ContactsData } from "../../data/ContactsData";
import Image from "next/image";
import { ImgLoader } from "../../modules";
import Link from "next/link";
import insta from "/public/images/svg/social/insta_white.svg";
import styles from "./PromoAbout.module.scss";
import telega from "/public/images/svg/social/telegramm_white.svg";
import { useRoot } from "../../lib/root.hook";
import { useUserContext } from "../../context/userContext";
import whatsapp from "/public/images/svg/social/whatsapp_white.svg";

const PromoAbout: React.FC = () => {
  const { setUserState, userState } = useUserContext();
  const { loading, request, error, success } = useRoot();

  const [userName, setUserName] = useState<string>(
    userState?.profile?.name || ""
  );
  const [saveName, setSaveName] = useState<boolean>(true);
  const [nextInfo, setNextInfo] = useState<boolean>(true);
  const [boxOne, setBoxOne] = useState<boolean>(false);
  const [boxTwo, setBoxTwo] = useState<boolean>(false);
  const [boxThree, setBoxThree] = useState<boolean>(false);
  const [boxFour, setBoxFour] = useState<boolean>(false);
  const [boxFive, setBoxFive] = useState<boolean>(false);

  useEffect(() => setUserName(userState?.profile?.name), [userState]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!userName || userName === "") return null;
    if (userName === userState?.profile?.name) return null;
    const body = {
      profile: { name: userName },
    };
    try {
      const res = await request(
        `${process.env.API_URL}/api/v1/rest-auth/user/`,
        "PATCH",
        body
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (success) {
      setUserState({
        ...userState,
        profile: { ...userState?.profile, name: userName },
      });
    }
  }, [success]);

  return (
    <>
      <div className={styles.PromoAbout}>
        <div className={styles.PromoAbout__bot}>
          {nextInfo ? (
            <>
              {saveName && (
                <section className={styles.PromoAbout__dialog}>
                  <div className={styles.PromoAbout__dialog_username}>
                    <BodyNormal>PR Bot</BodyNormal>
                  </div>
                  <div className={styles.PromoAbout__dialog_message}>
                    <HelioseXtcBold>
                      <Title>
                        — Ты сейчас прочитал(а) мощнейшее предложение, <br />а
                        теперь давай знакомиться!)
                      </Title>
                    </HelioseXtcBold>
                  </div>
                  <Input
                    className={styles.PromoAbout__dialog_input}
                    type="text"
                    autoComplete={"off"}
                    name="username"
                    placeholder={"Как тебя зовут?"}
                    required
                    value={userName}
                    maxLength={50}
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                  <div className={styles.PromoAbout__dialog_save}>
                    <LinkDown
                      to="boxOne"
                      spy={true}
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        setBoxOne(true);
                        setSaveName(true);
                      }}
                    >
                      <Button
                        color={"pink"}
                        onClick={onSubmit}
                        disabled={!userName}
                      >
                        <BodyNormal>Сохранить</BodyNormal>
                      </Button>
                    </LinkDown>
                  </div>
                </section>
              )}
              <Element name="boxOne"></Element>
              {boxOne ? (
                <section className={styles.PromoAbout__dialog}>
                  <div className={styles.PromoAbout__dialog_username}>
                    <BodyNormal>PR Bot</BodyNormal>
                  </div>
                  <div className={styles.PromoAbout__dialog_message}>
                    <HelioseXtcBold>
                      <Title>
                        — Супер, {userName}!
                        <br />
                        <br />Я PR Bot, буду твоим помощником! Я расскажу тебе,
                        что предлагают мои Создатели и что тебе надо будет
                        сделать дальше, чтобы прокачать свои социальные сети
                      </Title>
                    </HelioseXtcBold>
                  </div>
                  <div className={styles.PromoAbout__answer}>
                    <div className={styles.PromoAbout__answer_user}>
                      <br />
                      <div className={styles.PromoAbout__answer_right}>
                        <div className={styles.PromoAbout__answer_top}>
                          <LinkDown
                            to="boxTwo"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            <div
                              onClick={() => {
                                setBoxTwo(true);
                              }}
                            >
                              <Button color={"pink"}>
                                <BodyNormal>
                                  Хочу получить информацию ;)
                                </BodyNormal>
                              </Button>
                            </div>
                          </LinkDown>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}
              <Element name="boxTwo"></Element>
              {boxTwo ? (
                <section className={styles.PromoAbout__dialog}>
                  <div className={styles.PromoAbout__dialog_username}>
                    <BodyNormal>PR Bot</BodyNormal>
                  </div>
                  <div className={styles.PromoAbout__dialog_message}>
                    <HelioseXtcBold>
                      <Title>
                        — Данная платформа поможет тебе прокачать свою медийность и
                        еще{" "}
                        <span className={styles.PromoAbout__paint}>
                          {" "}
                          заработать{" "}
                        </span>{" "}
                        на партнерской программе <br /> <br />
                        <span className={styles.PromoAbout__paint}>
                          Подробности сможешь узнать у своего инструктора, его
                          контакты покажу по окончании нашего чата
                        </span>
                      </Title>
                    </HelioseXtcBold>
                  </div>
                  <div className={styles.PromoAbout__answer}>
                    <div className={styles.PromoAbout__answer_user}>
                      <br />
                      <div className={styles.PromoAbout__answer_right}>
                        <div className={styles.PromoAbout__answer_top}>
                          <LinkDown
                            to="boxThree"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            <div
                              onClick={() => {
                                setBoxThree(true);
                              }}
                            >
                              <Button color={"pink"}>
                                <BodyNormal>
                                  Ок, что вы мне предлагаете?
                                </BodyNormal>
                              </Button>
                            </div>
                          </LinkDown>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className={styles.PromoAbout__default}></div>
              )}
              <Element name="boxThree"></Element>
              {boxThree ? (
                <section className={styles.PromoAbout__dialog}>
                  <div className={styles.PromoAbout__dialog_username}>
                    <BodyNormal>PR Bot</BodyNormal>
                  </div>
                  <div className={styles.PromoAbout__dialog_message}>
                    <HelioseXtcBold>
                      <Title>
                        — Ты в нужное время в нужном месте! <br /> <br />
                        Сейчас идет предстарт запуска платформы, в связи с этим
                        Создатели афишировали СУПЕР ПРЕДЛОЖЕНИЕ для
                        первооткрывателей <br />
                        <br />
                        Ты можешь получить много,
                        <span className={styles.PromoAbout__paint}>
                          {" "}
                          неприлично{" "}
                        </span>{" "}
                        много подписчиков за счет рекламы,
                        которую наши маркетологи будут заказывать у блогеров и
                        размещать в других источниках, которые описаны в
                        Медиа-плане
                      </Title>
                    </HelioseXtcBold>
                  </div>
                  <div className={styles.PromoAbout__answer}>
                    <div className={styles.PromoAbout__answer_user}>
                      <div className={styles.PromoAbout__answer_right}>
                        <div className={styles.PromoAbout__answer_top}>
                          <LinkDown
                            to="boxFour"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            <div
                              onClick={() => {
                                setBoxFour(true);
                              }}
                            >
                              <Button color={"pink"}>
                                <BodyNormal>
                                  Хочу получить медиа-план
                                </BodyNormal>
                              </Button>
                            </div>
                          </LinkDown>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className={styles.PromoAbout__default}></div>
              )}
              <Element name="boxFour"></Element>
              {boxFour ? (
                <section className={styles.PromoAbout__dialog}>
                  <div className={styles.PromoAbout__dialog_username}>
                    <BodyNormal>PR Bot</BodyNormal>
                  </div>
                  <div className={styles.PromoAbout__dialog_message}>
                    <HelioseXtcBold>
                      <Title>
                        — Сейчас покажу, но перед этим прочитай еще эту важную
                        информацию
                        <br /> <br />
                        Рекламная кампания с бюджетом $100 000, которая будет
                        длиться от 3-х месяцев - стартует сразу после
                        подключения 1100 активных пользователей
                        <br /> <br />
                        Ожидаем получить от{" "}
                        <span className={styles.PromoAbout__paint}>
                          50 тыс. до 500 тыс.
                        </span>{" "}
                        новых участников!
                        <br /> <br />
                        Создатели разработали “принцип револьвера”: Система
                        автоматически поочерёдно распределяет новых участников
                        среди всех активных участников платформы, также твой
                        аккаунт Instagram будет отображаться в общем
                        распределении на подписку,
                        <span className={styles.PromoAbout__paint}>
                          {" "}
                          за счёт чего ты получаешь подписчиков
                        </span>
                        <br /> <br />
                        <span className={styles.PromoAbout__text_mini}>
                          Поэтому тебе надо успеть воспользоваться данным
                          предложением как можно скорее!
                        </span>
                        <br /> <br />
                        <span className={styles.PromoAbout__text_mini}>
                          А лучше сделай это прямо сейчас, так как предложение
                          ограничено и больше его никогда будет!
                        </span>
                        <br /> <br />
                        <span className={styles.PromoAbout__paint}>
                          Всего участвуют 1100 мест.
                        </span>{" "}
                        Из них 100 мест для партнёров, которые будут получать
                        подписчиков в Instagram и работать с новыми участниками
                        (адаптация и обучение) и 1000 мест для клиентов, которые
                        будут получать подписчиков в Instagram
                      </Title>
                    </HelioseXtcBold>
                  </div>
                  <div className={styles.PromoAbout__answer}>
                    <div className={styles.PromoAbout__answer_user}>
                      <div className={styles.PromoAbout__answer_right}>
                        <div className={styles.PromoAbout__answer_top}>
                          <Link href="https://web.prclub.pro/static/prclub_media_plan.xls">
                            <a>
                              <Button color={"dark"}>
                                <BodyNormal>Смотреть медиа-план</BodyNormal>
                              </Button>
                            </a>
                          </Link>
                          <LinkDown
                            to="boxFive"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            <div
                              onClick={() => {
                                setBoxFive(true);
                              }}
                            >
                              <Button color={"pink"}>
                                <BodyNormal>
                                  Что сделать, чтобы занять место?
                                </BodyNormal>
                              </Button>
                            </div>
                          </LinkDown>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className={styles.PromoAbout__default}></div>
              )}
              <Element name="boxFive"></Element>
              {boxFive ? (
                <div>
                  <section className={styles.PromoAbout__dialog}>
                    <div className={styles.PromoAbout__dialog_username}>
                      <BodyNormal>PR Bot</BodyNormal>
                    </div>
                    <div className={styles.PromoAbout__dialog_message}>
                      <HelioseXtcBold>
                        <Title>
                          — Это{" "}
                          <span className={styles.PromoAbout__paint}>
                            нереально выгодное
                          </span>{" "}
                          предложение, всего за $140 ты сможешь получить{" "}
                          <span className={styles.PromoAbout__paint}>
                            от 10 тыс. ЖИВЫХ подписчиков
                          </span>
                          <br />
                          <br />
                          Для этого тебе надо оплатить тариф не ниже SILVER и
                          помимо активности, сможешь еще заработать на
                          партнёрской программе и использовать другие
                          инструменты на платформе
                        </Title>
                      </HelioseXtcBold>
                    </div>
                    <div className={styles.PromoAbout__dialog_save}>
                      <Link href="/tariffs">
                        <a>
                          <Button color={"pink"}>
                            <BodyNormal>Смотреть тариф</BodyNormal>
                          </Button>
                        </a>
                      </Link>
                    </div>
                  </section>
                  <section className={styles.PromoAbout__dialog}>
                    <div className={styles.PromoAbout__dialog_username}>
                      <BodyNormal>PR Bot</BodyNormal>
                    </div>
                    <div className={styles.PromoAbout__dialog_message}>
                      <HelioseXtcBold>
                        <Title>
                          — А вот и контакт твоего инструктора, общайся дальше с
                          ним. А я пойду на подзарядку
                        </Title>
                      </HelioseXtcBold>
                      <br />
                      <div className={styles.PromoAbout__contacts}>
                        <div className={styles.PromoAbout__contacts_photo}>
                          <Image
                            loader={ImgLoader}
                            src={"/images/png/users/moderator.png"}
                            width={64}
                            height={64}
                          />
                        </div>
                        <div className={styles.PromoAbout__contacts_box}>
                          <div className={styles.PromoAbout__contacts_name}>
                            <Headline>
                              <div
                                className={
                                  styles.PromoAbout__contacts_name_options
                                }
                              >
                                Алексей Левин
                              </div>
                            </Headline>
                          </div>
                          <div className={styles.PromoAbout__contacts_social}>
                            <Link href={ContactsData.Levin.contact_instagram}>
                              <a
                                target={"_blank"}
                                className={
                                  styles.PromoAbout__contacts_social_box
                                }
                              >
                                <Image
                                  loader={ImgLoader}
                                  src={insta}
                                  width={21}
                                  height={21}
                                  alt={"Instagramm"}
                                />
                              </a>
                            </Link>
                            <Link href={ContactsData.Levin.contact_telegram}>
                              <a
                                target={"_blank"}
                                className={
                                  styles.PromoAbout__contacts_social_box
                                }
                              >
                                <Image
                                  loader={ImgLoader}
                                  src={telega}
                                  width={21}
                                  height={21}
                                  alt={"Telegramm"}
                                />
                              </a>
                            </Link>
                            <Link href={ContactsData.Levin.contact_whats_app}>
                              <a
                                target={"_blank"}
                                className={
                                  styles.PromoAbout__contacts_social_box
                                }
                              >
                                <Image
                                  loader={ImgLoader}
                                  src={whatsapp}
                                  width={21}
                                  height={21}
                                  alt={"Whats App"}
                                />
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className={styles.PromoAbout__default}>
                        <HelioseXtcBold>
                          <Title>
                            Хочешь стать партнером, то спроси у него как!
                          </Title>
                        </HelioseXtcBold>
                      </div>
                    </div>
                  </section>
                </div>
              ) : (
                <div className={styles.PromoAbout__default}></div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PromoAbout;
