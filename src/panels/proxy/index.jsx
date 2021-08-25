import React, { PureComponent } from 'react';
import styles from './proxy.module.css';
import { getProxyRules, setProxyRules } from '@/utils/url';
import ShowMore from '@/components/showmore';
import { emitter } from '@/utils/emitter';

const { trigger: emit, on } = emitter;
class ProxyAPI extends PureComponent {
    constructor(props) {
        super(props);
        const proxyrules = getProxyRules();
        this.state = {
            storage: Object.keys(getProxyRules()).map(pruleKey => ({
                key: pruleKey,
                value: proxyrules[pruleKey],
                comment: '',
            })),
            expandIndex: [],
            curKey: '',
            canEdit: false,
            editKey: '',
            editValue: '',
            editComment: '',
        };
    }
    updateLog(data = {}) {
        const { key, value } = data;
        const { storage } = this.state;
        this.setState({
            storage: [...storage, {
                key,
                value,
            }],
        })
    }
    componentDidMount() {
        on('proxy', this.updateLog);
        on('proxyAdd', () => {
            const { storage } = this.state;
            this.setState({
                storage: [...storage, {
                    key: '',
                    value: '',
                }],
                canEdit: true,
            })
        });
    }
    onSelectTabHandler(tabName) {
        this.props.onSelectTab(tabName);
        this.setState({
            tabName,
            storage: this.getStorage(tabName),
            curKey: ''
        })
    }
    getSubSelected(curTabName) {
        const { storageType } = this.props;
        if (curTabName === storageType) {
            return styles.mdebugSubSelected;
        }
        return;
    }
    onChange(e) {
        this.props.onSetKeywords({
            proxyapi: e.currentTarget.value
        });
    }
    cellClickHandler(e) {
        this.setState({
            curKey: e.currentTarget.id,
        })
    }
    deleteAll() {
        emit('clearproxy');
        this.setState({
            storage: []
        });
    }
    delete(flag) {
        const { curKey, storage } = this.state;
        const key = curKey ? curKey : storage[0].key;
        const index = storage.findIndex(item => item.key === key)
        if (flag) return;
        const item = storage[index];
        setProxyRules(item.key, void 0);
        storage.splice(index, 1);
        this.setState({
            storage: [...storage],
            curKey: ''
        });
    }
    edit() {
        const { canEdit, curKey, editKey, editValue, storage, editComment } = this.state;
        const index = storage.findIndex(item => item.key === curKey)
        if (!curKey && !canEdit) return;
        const key = editKey || storage[index].key;
        const value = editValue || storage[index].value;
        const comment = editComment || storage[index].comment;
        if (canEdit) {
            this.delete(true)
            setProxyRules(key, value);
            storage[index].key = key
            storage[index].value = value
            storage[index].comment = comment;
            this.setState({
                curKey: '',
            })
        }
        this.setState({
            storage: [...storage],
            canEdit: !canEdit
        })
    }
    setEditKey(e) {
        this.setState({
            editKey: e.currentTarget.value
        })
    }
    setEditInput(e, key) {
        this.setState({
            [key]: e.currentTarget.value
        })
    }
    
    render() {
        const { storage, curKey, canEdit } = this.state;
        const { keywords = {} } = this.props;
        const { proxyapi: proxyAPIWords } = keywords;
        const hasStorage = storage.length > 0;
        return (<div className={styles.mdebugActionApplicationCon} style={{
                    border: hasStorage ? undefined : 'none',
                }}>
                    
            <div className={styles.mdebugFixedHeader}>
                <div className={styles.settings}>
                    <input type="text" placeholder="filter proxy rules" onChange={this.onChange.bind(this)} className={styles.applicationinput} value={proxyAPIWords} />
                    <div className={styles.allDelete} onClick={() => this.deleteAll()}>
                        <img src="data:image/png;base64,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" alt="" style={{width: '14px'}}/>
                    </div>
                    <div className={styles.delete} onClick={() => this.delete()}>
                        <img src="data:image/png;base64,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" alt=""style={{width: '11px'}} />
                    </div>
                    <div className={styles.mdebugEdit} onClick={() => this.edit()}>
                        {
                            canEdit ? <img src="data:image/png;base64,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" alt="" className={styles.editImg} />
                                : <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACF0lEQVRYR+2XzytlURzAP281C7EbCysbm1FqYmFJKSuaxbCxGmFhIStbzz9gwUoSyYqmyDQyo0jNkF+lUEopv6VElFKi7+t7dLrdy7nn3mEzp16v++475/M533Pu93tPhndumQC/FigD8jy9DoGhkL5fgHxgDji179sCWaDbE2x3+waM6A+fgFGgXK9PgE5gwnQwAjXA7xTgMkQFsA4IfBwoBbb12yDqgB9yYQTagAG92wWsesrcRMAbgSqgF/gATAP1toAd/uC+iOsSnLnAd6wlMVHJcQwsLQFXuCyRLFWqAq7w78DX4CZMGgFX+KTCH9IUcIXLxpOZ34flAd8IuMJ/KvwuuKOTbEJX+KzCb8MeJ18BV7ikXgn7tQUf1pzQDsz4CLjC5xV+GZj5o173ANm4Aq7wRYVfhITdW8AV/kfhZxEp1FtgCajUwhKVXpcVfvxC/vYSKAb2rUGluomENJPbpYDJhjt4pXh4CTQBY0AH0KcAkZAm5XZD4bZklIeXwCDQApQAn3XWBrCp8D3HsuklcASc65uMvLZJbZe2pfBdR7j8LbaAvCPKLE2TdDqjn79WrXd1iC1QAEwBKwpdcCWl/Rgm5D53jx2BtMBmnP8CoRFotk401UDSjRa1bPL4SpWUJkmt31RDObmspb3Yr4wn+eRX8GjWChS9gUjuXUA4wUPIR6ABKPxHEldaTZ+PgUlPQYk9nwAoYrQhi63MxgAAAABJRU5ErkJggg==" className={styles.editImg} alt=""/>
                        }
                    </div>
                </div>
            </div>
            <div>
                {hasStorage && <ul className={styles.mdebugApplicationHeaderUl}>
                        <li className={styles.mdebugApplicationHeaderKeyName}>Domain(原始域名)</li>
                        <li className={styles.mdebugApplicationHeaderValueName}>Target(代理域名, 修改后请手动刷新页面生效)</li>
                    </ul>}
                <table
                    className={hasStorage ? styles.mdebugApplication : styles.mdebugApplicationNone}
                    style={{
                        border: hasStorage ? undefined : 'none',
                    }}>
                {storage.filter(cstorage => {
                        const { key, value, comment } = cstorage;
                        return !proxyAPIWords
                        || key.toLowerCase().indexOf(proxyAPIWords.toLowerCase()) !== -1
                        || value.toLowerCase().indexOf(proxyAPIWords.toLowerCase()) !== -1
                        || comment.toLowerCase().indexOf(proxyAPIWords.toLowerCase()) !== -1;
                    }).map(storageUnit => {
                        const { key, value } = storageUnit;
                        return ( <tr key={storageUnit.key} id={storageUnit.key} className={`${styles.mdebugApplicationTr} ${curKey === storageUnit.key && styles.mdebugTrActive}`} onClick={(e) => this.cellClickHandler(e)}>
                            <td className={styles.mdebugApplicationKeyName} style={{
                                boder: '1px solid  #eee',
                            }}>
                                {
                                    key === curKey && canEdit ? (
                                        <input type="text" defaultValue={key} className={styles.mdebugEditInput} onChange={(e) => this.setEditInput(e, 'editKey')} />
                                    ) : (
                                        <ShowMore key={key}>{key}</ShowMore>
                                    )
                                }
                            </td>
                            <td className={styles.mdebugApplicationValueName}>
                                {
                                    key === curKey && canEdit ? (
                                        <input type="text" defaultValue={value} className={styles.mdebugEditInput} onChange={(e) => this.setEditInput(e, 'editValue')} />
                                    ) : (
                                        <ShowMore>{value}</ShowMore>
                                    )
                                }
                            </td>
                        </tr>);
                    })}
                </table>
            </div>
        </div>);
    }
}

export default ProxyAPI;