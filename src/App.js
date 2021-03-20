import React from 'react';
import Details from './Details';

class App extends React.Component {
  state = { amount: 10, pg: 30, vg: 70, flav: 0, nicBase: 72, nic: 0 };
  get ing() {
    let nic_ml, flav_ml, pg_ml, vg_ml;
    if (this.state.amount > 0 && this.state.pg >= 0 && this.state.vg >= 0 && this.state.flav >= 0 && this.state.nicBase >= 0 && this.state.nic >= 0) {
      if (this.state.nicBase > 0) {
        nic_ml = (this.state.nic * this.state.amount) / this.state.nicBase;
      } else {
        nic_ml = 0;
      }
      flav_ml = (this.state.flav / 100) * this.state.amount;
      pg_ml = ((this.state.pg - this.state.flav) / 100) * this.state.amount - nic_ml;
      vg_ml = (this.state.vg / 100) * this.state.amount;

      return { pg_ml, vg_ml, flav_ml, nic_ml };
    } else {
      nic_ml = 0;
      flav_ml = 0;
      pg_ml = 0;
      vg_ml = 0;
      
      return { pg_ml, vg_ml, flav_ml, nic_ml };
    }
  }
  render() {

    return (
      <div className="wrapper">
        <h1>Eliquid Mixer</h1>
        <form className="adder">
          <div className="ing">
            <label htmlFor="des-amount">Total Amount (ml):</label>
            <input id="des-amount" type="text" value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} />
          </div>
          <div className="ing">
            <label htmlFor="des-pg">PG Ratio (%):</label>
            <input id="des-pg" type="text" value={this.state.pg} onChange={e => this.setState({ pg: e.target.value })} />
          </div>
          <div className="ing">
            <label htmlFor="des-vg">VG Ratio (%):</label>
            <input id="des-vg" type="text" value={this.state.vg} onChange={e => this.setState({ vg: e.target.value })} />
          </div>
          <div className="ing">
            <label htmlFor="des-flav">Desired Flavour (%):</label>
            <input id="des-flav" type="text" value={this.state.flav} onChange={e => this.setState({ flav: e.target.value })} />
          </div>
          <div className="ing">
            <label htmlFor="nic-base">Nicotine Strength (mg):</label>
            <input id="nic-base" type="text" value={this.state.nicBase} onChange={e => this.setState({ nicBase: e.target.value })} />
          </div>
          <div className="ing">
            <label htmlFor="des-nic">Desired Strength (mg):</label>
            <input id="des-nic" type="text" value={this.state.nic} onChange={e => this.setState({ nic: e.target.value })} />
          </div>
        </form>
        <div className="container">
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>ml</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <Details
                ingredient="PG dilutant"
                ml={this.ing.pg_ml.toFixed(2)}
                percentage={parseFloat((this.ing.pg_ml / this.state.amount) * 100).toFixed(2)}
              />
              <Details
                ingredient="VG dilutant"
                ml={this.ing.vg_ml.toFixed(2)}
                percentage={parseFloat(this.state.vg).toFixed(2)}
              />
              <Details
                ingredient="Flavour"
                ml={this.ing.flav_ml.toFixed(2)}
                percentage={parseFloat(this.state.flav).toFixed(2)}
              />
              <Details
                ingredient={"Nicotine Base (" + this.state.nicBase + "mg)"}
                ml={this.ing.nic_ml.toFixed(2)}
                percentage={((this.ing.nic_ml / this.state.amount) * 100).toFixed(2)}
              />
            </tbody>
          </table>
        </div>
        <p>Note: Apart from VG dilutant, all the other ingredients should be PG based. Also make sure that the total ratio of VG and PG is 100%.</p>
      </div>
    );
  }
}

export default App;
