import React from 'react';
import default_image from './logo.svg';
import { Link } from 'react-router-dom';

// Prints basic data about a single organization
function Org({ name, description, image}) {
    return (
        <div>
            <div>
                <Link to={`/orgs/${name}`}>{name}</Link>
            </div>
            <div>
                {description}
            </div>
            <div>
                <img src={image} />
            </div>
        </div>
    );
}

class Orgs extends React.Component {
    // Standard ctor
    // is_data stores if any data has been received from the API
    // filter_params is updated by the user modifiying the filter boxes AND the "Load More" button
    // orgs is a list of dictionaries with all tags that exist in the club. Optional tags may not exist
    constructor(props) {
        super(props);
        this.state = {
            is_data: false,
            filter_params: {
                index: 0,
                length: 10,
                involvement_min: 0,
                involvement_max: 10,
                tags: []
            },
            orgs: [], 
        };
        this.loadMore = this.loadMore.bind(this);
        this.loadFilter = this.loadFilter.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
    }

    // Functions runs on page bootup ONLY
    // All other fetch requests coming from this page will be the result of 
    // the "Load More" button or filtering handled by loadMore and ______
    componentDidMount() {
        console.log("Fetching first round of data");
        fetch(
            'https://uniflow-backend.herokuapp.com/api/organizations/', 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    involvement_min: 0,
                    involvement_max: 10,
                    tags: [], 
                    index: 0, 
                    length: 10
                }),
            }
        )
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.state.filter_params.index += 10;
                this.setState({
                    orgs: data, 
                    is_data: true
                });
            })
            .catch((error) => console.log(error));
    }

    // Function called when the "Load More" button at the bottom of the page is clicked
    // Modifies the index element of state.filter_params and state.orgs ONLY
    loadMore(event) {
        event.preventDefault();
        console.log("Fetching next rounds of data");
        console.log(this.state.filter_params);
        fetch(
            'https://uniflow-backend.herokuapp.com/api/organizations/',
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(
                    this.state.filter_params
                ),
            }
        )
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.state.filter_params.index += 10;
                this.setState({
                    orgs: this.state.orgs.concat(data)
                });
            })
            .catch((error) => console.log(error));
    }

    // Function called when the "Filter" button at the top of the page is clicked
    // Modifies the entirety of state.filter_params, resets index, and loads first 10
    loadFilter(event) {
        event.preventDefault();
        console.log("Fetching filtered data with input");
        this.state.filter_params = {
            index: 0,
            length: 10,
            involvement_min: event.target.elements.involvement_min.value,
            involvement_max: event.target.elements.involvement_max.value,
            tags: this.state.filter_params.tags
        };
        console.log(this.state.filter_params);
        fetch(
            'https://uniflow-backend.herokuapp.com/api/organizations/',
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(
                    this.state.filter_params
                ),
            }
        )
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.state.filter_params.index += 10;
                this.setState({
                    orgs: data
                });
            })
            .catch((error) => console.log(error));
    }

    // Function called when any checkbox is clicked
    // Either adds or removes the tag from this.state.filter_params.tags
    handleTagChange(event) {
        if (event.target.checked) {
            this.state.filter_params.tags.push(event.target.value);
        }
        else {
            const index = this.state.filter_params.tags.indexOf(event.target.value);
            this.state.filter_params.tags.splice(index, 1);
        }
        console.log(this.state.filter_params.tags);
    }

    // Renders a filler string if we cannot connect to the API
    // Renders a full list of all orgs / filter buttons / "Load More" otherwise
    render(){
        if (this.state.is_data) {
            let org_list = this.state.orgs.map((result) => 
                <Org 
                    name={result.name} 
                    description={result.description} 
                    image={default_image} 
                />
            );
            return(
                <div>
                    <form onSubmit={this.loadFilter}>
                        <label for="involvement_min">Involvement min:</label>
                        <input type="range" id="involvement" name="involvement_min" min="0" max="10"></input><br></br>
                        <label for="involvement_max">Involvement max:</label>
                        <input type="range" id="involvement" name="involvement_max" min="0" max="10"></input><br></br>
                        <input type="checkbox" id="professional" name="tags1" value="professional" onChange={this.handleTagChange}></input>
                        <label for="tags1">Professional</label><br></br>
                        <input type="checkbox" id="sports" name="tags2" value="sports" onChange={this.handleTagChange}></input>
                        <label for="tags2">Sports</label><br></br>
                        <input type="checkbox" id="fun" name="tags3" value="fun" onChange={this.handleTagChange}></input>
                        <label for="tags3">Fun</label><br></br>
                        <input type="checkbox" id="greek-life" name="tags4" value="greek-life" onChange={this.handleTagChange}></input>
                        <label for="tags4">Greek Life</label><br></br>
                        <input type="submit" name="load" value="Filter"></input>
                    </form>
                    <div>
                        {org_list}
                    </div>
                    <form onSubmit={this.loadMore}>
                        <input type="submit" name="load" value="Load More"></input>
                    </form>
                </div>
            );
        }
        else {
            return(
                <div>
                    <p>Orgs!</p>
                </div>
            );
        }
    }
}

export default Orgs;