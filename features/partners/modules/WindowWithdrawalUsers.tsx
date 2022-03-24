import { BodyNormal, Button, Input } from "../../../components";
import { createRef, useEffect, useState } from "react";

import Image from "next/image";
import { ImgLoader } from "../../../modules";
import InputMask from "react-input-mask";
import Link from "next/link";
import classNames from "classnames";
import styles from "./WindowWithdrawalUsers.module.scss";
import { transferHistory } from "../../../api/transferHistory";
import { typeAccount } from "../../../lib/typeAccount.hook";
import { usePopup } from "../../../lib/popup.hook";
import { useRoot } from "../../../lib/root.hook";
import { useUserContext } from "../../../context/userContext";

const WindowWithdrawalUsers: React.FC = () => {
  const { createSnack } = usePopup();
  const { setUserState, userState } = useUserContext();
  const InputRef = createRef();
  const { request, error, success } = useRoot();
  const [history, { mutate }] = transferHistory();
  const [balence, setBalence] = useState<number>(undefined);
  const { checkTarrifs } = typeAccount();
  const [sumMoneyForUser, setSumMoneyForUser] = useState<number>(undefined);
  const [conditionManey, setConditionManey] = useState<boolean>(true);
  const [conditionEmail, setConditionEmail] = useState<boolean>(true);
  const [maxBalanceInput, setMaxBalanceInput] = useState<boolean>(false);
  const [emailUser, setEmailUser] = useState<string>("");

  useEffect(() => {
    if (!userState) return null;
    try {
      setBalence(parseInt(userState?.profile?.balance));
    } catch (e) {
      console.log(e);
    }
  }, [userState]);

  useEffect(() => {
    if (!sumMoneyForUser || sumMoneyForUser < 1) {
      setConditionManey(true);
    }
    if (sumMoneyForUser > 0) {
      setConditionManey(false);
    }
  }, [sumMoneyForUser]);

  useEffect(() => {
    if (emailUser !== "") {
      const email_validate = (emailUser) => {
        let re = {
          emailUser:
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        };
        const validate = re.emailUser.test(emailUser);

        if (validate !== false) {
          setConditionEmail(false);
        } else {
          setConditionEmail(true);
        }
      };
      email_validate(emailUser);
    }
  }, [emailUser]);

  const isErrorInput = (sumMoney) => {
    if (sumMoney > balence) {
      return styles.Input__sumMoneyForUser_red || "";
    }
  };

  useEffect(() => {
    if (sumMoneyForUser > balence) {
      setMaxBalanceInput(true);
    }
    if (sumMoneyForUser < balence) setMaxBalanceInput(false);
  }, [sumMoneyForUser, balence]);

  const handleChangeSumMoney = (e) => {
    e.preventDefault();
    setSumMoneyForUser(parseInt(e.target.value) || undefined);
  };

  const handleChangeEmailUser = (e) => {
    e.preventDefault();
    setEmailUser(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMaxBalanceInput(false);
    if (emailUser && sumMoneyForUser) {
      const body = {
        target_email: emailUser,
        count: sumMoneyForUser,
      };

      try {
        const data = await request(
          `${process.env.API_URL}/api/v1/transfer-balance/`,
          "POST",
          body
        );
      } catch (e) {
        setSumMoneyForUser(NaN);
        console.log(e);
      }
    }
    setSumMoneyForUser(NaN);
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
    if (success) {
      if (success?.info) {
        createSnack(success?.info, "success");
        mutate(history);
      }
    }
  }, [error, success]);
  return (
    <>
      <div className={styles.maxBalanceInput}>
        {maxBalanceInput && (
          <BodyNormal className={styles.Input__sumMoneyForUser_red}>
            На вашем балансе не достаточно средств
          </BodyNormal>
        )}
      </div>

      <div className={styles.WindowWithdrawalUsers}>
        {checkTarrifs ? (
          <>
            <InputMask
              maskChar={null}
              mask="99999999"
              ref={InputRef}
              value={sumMoneyForUser}
              onChange={handleChangeSumMoney}
            >
              {(inputProps) => (
                <Input
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={11}
                  type="text"
                  name="text"
                  placeholder="Сумма вывода"
                  className={classNames(
                    styles.Input__sumMoneyForUser,
                    isErrorInput(sumMoneyForUser)
                  )}
                />
              )}
            </InputMask>
            <div className={styles.Label}>
              <div className={styles.Label__item}>
                <BodyNormal>Комиссии за перевод нет</BodyNormal>
              </div>
            </div>
            <Input
              autoComplete="off"
              maxLength={39}
              type="email"
              name="email"
              placeholder="Эл. почта пользователя"
              className={styles.Input__email}
              onChange={handleChangeEmailUser}
            />
            <div className={styles.Label}>
              <div className={styles.Label__item}>
                <BodyNormal>Перевод придёт мгновенно</BodyNormal>
              </div>
            </div>
            <Button
              color={"pink"}
              className={styles.Button_post}
              onClick={onSubmit}
              disabled={
                conditionManey ||
                conditionEmail ||
                balence < 1 ||
                balence === NaN ||
                balence === undefined
              }
            >
              Отправить
            </Button>
          </>
        ) : (
          <>
            <div className={styles.CheckTarrifs}>
              <div className={styles.CheckTarrifs}>
                <div className={styles.CheckTarrifs__content}>
                  <Image
                    loader={ImgLoader}
                    src={"/images/svg/attention.svg"}
                    alt={"Attention!"}
                    height={24}
                    width={24}
                  />
                  <BodyNormal>
                    Перевод возможен только на тарифах PLATINUM, GOLD и SILVER
                  </BodyNormal>
                  <div className={styles.CheckTarrifs__content_btn}>
                    <Link href={"/tariffs"}>
                      <a>
                        <BodyNormal>Тарифы</BodyNormal>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WindowWithdrawalUsers;
