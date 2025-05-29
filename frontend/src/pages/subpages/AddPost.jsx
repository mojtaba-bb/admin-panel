import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function AddPost() {
  const [lang, setLang] = useState("en"); // "en" یا "fa"
  const [post, setPost] = useState({
    title: { en: "", fa: "" },
    content: { en: "", fa: "" },
    tags: "",
    status: "draft", // draft | published | archived
    links: [{ url: "", text: { en: "", fa: "" } }],
    media: [] // { id: "", caption: { en: "", fa: "" } }
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // فرض: داده شامل { id, fileUrl }
      const mediaItem = { id: data.id, fileUrl: data.fileUrl, caption: { en: "", fa: "" } };

      setPost(prev => ({
        ...prev,
        media: [...prev.media, mediaItem]
      }));
      setShowUploadModal(false);
    } catch (err) {
      toast.error(lang === "en" ? "File upload failed" : "خطا در آپلود فایل");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // تغییر فیلدهای چند­زبانه
  const handleMLChange = (field, value) => {
    setPost(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  // تغییر تک‌زبانه (tags, status)
  const handleChange = (field, value) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  // لینک‌ها
  const addLink = () => {
    if (post.links.length >= 3) {
      toast.error(lang === "en" ? "Maximum 3 links allowed" : "حداکثر ۳ لینک مجاز است");
      return;
    }
    setPost(prev => ({
      ...prev,
      links: [...prev.links, { url: "", text: { en: "", fa: "" } }]
    }));
  };
  const removeLink = idx => setPost(prev => ({
    ...prev,
    links: prev.links.filter((_, i) => i !== idx)
  }));
  const handleLink = (idx, subfield, value) => {
    setPost(prev => {
      const links = [...prev.links];
      if (subfield === "url") links[idx].url = value;
      else links[idx].text[lang] = value;
      return { ...prev, links };
    });
  };

  // مدیریت کپشن مدیا
  const handleMediaCaption = (idx, value) => {
    setPost(prev => {
      const media = [...prev.media];
      media[idx].caption[lang] = value;
      return { ...prev, media };
    });
  };

  // حذف مدیا
  const removeMedia = idx => setPost(prev => ({
    ...prev,
    media: prev.media.filter((_, i) => i !== idx)
  }));

  return (
    <div className="p-6 bg-zinc-800 min-h-screen text-white">
      <div className="max-w-3xl mx-auto bg-zinc-900 p-6 rounded space-y-4">
        {/* زبان */}
        <div className="flex items-center justify-end space-x-2">
          <span className="font-bold">{lang.toUpperCase()}</span>
          <button
            onClick={() => setLang(lang === "en" ? "fa" : "en")}
            className="px-3 py-1 bg-yellow-600 rounded cursor-pointer"
          >
            {lang === "en" ? "فارسی" : "English"}
          </button>
        </div>

        {/* عنوان */}
        <input
          type="text"
          placeholder={lang === "en" ? "Title" : "عنوان"}
          value={post.title[lang]}
          onChange={e => handleMLChange("title", e.target.value)}
          className="w-full p-2 bg-zinc-800 rounded border border-yellow-300"
        />

        {/* محتوا */}
        <textarea
          rows={6}
          placeholder={lang === "en" ? "Content" : "متن"}
          value={post.content[lang]}
          onChange={e => handleMLChange("content", e.target.value)}
          className="w-full p-2 bg-zinc-800 rounded border border-yellow-300"
        />

        {/* تگ‌ها */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={post.tags}
          onChange={e => handleChange("tags", e.target.value)}
          className="w-full p-2 bg-zinc-800 rounded border border-yellow-300"
        />

        {/* وضعیت */}
        <select
          value={post.status}
          onChange={e => handleChange("status", e.target.value)}
          className="w-full p-2 bg-zinc-800 rounded border border-yellow-300"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        {/* لینک‌ها */}
        <div className="space-y-2">
          <h2 className="font-bold">{lang === "en" ? "Links" : "لینک‌ها"}</h2>
          {post.links.map((lnk, i) => (
            <div key={i} className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder="URL"
                value={lnk.url}
                onChange={e => handleLink(i, "url", e.target.value)}
                className="flex-1 p-2 bg-zinc-800 rounded border border-yellow-300"
              />
              <input
                type="text"
                placeholder={lang === "en" ? "Link Text" : "متن لینک"}
                value={lnk.text[lang]}
                onChange={e => handleLink(i, "text", e.target.value)}
                className="flex-1 p-2 bg-zinc-800 rounded border border-yellow-300"
              />
              <button
                onClick={() => removeLink(i)}
                className="p-2 bg-red-600 rounded"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addLink}
            className="mt-1 px-4 py-2 bg-green-600 rounded"
          >
            {lang === "en" ? "Add Link" : "افزودن لینک"}
          </button>
        </div>

        {/* مدیا */}
        <div className="space-y-2">
          <h2 className="font-bold">{lang === "en" ? "Media" : "فایل‌ها"}</h2>
          {post.media.map((m, i) => (
            <div key={i} className="flex space-x-2 items-center">
              <img src={m.fileUrl} alt="attachment" className="w-16 h-16 object-cover rounded" />
              <input
                type="text"
                placeholder={lang === "en" ? "Caption" : "کپشن"}
                value={m.caption[lang]}
                onChange={e => handleMediaCaption(i, e.target.value)}
                className="flex-1 p-2 bg-zinc-800 rounded border border-yellow-300"
              />
              <button
                onClick={() => removeMedia(i)}
                className="p-2 bg-red-600 rounded"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-1 px-4 py-2 bg-blue-600 rounded"
          >
            {lang === "en" ? "Upload File" : "آپلود فایل"}
          </button>
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end space-x-2">
          <button className="px-6 py-2 bg-green-500 rounded">
            {lang === "en" ? "Submit" : "تایید"}
          </button>
          <Link to="/content-manager" className="px-6 py-2 bg-red-500 rounded">
            {lang === "en" ? "Cancel" : "انصراف"}
          </Link>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded shadow-xl space-y-4 w-96 border border-yellow-300">
            <h2 className="text-xl font-bold text-yellow-300">
              {lang === "en" ? "Upload File" : "آپلود فایل"}
            </h2>

            <input
              type="file"
              accept="image/*,video/*,application/pdf"
              onChange={handleFileUpload}
              className="w-full p-2 bg-zinc-800 text-white rounded border border-yellow-300"
            />

            {uploading && <p className="text-sm text-yellow-400">{lang === "en" ? "Uploading..." : "در حال آپلود..."}</p>}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-red-600 rounded"
                disabled={uploading}
              >
                {lang === "en" ? "Cancel" : "انصراف"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default AddPost;
