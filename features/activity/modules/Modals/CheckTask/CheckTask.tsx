import {
  BlockToolipMsg,
  BodyNormal,
  TimeIcon,
  Title,
  TooltipMessage,
} from "../../../../../components";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "next/image";
import { ImgLoader } from "../../../../../modules";
import copy from "/public/images/svg/copy.svg";
import { linkRef } from "../../../../../api/linkRef";
import styles from "./CheckTask.module.scss";

const CheckTask = () => {
  const [referr] = linkRef();

  return (
    <div className={styles.Check}>
      <div className={styles.Check__icon}>
        <TimeIcon />
      </div>
      <div className={styles.Check__header}>
        <Title>Идёт проверка</Title>
        <span className={styles["dot-elastic"]}></span>
      </div>
      <div className={styles.Check__subhead}>
        <BodyNormal>Обычно она занимает не более 2-х минут</BodyNormal>
      </div>
      <div className={styles.Check__box}>
        <div>
          <BodyNormal className={styles.text_black}>
            Чтобы получить больше подписчиков, приглашай новых участников.
          </BodyNormal>
        </div>
        <div className={styles.label}>
          <BodyNormal className={styles.text_black}>
            Твоя ссылка для приглашений
          </BodyNormal>
        </div>
        <div className={styles.Check__copy}>
          <TooltipMessage
            message={<BlockToolipMsg>Ссылка скопирована</BlockToolipMsg>}
          >
            <CopyToClipboard
              text={`${process.env.WEB_URL}/sign-up/${referr?.key}`}
            >
              <div className={styles.Check__copy_box}>
                <div className={styles.Check__copy_container}>
                  <div className={styles.Check__copy_link}>
                    <BodyNormal className={styles.text_silver}>
                      {`${process.env.WEB_URL}/sign-up/${referr?.key}`}
                    </BodyNormal>
                  </div>
                </div>
                <div className={styles.Check__copy_img}>
                  <Image
                    loader={ImgLoader}
                    src={copy}
                    width={20}
                    height={20}
                    alt="share"
                  />
                </div>
              </div>
            </CopyToClipboard>
          </TooltipMessage>
        </div>
      </div>
    </div>
  );
};

export default CheckTask;
