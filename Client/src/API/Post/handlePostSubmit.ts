import axios from "../../utils/axiosinstance";

export const handlePostSubmit = async (
  title: string,
  tags: string[],
  imgList: File[],
  content: string[],
  postId: string | undefined
) => {
  let result = "";
  if (title === "") {
    alert("제목을 입력해주세요");
  } else if (imgList.length === 0) alert("이미지를 등록해주세요.");
  else {
    const formData = new FormData();
    formData.append("postTitle", title);
    tags.forEach((tag) => {
      formData.append("postHashTags", tag);
    });
    imgList.forEach((img) => {
      formData.append("postImageFiles", img);
    });
    content.forEach((text) => {
      formData.append("postContents", text);
    });
    await axios
      .post(`/posts/register/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (result = res.data.data.postId))
      .catch((err) => console.error(err));
  }
  return result;
};
