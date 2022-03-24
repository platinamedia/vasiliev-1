import {
  BodyNormal,
  Button,
  FlyDownRotateIcon,
  MobileValute,
  ModalWindowMessage,
  Rotate,
  SlideToMobile,
  Subheader,
  TableUnitAction,
  TooltipContainer,
  ViewСondition,
} from "../../../components";
import { useEffect, useState } from "react";

import Image from "next/image";
import { PrImgLoader } from "../../../modules";
import SideTable from "../SideTable/SideTable";
import styles from "./TariffsList.module.scss";
import { useUserContext } from "../../../context/userContext";
import { userTariffs } from "../../../api/userTariffs";
import { visibleTariffs } from "../../../api/visibleTariffs";

type TariffsListProps = {
  choiceID: (value: number) => void;
};

const TariffsList: React.FC<TariffsListProps> = ({ choiceID }) => {
  const [visible] = visibleTariffs();
  const { userState } = useUserContext();
  const [tariff] = userTariffs();
  const [indexTariff, setIndexTariff] = useState<number>(-1);
  const [yourTarrif, setYourTarrif] = useState<string>("");
  const [idTariff, setIdTariff] = useState<number>(null);
  const [surname, setSurname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [indexValute, setIndexValute] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(
    typeof window !== "undefined" && window.innerWidth > 650 ? true : false
  );
  const valuts = ["$", "₽", "€"];

  const handleClick = () => setOpen((prev) => !prev);
  const handleChoiceTariff = (id: number) => setIdTariff(id);

  useEffect(() => {
    if (idTariff) {
      choiceID(idTariff);
      setIdTariff(null);
    }
  }, [idTariff]);

  useEffect(() => {
    if (!userState) return null;

    setName(userState?.profile?.name || "");
    setSurname(userState?.profile?.surname || "");
    setYourTarrif(userState?.profile?.user_tariff?.tariff_type || "");
  }, [userState]);

  const YourTariff = (
    <div className={styles.YourTariff}>
      <BodyNormal>Твой тариф</BodyNormal>
    </div>
  );
  const SpecTariff = (
    <div className={styles.BlockSpecial__offer}>
      <BodyNormal className={styles.BlockSpecial__offer_em}>
        Участвует в ПРОМО
      </BodyNormal>
    </div>
  );
  const PopularTariff = (
    <div className={styles.BlockSpecial}>
      <BodyNormal className={styles.BlockSpecial_em}> Популярный </BodyNormal>
    </div>
  );

  useEffect(() => {
    if (tariff && yourTarrif) {
      tariff?.map((item, _index: number) => {
        if (yourTarrif === item.description) {
          setIndexTariff(_index);
        }
      });
    }
  }, [tariff, yourTarrif]);

  const TariffsItem = tariff?.map((lavel, i: number) => {
    return (
      <li key={i}>
        <div className={styles.TariffsList__item_mobile}>
          <div className={styles.SlideToMobile__Header}>
            <div className={styles.SlideToMobile__Box}>
              <div className={styles.SlideToMobile__Contener}>
                <div className={styles.SlideToMobile__IMG}>
                  <div className={styles.SlideToMobile__IMG_box}>
                    {lavel?.img_box && (
                      <Image
                        loader={PrImgLoader}
                        src={lavel?.img_box}
                        alt={lavel?.type_account}
                        height={160}
                        width={120}
                      />
                    )}
                  </div>
                  <div className={styles.SlideToMobile__IMG_filter}>
                    {lavel?.img_filter && (
                      <Image
                        loader={PrImgLoader}
                        src={lavel?.img_filter}
                        alt={lavel?.type_account}
                        height={170}
                        width={120}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.SlideToMobile__info}>
                  <div>{lavel?.popular && PopularTariff}</div>
                  <div className={styles.Info__head}>{lavel?.info_head}</div>
                  <div className={styles.Info__type}>{lavel?.type_account}</div>
                  <div className={styles.Info__effects}>
                    {lavel?.info_effects}
                  </div>
                  <div className={styles.Info__cost}>
                    {valuts[indexValute]}
                    {lavel?.final_price_in_currencies[indexValute]}
                  </div>
                  <div className={styles.Info__valuts}>
                    <MobileValute
                      list={valuts}
                      indexValute={indexValute}
                      handleMobileValuteIndex={(e) => setIndexValute(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.Mobile__Button}>
              <Button
                color={"dark"}
                onClick={handleClick}
                className={styles.Mobile__Button_options}
              >
                <div className={styles.Mobile__Button_content}>
                  <span className={styles.Text_gap}>Все о тарифе</span>
                  <Rotate rotate={open}>
                    <FlyDownRotateIcon />
                  </Rotate>
                </div>
              </Button>
            </div>
          </div>
        </div>
        {open ? (
          <div className={styles.TariffsToMobile__Body}>
            <div className={styles.TariffsToMobile__Body_wrapper}>
              <div
                className={
                  styles[`YourTarrif__${yourTarrif === lavel?.description}`]
                }
              >
                <div className={styles.TariffsList__list}>
                  <div className={styles.TariffsList__item_start}>
                    <div className={styles.Subheader__item}>
                      <div className={styles.Subheader__description}>
                        <Subheader>{lavel?.description}</Subheader>
                        {yourTarrif === lavel?.description ? (
                          <div>{YourTariff}</div>
                        ) : (
                          <div>{lavel?.promo && SpecTariff}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* "Срок подписки", */}
                  {visible?.visible_subscription_term && (
                    <>
                      <div className={styles.TariffsList__item}>
                        <div className={styles.TariffsList__item_row}>
                          <div className={styles.TariffsList__item_mobile}>
                            <BodyNormal>Срок подписки</BodyNormal>
                          </div>
                          <div className={styles.TariffsList__item_point}>
                            <ViewСondition>
                              {lavel?.subscription_term} дней
                            </ViewСondition>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {/* "Подписчики в инстаграмм -> Подписчики в Instagram", */}
                  {visible?.visible_subscribers_front && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>
                            Подписчики органические (живые)
                          </BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <>
                            {lavel?.old_subscribers_front ? (
                              <div className={styles.UnitActionsMin}>
                                <TableUnitAction
                                  newOfer={lavel?.subscribers_front}
                                  oldOfer={lavel?.old_subscribers_front}
                                />
                              </div>
                            ) : (
                              <ViewСondition>
                                {lavel?.subscribers_front}
                              </ViewСondition>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Активные подписчики - Технология “Револьвер -> Активные подписчики", */}
                  {visible?.visible_active_subscribers_front && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Активные подписчики</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          {lavel?.old_active_subscribers_front ? (
                            <div className={styles.UnitActionsMin}>
                              <TableUnitAction
                                newOfer={lavel?.active_subscribers_front}
                                oldOfer={lavel?.old_active_subscribers_front}
                              />
                            </div>
                          ) : (
                            <ViewСondition>
                              {lavel?.active_subscribers_front}
                            </ViewСondition>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Новые участники в структуру Технология “Револьвер ->
                   Участники в структуру", -> 
                   Участники в сообщество */}
                  {visible?.visible_first_line_registration_front && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Участники в сообщество</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          {lavel?.old_first_line_registration_front ? (
                            <div className={styles.UnitActionsMin}>
                              <TableUnitAction
                                newOfer={lavel?.first_line_registration_front}
                                oldOfer={
                                  lavel?.old_first_line_registration_front
                                }
                              />
                            </div>
                          ) : (
                            <ViewСondition>
                              {lavel?.first_line_registration_front}
                            </ViewСondition>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Подписчики за рефералов" */}
                  {visible?.visible_subscriber_for_referral && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Подписчики за рефералов</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>
                            {lavel?.subscriber_for_referral}
                          </ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Коммерческие аккаунты", */}
                  {visible?.visible_commercial_accounts && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Коммерческие аккаунты</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>
                            {lavel?.commercial_accounts}
                          </ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* "PR-Баллы", */}
                  {visible?.visible_points_front && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>PR-баллы (cashback)</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>{lavel?.points_front}</ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Партнерская программа" */}
                  {visible?.visible_partner_program && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Партнерская программа</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <>
                            {lavel?.id !== 10 ? (
                              <TooltipContainer
                                divs={
                                  <div className={styles.InfoLavel}>
                                    {/* {lavel.info_level} */}
                                  </div>
                                }
                              >
                                <div className={styles.BoxPositionLavel}>
                                  <div>
                                    <BodyNormal>
                                      {lavel?.partner_program}
                                    </BodyNormal>
                                  </div>
                                  <div>
                                    <ViewСondition
                                      className={styles.BoxPositionLavel__img}
                                    >
                                      <svg
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20C16.0228 20 20.5 15.5228 20.5 10ZM2 10C2 5.30558 5.80558 1.5 10.5 1.5C15.1944 1.5 19 5.30558 19 10C19 14.6944 15.1944 18.5 10.5 18.5C5.80558 18.5 2 14.6944 2 10ZM10.125 10.9121C10.0111 11.2266 9.94954 11.6549 9.94043 12.1973H11.2051C11.2051 11.5046 11.3714 10.9736 11.7041 10.6045L12.4492 9.86621C13.1875 9.09147 13.5566 8.30534 13.5566 7.50781C13.5566 6.70117 13.3151 6.06771 12.832 5.60742C12.3535 5.14258 11.6836 4.91016 10.8223 4.91016C9.99284 4.91016 9.31836 5.13802 8.79883 5.59375C8.28385 6.04492 8.02181 6.63965 8.0127 7.37793H9.27734C9.27734 6.96322 9.41862 6.63281 9.70117 6.38672C9.98372 6.14062 10.3574 6.01758 10.8223 6.01758C11.3008 6.01758 11.6654 6.1543 11.916 6.42773C12.1667 6.69661 12.292 7.07031 12.292 7.54883C12.292 8.04557 12.1006 8.51042 11.7178 8.94336L10.8223 9.86621C10.4714 10.249 10.2389 10.5977 10.125 10.9121ZM10.0703 13.8516C9.94727 13.9883 9.88574 14.1592 9.88574 14.3643C9.88574 14.5693 9.94727 14.7402 10.0703 14.877C10.1979 15.0091 10.3848 15.0752 10.6309 15.0752C10.877 15.0752 11.0638 15.0091 11.1914 14.877C11.319 14.7402 11.3828 14.5693 11.3828 14.3643C11.3828 14.1592 11.319 13.9883 11.1914 13.8516C11.0638 13.7103 10.877 13.6396 10.6309 13.6396C10.3848 13.6396 10.1979 13.7103 10.0703 13.8516Z"
                                          fill="#8B97AE"
                                        />
                                      </svg>
                                    </ViewСondition>
                                  </div>
                                </div>
                              </TooltipContainer>
                            ) : (
                              <ViewСondition>
                                {lavel?.partner_program}
                              </ViewСondition>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Технология увеличения подписчиков и активности", */}
                  {visible?.visible_technology_to_increase && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>
                            Технология увеличения подписчиков и активности
                          </BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>
                            {lavel?.technology_to_increase}
                          </ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Марафон-обучение", "Спринт KPI PR Club"*/}
                  {visible?.visible_marathon_training && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Спринт KPI PR Club</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>
                            {lavel?.marathon_training}
                          </ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "PR Community (взаимный пиар, реклама, бартер)", */}
                  {visible?.visible_community_prclub && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>
                            PR Community (взаимный пиар, реклама, бартер)
                          </BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>
                            {lavel?.community_prclub}
                          </ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Хайп-лента (автоматизация размещения постов)", */}
                  {visible?.visible_hype_feed && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>
                            Хайп-лента (автоматизация размещения постов)
                          </BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>{lavel?.hype_feed}</ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Освобождение от выполнения обязательных заданий",  */}
                  {visible?.visible_exemption_tasks && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>
                            Освобождение от выполнения обязательных заданий
                          </BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>
                            {lavel?.exemption_tasks}
                          </ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Закрытый клуб для топовых партнеров->Закрытый клуб PLATINUM", */}
                  {visible?.visible_closed_club && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Закрытый клуб PLATINUM</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>{lavel?.closed_club}</ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Перевод денег между пользователями -> Внутренние переводы", */}
                  {visible?.visible_transferring_money && (
                    <div className={styles.TariffsList__item}>
                      <div className={styles.TariffsList__item_row}>
                        <div className={styles.TariffsList__item_mobile}>
                          <BodyNormal>Внутренние переводы</BodyNormal>
                        </div>
                        <div className={styles.TariffsList__item_point}>
                          <ViewСondition>
                            {lavel?.transferring_money}
                          </ViewСondition>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* "Стоимость за весь срок подписки" */}
                  <div className={styles.Visible_desctop}>
                    {visible?.visible_view_price && (
                      <div className={styles.TariffsList__item}>
                        <div className={styles.TariffsList__item_row}>
                          <div className={styles.TariffsList__item_point}>
                            <>
                              {lavel?.difference && lavel?.new_ofer ? (
                                <div className={styles.TariffsList__item_offer}>
                                  <Subheader>{lavel?.difference}</Subheader>
                                  <TableUnitAction
                                    newOfer={lavel?.new_ofer}
                                    oldOfer={lavel?.subscription_period}
                                  />
                                </div>
                              ) : (
                                // <ViewСondition>{lavel?.view_price}</ViewСondition>
                                <ViewСondition>
                                  {
                                    lavel?.final_price_in_currencies[
                                      indexValute
                                    ]
                                  }
                                  {" " + valuts[indexValute]}
                                </ViewСondition>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.TariffsList__item_buy}>
                    <>
                      {lavel?.id === 10 ? (
                        <div className={styles.BuyTraffic}>
                          <div className={styles.BuyTraffic_Item}></div>
                        </div>
                      ) : surname && name ? (
                        i <= indexTariff ? null : (
                          <Button
                            color={"pink"}
                            className={styles.Btn_options}
                            onClick={
                              surname &&
                              name &&
                              handleChoiceTariff.bind(this, lavel.id)
                            }
                          >
                            Оплатить
                          </Button>
                        )
                      ) : (
                        <ModalWindowMessage
                          openContent={
                            i <= indexTariff ? null : (
                              <Button color={"pink"}>Оплатить</Button>
                            )
                          }
                        />
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <>
          <div className={styles.TariffsToMobile__Body_Pay}>
            {lavel?.id === 10 ? (
              <div className={styles.BuyTraffic}>
                <div className={styles.BuyTraffic_Item}></div>
              </div>
            ) : surname && name ? (
              i <= indexTariff ? null : (
                <>
                  <Button
                    color={"pink"}
                    onClick={
                      surname &&
                      name &&
                      handleChoiceTariff.bind(this, lavel?.id)
                    }
                  >
                    Оплатить
                  </Button>
                </>
              )
            ) : (
              <ModalWindowMessage
                openContent={
                  i <= indexTariff ? null : (
                    <Button color={"pink"}>Оплатить</Button>
                  )
                }
              />
            )}
          </div>
        </>
      </li>
    );
  });

  return (
    <>
      <div className={styles.Container__desktop}>
        <div className={styles.Content__desktop}>
          <div className={styles.Table}>
            <div className={styles.Table__wrapper}>
              <div className={styles.Table__tariff}>Что входит в тариф</div>
              <div className={styles.Table__header}>
                {/* {headerTable.map((head, i: number) => { */}
                {tariff?.map((head, i: number) => {
                  return (
                    <div key={i} className={styles.Table__header_subheader}>
                      <div className={styles.Subheader}>
                        <div className={styles.Subheader__content}>
                          <div className={styles.Subheader__content_img}>
                            <div className={styles.Subheader__content_img_set}>
                              <Image
                                loader={PrImgLoader}
                                src={head?.img_box}
                                alt={head?.type_account}
                                // height={242}
                                // width={196}
                                // loader={PrImgLoader}
                                // src={head.imgBlockType}
                                height={140}
                                width={112}
                              />
                            </div>
                            <div
                              className={styles.Subheader__content_img_filter}
                            >
                              <Image
                                loader={PrImgLoader}
                                src={head?.img_filter}
                                alt={head?.type_account}
                                height={158}
                                width={153}
                                // loader={ImgLoader}
                                // src={head.imgFilterType}
                                // width={300}
                                // height={200}
                              />
                            </div>
                          </div>
                          <div className={styles.Subheader__content_value}>
                            <Subheader>{head.info_head}</Subheader>
                            <div>{head.type_account && PopularTariff}</div>
                            <BodyNormal>{head.info_effects}</BodyNormal>
                          </div>

                          {/* 
                          <div className={styles.Info__head}>{lavel?.info_head}</div>
                          <div className={styles.Info__type}>{lavel?.type_account}</div>
                          <div className={styles.Info__effects}>{lavel?.info_effects}</div>    
                          */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.Table__side}>
                <SideTable
                  handleIndexValute={(e) => {
                    setIndexValute(e);
                  }}
                  valuts={valuts}
                />
              </div>
              <div className={styles.Table__content}>
                <ul className={styles.TariffsList__desktop}>{TariffsItem}</ul>
              </div>
              <div className={styles.Table__footer}>
                <div className={styles.DefaultNull}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className={styles.TariffsList__mobile}>
        <SlideToMobile>{TariffsItem}</SlideToMobile>
      </ul>
    </>
  );
};

export default TariffsList;
