import { BodyNormal, Button, NoIcon, Title } from "../../../../../components";

import styles from "./ErrorTask.module.scss";

type ErrorTaskProps = {
  onClose: () => void;
};

const ErrorTask: React.FC<ErrorTaskProps> = ({ onClose }) => {
  return (
    <div className={styles.Error}>
      <div className={styles.Error__icon}>
        <NoIcon />
      </div>
      <div className={styles.Error__header}>
        <Title>Упс... Есть пропущенные задания</Title>
      </div>
      <div className={styles.Error__subhead}>
        <BodyNormal>Пожалуйста, выполни все подписки</BodyNormal>
      </div>
      <div className={styles.Error__btn}>
        <Button
          color={"white"}
          onClick={onClose}
          className={styles.Error__close}
        >
          Хорошо
        </Button>
      </div>
    </div>
  );
};

export default ErrorTask;
