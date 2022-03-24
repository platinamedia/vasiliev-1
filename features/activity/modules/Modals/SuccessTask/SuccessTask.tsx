import {
  BodyBold,
  BodyNormal,
  Button,
  Title,
  YesIcon,
} from "../../../../../components";

import styles from "./SuccessTask.module.scss";

type SuccessTaskProps = {
  onClose: () => void;
};

const SuccessTask: React.FC<SuccessTaskProps> = ({ onClose }) => {
  return (
    <div className={styles.Success}>
      <div className={styles.Success__icon}>
        <YesIcon />
      </div>
      <div className={styles.Success__header}>
        <Title>Все подписки выполнены!</Title>
      </div>
      <div className={styles.Success__subhead}>
        <BodyNormal>
          Теперь твой аккаунт участвует в распределении на подписки
        </BodyNormal>
      </div>
      <div className={styles.Success__box}>
        <div className={styles.label}>
          <BodyBold className={styles.text_black}>Бонус активирован!</BodyBold>
        </div>
        <div>
          <BodyNormal className={styles.text_black}>
            Следующие 20 участников подпишутся на твой Instagram
          </BodyNormal>
        </div>
      </div>
      <div className={styles.Success__btn}>
        <Button
          color={"white"}
          onClick={onClose}
          className={styles.Success__close}
        >
          Перейти в 🔥 ХАЙП ленту
        </Button>
      </div>
    </div>
  );
};

export default SuccessTask;
