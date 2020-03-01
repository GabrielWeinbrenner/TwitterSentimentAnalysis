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

            <div className="inputs">
            <input className="c-checkbox" type="checkbox" id="checkbox" />
            <div className="c-formContainer">
              <form className="c-form" onSubmit={this.handleSubmit}>
                <input id="typeInput" type="text" value={this.state.typeVal} onChange={this.handleTypeChange} type="search" className="c-form__input" placeholder="Keyword" />
                <label className="c-form__buttonLabel" for="checkbox">
                  <button className="c-form__button" type="submit">Send</button>
                </label>
                <label className="c-form__toggle" for="checkbox" data-title="Enter Keyword"></label>
              </form>
            </div>
            </div>
        )
    }
}

export default TweetForm;