import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CommentBox } from "./components/CommentBox";

ReactDOM.render(
    <CommentBox compiler="TypeScript" framework="React" url="/api/comments" pollInterval={2000} />,
    document.getElementById('content'));