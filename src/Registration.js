import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.selectRef = React.createRef();
        //this.fetchData = this.fetchData.bind(this);
    }
    formSubmit(event){
        /*
        fetch(url, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({
                involvement_min: ___, 
                involvement_max: ___, 
                tags: ___, 
                index: ___, 
                length: ___
            }), 
        })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json()
        })
        .catch((error) => console.log(error));
        */
    }

    type2tags(event){
        if(this.selectRef.current.value == "professional"){

        }
        else if(this.selectRef.current.value == "professional"){
            
        }
    }
    render(){
        return(
            <div>
                    <p>Registration</p>
                    <form onSubmit={this.formSubmit}>
                        <label for="club_name">Club Name: </label>
                        <input type="text" id="club_name" name="club_name"></input><br></br>
                        <label for="description">Club Description: </label><br></br>
                        <textarea name="description" rows="10" cols="30"></textarea><br></br>
                        <label for="email">Contact Email: </label>
                        <input type="email" id="email" name="email"></input><br></br>
                        <label for="type">Type: </label>
                        <input type="text" id="type" name="type"></input><br></br>
                        <label for="date">Date of Registration: </label>
                        <input type="date" id="date" name="date"></input><br></br>
                        <label for="tag1">Type 1 Tags (select up to 2): </label><br></br>
                        <select name="tag1" ref={this.selectRef1} onChange={this.type2tags}>
                            <option value="none">No Selection</option>
                            <option value="professional">Professional</option>
                            <option value="sports">Sports</option>
                            <option value="fun">Fun</option>
                            <option value="greek-life">Greek Life</option>
                        </select>
                        <select name="tag2">
                            <option value="none">No Selection</option>
                            <option value="professional">Professional</option>
                            <option value="sports">Sports</option>
                            <option value="fun">Fun</option>
                            <option value="greek-life">Greek Life</option>
                        </select>
                        <br></br>
                        <label for="ttag1">Type 2 Tags (for each Type 1 Tag): </label><br></br>
                        <select name="ttag1">
                            <option value="default">Select Type 1</option>
                        </select>
                        <select name="ttag2">
                            <option value="default">Select Type 1</option>
                        </select>
                        <br></br>
                        <label for="img">Club Profile Picture (optional): </label>
                        <input type="file" id="img" name="img" accept="image/*"></input><br></br>
                        <label for="due_date">Application Due Date (optional): </label>
                        <input type="date" id="due_date" name="due_date"></input><br></br>
                        <label for="req">Is Application Required? (optional): </label>
                        <select name="req">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label for="sponsor">Sponsoring Unit (optional): </label>
                        <input type="text" id="sponsor" name="sponsor"></input><br></br>
                        <label for="faculty">Faculty Sponsor (optional): </label>
                        <input type="text" id="faculty" name="faculty"></input><br></br>
                        <label for="selectivity">Club Selectivity (1-10) (optional): </label>
                        <input type="text" id="selectivity" name="selectivity"></input><br></br>
                        <label for="time">Time Committment (hours/week) (optional): </label>
                        <input type="text" id="time" name="time"></input><br></br>
                        <input type="submit" name="load" value="Register"></input>
                    </form>
                </div>
        );
    }
  }
  
  export default Registration;
  
  //<label>Officers: </label><br></br>
  //<input type="button" onclick={this.addOfficers}>Add Officers</input>
