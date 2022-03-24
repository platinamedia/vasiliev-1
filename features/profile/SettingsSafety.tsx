import ChangePassword from "./SettingsPass/ChangePassword";
import OldPassword from "./SettingsPass/OldPassword";
import { useState } from "react";

const SettingsSafety: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const onDisabledHandle = (onDisabled: boolean) => setDisabled(onDisabled);
  const offDisabledHandle = (offDisabled: boolean) => setDisabled(offDisabled);

  return (
    <>
      {disabled ? (
        <OldPassword offDisabledHandle={offDisabledHandle} />
      ) : (
        <ChangePassword onDisabledHandle={onDisabledHandle} />
      )}
    </>
  );
};

export default SettingsSafety;
