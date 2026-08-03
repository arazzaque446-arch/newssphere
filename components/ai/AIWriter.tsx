"use client";

import { useState } from "react";

export default function AIWriter() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [location, setLocation] = useState("");

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function generateArticle() {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        "/api/ai/generate",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify({
            title,
            content,
            category,
            location,
          }),
        }
      );


      const data = await response.json();


      if(!data.success){
        throw new Error(data.error);
      }


      setArticle(data.article);


    } catch(err:any){

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }



  return (

    <div className="space-y-6">


      <div>
        <label className="font-semibold">
          Headline
        </label>

        <input
          className="mt-2 w-full rounded border p-3"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Enter news headline"
        />
      </div>



      <div>
        <label className="font-semibold">
          Category
        </label>

        <input
          className="mt-2 w-full rounded border p-3"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />
      </div>



      <div>
        <label className="font-semibold">
          Location
        </label>

        <input
          className="mt-2 w-full rounded border p-3"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          placeholder="Example: Guwahati, Assam"
        />
      </div>



      <div>
        <label className="font-semibold">
          Raw News Content
        </label>

        <textarea
          className="mt-2 min-h-[200px] w-full rounded border p-3"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder="Paste news details here..."
        />
      </div>



      <button
        onClick={generateArticle}
        disabled={loading}
        className="rounded bg-black px-6 py-3 text-white"
      >

        {loading
        ? "Generating AI Article..."
        : "Generate News Article"}

      </button>



      {error && (
        <div className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}



      {article && (

        <div className="space-y-4 rounded border p-6">

          <h2 className="text-2xl font-bold">
            AI Generated Article
          </h2>


          <div>
            <b>Title:</b>
            <p>{article.title}</p>
          </div>


          <div>
            <b>Summary:</b>
            <p>{article.summary}</p>
          </div>


          <div>
            <b>Article:</b>
            <p className="whitespace-pre-wrap">
              {article.content}
            </p>
          </div>


          <div>
            <b>SEO Title:</b>
            <p>{article.seoTitle}</p>
          </div>


          <div>
            <b>SEO Description:</b>
            <p>{article.seoDescription}</p>
          </div>


          <div>
            <b>Tags:</b>
            <p>
              {article.tags?.join(", ")}
            </p>
          </div>


          <div>
            <b>Slug:</b>
            <p>{article.slug}</p>
          </div>


          <div>
            <b>Reading Time:</b>
            <p>{article.readTime}</p>
          </div>


        </div>

      )}


    </div>

  );

}