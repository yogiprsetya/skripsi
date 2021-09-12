import React from 'react';

const State = {
  dataConfig: {}
}

const listeners = new Set();

function updateComponent() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export const setStore = async dir => {
  const data = await dir;
  State.dataConfig = data;
  updateComponent();
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      dataConfig: State.dataConfig
    }

    _listener = () => {
      this.setState({
        dataConfig: State.dataConfig
      })
    }

    componentDidMount() {
      listeners.add(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          dataConfig={this.state.dataConfig}
        />
      )
    }
  }
}
