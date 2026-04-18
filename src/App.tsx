function RoleTile({
  title,
  intro,
  image,
  icon,
  active,
  onClick,
}: {
  title: string;
  intro: string;
  image: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: active
          ? "1px solid rgba(201,255,185,0.82)"
          : "1px solid rgba(255,255,255,0.10)",
        borderRadius: 26,
        overflow: "hidden",
        background: "rgba(255,255,255,0.05)",
        cursor: "pointer",
        textAlign: "left",
        boxShadow: active ? "0 0 0 1px rgba(201,255,185,0.18)" : "none",
      }}
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        {!imgError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 0.92,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #19341f 0%, #3c6f4e 55%, #9e8c58 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 54,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {icon}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.34) 48%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 18,
            right: 18,
            bottom: 16,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: 18,
              lineHeight: 1.15,
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 8,
              color: "rgba(255,255,255,0.88)",
              fontSize: 14,
              lineHeight: 1.45,
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            {intro}
          </div>
        </div>
      </div>
    </button>
  );
}
