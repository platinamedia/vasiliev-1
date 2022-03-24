import { useEffect, useState } from "react";

import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import TableItem from "../TableItem/TableItem";
import axios from "axios";
import styles from "./GetStructureID.module.scss";
import { useAuth } from "../../../../lib/auth.hook";
import useSWR from "swr";

type GetStructureIDProps = {
  ids: number;
  level: number;
};

const GetStructureID: React.FC<GetStructureIDProps> = ({ ids, level }) => {
  const [dataList, setDataList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  const fetcher = (url) =>
    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    }).then((r) => r.data);

  const { data, error } = useSWR<any>(
    `${process.env.API_URL}/api/v1/structure/${ids}/`,
    fetcher
  );

  useEffect(() => {
    try {
      if (!data) {
        setLoading(!error && !data);
        return null;
      }
      setLoading(false);
      setDataList(data);
    } catch (e) {
      return null;
    }
  }, [data, error]);

  return (
    <div className={styles.AllItem}>
      <div className={styles.LinearProgress}>
        {loading && <LinearProgress />}
      </div>

      <Collapse in={!!dataList && !loading}>
        {dataList?.users?.length > 0 &&
          dataList?.users?.map((user, i: number) => {
            return (
              <div key={i}>
                <TableItem user={user} level={level} />
              </div>
            );
          })}
      </Collapse>
    </div>
  );
};

export default GetStructureID;
