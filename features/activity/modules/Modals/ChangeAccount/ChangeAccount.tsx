import {
  BodyNormal,
  Button,
  CloseModalIcon,
  Title,
} from "../../../../../components";

import styles from "./ChangeAccount.module.scss";
import { useEffect } from "react";
import { usePopup } from "../../../../../lib/popup.hook";
import { useRoot } from "../../../../../lib/root.hook";
import { userActual } from "../../../../../api/userActual";

type ChangeAccountProps = {
  onClose: () => void;
  valueID: number;
};

const ChangeAccount: React.FC<ChangeAccountProps> = ({ onClose, valueID }) => {
  const { loading, request, error, success } = useRoot();
  const [actual, { mutate }] = userActual();
  const { createSnack } = usePopup();

  const onSubmitIdUser = async (valueID) => {
    if (valueID) {
      try {
        const data = await request(
          `${process.env.API_URL}/api/v1/actions/${valueID}/replace-action/`,
          "POST"
        );
        onClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (error) {
      if (error?.detail) {
        createSnack(error?.detail, "warning");
      }
      if (error?.info) {
        createSnack(error?.info, "warning");
      }
    }

    if (success?.info) {
      mutate(undefined, true);
      createSnack(success?.info, "success");
    }
  }, [error, success]);

  return (
    <div className={styles.Account}>
      <div className={styles.Close}>
        <div className={styles.Close__position}>
          <button className={styles.Button__close} onClick={onClose}>
            <CloseModalIcon />
          </button>
        </div>
      </div>
      <div className={styles.Account__header}>
        <Title className={styles.text_black}>Проблема с аккаунтом?</Title>
      </div>
      <div className={styles.Account__message}>
        <BodyNormal className={styles.text_black}>
          Бывает, что аккаунты закрыты или больше не существуют, и для
          выполнения активности ты можешь заменить этот аккаунт на другой
        </BodyNormal>
      </div>
      <div className={styles.Account__btn}>
        <Button
          color={"pink"}
          onClick={() => onSubmitIdUser(valueID)}
          className={styles.Account__close}
        >
          Заменить аккаунт
        </Button>
      </div>
    </div>
  );
};

export default ChangeAccount;
