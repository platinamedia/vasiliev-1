import { ChangeAccount, CheckTask, ErrorTask, SuccessTask } from "./Modals";
import { useEffect, useState } from "react";

import { ModalUniversal } from "../../../components";

type ModalContentProps = {
  content: "change_account" | "task_check" | "task_success" | "task_error";
  onOpen: boolean;
  valueID?: number;
  handleClearID?: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({
  onOpen = false,
  content,
  valueID,
  handleClearID,
}) => {
  const [viewWindow, setViewWindow] = useState<boolean>(onOpen);
  
  const onClose = () => {
    setViewWindow(false);
  };

  const onCloseAndClearID = () => {
    setViewWindow(false);
    handleClearID();
  };

  return (
    <>
      <ModalUniversal onOpen={viewWindow}>
        <>
          {content === "task_check" && <CheckTask />}
          {content === "task_success" && <SuccessTask onClose={onClose} />}
          {content === "task_error" && <ErrorTask onClose={onClose} />}
          {content === "change_account" && (
            <ChangeAccount onClose={onCloseAndClearID} valueID={valueID} />
          )}
        </>
      </ModalUniversal>
    </>
  );
};

export default ModalContent;
