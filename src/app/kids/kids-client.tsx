"use client";

export default function KidsClient() {
  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6"
      }}>
        <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          For the Little Ones
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
          Kids' Corner
        </h2>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🍔</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#C4622D", fontSize: 18, fontWeight: 400, marginBottom: 12 }}>
          Kid-Approved West African Meals
        </h3>
        <p style={{ color: "#3D4A30", fontSize: 14, lineHeight: 1.7, maxWidth: 320, marginBottom: 24 }}>
          Tackle picky eating with meals specifically portioned, styled, and seasoned for younger palates. Get nutrition advice and easy snack recipe ideas.
        </p>

        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E8DDD0",
          borderRadius: 16,
          padding: "16px 20px",
          width: "100%",
          maxWidth: 320,
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          <div style={{ color: "#2D5016", fontWeight: 600, fontSize: 13 }}>⭐ Coming Soon Features:</div>
          <div style={{ display: "flex", gap: 10, fontSize: 13, color: "#3D4A30" }}>
            <span style={{ color: "#C4622D" }}>✓</span>
            <span>Non-spicy alternate seasoning toggle</span>
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 13, color: "#3D4A30" }}>
            <span style={{ color: "#C4622D" }}>✓</span>
            <span>Fun shape presentation and bite-sized snack ideas</span>
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 13, color: "#3D4A30" }}>
            <span style={{ color: "#C4622D" }}>✓</span>
            <span>Toddler & children nutritional guidelines</span>
          </div>
        </div>
      </div>
    </div>
  );
}
