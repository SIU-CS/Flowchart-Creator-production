/* The actual step component itself. Also renders any children.*/

class FlowchartStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:              "",
            title:           "",
            description:     "",
            children:        [],
            parentId:        -1,
            childComponents: []
        }
        this.drawLines = this.drawLines.bind(this);
    }

    componentDidMount() {
        let childComponents = this.state.chlidren;
        childComponents     = this.props.createChildComponents(this.props.children);

        this.setState({
            id:              this.props.id,
            title:           this.props.title,
            description:     this.props.description,
            parentId:        this.props.parentId,
            childComponents: childComponents,
            children:        this.props.children || this.state.children
        }, this.drawLines());
    }

    componentWillReceiveProps(nextProps) {
        /* update the children when new steps are passed down the from the canvas*/
        let childComponents = this.props.createChildComponents(nextProps.children);
        this.setState({
            childComponents: childComponents
        }, this.drawLines());
    }

    drawLines() {
        /* Draws the horizontal and vertical lines connecting the steps
         * botLine: the vertical line out the bottom of the step
         * topLine: the vertical line out the top of the step
         * horLine: the horizontal line connecting the children (rendered by the children)
         */

        if (this.props.children.length > 1) {
            /* draw a botLine if there are children*/
            this.setState({
                botLine: "2px solid black"
            });
        }
        else if(this.props.children.length === 1) {
            /* draw a botLine if there are children*/
            this.setState({
                botLine: "2px solid black"
            });
        }
        else{
            /* do not draw a botLine or a horLine if there are not children*/
            this.setState({
                horLine: "0px solid black",
                botLine: "0px solid black"
            });
        }
        if (this.props.parentId !== -1) {
            /* draw a topLine and a horLine if there is a parent*/
            this.setState({
                topLine: "2px solid black",
                horLine: "2px solid black"
            });
        }
        if (this.props.isLeftChild && this.props.isRightChild ) {
            /* if the step is a single child, do not render a horLine*/
            this.setState({
                horLineMaxWidth: '0%'
            });
        }
        else if (this.props.isLeftChild) {
            /* if the step is the left-most child, move the horLine to the left*/
            this.setState({
                horLineOffset: '50%',
                horLineMaxWidth: '50%'
            });
        }
        else if (this.props.isRightChild) {
            /* if the step is the right-most child, move the horLine to the right*/
            this.setState({
                horLineOffset: '-50%',
                horLineFloat: 'left'
            });
        }
        else {
            /* if the step is somewhere in the middle, just render it centered above the child*/
            this.setState({
                horLineOffset: '0px',
                horLineFloat: 'left'
            });
        }
    }

    render() {
        return (
            <div className="flowchart-step-wrapper">

                {/* The connecting lines generated by drawLines()*/}
            <div className="hor-line"
                 style={{marginLeft: this.state.horLineOffset,
                         maxWidth: this.state.horLineMaxWidth,
                         borderTop: this.state.horLine}}>
            </div>
                <div className="top-vert-line" style={{borderLeft: this.state.topLine}}></div>
                <div className="bot-vert-line" style={{borderLeft: this.state.botLine}}></div>

                {/* The step itself */}
                <div className="flowchart-step">

                    {/* Overlay on top of the step with Modal buttons*/}
                    <div className="flowchart-overlay" >
                        <button onClick={() => this.props.editStep(this.state.id)} className="btn edit-step-btn btn-warning">
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button onClick={() => this.props.addStep(this.state.id)} className="btn add-child-btn btn-success">
                            <span className="glyphicon glyphicon-plus"></span>
                        </button>
                        <button onClick={() => this.props.deleteStep(this.state.id)} className="btn delete-step-btn btn-danger">
                            <span className="glyphicon glyphicon-trash"></span>
                        </button>
                    </div>

                    {/* Actual content of the step */}
                    <div className="flowchart-contents" >
                        <p className="flowchart-step-title">{this.props.title}</p>
                        <hr />
                        <p className="flowchart-step-description">{this.props.description}</p>
                    </div>
                </div>
                <br/><br/>

                {/* Render the children */}
                {this.state.childComponents}
            </div>
        )
    }
}
export default FlowchartStep;
