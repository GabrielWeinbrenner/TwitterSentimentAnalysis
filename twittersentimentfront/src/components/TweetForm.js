import React from 'react';

class TweetForm extends React.Component{
    state = {
        typeVal: ""
    };


    handleTypeChange = (event) =>{
        this.setState({
            typeVal: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.typeVal);
        this.props.sub(this.state.typeVal);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="typeInput">
                        Type:          
                        </label>
                        <input autoComplete="off" id="typeInput" type="text" value={this.state.typeVal} onChange={this.handleTypeChange}></input>
                    </div>
                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default TweetForm;