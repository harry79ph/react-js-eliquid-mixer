import React from 'react';

class Details extends React.Component{
    
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