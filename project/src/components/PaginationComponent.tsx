import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Page = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button:any = styled.button`
  border: none;
  border-radius: 4px;
  padding: 8px;
  margin: 0;
  background: white;
  color: #474a4c;
  font-size: 1rem;
  width: 35px;
  height: 30px;
  line-height: 10px;

  &:hover {
    line-height: 10px;
    width: 35px;
    height: 30px;
    background: hsl(210deg 8% 75%);
    cursor: pointer;
  }

  &[aria-current] {
    border: none;
    line-height: 13px;
    width: 35px;
    height: 30px;
    background: #383838;
    font-weight: bold;
    cursor: revert;
    color: white;
  }
`;

const Pagination = ({ total, limit, page, setPage }:{total:number, limit:number, page:number, setPage:any}) => {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button style={{ width: '44px', fontSize: '14px' }} onClick={() => setPage(page - 1)} disabled={page === 1}>
          {'<'}
        </Button>
        {new Array<number>(numPages)
          .fill(1)
          .map((_, i) => (
            <Button key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : null}>
              {i + 1}
            </Button>
          ))}
        <Button style={{ width: '44px', fontSize: '14px' }} onClick={() => setPage(page + 1)} disabled={page === numPages}>
          {'>'}
        </Button>
      </Nav>
    </>
  );
};


// 사용할 때
// PaginationComponent 임포트해서 사용하시면 됩니다.
const PaginationComponent = ():JSX.Element => {
    const [posts, setPosts] = useState([]); 
    const limit = 8; // 여기 조절해서 한 페이지당 게시물 수 바꿀 수 있습니다. 
    const [page, setPage] = useState(1); 
    const offset = (page - 1) * limit; 
    const url = `${process.env.REACT_APP_API_URL}/members?page=1&size=35`;
  
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos") // 서버 주소 입력해주세요
        .then((res) => res.json())
        .then((data) => {setPosts(data);console.log(posts)});// 데이터 잘 받아오는지 확인 
    }, []);
    
  
  
    return(
    <>
     {/* 이쪽에 받아올 데이터 body값 작성하시면 됩니다.  */}
      <main>
        {posts.slice(offset, offset + limit).map(({ id, title, body }) => (
          <article key={id}>
            <h3>
              {id}. {title}
            </h3>
            <p>{body}</p>
          </article>
        ))}
      </main>
    <Page>
      <Pagination total={posts.length} limit={limit} page={page} setPage={setPage}></Pagination>
    </Page>
    </>
  )  
}
export default PaginationComponent;

