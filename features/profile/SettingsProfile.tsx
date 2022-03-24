import ChangeProfile from "./SettingsProfile/ChangeProfile";
import { ViewProfile } from ".";
import { useState } from "react";

const SettingsProfile: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const onDisabledHandle = (onDisabled: boolean) => setDisabled(onDisabled);
  const offDisabledHandle = (offDisabled: boolean) => setDisabled(offDisabled);

  return (
    <>
      {disabled ? (
        <ViewProfile offDisabledHandle={offDisabledHandle} />
      ) : (
        <ChangeProfile onDisabledHandle={onDisabledHandle} />
      )}
    </>
  );
};

export default SettingsProfile;
