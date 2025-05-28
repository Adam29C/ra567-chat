

import React, { useState, useEffect, useRef, useCallback } from 'react';

const InfiniteScrollBox = () => {
  const [data, setData]     = useState([]);


  // console.log("data" ,data);
  
  const [loading, setLoading] = useState(false);
  const [page, setPage]      = useState(1);
  const boxRef = useRef(null);

  const fetchData = async (pageNum) => {
    setLoading(true);
    // your API call here…
    const newData = Array.from({ length: 10 }, (_, i) =>
      `Item ${i + 1 + (pageNum - 1) * 10}`
    );
    setData(d => [...d, ...newData]);
    setLoading(false);
  };

  const handleScroll = useCallback((e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    // when scrolled within 20px of the bottom:
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setPage(p => p + 1);
    }
  }, [loading]);

  // fetch on page change
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div
      ref={boxRef}
      onScroll={handleScroll}
      className="h-[60vh] overflow-auto border"
    >
      {data.map((item, idx) => (
        <div key={idx} className="p-2 border-b">{item}</div>
      ))}
      {loading && (
        <div className="p-4 text-center">Loading more…</div>
      )}
    </div>
  );
};

export default InfiniteScrollBox;
