import React, { Component, useState } from "react";

import ParseRawData from "./ParseRawData";

export class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      data: []
    };
  }

  onFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    var reader = new FileReader();
    reader.onload = (e) => {
      console.log(reader.result);
      let result = ParseRawData(reader.result);
      let fieldNames = result[0];
      let objectsArray = result[1];
      this.setState({ fields: fieldNames, data: objectsArray });
      console.log(this.state.fields);
      console.log(this.state.data);
    };
    reader.readAsText(file);
  };

  render() {
    return (
      <div>
        <h2>File uploading</h2>
        <hr />
        <div>
          <form>
            <p>Upload File :</p>
            <input onChange={this.onFileChange} type="file" />
          </form>
        </div>
      </div>
    );
  }
}
