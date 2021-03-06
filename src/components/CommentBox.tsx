import * as React from 'react';
import {CommentList} from './CommentList';
import {CommentForm} from "./CommentForm";

interface CommentBoxProps{
    url? : string;
    pollInterval?: number;
    compiler?: string;
    framework?: string;
}

interface CommentBoxState{
    data?: any[];
}

export class CommentBox extends React.Component<CommentBoxProps,CommentBoxState> {
    constructor(props){
        super(props);
        this.state = {data: []};
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    }

    loadCommentsFromServer() {
        $.ajax({
            url: "http://localhost:3000/api/comments",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        // Optimistically set an id on the new comment. It will be replaced by an
        // id generated by the server. In a production application you would likely
        // not use Date.now() for this and would have a more robust system in place.
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: "http://localhost:3000/api/comments",
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
            </div>
        );
    }
}