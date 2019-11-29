import React from 'react';

interface Props { }
interface State { }
export default class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

