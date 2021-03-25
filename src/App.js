import React from 'react';
import Details from './Details';

class App extends React.Component {
  
  state = { amount: 10, pg: 30, vg: 70, flav: 0, nicBase: 72, nic: 0, };
  warning = '';
  
  get ing() {
    let nic_ml, flav_ml, pg_ml, vg_ml;
    if (this.state.amount > 0 && this.state.pg >= 0 && this.state.vg >= 0 && this.state.flav >= 0 && this.state.nicBase >= 0 && this.state.nic >= 0) {
      if (this.state.nicBase > 0) {
        nic_ml = (this.state.nic * this.state.amount) / this.state.nicBase;
      } else {
        nic_ml = 0;
      }
      flav_ml = (this.state.flav / 100) * this.state.amount;
      if (parseInt(this.state.pg) + parseInt(this.state.vg) !== 100) {//setState coercing from number to string so I had to use parseInt
        [pg_ml, vg_ml] = [0, 0];
        this.warning = 'Please make sure that the total ratio of VG and PG is 100%.';
      } else {
        pg_ml = ((this.state.pg - this.state.flav) / 100) * this.state.amount - nic_ml;
        vg_ml = (this.state.vg / 100) * this.state.amount;
        if (pg_ml < 0) {
          this.warning = 'Please increase the PG ratio.';
        } else {
          this.warning = '';
        }
      }
      return { pg_ml, vg_ml, flav_ml, nic_ml };
    } else {
      [nic_ml, flav_ml, pg_ml, vg_ml] = [0, 0, 0, 0];
      return { pg_ml, vg_ml, flav_ml, nic_ml };
    }
  }
  
  render() {
    const items = [
      { desc: 'Total Amount (ml):', id: 'des-amount', value: this.state.amount,
      inputHandler: e => this.setState({ amount: e.target.value }), key: 1 },
      { desc: 'PG Ratio (%):', id: 'des-pg', value: this.state.pg,
      inputHandler: e => this.setState({ pg: e.target.value }), key: 2 },
      { desc: 'VG Ratio (%):', id: 'des-vg', value: this.state.vg,
      inputHandler: e => this.setState({ vg: e.target.value }), key: 3 },
      { desc: 'Desired Flavour (%):', id: 'des-flav', value: this.state.flav,
      inputHandler: e => this.setState({ flav: e.target.value }), key: 4 },
      { desc: 'Nicotine Strength (mg):', id: 'nic-base', value: this.state.nicBase,
      inputHandler: e => this.setState({ nicBase: e.target.value }), key: 5 },
      { desc: 'Desired Strength (mg):', id: 'des-nic', value: this.state.nic,
      inputHandler: e => this.setState({ nic: e.target.value }), key: 6 }
    ];
    const list = items.map((item, key) => {
      return (
        <div className="ing" key={key}>
          <label htmlFor={item.id}>{item.desc}</label>
          <input id={item.id} type="text" value={item.value} onChange={item.inputHandler} />
        </div>
      );
    });
    return (
      <div className="wrapper">
        <h1>Eliquid Mixer</h1>
        <form className="adder">
          {list}
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
                percentage={parseFloat((this.ing.nic_ml / this.state.amount) * 100).toFixed(2)}
              />
            </tbody>
          </table>
        </div>
        <p style={{ fontWeight: "bold" }}>{this.warning}</p>
        <p>Note: Apart from VG dilutant, all the other ingredients should be PG based.</p>
      </div>
    );
  }
}

export default App;
