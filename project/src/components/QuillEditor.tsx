import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageReSize from "quill-image-resize-module-react";
Quill.register("modules/imageReSize", ImageReSize);

// props 타입정의

const QuillEditor = () => {
  const quillRef = useRef(null);
  const [content, setContent] = useState("");
  const modules = {
    /* 툴바에서 사용하고 싶은 옵션들을 추가 */
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
    imageReSize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };
  return (
    <>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
        style={{ height: "100%", width: "100%" }} // style
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};

export default QuillEditor;
