import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditPost() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [post, setPost] = useState({
    title: "",
    postText: "",
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }

    // Fetch the post data
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/byId/${id}`);
        const postData = response.data;
        
        // Check if user owns this post
        if (postData.UserId !== authState.id) {
          alert("You can only edit your own posts.");
          navigate(`/post/${id}`);
          return;
        }
        
        setPost({
          title: postData.title,
          postText: postData.postText,
          imageUrl: postData.imageUrl
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Error loading post. Please try again.");
        navigate(`/post/${id}`);
      }
    };

    fetchPost();
  }, [id, authState.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form
    const newErrors = {};
    if (!post.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!post.postText.trim() || post.postText === "<p><br></p>") {
      newErrors.postText = "Content is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("postText", post.postText);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put(
        `http://localhost:3001/posts/${id}`,
        formData,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      
      if (error.response?.status === 400) {
        const errorMessage = error.response.data?.message || "Please check your input and try again.";
        alert(errorMessage);
      } else if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      } else {
        alert("Error updating post. Please try again.");
      }
    }
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'blockquote', 'code-block'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'blockquote', 'code-block'
  ];

  if (isLoading) {
    return (
      <div className="edit-post-loading">
        <div className="loading-spinner"></div>
        <p>Loading post for editing...</p>
      </div>
    );
  }

  return (
    <div className="editPostPage">
      <h1>Edit Your Nordic Adventure</h1>
      <p className="edit-post-subtitle">
        Update your travel story with new details, photos, or insights from your Norwegian journey.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Adventure Title</label>
          {errors.title && <span className="error-message">{errors.title}</span>}
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Enter your adventure title"
            className="inputField"
          />
        </div>
        
        <div className="form-group">
          <label>Your Travel Story</label>
          {errors.postText && <span className="error-message">{errors.postText}</span>}
          <div className="rich-text-editor-container">
            <ReactQuill
              theme="snow"
              value={post.postText}
              onChange={(content) => setPost({ ...post, postText: content })}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Share the details of your Norwegian adventure..."
              className="rich-text-editor"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Update Photo</label>
          <p className="field-hint">
            {post.imageUrl ? "Current image will be replaced if you upload a new one." : "Add a stunning photo from your Norwegian adventure"}
          </p>
          {post.imageUrl && (
            <div className="current-image">
              <img 
                src={`http://localhost:3001${post.imageUrl}`} 
                alt="Current post image"
                className="current-image-preview"
              />
              <p className="current-image-label">Current image</p>
            </div>
          )}
          <input
            type="file"
            onChange={handleImageChange}
            className="inputFile"
            accept="image/*"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate(`/post/${id}`)} className="cancelButton">
            Cancel
          </button>
          <button type="submit" className="submitButton">
            <span>Update Adventure</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
