import { Block, BodyNormal, Button, Title } from "../../components";

import Image from "next/image";
import { ImgLoader } from "../../modules";
import Link from "next/link";
import left_back from "/public/images/svg/left_back.svg";
import styles from "./MessagePassword.module.scss";

type MessagePasswordProps = {
  email: string;
  againSendHandler: (back: boolean) => void;
};

const MessagePassword: React.FC<MessagePasswordProps> = ({
  email,
  againSendHandler,
}) => {
  const changeEmailHandler = () => {
    againSendHandler(false);
  };

  return (
    <Block>
      <div className={styles.MessagePassword}>
        <div
          onClick={changeEmailHandler}
          className={styles.MessagePassword__back}
        >
          <Image
            loader={ImgLoader}
            src={left_back}
            width={18}
            height={20}
            alt={"Back"}
            priority
          />
        </div>
        <div className={styles.MessagePassword__header}>
          <Title>Новый пароль выслан</Title>
        </div>
        <div className={styles.MessagePassword__text}>
          <BodyNormal>
            На адрес {email} отправлено письмо. Кликни на ссылку в письме для
            смены пароля
          </BodyNormal>
        </div>
        <div className={styles.MessagePassword__button}>
          <Link href="/">
            <a>
              <Button color="pink" className={styles.Button_options}>
                <BodyNormal>Вернуться на вход</BodyNormal>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </Block>
  );
};

export default MessagePassword;
