import { BodyNormal, Button, NoIcon, Title } from "../../../../components";

import styles from "./ErrorPaymets.module.scss";

type ErrorPaymetsProps = {
  onClose: () => void;
};

const ErrorPaymets: React.FC<ErrorPaymetsProps> = ({ onClose }) => {
  return (
    <>
      <div>
        <div className={styles.Modal__content}>
          <div className={styles.Modal__container}>
            <div className={styles.Modal__content_img}>
              <NoIcon />
            </div>
            <div className={styles.Modal__content_title}>
              <Title>Эх! Ошибка!</Title>
            </div>
            <div className={styles.Apply__Instagram}>
              <div className={styles.Modal__content_text}>
                <BodyNormal>Повторите снова</BodyNormal>
              </div>
              <div className={styles.Button}>
                <Button
                  color={"white"}
                  onClick={onClose}
                  className={styles.Button__close}
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPaymets;
