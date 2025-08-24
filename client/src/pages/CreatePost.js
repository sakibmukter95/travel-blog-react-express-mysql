import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { AuthContext } from "../auth/AuthContext";
import { React, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  const { authState } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [contentError, setContentError] = useState("");
  const quillRef = useRef(null);

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validateYupSchema = Yup.object().shape({
    title: Yup.string().required("Please enter a title for your adventure!"),
  });

  const onSubmit = (data) => {
    // Clear previous content error
    setContentError("");
    
    // Validate rich content
    if (!postContent || postContent.trim() === "" || postContent === "<p><br></p>") {
      setContentError("Please share your travel story!");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("postText", postContent);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    axios
      .post("http://localhost:3001/posts", formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000, // 10 second timeout
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        
        if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
          alert("Unable to connect to the server. Please check if the server is running and try again.");
        } else if (error.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          navigate("/login");
        } else if (error.response?.status === 400) {
          const errorMessage = error.response.data?.message || "Please check your input and try again.";
          alert(errorMessage);
        } else if (error.response?.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("Error creating post. Please try again.");
        }
      });
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleContentChange = (content) => {
    setPostContent(content);
    // Clear error when user starts typing
    if (contentError) {
      setContentError("");
    }
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

  return (
    <div className="createPostPage">
      <h1>Share Your Nordic Adventure</h1>
      <p className="create-post-subtitle">
        Help fellow travelers discover authentic experiences in Norway. Share your practical tips, stunning photos, and unforgettable moments from your Nordic journey.
      </p>
      
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validateYupSchema}
      >
        <Form>
          <div className="form-group">
            <label>Adventure Title</label>
            <ErrorMessage name="title" component={"span"} className="error-message" />
            <Field
              id="inputCreatePost"
              name="title"
              placeholder="e.g., 'Hiking Trolltunga: A Complete Guide to Norway's Most Iconic Trail'"
              className="inputField"
            />
          </div>
          
          <div className="form-group">
            <label>Your Travel Story</label>
            {contentError && <span className="error-message">{contentError}</span>}
            <div className="rich-text-editor-container">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={postContent}
                onChange={handleContentChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Share the details of your Norwegian adventure, including practical tips, what you discovered, and what made this experience special. Include information about logistics, best times to visit, and any insider knowledge that would help other travelers. Use the toolbar above to format your text, add links, create lists, and make your story more engaging!"
                className="rich-text-editor"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Add Photos</label>
            <p className="field-hint">Upload stunning photos from your Norwegian adventure (fjords, mountains, northern lights, hiking trails, etc.)</p>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="inputFile"
              accept="image/*"
            />
          </div>
          
          <button type="submit" className="submitButton">
            <span>Publish Adventure</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
