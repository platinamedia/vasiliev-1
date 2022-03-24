import { useEffect, useMemo, useState } from "react";

import { BodyNormal } from "../../../components";
import TableAllItems from "./TableAllItems/TableAllItems";
import classNames from "classnames";
import styles from "./Community.module.scss";
import { userStructure } from "../../../api/userStructure";

const Community:React.FC = () => {
  const [structure] = userStructure();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!structure) return null;

    setData(structure[0]?.referrals[0].users);
  }, [structure]);

  return (
    <div className={styles.Clients}>
      <div className={styles.Table}>
        <div className={styles.Header}>
          <div className={styles.Header__level}>
            <TableCell>Уровни</TableCell>
          </div>
          <div className={styles.Header__progress}>
            <TableCell>ID</TableCell>
          </div>
          <div className={styles.Header__userName}>
            <TableCell>Имя Фамилия</TableCell>
          </div>
          <div className={styles.Header__tariff}>
            <TableCell>Тариф</TableCell>
          </div>
          <div className={styles.Header__contacts}>
            <TableCell>Контакты</TableCell>
          </div>
          <div className={styles.Header__subscribe}>
            <TableCell>Дата регистрации</TableCell>
          </div>
          {/* <div className={styles.Header__many}>
          <TableCell>Оборот</TableCell>
        </div> */}
        </div>
        <TableAllItems firstLevel={data} ids={0} level={1} />
      </div>
    </div>
  );
};

const TableCell: React.FC<{ [key: string]: any }> = (props) => (
  <div {...props} className={classNames(styles.Table__cell, props.className)}>
    <BodyNormal className={styles.MiniText}>{props.children}</BodyNormal>
  </div>
);

export default Community;
