import React, { Component, Fragment } from 'react';
import styles from '@/App.module.css';
import { Header, PanelCon } from '@/modules';
import Applicaton from '@/modules/application';
import Settings from '@/panels/settings';
import Elements from '@/panels/elements';
import Detection from '@/panels/detection';
import ProxyAPI from '@/modules/proxy';
import System from '@/modules/system';
import Mperformance from '@/modules/performance';
import Toolbar from '@/modules/toolbar';
import Network from '@/modules/network';
import Console from '@/modules/console';
import LockScroll from '@/components/lockscroll';
import { __DEV__ } from '@/utils';
import { connect } from 'react-redux';
import { setMdevTools } from '@/reducers/settings';
import { emitter } from '@/utils/emitter';
import { noop } from '@/utils/shared';
import { sessionLog } from '@/constants';
import { clearProxyRules } from '@/utils/url';
import Draggable from 'react-draggable';
import { addNetworkLog } from '@/utils/network';
import { updateTab, filterTab } from './reducers/tab';

const { trigger: emit, on, off } = emitter;
const documentHeight = document.documentElement.clientHeight;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDebug: __DEV__,
      deltaPosition: {
        x: 0,
        y: 0,
      },
      mdebugHeight: documentHeight * 0.4 + 'px',
    };
    this.updatePlugin = this.updatePlugin.bind(this);
  }
  updatePlugin(plugin) {
    const { onUpdateTab = noop } = this.props;
    const { plugins = [] } = this.state;
    const { id, name, enName, component } = plugin;
    // 判断是否是合格的插件
    const isValidPlugin = id && name && enName && typeof component === 'function';
    // 判断插件是否已经加载过
    const isLoaded = plugins.some(plug => plug.id === id);
    if (isValidPlugin && !isLoaded) {
      const tabs = [plugin];
      onUpdateTab(tabs);
      // 触发tab更新
      emit('addTab', { tabs });
      this.setState({
        plugins: [...plugins, plugin],
      });
    }
  }
  removePlugin(pluginId) {
    const { onRemoveTab = noop } = this.props;
    onRemoveTab(pluginId);
    emit('removeTab', pluginId);
  }
  componentDidMount() {
    const { options = {}, onUpdateTab = noop } = this.props;
    const { plugins } = options || {};

    // 更新tabs
    const loadedPlugins = Array.isArray(plugins)
      ? plugins
          .map(plugin => {
            const { id, name, enName, component } = plugin;
            const isValidPlugin = id && name && enName && typeof component === 'function';
            return isValidPlugin
              ? {
                  id,
                  name,
                  enName,
                  component,
                }
              : undefined;
          })
          .filter(plugin => plugin)
      : false;
    this.setState({
      plugins,
    });

    if (loadedPlugins && loadedPlugins.length > 0) {
      const tabs = loadedPlugins.map(loadedPlugin => {
        const { id, name, enName } = loadedPlugin;
        return {
          id,
          name,
          enName,
        };
      });
      onUpdateTab(tabs);
      emit('addTab', { tabs });
    }
    // 绑定监听事件
    on('network', data => addNetworkLog(data));
    on('console', data => sessionLog.push(data));
    on('addPlugin', plugin => this.updatePlugin(plugin));
    on('removePlugin', pluginId => this.removePlugin(pluginId));
    on('clearproxy', () => {
      clearProxyRules();
    });
  }
  componentWillUnmount() {
    // 绑定监听事件
    off('network');
    off('console');
    off('addPlugin', plugin => this.updatePlugin(plugin));
    off('removePlugin', pluginId => this.removePlugin(pluginId));
  }
  render() {
    const { plugins = [], isDraging, deltaPosition, mdebugHeight } = this.state;
    const { mdevtools, onShowDebug, options = {}, dispatch = noop, globalState = {} } = this.props;
    const { showDebug } = mdevtools;
    const { containerId = '' } = options || {};
    return (
      <Fragment>
        {
          <Draggable
            onStart={() => {
              this.startTime = new Date().getTime();
              if (isDraging) {
                this.setState({
                  isDraging: false,
                });
              }
            }}
            position={{
              x: deltaPosition.x,
              y: deltaPosition.y,
            }}
            onStop={() => {
              this.endTime = new Date().getTime();
              const deltaTime = this.endTime - this.startTime;
              const isNoMouseDown = deltaTime > 300;
              this.setState(
                {
                  isDraging: isNoMouseDown ? true : false,
                },
                () => {
                  if (!isNoMouseDown) {
                    onShowDebug({
                      showDebug: isDraging ? false : true,
                    });
                  }
                },
              );
              return true;
            }}
            onDrag={(event, ui) => {
              const { x, y } = this.state.deltaPosition;
              this.setState({
                isDraging: isDraging || true,
                deltaPosition: {
                  x: x + ui.deltaX,
                  y: y + ui.deltaY,
                },
              });
            }}>
            <div
              className={styles.mdebugBtn}
              style={{
                display: !showDebug ? undefined : 'none',
              }}>
              mdebug
            </div>
          </Draggable>
        }
        <div
          className={`${styles.mdebugCon} ${containerId}`}
          style={{
            display: !showDebug ? 'none' : undefined,
          }}>
          {showDebug ? <LockScroll /> : null}
          <div
            className={showDebug ? styles.mdebugMask : styles.mdebugMaskNone}
            onClick={() =>
              onShowDebug({
                showDebug: false,
              })
            }
          />
          <div
            className={styles.mdebug}
            style={{
              display: showDebug ? 'block' : 'none',
              height: mdebugHeight,
            }}>
            <Draggable
              axis="y"
              onDrag={(e, ui) => {
                this.setState({
                  mdebugHeight: documentHeight - e.clientY + 'px',
                });
              }}>
              <div className={styles.mdebugResize}></div>
            </Draggable>
            <Header options={options} />
            <PanelCon id={'mdebugSystem'}>
              <System />
            </PanelCon>
            <PanelCon id={'mdebugConsole'}>
              <Console />
            </PanelCon>
            <PanelCon id={'mdebugElements'}>
              <Elements />
            </PanelCon>
            <PanelCon id={'mdebugNetwork'}>
              <Network />
            </PanelCon>
            <PanelCon id={'mdebugApplication'}>
              <Applicaton />
            </PanelCon>
            <PanelCon id={'mdebugSettings'}>
              <Settings />
            </PanelCon>
            <PanelCon id={'mdebugDetection'}>
              <Detection />
            </PanelCon>
            <PanelCon id={'mdebugPerformance'}>
              <Mperformance />
            </PanelCon>
            <PanelCon id={'mdebugProxy'}>
              <ProxyAPI />
            </PanelCon>
            {Array.isArray(plugins) &&
              plugins.map(plugin => {
                const { id, name, enName } = plugin;
                const PluginComponent = plugin.component;
                return (
                  <PanelCon id={id}>
                    <PluginComponent
                      dispatch={dispatch}
                      globalState={globalState}
                      info={{ id, name, enName }}
                    />
                  </PanelCon>
                );
              })}
            <Toolbar options={options} />
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    mdevtools: state.settings.mdevtools,
    globalState: { ...state },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowDebug: data => {
      const { showDebug } = data || {};
      dispatch(setMdevTools(data));
      emit(showDebug ? 'show' : 'hide');
    },
    onUpdateTab: data => dispatch(updateTab(data)),
    onRemoveTab: data => dispatch(filterTab(data)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
