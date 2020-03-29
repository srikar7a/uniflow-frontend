import React from 'react';
import './IndividualOrg.css';

class IndividualOrg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.org_name,
            club_info: {},
            is_data: false
        };
    }

    componentDidMount() {
        console.log("Fetching club data")
        fetch(`https://uniflow-backend.herokuapp.com/api/organizations/${this.state.name}`, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    club_info: data,
                    is_data: true
                });
            })
            .catch((error) => console.log(error));
    }

    render(){
        if (this.state.is_data) {
            return(
                <div>
                    <div id="description">
                        <p>{this.state.description}</p>
                    </div>
                    <div id="image">
                        <img src={require(`../public/${this.state.club_info.logo_filename}`)} />
                    </div>
                    <div id="tags">
                        <p>Tags:</p>
                            {this.state.club_info.tags.map((tag) => <p>{tag}, </p>)}
                    </div>
                    <div>
                        <p>Involvement: {this.state.involvement}</p>
                    </div>

                </div>
            );
        }
        else {
            return(
                <p>IndividualOrg!</p>
            );
        }
    }
}

export default IndividualOrg;