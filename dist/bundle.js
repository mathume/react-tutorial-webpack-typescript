/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var CommentBox_1 = __webpack_require__(3);
	ReactDOM.render(React.createElement(CommentBox_1.CommentBox, {compiler: "TypeScript", framework: "React", url: "/api/comments", pollInterval: 2000}), document.getElementById('content'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var CommentList_1 = __webpack_require__(4);
	var CommentForm_1 = __webpack_require__(6);
	var CommentBox = (function (_super) {
	    __extends(CommentBox, _super);
	    function CommentBox(props) {
	        _super.call(this, props);
	        this.state = { data: [] };
	    }
	    CommentBox.prototype.loadCommentsFromServer = function () {
	        $.ajax({
	            url: "http://localhost:3000/api/comments",
	            dataType: 'json',
	            cache: false,
	            success: function (data) {
	                this.setState({ data: data });
	            }.bind(this),
	            error: function (xhr, status, err) {
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)
	        });
	    };
	    ;
	    CommentBox.prototype.handleCommentSubmit = function (comment) {
	        var comments = this.state.data;
	        comment.id = Date.now();
	        var newComments = comments.concat([comment]);
	        this.setState({ data: newComments });
	        $.ajax({
	            url: "http://localhost:3000/api/comments",
	            dataType: 'json',
	            type: 'POST',
	            data: comment,
	            success: function (data) {
	                this.setState({ data: data });
	            }.bind(this),
	            error: function (xhr, status, err) {
	                this.setState({ data: comments });
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)
	        });
	    };
	    ;
	    CommentBox.prototype.componentDidMount = function () {
	        this.loadCommentsFromServer();
	        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	    };
	    ;
	    CommentBox.prototype.render = function () {
	        return (React.createElement("div", {className: "commentBox"}, React.createElement("h1", null, "Comments"), React.createElement(CommentList_1.CommentList, {data: this.state.data}), React.createElement(CommentForm_1.CommentForm, {onCommentSubmit: this.handleCommentSubmit})));
	    };
	    return CommentBox;
	}(React.Component));
	exports.CommentBox = CommentBox;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Comment_1 = __webpack_require__(5);
	var CommentList = (function (_super) {
	    __extends(CommentList, _super);
	    function CommentList(props) {
	        _super.call(this, props);
	    }
	    ;
	    CommentList.prototype.render = function () {
	        var commentNodes = this.props.data.map(function (comment) {
	            return (React.createElement(Comment_1.Comment, {author: comment.author, key: comment.id}, comment.text));
	        });
	        return (React.createElement("div", {className: "commentList"}, commentNodes));
	    };
	    return CommentList;
	}(React.Component));
	exports.CommentList = CommentList;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Comment = (function (_super) {
	    __extends(Comment, _super);
	    function Comment(props) {
	        _super.call(this, props);
	    }
	    Comment.prototype.rawMarkup = function () {
	        var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
	    };
	    ;
	    Comment.prototype.render = function () {
	        return (React.createElement("div", {className: "comment"}, React.createElement("h2", {className: "commentAuthor"}, this.props.author), React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()})));
	    };
	    ;
	    return Comment;
	}(React.Component));
	exports.Comment = Comment;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var CommentForm = (function (_super) {
	    __extends(CommentForm, _super);
	    function CommentForm(props) {
	        _super.call(this, props);
	        this.state = { author: '', text: '' };
	    }
	    ;
	    CommentForm.prototype.handleAuthorChange = function (e) {
	        this.setState({ author: e.target.value });
	    };
	    ;
	    CommentForm.prototype.handleTextChange = function (e) {
	        this.setState({ text: e.target.value });
	    };
	    ;
	    CommentForm.prototype.handleSubmit = function (e) {
	        e.preventDefault();
	        var author = this.state.author.trim();
	        var text = this.state.text.trim();
	        if (!text || !author) {
	            return;
	        }
	        this.props.onCommentSubmit({ author: author, text: text });
	        this.setState({ author: '', text: '' });
	    };
	    ;
	    CommentForm.prototype.render = function () {
	        return (React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, React.createElement("input", {type: "text", placeholder: "Your name", value: this.state.author, onChange: this.handleAuthorChange}), React.createElement("input", {type: "text", placeholder: "Say something...", value: this.state.text, onChange: this.handleTextChange}), React.createElement("input", {type: "submit", value: "Post"})));
	    };
	    ;
	    return CommentForm;
	}(React.Component));
	exports.CommentForm = CommentForm;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map