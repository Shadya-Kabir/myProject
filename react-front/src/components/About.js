import React, {Component} from 'react';

class About extends Component {
    render() {
        console.log(typeof this.props.params.id)
        return (

             <div>
                <h2>test testThis is About Page</h2>
            </div>
        )
    }
}

export default About;