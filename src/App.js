import React from 'react';
import Details from './Details';

class App extends React.Component {
  
  state = { amount: 10, pg: 30, vg: 70, flav: 0, nicBase: 72, nic: 0 };
  
  get ing() {
    let nic_ml, flav_ml, pg_ml, vg_ml, warning = '';
    if (this.state.amount > 0 && this.state.pg >= 0 && this.state.vg >= 0 && this.state.flav >= 0 && this.state.nicBase >= 0 && this.state.nic >= 0) {
      if (this.state.nicBase > 0) nic_ml = (this.state.nic * this.state.amount) / this.state.nicBase;
      else nic_ml = 0;
      flav_ml = (this.state.flav / 100) * this.state.amount;
      if (parseInt(this.state.pg) + parseInt(this.state.vg) !== 100) {
        [pg_ml, vg_ml] = [0, 0];
        warning = 'Please make sure that the total ratio of VG and PG is 100%.';
      } else {
        pg_ml = ((this.state.pg - this.state.flav) / 100) * this.state.amount - nic_ml;
        vg_ml = (this.state.vg / 100) * this.state.amount;
        if (pg_ml < 0) warning = 'Please increase PG ratio.';
        else warning = '';
      }
    } else [nic_ml, flav_ml, pg_ml, vg_ml] = [0, 0, 0, 0];
    return { pg_ml, vg_ml, flav_ml, nic_ml, warning };
  }
  
  render() {
    const items = [
      { desc: 'Total Amount (ml):', name: 'amount', value: this.state.amount, key: 1 },
      { desc: 'PG Ratio (%):', name: 'pg', value: this.state.pg, key: 2 },
      { desc: 'VG Ratio (%):', name: 'vg', value: this.state.vg, key: 3 },
      { desc: 'Desired Flavour (%):', name: 'flav', value: this.state.flav, key: 4 },
      { desc: 'Nicotine Strength (mg):', name: 'nicBase', value: this.state.nicBase, key: 5 },
      { desc: 'Desired Strength (mg):', name: 'nic', value: this.state.nic, key: 6 }
    ];
    const handleChange = (e) =>  {
      let name = e.target.name;
      let value =  e.target.value;
      this.setState({[name]: value});
    }
    const list = items.map((item, key) => {
      return (
        <div className="ing" key={key}>
          <label htmlFor={item.name}>{item.desc}</label>
          <input name={item.name} type="text" value={item.value} onChange={handleChange} />
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
        <p style={{ fontWeight: "bold" }}>{this.ing.warning}</p>
        <p>Note: Apart from VG dilutant, all the other ingredients should be PG based.</p>
      </div>
    );
  }
}

export default App;
