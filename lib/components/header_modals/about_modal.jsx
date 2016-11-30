import React from 'react'
import Modal from 'react-modal'

class AboutModal extends React.Component {
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
						About the Developer
					</span>
					<Modal 
						isOpen={this.state.open} 
						onRequestClose={this.closeModal}>
						<content className="about-container">
							<section className="about-section">
								<h2 className="about-title">Alex Manning</h2>
								<img className="user-pic" src="http://res.cloudinary.com/ddvdi1pie/image/upload/c_scale,h_403/v1478745746/Manning_oegwmi.jpg"/>
								<p className="about-text">
									I am a former Industrial Engineering Manager who decided to pursue my true passion of programming and data analysis. I am currently looking for a Junior Developer position where I can apply my programming skills to any, and all, problems that can be thrown at me.</p>

								<p>This data analysis and visualization of AirBnB's listings was done as a solo "flex" project for App Academy. I originally started to teach myself programming on my free time, since I wanted to find new avenues for properly presenting data I analyzed as an engineer. I found in my previous role, that people did not always gain a lot from graphs and data, since there was so much information presented at once, and very little need for interaction.</p>

								<p>The hope of this project is to allow people to play around with the graph, given its interactive nature, and hoepfully discover more than they would at a quick glance.
								</p>
							</section>
						</content>
					</Modal>
				</section> )
	}
};

export default AboutModal