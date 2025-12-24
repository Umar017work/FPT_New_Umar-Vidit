/* ================================
   BLOG.JS – LOAD BLOGS DYNAMICALLY
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.querySelector(".blog-grid");

  if (!blogContainer) return;

  fetch("data/blogs.json")
    .then(res => res.json())
    .then(blogs => renderBlogs(blogs));

  function renderBlogs(blogs) {
    blogContainer.innerHTML = "";
    blogs.forEach(blog => {
      const card = document.createElement("article");
      card.classList.add("blog-card");
      card.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.excerpt}</p>
        <a href="blog-post.html?slug=${blog.slug}">Read More →</a>
      `;
      blogContainer.appendChild(card);
    });
  }
});
