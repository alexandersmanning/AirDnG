import React from 'react'
import Modal from 'react-modal'

class NotesModal extends React.Component {
	constructor(props) {
		super(props)
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = { open: false }
	};

	componentWillMount() {
    Modal.setAppElement('body');
 	}

 	openModal () { this.setState({open: true}); }

	closeModal () { this.setState({open: false}); }

	render() {
		return (<section>
					<span 
						className="about-header"
						onClick={this.openModal}
					>
						About the Graphs
					</span>
					<Modal 
						isOpen={this.state.open} 
						onRequestClose={this.closeModal}>
						<content className="about-container">
							<section className="about-section">
								<h2 className="about-title">About AirDnG</h2>
								<p className="about-text">
									AirDnG is a way of visualizing the words used in listings for different San Francisco neighborhoods, how common those words are across those neighborhoods, and the different metrics for each area, ranging from price, to type of units available</p>

								<p>This site was built using React-Redux, in addition to d3 for the interactive graphs. Data for the site was provided by Inside AirBnB, who has an up to date dump of listings in different major cities.</p>

								<h2 className="about-title">Notes on the Data</h2>
									<p className="about-text">What makes this project so interesting are not the specific words used in listings for each neighborhoods, but rather the ones missing. As a local, I instantly realized that a number of the identifiers I would use to describe a neighborhood, whether it is known for a specific type of food, culture, or even recent historical events, were all but missing from the majority of ads.

									Even then, one can still gain reasonable insight into neighborhoods, and their culture. North Beach for example uses words like community, creating, together, and vibe, while Mission and Haigh Ashbury will use the word modern, new, and bars to describe their younger demographic. 
								</p>

								<p>
									In the near future, I hope to analyze additional major cities to see if this trend continues, or if it has more to do with the listings in San Francisco, as opposed to New York or Chicago.
								</p>
							</section>
						</content>
					</Modal>
				</section> )

		// /							The idea for the site came about from years of attending concerts, and hoping for a way of finding last minute small shows. His love for live music is shared by his wife, who he met at a small folk show in the city. 
	}
};

export default NotesModal