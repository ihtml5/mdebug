import React, { memo, useEffect, useState, useCallback } from 'react';
import { emitter } from '@/utils/emitter';
import styles from './settings.module.css';

const { on, off } = emitter;
const Settings = props => {
  const { updateSettings, settings } = props;
  const { mdevtools } = settings;
  const { heightRatio = 0.4, enableReactDevTools = false } = mdevtools;
  const [info, setInfo] = useState({
    heightRatio,
  });
  const updateMebug = useCallback(() => {
    updateSettings(info);
  }, [info, updateSettings]);
  useEffect(() => {
    on('settingsOk', updateMebug);
    return () => {
      off('settingsOk', updateMebug);
    };
  }, [info, updateMebug]);
  return (
    <div className={styles.mdebugSettings}>
      <div className={styles.mdebugSettingsAction}>
        <div className={styles.mdebugSettingsTitle}>Height Ratio:</div>
        <div className={styles.mdebugSettingsValue}>
          <input
            type="range"
            min="0"
            max="1"
            defaultValue={String(Math.max(0.4, heightRatio))}
            value={String(info.heightRatio)}
            step="0.1"
            orient="vertical"
            onChange={e =>
              setInfo(prevState => ({
                ...prevState,
                heightRatio: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className={styles.mdebugSettingsDetail}>{info.heightRatio}</div>
      </div>
      <div className={styles.mdebugSettingsAction}>
        <div className={styles.mdebugSettingsTitle}>Enable React Devtools:</div>
        <div>
          <input
            type="checkbox"
            id="enableReactDevTools"
            value="enableReactDevTools"
            defaultChecked={enableReactDevTools}
            onChange={e => {
              console.log('e', e.target.checked);
              setInfo(prevState => ({
                ...prevState,
                enableReactDevTools: e.target.checked,
              }))
            }}
          />
        </div>
      </div>
      <div className={styles.mdebugSettingsAction}>
        <div className={styles.mdebugSettingsTips}>Instructions for use: After selecting, click to confirm to take effect</div>
        </div>
    </div>
  );
};

export default memo(Settings);
