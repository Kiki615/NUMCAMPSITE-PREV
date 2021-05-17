import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import Campsiteinfo from './CampsiteInfoComponent';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }

// renderSelectedCampsite(campsite) {
//   if (campsite) {
//            return (
//                <Card>
//                    <CardImg top src={campsite.image} alt={campsite.name} />
//                    <CardBody>
//                        <CardTitle>{campsite.name}</CardTitle>
//                        <CardText>{campsite.description}</CardText>
//                    </CardBody>
//                </Card>
//            );
//        }
//        return <div />;
//    }


// What is happening with const directory?  Take everything in this.props.campsites, dump it in campsite but make every single object in it pretty.  
// And when you're done, directory will have that new formatted pretty this.props.campsite.
// Question:  why {campsite.id} if the mapping goes through individual objects?
    render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                    <Card onClick={() => this.onCampsiteSelect(campsite)}>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

// preformatting {directory} with the above const directory before displaying.  

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <Campsiteinfo campsite={this.state.selectedCampsite}/>
            </div>
        );
    }


    // Savethepreviousrender() {
    //     const directory = this.props.campsites.map(campsite => {
    //         return (
    //             <div key={campsite.id} className="col-md-5 m-1">
    //                 <Card onClick={() => this.onCampsiteSelect(campsite)}>
    //                     <CardImg width="100%" src={campsite.image} alt={campsite.name} />
    //                     <CardImgOverlay>
    //                         <CardTitle>{campsite.name}</CardTitle>
    //                     </CardImgOverlay>
    //                 </Card>
    //             </div>
    //         );
    //     });

    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 {directory}
    //             </div>
    //             <div className="row">
    //                <div className="col-md-5 m-1">
    //                     {this.renderSelectedCampsite(this.state.selectedCampsite)}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}

export default Directory;