import React from 'react';

class Details extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props);//it will call the log before the component is mounted
    }
    render(){
        
        return (
            <tr>
                <td>{this.props.ingredient}</td>
                <td>{this.props.ml}</td>
                <td>{this.props.percentage}</td>
            </tr>
        );
    }
}

export default Details;