import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [similarPosts, setSimilarPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const [postResponse, commentsResponse, similarPostsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/posts/byId/${id}`),
          axios.get(`http://localhost:3001/comments/${id}`),
          axios.get(`http://localhost:3001/posts/similar/${id}`)
        ]);
        
        setPostObject(postResponse.data);
        setComments(commentsResponse.data);
        setSimilarPosts(similarPostsResponse.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const addComment = () => {
    if (!authState.status) {
      setShowAuthModal(true);
      return;
    }

    if (!newComment.trim()) return;

    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
            id: response.data.id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:3001/comments/${commentId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const deletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://localhost:3001/posts/${postId}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  const updatePost = (attribute) => {
    if (attribute === "title") {
      let newTitle = prompt("Enter New Title", postObject.title);
      if (newTitle && newTitle.trim()) {
        axios.put(
          "http://localhost:3001/posts/title",
          { newTitle: newTitle, id: id },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then(() => {
          setPostObject({ ...postObject, title: newTitle });
        })
        .catch((error) => {
          console.error("Error updating title:", error);
        });
      }
    } else if (attribute === "postText") {
      let newPostText = prompt("Enter New Post Description", postObject.postText);
      if (newPostText && newPostText.trim()) {
        axios.put(
          "http://localhost:3001/posts/postText",
          { newPostText: newPostText, id: id },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then(() => {
          setPostObject({ ...postObject, postText: newPostText });
        })
        .catch((error) => {
          console.error("Error updating post text:", error);
        });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  if (isLoading) {
    return (
      <div className="post-loading">
        <div className="loading-spinner"></div>
        <p>Loading adventure...</p>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      {/* Main Content with Sidebar */}
      <div className="post-detail-layout">
        {/* Main Post Content */}
        <div className="post-content-main">
          <article className="post-article">
            {/* Post Header */}
            <header className="post-header">
              <div className="post-meta">
                <div className="author-info">
                  <PersonIcon className="author-icon" />
                  <span className="author-name">{postObject.username}</span>
                </div>
                <div className="post-actions">
                  {authState.username === postObject.username && (
                    <>
                      <Link 
                        to={`/editpost/${id}`}
                        className="edit-button"
                        title="Edit full post"
                      >
                        <EditNoteIcon />
                      </Link>
                      <button 
                        onClick={() => deletePost(postObject.id)}
                        className="delete-button"
                        title="Delete post"
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <h1 className="post-title">
                {postObject.title}
              </h1>
            </header>

            {/* Post Image */}
            {postObject.imageUrl && (
              <div className="post-image">
                <img 
                  src={`http://localhost:3001${postObject.imageUrl}`} 
                  alt={postObject.title}
                />
              </div>
            )}

            {/* Post Body */}
            <div className="post-body">
              <div className="post-text rich-content">
                <div 
                  dangerouslySetInnerHTML={{ __html: postObject.postText }}
                  className="rich-content-display"
                />
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <section className="comments-section">
            <h2 className="comments-title">
              Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            <div className="add-comment-container">
              {authState.status ? (
                <div className="comment-form">
                  <textarea
                    placeholder="Share your thoughts about this adventure..."
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    onKeyPress={handleKeyPress}
                    className="comment-input"
                    rows="3"
                  />
                  <button 
                    onClick={addComment}
                    className="comment-submit-button"
                    disabled={!newComment.trim()}
                  >
                    <SendIcon />
                    <span>Post Comment</span>
                  </button>
                </div>
              ) : (
                <div className="auth-prompt">
                  <p>Sign in to share your thoughts about this adventure</p>
                  <div className="auth-buttons">
                    <Link to="/login" className="auth-button primary">
                      Sign In
                    </Link>
                    <Link to="/registration" className="auth-button secondary">
                      Join Community
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Comments List */}
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment, key) => (
                  <div key={key} className="comment-item">
                    <div className="comment-header">
                      <div className="comment-author">
                        <PersonIcon className="comment-author-icon" />
                        <span className="comment-author-name">{comment.username}</span>
                      </div>
                      {authState.username === comment.username && (
                        <button 
                          onClick={() => deleteComment(comment.id)}
                          className="comment-delete-button"
                          title="Delete comment"
                        >
                          <DeleteIcon />
                        </button>
                      )}
                    </div>
                    <div className="comment-body">
                      {comment.commentBody}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-comments">
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar with Similar Posts */}
        <aside className="post-sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">More Adventures</h3>
            
            {similarPosts.length > 0 ? (
              <div className="similar-posts">
                {similarPosts.map((post) => (
                  <div key={post.id} className="similar-post-card" onClick={() => navigate(`/post/${post.id}`)}>
                    {post.imageUrl && (
                      <div className="similar-post-image">
                        <img 
                          src={`http://localhost:3001${post.imageUrl}`} 
                          alt={post.title}
                        />
                      </div>
                    )}
                    <div className="similar-post-content">
                      <h4 className="similar-post-title">{post.title}</h4>
                      <p className="similar-post-author">by {post.username}</p>
                      <div className="similar-post-stats">
                        <span className="likes-count">
                          ❤️ {post.Likes ? post.Likes.length : 0}
                        </span>
                        <span className="dislikes-count">
                          👎 {post.Dislikes ? post.Dislikes.length : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-similar-posts">
                <p>No similar adventures found yet.</p>
                <p>Explore more posts to discover amazing stories!</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Sign in to Comment</h3>
            <p>Join our community to share your thoughts about this adventure</p>
            <div className="auth-modal-buttons">
              <Link to="/login" className="auth-modal-button primary">
                Sign In
              </Link>
              <Link to="/registration" className="auth-modal-button secondary">
                Create Account
              </Link>
            </div>
            <button 
              className="auth-modal-close"
              onClick={() => setShowAuthModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
