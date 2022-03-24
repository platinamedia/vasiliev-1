import ApplyPaymets from "./content/ApplyPaymets";
import ErrorPaymets from "./content/ErrorPaymets";
import { ModalUniversal } from "../../../components";
import Router from "next/router";
import { useState } from "react";

type PaymentStateProps = {
  content: string;
  onOpen: boolean;
};

const PaymentState: React.FC<PaymentStateProps> = ({ content, onOpen=false }) => {
  const [viewWindow, setViewWindow] = useState<boolean>(onOpen);

  const onClose = () => {
    setViewWindow(false);
    Router.replace("/tariffs");
  };

  return (
    <>
      <ModalUniversal onOpen={viewWindow}>
        <>
          {content === "apply_paymets" && <ApplyPaymets onClose={onClose} />}
          {content === "error_paymets" && <ErrorPaymets onClose={onClose} />}
        </>
      </ModalUniversal>
    </>
  );
};

export default PaymentState;
