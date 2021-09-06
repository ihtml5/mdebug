import React, { memo } from 'react';
import { Features } from '@/constants/feature';
import styles from './detection.module.css';
import feature from 'feature.js';

const Detection = props => {
  return (
    <div className={styles.detectionCon}>
      <p>Detection Css and Javascript latest features</p>
      <table className={styles.mdebugDetection}>
        <tr className={styles.mdebugDetectionTh}>
          <td>Name</td>
          <td>Supported</td>
        </tr>
        {Features.map(item => (
          <tr className={styles.mdebugDetectionTr}>
            <td
              style={{
                color: 'rgb(40, 131, 233)',
                fontWeight: 700,
              }}>
              {item.name}
            </td>
            <td>{feature[item.name] ? '✅ ' : '❎ '}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default memo(Detection);
