import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";
import React from "react";

export default function TextEditor() {
  const [editorData, setEditorData] = React.useState(
    "<p>Hello from CKEditor 5!</p>"
  );

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
    setEditorData(data);
  };
  return (
    <div className="editor-container">
      <CKEditor
        editor={Editor}
        data={editorData}
        onChange={handleEditorChange}
      />
    </div>
  );
}
