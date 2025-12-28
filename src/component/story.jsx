import { useState } from "react";

const STORY_LIFETIME = 15000;

export default function Story() {
  const [previewStoryUrl, setPreviewStoryUrl] = useState([]);
  const [storyUrl, setStoryUrl] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    const id = crypto.randomUUID();
    const storyObj = { id: id, imgUrl: imgUrl };
    setTimeout(() => {
      setPreviewStoryUrl((prev) => prev.filter((story) => story.id !== id));
    }, STORY_LIFETIME);
    setPreviewStoryUrl((prev) => [storyObj, ...prev]);
  };

  const handleStoryClick = (url) => {
    setStoryUrl(url);
  };

  return (
    <>
      {storyUrl && <Modal imgSrc={storyUrl} setStoryUrl={setStoryUrl} />}

      <div className="story-row">
        <label className="add-story">
          +
          <input type="file" hidden onChange={(e) => handleChange(e)} />
        </label>
        <div className="story-panel">
          {previewStoryUrl.map(({ id, imgUrl }) => {
            return (
              <div
                key={id}
                className="story-preview"
                aria-label="preview-story"
                onClick={() => handleStoryClick(imgUrl)}
              >
                <img src={imgUrl} alt="story preview" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const Modal = ({ imgSrc, setStoryUrl }) => {
  return (
    <div className="overlay-modal">
      <button onClick={() => setStoryUrl(null)} className="close-story">
        X
      </button>
      <img src={imgSrc} alt="Story" />
    </div>
  );
};

