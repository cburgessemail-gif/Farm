<select
  value={language}
  onChange={(e) => setLanguage(e.target.value as Language)}
  style={{
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cfd8cf",
    fontWeight: 700,
    background: "white",
    color: "#1f4f2c",
  }}
  aria-label="Select language"
>
  <option value="EN">English</option>
  <option value="ES">Spanish</option>
  <option value="TL">Tagalog</option>
  <option value="IT">Italian</option>
  <option value="PATWA">Jamaican Patwa</option>
  <option value="HE">Hebrew</option>
</select>
