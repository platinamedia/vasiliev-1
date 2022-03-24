import { BodyBold, Title } from "../../../components";
import { useEffect, useState } from "react";

import styles from "./HistoryPayments.module.scss";
import { transferHistory } from "../../../api/transferHistory";

type HistoryPaymentsProps = {
  openStateWindow?: string;
};

type TransferHistory = {
  id?: number;
  card_number?: string;
  sum?: string;
  count?: string;
  status?: string;
  created_at?: Date;
  user?: number;
};

const HistoryPayments: React.FC<HistoryPaymentsProps> = () => {
  const [history] = transferHistory();
  const [transfers, setTransfers] = useState<TransferHistory[]>([]);

  useEffect(() => {
    if (!history) {
      return null;
    }
    try {
      if (history.length > 0) {
        setTransfers(history);
      }
    } catch (e) {
      console.log(e);
    }
  }, [history]);

  return (
    <>
      {transfers?.length > 0 && (
        <div className={styles.HistoryPayments}>
          <div className={styles.Header}>
            <Title>История операций</Title>
          </div>
          <div className={styles.Table}>
            <div className={styles.Table__header}>
              <div className={styles.Table__header_data}>
                <BodyBold>Дата</BodyBold>
              </div>
              <div className={styles.Table__header_sum}>
                <BodyBold>Сумма</BodyBold>
              </div>
              <div className={styles.Table__header_status}>
                <BodyBold>Статус</BodyBold>
              </div>
            </div>
            <div className={styles.Table__body}>
              {transfers?.map((item, i: number) => {
                return (
                  <div key={i} className={styles.Body}>
                    <div className={styles.Body__data}>
                      <BodyBold>{item.created_at}</BodyBold>
                    </div>
                    <div className={styles.Body__sum}>
                    <BodyBold>{item.sum}</BodyBold>
                    </div>
                    <div className={styles.Body__status}>
                      <BodyBold>{item.status}</BodyBold>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryPayments;
