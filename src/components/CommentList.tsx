import * as React from 'react';
import {Comment} from './Comment';

interface CommentListProps{
    data?: any[];
}

export class CommentList extends React.Component<CommentListProps,{}> {

    constructor(props){
        super(props);
    };

    render() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}