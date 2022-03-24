import { BodyNormal, ToggleList } from "../../../components";
import { useEffect, useState } from "react";

import styles from "./SideTable.module.scss";
import { visibleTariffs } from "../../../api/visibleTariffs";

type SideTableProps = {
  handleIndexValute: (e: number) => void;
  valuts: string[];
};

const SideTable: React.FC<SideTableProps> = ({ handleIndexValute, valuts }) => {
  const [visible] = visibleTariffs();

  const [indexValute, setIndexValute] = useState<number>(0);
  const [coiceValute, setCoiceValute] = useState<string>(valuts[0]);

  useEffect(() => {
    handleIndexValute(indexValute);
    setCoiceValute(valuts[indexValute]);
  }, [indexValute]);

  return (
    <>
      <ul>
        <li>
          <div className={styles.SideTable__item}></div>
        </li>
        {visible?.visible_subscription_term && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Срок подписки</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_subscribers_front && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Подписчики органические (живые) </BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_active_subscribers_front && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Активные подписчики</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_first_line_registration_front && (
          <li>
            <div className={styles.SideTable__item}>
              {/* Участники в структуру .. Участники в сообщество */}
              <BodyNormal>Участники в сообщество</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_subscriber_for_referral && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Подписчики за рефералов</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_commercial_accounts && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Коммерческие аккаунты</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_points_front && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>PR-баллы (cashback)</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_partner_program && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Партнерская программа</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_technology_to_increase && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>
                Технология увеличения подписчиков и активности
              </BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_marathon_training && (
          <li>
            <div className={styles.SideTable__item}>
              {/* Марафон-обучение .. Спринт KPI PR Club */}
              <BodyNormal>Спринт KPI PR Club</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_community_prclub && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>
                PR Community (взаимный пиар, реклама, бартер)
              </BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_hype_feed && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>
                Хайп-лента (автоматизация размещения постов)
              </BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_exemption_tasks && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>
                Освобождение от выполнения обязательных заданий
              </BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_closed_club && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Закрытый клуб PLATINUM</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_transferring_money && (
          <li>
            <div className={styles.SideTable__item}>
              <BodyNormal>Внутренние переводы</BodyNormal>
            </div>
          </li>
        )}
        {visible?.visible_view_price && (
          <li>
            <div className={styles.SideTable__item}>
              <div className={styles.SideTable__item_toggle}>
                <div>
                  <BodyNormal>Стоимость подписки</BodyNormal>
                </div>
                <div>
                  <ToggleList
                    list={valuts}
                    value={coiceValute}
                    updateData={(e) => {
                      setIndexValute(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default SideTable;
