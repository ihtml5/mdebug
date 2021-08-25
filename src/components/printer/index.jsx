import React, { PureComponent } from 'react';
import ShowMore from '@/components/showmore';
import { isString, isUndefined } from '@/utils/shared';
import { toArrayObject } from '@/utils/object';
import { Inspector } from 'react-inspector';
import styles from './printer.module.css';


class MdebugPrinter extends PureComponent {
    formate(value) {
        try {
            if (toArrayObject(value)) {
                const arrayObjectValue = toArrayObject(value);
                return <Inspector data={arrayObjectValue}/>
            }
            if (isString(value)) {
                return <ShowMore>{value}</ShowMore>
            }
            if (isUndefined(value)) {
                return "undefined";
            }
            if (typeof value === 'boolean') {
                return String(value);
            }
            if (typeof value === 'number') {
                return value;
            }
            if (typeof value === 'object' && `${value}` === 'null') {
                return 'null';
            }
            return value.toString();
        } catch (err) {
            return String(value);
        }
    }
    render() {
        const { data } = this.props;
        if (Array.isArray(data)) {
            const isMultiValue = data.length > 1;
            return data.map(value => this.formate(value)).map((formatterValue, index) => <div className={styles.mdebugConsoleMultiValue} key={index} style={{
                borderBottom: isMultiValue ? '1px solid #eee' : undefined,
                paddingBottom: isMultiValue ? '3px' : undefined,
            }}>{isMultiValue ? <div className={styles.mdebugConsoleIndexValue}>
                <div className={styles.mdebugConsoleIndex}>{index + 1}.</div>
                <div>{formatterValue}</div>
                </div> : formatterValue}</div>);
        };
        return null;
    }
}

export default MdebugPrinter;