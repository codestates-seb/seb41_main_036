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
  const numPages:number = Math.ceil(total / limit);


  return (
    <>
      <Nav>
        <Button style={{ width: '44px', fontSize: '14px' }} onClick={() => setPage(page + 4)} disabled={page === 1}>
          {'<'}
        </Button>
        {new Array<number>(5)
          .fill(1)
          .map((_, i) => (
            <Button key={i + 1} onClick={() => {page>=5 ? setPage( i+1+(page%5)):setPage(i + 1) }} aria-current={ (page >=5 && page === i+1+(page%5)) ? 'page' : (page === i+1) ? 'page' :null}>
              { page>=5 ? i+1+(page%5) : i+1 } 
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
// PaginationComponent (아래 전체) 복사 후 컴포넌트 이름 변경해서 원하는 페이지 위에 사용하시면 됩니다. 
// 위에 컴포넌트들은 그대로 사용하시면 됩니다. 
const PaginationComponent = ():JSX.Element => {

    const [posts, setPosts] = useState([]); 
    const limit = 8; // 여기 조절해서 한 페이지당 게시물 수 바꿀 수 있습니다. 
    const [page, setPage] = useState(1); 
    const offset = (page - 1) * limit; 
  
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos") // 서버 주소 입력해주세요
        .then((res) => res.json())
        .then((data) => {setPosts(data);console.log(posts)});// 데이터 잘 받아오는지 확인용 입니다. 
    }, []);
  
    return(
    <>
     {/* 이쪽에 받아올 데이터 body값 작성하시면 됩니다. 아래는 jsonplaceholder 데이터 예시입니다  */}
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

