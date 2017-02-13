import React, {Component} from 'react';

class About extends Component {
    render() {
        console.log(typeof this.props.params.id)
        return (

             <div className='container'>
                <h3 style={{fontSize:'19px'}}>OUR SERVICES</h3>
                <p style={{fontSize:'15px', textShadow:'2px 2px white'}}>Our services include:</p>
                <ul style={{fontSize:'15px', textShadow:'2px 2px white'}}>
                <li>Search for a provider</li>
                <li>Manage customer accounts</li>
                <li>Email, notify, or make appointment</li>
                <li>Add or remove accounts</li>
                </ul>
                <h3 style={{fontSize:20}}>OUR GOALS</h3>
                <p style={{fontSize:'15px', textShadow:'2px 2px white'}}>
                With EMU search you can search your health care provider with one click. 
                It simplified the interaction between patients and providers; 
                ultimately making health care more personable, approachable and accessible.
                </p>
            </div>
        )
    }
}

export default About;