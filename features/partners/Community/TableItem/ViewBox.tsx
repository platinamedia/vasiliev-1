import { BodyBold, BodyNormal, Rotate } from "../../../../components";

import Image from "next/image";
import { ImgLoader } from "../../../../modules";
import styles from "./ViewBox.module.scss";

const ViewBox = ({ photo = null, date_joined, email }) => {
  return (
    <div className={styles.ViewBox}>
      <div className={styles.ViewBox__user}>
        <div className={styles.ViewBox__info}>
          <div className={styles.ViewBox__info_IMG}>
            {photo ? (
              <Image
                loader={ImgLoader}
                src={`data:image/jpeg;base64,${photo}`}
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
          <div className={styles.ViewBox__info_Reg}>
            <div className={styles.ViewBox__info_row}>
              <BodyNormal className={styles.User__info_conf}>
                Дата регистрации
              </BodyNormal>
            </div>
            <div className={styles.ViewBox__info_row}>
              <BodyBold className={styles.User__info_bold}>
                {date_joined}
              </BodyBold>
            </div>
          </div>
          <div className={styles.ViewBox__info_Vis}>
            <div className={styles.ViewBox__info_row}>
              <BodyNormal className={styles.User__info_conf}>
                {/* Последний визит */}
              </BodyNormal>
            </div>
            <div className={styles.ViewBox__info_row}>
              <BodyBold className={styles.User__info_bold}>
                {/* {client?.date_joined} */}
              </BodyBold>
            </div>
          </div>
          <div className={styles.ViewBox__info_Act}>
            <div>
              <BodyNormal className={styles.User__info_conf}>
                {/* Активаций */}
              </BodyNormal>
            </div>
            <div className={styles.ViewBox__info_row}>
              <BodyBold className={styles.User__info_bold}>{/* 0 */}</BodyBold>
            </div>
          </div>
          <div className={styles.ViewBox__info_Prt}>
            <div>
              <BodyNormal className={styles.User__info_conf}>
                {/* Партнёров */}
              </BodyNormal>
            </div>
            <div className={styles.ViewBox__info_row}>
              <BodyBold className={styles.User__info_bold}>{/* 1 */}</BodyBold>
            </div>
          </div>
          <div className={styles.ViewBox__info_Lvl}>
            <div className={styles.ViewBox__info_row}>
              <BodyNormal className={styles.User__info_conf}>
                {/* Уровней структуры */}
              </BodyNormal>
            </div>
            <div className={styles.ViewBox__info_row}>
              <BodyBold className={styles.User__info_bold}>{/* 1 */}</BodyBold>
            </div>
          </div>
        </div>
        <div className={styles.ViewBox__connect}>
          <div className={styles.ViewBox__connect_email}>
            <BodyNormal className={styles.MiniText}>
              <span className={styles.ViewBox__user_name}>{email}</span>
            </BodyNormal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBox;
