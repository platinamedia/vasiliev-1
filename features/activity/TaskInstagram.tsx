import { HaypeRelease, UserAccount, UserOptions, UserTasks } from "./modules";

import { MyInstagram } from "..";
import styles from "./TaskInstagram.module.scss";
import { useUserContext } from "../../context/userContext";

const TaskInstagram: React.FC = () => {
  const { userState } = useUserContext();

  return (
    <div className={styles.TaskInstagram}>
      {userState && (
        <div className={styles.TaskInstagram__content}>
          {userState?.profile?.all_action_completed ? (
            <>
              <MyInstagram />
              <HaypeRelease />
            </>
          ) : (
            <>
              <UserAccount />
              <UserOptions />
              <UserTasks />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskInstagram;
