import React from "react";
import { Title } from "../../../components";
import styles from "./WithdrawalMoney.module.scss";

type WithdrawalMoneyProps = {
  many: string;
  valuts: number;
};

const WithdrawalMoney: React.FC<WithdrawalMoneyProps> = ({ many, valuts }) => {
  const typeValuts = ["$", "₽", "€"];
  return (
    <div className={styles.WithdrawalMoney}>
      <div className={styles.WithdrawalMoney__head}>
        <Title>Вывод и перевод средств</Title>
      </div>
      <div className={styles.WithdrawalMoney__options}>
        <Title className={styles.Text__silver}>
          доступно {many} {typeValuts[valuts]}
        </Title>
      </div>
    </div>
  );
};

export default WithdrawalMoney;
