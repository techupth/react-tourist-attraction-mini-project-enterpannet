import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import "../App.css";
import { UiwCopy } from "./Icon";
function HomePage() {
  const [data, setData] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [status, setStatus] = useState("Loading...");
  const getData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${keywords}`
      );

      setData(result.data.data);
      status;
      if (result.data.data.length === 0) {
        setStatus("Not Found");
      }
      // setStatus("Success...");
    } catch (error) {
      setStatus(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [keywords]);

  function getTags(e) {
    const value = e.target.innerText;
    if (!keywords) {
      setKeywords(value);
    } else if (!keywords.includes(value)) {
      setKeywords(`${keywords} ${value}`);
    }
  }
  function copyToClipboard(url) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.log("Copy to clipboard failed:", error);
      });
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>เที่ยวไหนดี</h1>

          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
        </div>
        {!data.length == 0 ? (
          data.map((item) => {
            return (
              <>
                <div className="data-list">
                  <div className="picture">
                    <img src={item.photos[0]} alt="" />
                  </div>

                  <div key={item.eid} className="data">
                    <div className="title">{item.title}</div>
                    <div className="description">
                      {item.description.length > 100
                        ? item.description.substring(0, 100) + "..."
                        : item.description}
                      {item.description.length > 100 && (
                        <a href={item.url} target="_blank">
                          อ่านต่อ...
                        </a>
                      )}
                    </div>
                    <div className="tagsAndLink">
                      <div className="tags">
                        {item.tags.length > 0 && (
                          <div>
                            หมวด -{" "}
                            <span onClick={getTags}>{item.tags[0]} </span>
                            {item.tags.slice(1, -1).map((tag, index) => (
                              <span onClick={getTags} key={index}>
                                {"  "}
                                {tag}
                                {"  "}
                              </span>
                            ))}
                            และ{" "}
                            <span onClick={getTags}>
                              {item.tags[item.tags.length - 1]}
                            </span>
                          </div>
                        )}
                      </div>

                      <div
                        className="copyLink"
                        onClick={() => copyToClipboard(item.url)}
                      >
                        <UiwCopy />
                      </div>
                    </div>
                    <div className="pictureReview">
                      {/* map photos */}

                      <img src={item.photos[1]} alt="" />
                      <img src={item.photos[2]} alt="" />
                      <img src={item.photos[3]} alt="" />
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <p>{status}</p>
        )}
        {/* map trips */}
      </div>
    </>
  );
}
export default HomePage;
