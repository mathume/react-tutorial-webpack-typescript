/**
 * Created by sebastian.mitterle on 20/05/2016.
 */
import * as React from "react";

interface CommentProps{
    author? : string;
}

export class Comment extends React.Component<CommentProps,{}> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className = "comment">
                <h2 className = "commentAuthor" >
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>);
    };
}