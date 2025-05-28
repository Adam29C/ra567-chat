import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './Redux/store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);



// import React, { useCallback, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import InfiniteScroll from 'react-infinite-scroller';
// import parseLinkHeader from 'parse-link-header';

// async function fetchIssues(url) {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: new Headers({
//       Accept: 'application/vnd.github.v3+json'
//     })
//   });

//   const links = parseLinkHeader(response.headers.get('Link'));
//   const issues = await response.json();

//   return {
//     links,
//     issues
//   };
// }

// const App = () => {
//   const [items, setItems] = useState([]);
//   const [nextPageUrl, setNextPageUrl] = useState(
//     'https://api.github.com/repos/facebook/react/issues'
//   );
//   const [fetching, setFetching] = useState(false);

//   const fetchItems = useCallback(
//     async () => {
//       if (fetching) {
//         return;
//       }

//       setFetching(true);

//       try {
//         const { issues, links } = await fetchIssues(nextPageUrl);

//         setItems([...items, ...issues]);

//         if (links.next) {
//           setNextPageUrl(links.next.url);
//         } else {
//           setNextPageUrl(null);
//         }
//       } finally {
//         setFetching(false);
//       }
//     },
//     [items, fetching, nextPageUrl]
//   );

//   const hasMoreItems = !!nextPageUrl;

//   const loader = (
//     <div key="loader" className="loader">
//       Loading ...
//     </div>
//   );

//   return (
//     <InfiniteScroll
//       loadMore={fetchItems}
//       hasMore={hasMoreItems}
//       loader={loader}
//     >
//       <ul>
//         {items.map(item => (
//           <li key={item.id}>
//             <a href={item.url} target="_blank" rel="noopener">
//               {item.title}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </InfiniteScroll>
//   );
// };

// const root = createRoot(document.getElementById('root'));
// root.render(<App />);