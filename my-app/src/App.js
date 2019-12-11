import React, { Component } from "react";
	import MatchCard from "./components/MatchCard";
	import Wrapper from "./components/Wrapper";
	import Title from "./components/Title";
	import matches from "./matchcards.json";
	import "./App.css";
	

	let correctGuesses = 0;
	let bestScore = 0;
	let clickMessage = 'Click On A Picture Below…But Be Careful If You Click The Same One Twice You Will Lose!';
	

	class App extends Component {
	    
	
	    state = {
	        matches,
	        correctGuesses,
	        bestScore,
	        clickMessage
	    };
	

	    setClicked = id => {
	
	
	        const matches = this.state.matches;
	

	
	        const clickedMatch = matches.filter(match => match.id === id);
	
	
	
	        if (clickedMatch[0].clicked){
	

	            console.log ("Correct Guesses: " + correctGuesses);
	            console.log ("Best Score: " + bestScore);
	

	            correctGuesses = 0;
	            clickMessage = 'Isn’t That A Shame, You Already Clicked This One.'
	

	            for (let i = 0 ; i < matches.length ; i++){
	                matches[i].clicked = false;
	            }
	

	            this.setState({clickMessage});
	            this.setState({ correctGuesses });
	            this.setState({matches});
	

	        } else if (correctGuesses < 11) {
	

	
	            clickedMatch[0].clicked = true;
	

	
	            correctGuesses++;
	            
	            clickMessage = 'Good Job, You Haven’t Picked That One As Yet, Keep Trying Until Your Luck Runs Out';
	

	            if (correctGuesses > bestScore){
	                bestScore = correctGuesses;
	                this.setState({ bestScore });
	            }
	

	            matches.sort(function(a, b){return 0.5 - Math.random()});
	

	            this.setState({ matches });
	            this.setState({correctGuesses});
	            this.setState({clickMessage});
	        } else {
	

	            
	            clickedMatch[0].clicked = true;
	

	
	            correctGuesses = 0;
	

	
	            clickMessage = 'I Am SHOCKED!!! But That Was Just LUCK And Your Luck Will Run Out Try It Again To See If You Are Really As Good As You Think';
	            bestScore = 10;
	            this.setState({ bestScore });
	            
	            for (let i = 0 ; i < matches.length ; i++){
	                matches[i].clicked = false;
	            }
	

	
	            matches.sort(function(a, b){return 0.5 - Math.random()});
	

	
	            this.setState({ matches });
	            this.setState({correctGuesses});
	            this.setState({clickMessage});
	

	        }
	    };
	

	    render() {
	        return (
	            <Wrapper>
	                <Title>Click Your Way Through</Title>
	        
	                <h3 className="scoreSummary">
	                    {this.state.clickMessage}
	                </h3>
	                
	                <h3 className="scoreSummary card-header">
	                    Correct Guesses: {this.state.correctGuesses} 
	                    <br />
	                    Best Score: {this.state.bestScore} 
	                </h3>
	                <div className="container">
	                <div className="row">
	                {this.state.matches.map(match => (
	                    <MatchCard
	                        setClicked={this.setClicked}
	                        id={match.id}
	                        key={match.id}
	                        image={match.image}
	                    />
	                ))}
	                </div>
	                </div>
	

	            </Wrapper>
	        );
	    }
	}
	

	export default App;

