import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";
import React from "react";

export default function TextEditor({
  value,
  onEditorChange,
}: {
  value: string;
  onEditorChange: (data: string) => void;
  onEditorChangeRichtext?: (data: string) => void;
}) {
  const [editorData, setEditorData] = React.useState(
    value ? value : "<p>Start writing your content here...</p>"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
    onEditorChange(data);
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
