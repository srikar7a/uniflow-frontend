import React from 'react';
import default_image from './logo.svg';
import { Link, Redirect } from 'react-router-dom';

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

// Prints the input and label tags for each secondary tag under a primary tag
function secondaryTag({ primaryTag, changeHandler }) {
    var tags = [];
    if (primaryTag === "fun") {
        tags = ["exciting", "adventurous"];
    }
    else if (primaryTag === "greek-life") {
        tags = ["fraternity", "sorority", "professional", "tech", "business"];
    }
    else if (primaryTag === "sports") {
        tags = ["soccer", "basketball", "fishing"];
    }
    else if (primaryTag === "professional") {
        tags = ["engineering", "business", "pre-med", "pre-law"];
    }
    let input_list = tags.map((tag) =>
        <div>
            <input type="checkbox" id={primaryTag} name={tag} value={tag} onChange={changeHandler}></input>
            <label for={tag}>{tag}</label><br></br>
        </div>
    )
    return (
        {input_list}
    );
}

// The quiz is split into two components, stage one and stage 2
// Stage one asks the user questions to find primary tags before sending them to the API
// Stage two asks about secondary tags based on those primary tags
class Quiz extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            state: "preData",
            orgs: [], 
            selected_orgs: [], 
            tags: [], 
            secondary_tags: {}
        };
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSecondaryTagChange = this.handleSecondaryTagChange.bind(this);
        this.stageOneSubmit = this.stageOneSubmit.bind(this);
        this.stageTwoSubmit = this.stageTwoSubmit.bind(this);
    }

    componentDidMount() {
        console.log("Fetching first round of data");
        fetch(
            'https://uniflow-backend.herokuapp.com/api/generateclubs/', 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num: 12
                }),
            }
        )
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    orgs: data, 
                    state: "stageOne"
                });
            })
            .catch((error) => console.log(error));
    }

    stageOneSubmit(event) {
        event.preventDefault();
        console.log("Submitting stage one");
        fetch(
            'https://uniflow-backend.herokuapp.com/api/submitclubs/', 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: "dixand@umich.edu", 
                    clubs: this.state.selected_orgs
                }),
            }
        )
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    state: "stageTwo",
                    tags: data
                });
                var i;
                for (i = 0; i < this.state.tags.length; i++) {
                    this.state.secondary_tags[this.state.tags[i]] = [];
                }
            })
            .catch((error) => console.log(error));
    }

    stageTwoSubmit(event) {
        event.preventDefault();
        console.log("Submitting stage two");
        fetch(
            'https://uniflow-backend.herokuapp.com/api/submitsecondarytags/', 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: "dixand@umich.edu", 
                    secondary_tags: this.state.secondary_tags, 
                    involvement: [
                        event.target.elements.involvement_min.value,
                        event.target.elements.involvement_max.value
                    ], 
                    social_scene: [
                        event.target.elements.social_min.value, 
                        event.target.elements.social_max.value
                    ], 
                    org_size: [
                        event.target.elements.size_min.value, 
                        event.target.elements.size_max.value
                    ]
                }),
            }
        )
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    state: "redirect"
                });
            })
            .catch((error) => console.log(error));
    }

    handleTagChange(event) {
        if (event.target.checked) {
            this.state.selected_orgs.push(event.target.value);
        }
        else {
            const index = this.state.selected_orgs.indexOf(event.target.value);
            this.state.selected_orgs.splice(index, 1);
        }
        console.log(this.state.selected_orgs);
    }

    handleSecondaryTagChange(event) {
        if (event.target.checked) {
            this.state.secondary_tags[event.target.id].push(event.target.value);
        }
        else {
            const index = this.state.secondary_tags[event.target.id].indexOf(event.target.value);
            this.state.secondary_tags[event.target.id].splice(index, 1);
        }
        console.log(this.state.secondary_tags[event.target.id]);
    }

    render() {
        if (this.state.state === 'stageOne') {
            let org_list = this.state.orgs.map((result) => 
                <Org 
                    name={result.name} 
                    description={result.description} 
                    image={default_image} 
                />
            );
            return (
                <div>
                    <div>
                        <p>Select the clubs that sound most interesting to you!</p>
                    </div>
                    {org_list}
                    <form onSubmit={this.stageOneSubmit}>
                        {this.state.orgs.map((org) => 
                            <div>
                                <input type="checkbox" name={org.name} value={org.name} onChange={this.handleTagChange}></input>
                                <label for={org.name}>{org.name}</label><br></br>
                            </div>
                        )}
                        <input type="submit" name="load" value="Submit"></input>
                    </form>
                </div>
            );
        }
        else if (this.state.state === 'stageTwo') {
            return (
                <div>
                    <div>
                        <p>Select the tags within each category that most interest you</p>
                    </div>
                    <form onSubmit={this.stageTwoSubmit}>
                        {this.state.tags.map((tag) =>
                            <div>
                                <p>For the category {tag}</p>
                                <secondaryTag primaryTag={tag} changeHandler={this.handleSecondaryTagChange} />
                            </div>
                        )}
                        <label for="involvement_min">Involvement min:</label>
                        <input type="range" id="slider" name="involvement_min" min="0" max="10"></input><br></br>
                        <label for="involvement_max">Involvement max:</label>
                        <input type="range" id="slider" name="involvement_max" min="0" max="10"></input><br></br>
                        <label for="social_min">Social Scene min:</label>
                        <input type="range" id="slider" name="social_min" min="0" max="10"></input><br></br>
                        <label for="social_max">Social Scene max:</label>
                        <input type="range" id="slider" name="social_max" min="0" max="10"></input><br></br>
                        <label for="size_min">Size min:</label>
                        <input type="range" id="slider" name="size_min" min="0" max="10"></input><br></br>
                        <label for="size_max">Size max:</label>
                        <input type="range" id="slider" name="size_max" min="0" max="10"></input><br></br>
                        <input type="submit" name="load" value="Submit"></input>
                    </form>
                </div>
            );
        }
        else if (this.state.state === 'redirect') {
            return (
                <Redirect to="/" />
            );
        }
        else {
            return(
                <p>Quiz page</p>
            );
        }
    }
}

export default Quiz;