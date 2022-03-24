import { Button, Headline, Subheader } from "../../components";

import Router from "next/router";
import styles from "./NotFound.module.scss";
import { useUserContext } from "../../context/userContext";

const NotFound: React.FC = () => {
  const { userState } = useUserContext();

  return (
    <>
      <div className={styles.ErrorPage}>
        <div className={styles.ErrorPage__header}>
          <Headline className={styles.Text_darkblue}>Ошибка</Headline>
        </div>
        <div className={styles.ErrorPage__subheader}>
          <Headline className={styles.Text_darkblue}>404</Headline>
        </div>
        <div className={styles.ErrorPage__headline}>
          <Headline>Ой, тут ничего нет</Headline>
        </div>
        <div className={styles.ErrorPage__text}>
          <Subheader>Может и не было, а может перенесено</Subheader>
        </div>
        <div className={styles.ErrorPage__button}>
          <Button
            color={"pink"}
            onClick={() =>
              Router.push(`/${userState ? process.env.FIRST_PAGE : ""}`)
            }
            flyImg={true}
          >
            Вернитесь на Главную
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
