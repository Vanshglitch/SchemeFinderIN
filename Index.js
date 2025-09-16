async function findSchemes() {
  const age = parseInt(document.getElementById("age").value);
  const category = document.getElementById("category").value;
  const domain = document.getElementById("domain").value;
  const results = document.getElementById("results");

  results.innerHTML = "Searching...";

  // Load schemes.json
  const res = await fetch("schemes.json");
  const schemes = await res.json();

  const matched = schemes.filter(s => {
    const e = s.eligibility;
    const okDomain = domain && s.domain.toLowerCase() === domain.toLowerCase();
    const okAge = (!e.min_age || age >= e.min_age) && (!e.max_age || age <= e.max_age);
    const okCat = e.categories.includes(category.toUpperCase());
    return okDomain && okAge && okCat;
  });

  results.innerHTML = matched.length
    ? matched.map(s => `<div class="card">
        <h3>${s.name}</h3>
        <p>Need: ${s.domain}</p>
        <a href="${s.apply_link}" target="_blank">Apply Here</a>
      </div>`).join("")
    : "<p>No matching schemes found</p>";
}