import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class ReduxFileUploader extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  renderInput = ({ input, type, meta }) => {
    const { mime } = this.props;
    return (
      <div>
        <input
          name={input.name}
          type={type}
          accept={mime}
          onChange={(event) => this.handleChange(event, input)}
        />
      </div>
    );
  };

  handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };

  onFormSubmit = (data) => {
    let formData = new FormData();
    formData.append("name", data.image.name);
    formData.append("image", data.image);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    const url = "API_URL";
    post(url, formData, config)
      .then(function (response) {
        console.log("FILE UPLOADED SUCCESSFULLY");
      })
      .catch(function (error) {
        console.log("ERROR WHILE UPLOADING FILE");
      });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2>File upload to server using redux-form in React</h2>
        <hr />
        <div>
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            <table>
              <tr>
                <td>Select File :</td>
              </tr>
              <tr>
                <td>
                  <Field
                    name="spread sheet"
                    type="file"
                    component={this.renderInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit">Submit</button>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "myfileupload"
})(ReduxFileUploader);
