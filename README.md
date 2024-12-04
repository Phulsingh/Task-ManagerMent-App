(
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                Title <span style={{ color: "red" }}>*</span>
              </p>
              <input
                value={currentEdit.taskTittle}
                type="text"
                placeholder="Enter Task Title"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                Select Priority
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#ffebe8",
                    color: "#d9534f",
                  }}
                >
                  HIGH PRIORITY
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#e7f3ff",
                    color: "#5bc0de",
                  }}
                >
                  MODERATE PRIORITY
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#e8f5e9",
                    color: "#5cb85c",
                  }}
                >
                  LOW PRIORITY
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>Assign to</p>
              <input
                type="text"
                placeholder="Add an assignee"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                Checklist <span style={{ color: "red" }}>*</span>
              </p>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input type="checkbox" />
                <input
                  type="text"
                  value="Done Task"
                  style={{
                    flexGrow: 1,
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#d9534f",
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </button>
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#5bc0de",
                  cursor: "pointer",
                }}
              >
                + Add New
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => setCurrentEdit(undefined)}
                style={{
                  padding: "10px 20px",
                  color: "#d9534f",
                  border: "1px solid #d9534f",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  color: "white",
                  backgroundColor: "#5bc0de",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )