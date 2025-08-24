import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { AuthContext } from "../auth/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts")
      .then((response) => {
        setListOfPosts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
        setListOfPosts([]);
      });

    if (localStorage.getItem("accessToken")) {
      axios
        .get("http://localhost:3001/posts/reacts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.likedPosts) {
            setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
          }
          if (response.data.dislikedPosts) {
            setDislikedPosts(
              response.data.dislikedPosts.map((dislike) => dislike.PostId)
            );
          }
        })
        .catch((error) => {
          console.log("Error fetching user reactions:", error);
        });
    }
  }, []);

  const likedAPost = (postId, event) => {
    event.stopPropagation(); // Prevent card click when clicking like button
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                Likes: response.data.liked
                  ? [...post.Likes, 0]
                  : post.Likes.slice(0, -1),
              };
            } else {
              return post;
            }
          })
        );

        setLikedPosts(
          likedPosts.includes(postId)
            ? likedPosts.filter((id) => id !== postId)
            : [...likedPosts, postId]
        );
      });
  };

  const dislikedAPost = (postId, event) => {
    event.stopPropagation(); // Prevent card click when clicking dislike button
    axios
      .post(
        "http://localhost:3001/dislikes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                Dislikes: response.data.disliked
                  ? [...post.Dislikes, 0]
                  : post.Dislikes.slice(0, -1),
              };
            } else {
              return post;
            }
          })
        );

        setDislikedPosts(
          dislikedPosts.includes(postId)
            ? dislikedPosts.filter((id) => id !== postId)
            : [...dislikedPosts, postId]
        );
      });
  };

  const handleCardClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleCardKeyPress = (event, postId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="slider">
        <div className="slides">
          <div className="slide">
            <img
              src="/coast-8587004_1920.jpg"
              alt="Norwegian Coast"
            />
            <div className="caption">Discover the Majestic Norwegian Coast</div>
          </div>

          <div className="slide">
            <img
              src="/waterfall-3723422_1920.jpg"
              alt="Norwegian Waterfall"
            />
            <div className="caption">Adventure Through Norway's Breathtaking Waterfalls</div>
          </div>

          <div className="slide">
            <img
              src="/norway-7887613_1920.jpg"
              alt="Norwegian Landscape"
            />
            <div className="caption">Explore Norway's Stunning Natural Landscapes</div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>Nordic Wanderlust</h1>
          <p>Your ultimate guide to exploring Norway's most breathtaking landscapes. From the dramatic fjords of the west coast to the pristine wilderness of the north, discover authentic travel experiences and practical tips for your next Nordic adventure.</p>
          {!authState.status && (
            <div className="cta-buttons">
              <Link to="/registration" className="cta-button primary">Join Our Community</Link>
              <Link to="/login" className="cta-button secondary">Sign In</Link>
            </div>
          )}
        </div>
      </div>

      {/* Featured Posts Section */}
      <div className="featured-section">
        <div className="section-header">
          <h2>Latest Adventures</h2>
          <p>Discover authentic travel stories and practical guides from our community of Nordic explorers</p>
        </div>
        
        <div className="posts-container">
          {listOfPosts.length > 0 ? (
            listOfPosts.map((value) => (
              <div 
                className="post-card" 
                key={value.id}
                onClick={() => handleCardClick(value.id)}
                onKeyPress={(e) => handleCardKeyPress(e, value.id)}
                tabIndex={0}
                role="button"
                aria-label={`View ${value.title} post`}
              >
                {/* Display the image if available */}
                {value.imageUrl && (
                  <div className="image">
                    <img
                      src={`http://localhost:3001${value.imageUrl}`}
                      alt={value.title}
                    />
                  </div>
                )}

                <div className="post-info">
                  <div className="title">
                    {value.title}
                  </div>
                  <div className="body">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: value.postText ? value.postText.replace(/<[^>]*>/g, '').substring(0, 200) + (value.postText.length > 200 ? '...' : '') : ''
                      }}
                      className="post-preview"
                    />
                  </div>
                </div>

                <div className="footer" onClick={(e) => e.stopPropagation()}>
                  <div className="username">
                    <Link to={`/profile/${value.UserId}`} onClick={(e) => e.stopPropagation()}>
                      {value.username}
                    </Link>
                  </div>
                  {authState.status && (
                    <div className="buttons">
                      <ThumbUpIcon
                        onClick={(e) => likedAPost(value.id, e)}
                        className={
                          likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                        }
                      />
                      <label>{value.Likes ? value.Likes.length : 0}</label>

                      <ThumbDownIcon
                        onClick={(e) => dislikedAPost(value.id, e)}
                        className={
                          dislikedPosts.includes(value.id)
                            ? "unlikeBttn"
                            : "likeBttn"
                        }
                      />
                      <label>{value.Dislikes ? value.Dislikes.length : 0}</label>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-content">
                <h3>No Norwegian adventures yet!</h3>
                <p>Be the first to share your story from Norway's stunning landscapes and inspire others to explore the Nordic beauty.</p>
                {authState.status && (
                  <Link to="/createpost" className="cta-button primary">
                    Create Your First Post
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      {authState.status && (
        <div className="cta-section">
          <div className="cta-content">
            <h2>Share Your Nordic Adventure</h2>
            <p>Have an incredible story from Norway's fjords, mountains, or northern lights? Help inspire fellow travelers with your authentic experiences and practical insights.</p>
            <Link to="/createpost" className="cta-button primary">
              Create New Post
            </Link>
          </div>
        </div>
      )}

      {/* Empty State */}
      {listOfPosts.length === 0 && (
        <div className="empty-state">
          <div className="empty-content">
            <h3>No adventures shared yet!</h3>
            <p>Be the first to share your Norwegian travel story and help inspire others to explore the stunning landscapes of the Nordic region.</p>
            {authState.status && (
              <Link to="/createpost" className="cta-button primary">
                Share Your First Adventure
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
