import { BodyNormal, Button, CopyText, Input } from "../../../components";
import { createRef, useEffect, useState } from "react";

import InputMask from "react-input-mask";
import classNames from "classnames";
import styles from "./WindowWithdrawalOfMoney.module.scss";
import { transferHistory } from "../../../api/transferHistory";
import { usePopup } from "../../../lib/popup.hook";
import { useRoot } from "../../../lib/root.hook";
import { useUserContext } from "../../../context/userContext";

const WindowWithdrawalOfMoney: React.FC = () => {
  const { createSnack } = usePopup();
  const { setUserState, userState } = useUserContext();
  const InputRef = createRef();
  const { loading, request, error, success } = useRoot();
  const [conditionManey, setConditionManey] = useState<boolean>(true);
  const [sumMoney, setSumMoney] = useState<number>(undefined);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [checkState, setCheckState] = useState<boolean>(false);
  const [balence, setBalence] = useState<number>(undefined);
  const [maxBalanceInput, setMaxBalanceInput] = useState<boolean>(false);
  const [history, { mutate }] = transferHistory();

  useEffect(() => {
    if (!userState) return null;
    try {
      setBalence(parseInt(userState?.profile?.balance));
    } catch (e) {
      console.log(e);
    }
  }, [userState]);

  useEffect(() => {
    if (sumMoney > balence) {
      setMaxBalanceInput(true);
    }
    if (sumMoney < balence) setMaxBalanceInput(false);
  }, [sumMoney, balence]);

  const isErrorInput = (sumMoney) => {
    if (sumMoney > balence) {
      return styles.Input__sumMoney_red || "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMaxBalanceInput(false);
    if (cardNumber && sumMoney) {
      const body = {
        card_number: cardNumber,
        sum: sumMoney,
      };
      try {
        const data = await request(
          `${process.env.API_URL}/api/v1/withdrawal/`,
          "POST",
          body
        );
      } catch (e) {
        setSumMoney(NaN);
        console.log(e);
      }
    }
    setSumMoney(NaN);
  };

  useEffect(() => {
    if (!sumMoney || sumMoney < 1) {
      setConditionManey(true);
    }
    if (sumMoney > 0) {
      setConditionManey(false);
    }
  }, [sumMoney]);

  useEffect(() => {
    if (error) {
      if (error?.non_field_errors?.length > 0) {
        createSnack(error?.non_field_errors[0], "warning");
      }
    }

    if (success) {
      createSnack("Заявка на вывод средств принята", "success");
      mutate(history);
    }
  }, [error, success]);
  return (
    <>
      <div className={styles.maxBalanceInput}>
        {maxBalanceInput && (
          <BodyNormal className={styles.Input__sumMoney_red}>
            На вашем балансе не достаточно средств
          </BodyNormal>
        )}
      </div>
      <div className={styles.WindowWithdrawalOfMoney}>
        <InputMask
          maskChar={null}
          mask="99999999"
          ref={InputRef}
          value={sumMoney}
          onChange={(e) => setSumMoney(parseInt(e.target.value) || undefined)}
        >
          {() => (
            <Input
              inputMode="numeric"
              autoComplete="off"
              name="text"
              maxLength={11}
              type="text"
              placeholder="Сумма вывода"
              className={classNames(
                styles.Input__sumMoney,
                isErrorInput(sumMoney)
              )}
            />
          )}
        </InputMask>
        <div className={styles.Label}>
          <div className={styles.Label__item}>
            <BodyNormal>Меньше 5 000 руб. - 7% комиссия +30 руб.</BodyNormal>
          </div>
          <div className={styles.Label__item}>
            <BodyNormal>Более 5 000 руб. - 5% комиссия +30 руб.</BodyNormal>
          </div>
        </div>
        <div className={styles.Credit}>
          <InputMask
            maskChar={null}
            mask="9999 9999 9999 9999"
            ref={InputRef}
            onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
          >
            {() => (
              <Input
                inputMode="numeric"
                autoComplete="off"
                maxLength={20}
                type="text"
                name="text"
                placeholder="0000  0000  0000  0000"
                className={styles.Input__cardNumber}
              />
            )}
          </InputMask>
        </div>
        <div className={styles.Label}>
          <div className={styles.Label__item}>
            <BodyNormal>
              Вывод доступен на карты Visa, Mastercard (Россия, Белоруссия,
              Украина, Казахстан)
            </BodyNormal>
          </div>
          <div className={styles.Label__item}>
            <BodyNormal>Вывод денег — по четвергам</BodyNormal>
          </div>
          <div className={styles.Label__item}>
            <BodyNormal>Заявки принимаются до среды (0:00 мск)</BodyNormal>
          </div>
          <div className={styles.Label__item}>
            <BodyNormal>Вывод занимает 1—3 дня</BodyNormal>
          </div>
          <div className={styles.Label__item}>
            <div>
              <BodyNormal>Есть вопросы? Пиши&nbsp;</BodyNormal>
            </div>
            <CopyText
              copyString={"finance@prclub.pro"}
              notification={"Email cкопирован"}
              viewCopyString={true}
            ></CopyText>
          </div>
        </div>
        <Button
          color={"pink"}
          className={styles.Button_post}
          onClick={onSubmit}
          disabled={
            conditionManey ||
            cardNumber.length < 16 ||
            checkState ||
            balence < 1 ||
            balence === NaN ||
            balence === undefined
          }
        >
          Отправить
        </Button>
      </div>
    </>
  );
};

export default WindowWithdrawalOfMoney;
