import React, { PureComponent } from 'react';
import { getSysInfo } from '@/utils/ua';
import qs from 'qs';
import { TRANSLATE } from '@/constants';
import styles from './system.module.css';
import { copyToClip } from '@/utils/copy';

class System extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            viewport: {
                vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
                vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
            },
            screen: {
                width: window.screen.width,
                height: window.screen.height,
            }
        };
        this.copy = this.copy.bind(this);
        this.getViewport = this.getViewport.bind(this);
    }
    copy(text) {
        const copyResult = copyToClip(text);
        this.setState({
            result: copyResult ? '成功' : '失败',
            text,
            show: true, 
        });
        setTimeout(() => this.setState({
            show: false,
        }), 2000);
    }
    getViewport() {
        this.setState({
            viewport: {
                vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
                vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
            },
            screen: {
                width: window.screen.width,
                height: window.screen.height,
            }  
        })
    }
    componentDidMount() {
        window.addEventListener('resize', this.getViewport);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.getViewport);
    }
    render() {
        const { show, result, text, viewport, screen } = this.state;
        const { vw, vh } = viewport;
        const { width, height } = screen;
        const { system = {} } = this.props;
        const { page = {} } = system || {};
        const { ua } = page || {};
        const browserOs = getSysInfo(ua);
        const { openid, tbkt } = qs.parse(window.location.search.slice(1));
        return <div>
            <ul className={styles.mdebugSystem}>
                <li onClick={() => this.copy(window.location.href)}><div className={styles.mdebugSystemKeyName}>{TRANSLATE('URL').en}: </div> <div className={styles.mdebugSystemFlexValueName}>{window.location.href}</div></li>
                <li onClick={() => this.copy(navigator.userAgent)}><div className={styles.mdebugSystemKeyName}>UA: </div> <div className={styles.mdebugSystemFlexValueName}>{navigator.userAgent}</div></li>
                <li>
                    <span className={styles.mdebugSystemKeyName} onClick={() => this.copy(browserOs.os.name)}>Os: </span> {browserOs.os.name}
                    <span className={styles.mdebugSystemKeyName} onClick={() => this.copy(browserOs.browser.name)}>Browser: </span>
                    {browserOs.browser.name}
                    <span className={styles.mdebugSystemValueName}>{browserOs.browser.version}</span>
                </li>
                <li>
                    <span className={styles.mdebugSystemKeyName} onClick={() => this.copy(browserOs.os.name)}>ViewPort: </span>
                    <span className={styles.mdebugSystemValueName}>{vw} * {vh}</span>
                </li>
                <li>
                    <span className={styles.mdebugSystemKeyName} onClick={() => this.copy(browserOs.browser.name)}>Screen: </span>
                    <span className={styles.mdebugSystemValueName}>{width} * {height}</span>
                    </li>
                    <li>
                    <span className={styles.mdebugSystemKeyName} onClick={() => this.copy(browserOs.browser.name)}>PixelRatio: </span>
                    <span className={styles.mdebugSystemValueName}>{window.devicePixelRatio}</span>
                </li>
                {openid && <li onClick={() => this.copy(openid)}>
                    <span className={styles.mdebugSystemKeyName}>Openid: </span>
                    <span className={styles.mdebugSystemValueName}>{openid}</span>
                </li>}
                {tbkt && <li onClick={() => this.copy(tbkt)}>
                    <span className={styles.mdebugSystemKeyName}>Tbkt: </span>
                    <span className={styles.mdebugSystemValueName}>{String(tbkt).toUpperCase()}</span>
                </li>}
                <li style={{
                    display: !show ? 'none' : undefined,
                }}>
                    <span className={styles.mdebugCopyResult}>
                        拷贝{result}: {`"${text}"`}
                    </span>
                </li>
            </ul>
        </div>;
    }
}

export default System;