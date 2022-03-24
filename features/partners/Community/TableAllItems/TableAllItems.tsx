import { useEffect, useState } from "react";

import GetStructureID from "../GetStructureID/GetStructureID";
import TableItem from "../TableItem/TableItem";
import styles from "./TableAllItems.module.scss";

type TableAllItemsProps = {
  ids: number;
  level: number;
  firstLevel?: any;
};

const TableAllItems: React.FC<TableAllItemsProps> = ({
  ids,
  level,
  firstLevel = null,
}) => {
  const [firstLevelID, setFirstLevelID] = useState<any>(null);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (!ids) return null;

    setId(ids);
  }, [ids]);

  useEffect(() => setFirstLevelID(firstLevel), [firstLevel]);

  return (
    <div className={styles.AllItem}>
      {level > 1 && id > 0 && <GetStructureID ids={id} level={level} />}
      {level === 1 &&
        firstLevelID?.map((user, i) => {
          return (
            <div key={i}>
              <TableItem user={user} level={1} />
            </div>
          );
        })}
    </div>
  );
};

export default TableAllItems;
