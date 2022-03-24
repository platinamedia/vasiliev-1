import { Subheader } from "../../../components";
import styles from "./HaypeRelease.module.scss";

const HaypeRelease: React.FC = () => {
  return (
    <div className={styles.HaypeRelease}>
      <div className={styles.HaypeRelease__path}>
        <Subheader>
          Поздравляем с выполнением обязательного задания,
          <br />
          теперь твой аккаунт участвует в распределении подписчиков!
        </Subheader>
      </div>
      <div className={styles.HaypeRelease__path}>
        <Subheader>
          (готовим к релизу ХАЙП-ленту, которая скоро будет доступна в этом
          разделе)
        </Subheader>
      </div>
    </div>
  );
};

export default HaypeRelease;
