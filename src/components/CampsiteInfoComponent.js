import React,  { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const maxLength = len => val => !val || (val.length <= len);
const minLength  = len => val => val && (val.length >= len);

//*************** Workshop - Comment Form* ***************************/
class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            touched: {
                author: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
         isModalOpen: !this.state.isModalOpen   
        });
    }

    handleSubmit(values){
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values)); 
        this.toggleModal();
     }

    render() {
         return (
        <div>
            <Button outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg" />Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit your comments</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        
                            <Label htmlFor="rating">Rating</Label>
                            <div className="form-group">
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>

                            <Label htmlFor="author">Author</Label>
                            <div className="form-group">
                                <Control.text model=".author" id="author" name="author" 
                                className="form-control"
                                validators={{
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                                />
                                
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be at least 15 characters or less'
                                        }}>

                                </Errors>
                            </div>
                            
                        
                            <Label htmlFor="text">Comment</Label>
                            <div className="form-group">
                                <Control.textarea model=".text" id="text" name="text" className="form-control" rows="6" />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>

                    </ModalBody>
            </Modal>
        </div>
        );
    }
}

//********************************************************************/

function RenderCampsite({campsite}) {

    return(
        <div key={campsite.id} className="col-md-5 m-1"> 

            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                   
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>

        </div>
    );
}

function RenderComments({comments}) {
    if (comments) {
        return (
         <div className="col-md-5 m-1">    
            <h4>Comments</h4> 
            <hr />

            {comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <p>{comment.author}, - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                       
                    </div>
                );
              
            })}
            <CommentForm />
        </div>

        ); //return if comments not null
    }

    return <div />;
}
        

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className = "container">
                 <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite = {props.campsite} />
                    <RenderComments comments = {props.comments} />
                </div>
            </div>
        );
    }
    
    return <div />;
    
}

       

export default CampsiteInfo;