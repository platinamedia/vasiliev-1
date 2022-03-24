import {
  BodyNormal,
  Button,
  CloseModalIcon,
  ModalUniversal,
  Title,
} from "../../../components";
import { useEffect, useState } from "react";

import Router from "next/router";
import styles from "./ChoicePayment.module.scss";
import { usePopup } from "../../../lib/popup.hook";
import { useRoot } from "../../../lib/root.hook";
import { useUserContext } from "../../../context/userContext";

type ChoiceTariffProps = {
  choiceTariff?: number;
  statePay?: boolean;
  dataTariffs?: any;
};

const ChoicePayment: React.FC<ChoiceTariffProps> = ({
  choiceTariff,
  statePay,
  dataTariffs,
}) => {
  const { loading, request, error, success } = useRoot();
  const { setUserState, userState } = useUserContext();
  const { createSnack } = usePopup();
  const [conditionBalance, setConditionBalance] = useState<boolean>(null);
  const [open, setOpen] = useState<boolean>(statePay || false);
  const [manyBalance, setManyBalance] = useState<number>();
  const [typeTariff, setTypeTariff] = useState<string>("");
  const [ID, setID] = useState<number>(undefined);
  const [valuts, setValuts] = useState<number>(1);
  const [coast, setCoast] = useState<string>("");
  const typeValuts = ["$", "₽", "€"];

  useEffect(() => {
    if (coast === "" || manyBalance < 0) {
      return null;
    }
    const equalCoast = coast?.replace(/\s/g, "");
    if (parseInt(equalCoast) > manyBalance) {
      setConditionBalance(true);
    }
    if (parseInt(equalCoast) < manyBalance) {
      setConditionBalance(false);
    }
  }, [coast, manyBalance]);

  useEffect(() => {
    if (!userState) {
      return null;
    }
    try {
      setManyBalance(parseInt(userState?.profile?.balance));
    } catch (e) {
      console.log(e);
    }
  }, [userState]);

  useEffect(() => {
    if (choiceTariff) {
      setID(choiceTariff);
      setOpen(true);
    }
  }, [choiceTariff]);

  useEffect(() => {
    if (!dataTariffs) return null;

    const tariff = dataTariffs.find((item) => item.id === choiceTariff);
    if (tariff) {
      setTypeTariff(tariff.description);
      setCoast(tariff.final_price_in_currencies[1]);
    }
  }, [dataTariffs, choiceTariff]);

  const onSubmitCard = async (e) => {
    e.preventDefault();
    if (ID) {
      try {
        const res = await request(
          `${process.env.API_URL}/api/v1/products/${ID}/get-payment/`,
          "GET"
        );
        setOpen(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onSubmitBalance = async (e) => {
    e.preventDefault();
    if (ID) {
      try {
        const res = await request(
          `${process.env.API_URL}/api/v1/products/${ID}/get-payment/?type_pay=balance`,
          "GET"
        );
        setOpen(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (success) {
      if (success?.confirm_url?.link) {
        Router.push(success?.confirm_url?.link);
      }
      if (success?.id) {
        createSnack("Тариф оплачен успешно", "success");
      }
    }
    if (error) {
      if (error?.detail) {
        createSnack(error?.detail, "warning");
      }
    }
  }, [success, error]);

  return (
    <div>
      <ModalUniversal onOpen={open} layout={1000}>
        <>
          <div className={styles.ChoicePayment}>
            <div className={styles.ChoicePayment__content}>
              <div className={styles.ChoicePayment__close}>
                <div
                  onClick={() => setOpen(false)}
                  className={styles.ChoicePayment__close_x}
                >
                  <CloseModalIcon />
                </div>
              </div>
              <div className={styles.ChoicePayment__header}>
                <Title className={styles.Text__dark}>Тариф {typeTariff}</Title>
              </div>
              <div className={styles.ChoicePayment__pay}>
                <Title className={styles.Text__dark}>
                  Выбери способ оплаты
                </Title>
              </div>
              <div className={styles.ChoicePayment__balance}>
                <BodyNormal className={styles.Text__dark}>
                  На твоем балансе доступно {manyBalance} {typeValuts[valuts]}
                </BodyNormal>
              </div>
              <div className={styles.ChoicePayment__coast}>
                <BodyNormal className={styles.Text__dark}>
                  Стоимость тарифа {coast} {typeValuts[valuts]}
                </BodyNormal>
              </div>
              <div className={styles.ChoicePayment__btn}>
                <div className={styles.ChoicePayment__btn_pos1}>
                  <Button
                    color={"pink"}
                    className={styles.Btn_pay}
                    disabled={conditionBalance}
                    onClick={onSubmitBalance}
                  >
                    Баланс
                  </Button>
                </div>
                <div className={styles.ChoicePayment__btn_pos2}>
                  <Button
                    color={"pink"}
                    className={styles.Btn_pay}
                    onClick={onSubmitCard}
                  >
                    Оплатить картой
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      </ModalUniversal>
    </div>
  );
};

export default ChoicePayment;
