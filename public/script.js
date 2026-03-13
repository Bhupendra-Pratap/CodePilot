const chatEl = document.getElementById("chat");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("message");
let typingEl = null;

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function setTyping(visible) {
  if (visible && !typingEl) {
    typingEl = document.createElement("div");
    typingEl.className = "msg bot typing";
    typingEl.textContent = "Thinking...";
    chatEl.appendChild(typingEl);
    chatEl.scrollTop = chatEl.scrollHeight;
    return;
  }

  if (!visible && typingEl) {
    typingEl.remove();
    typingEl = null;
  }
}

function autoResizeTextarea() {
  inputEl.style.height = "auto";
  inputEl.style.height = `${Math.min(inputEl.scrollHeight, 220)}px`;
}

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = inputEl.value.trim();
  if (!text) {
    return;
  }

  addMessage("user", text);
  inputEl.value = "";
  autoResizeTextarea();
  inputEl.focus();
  setTyping(true);

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Request failed.");
    }

    setTyping(false);
    addMessage("bot", data.reply);
  } catch (error) {
    setTyping(false);
    addMessage("bot", `Error: ${error.message}`);
  }
});

inputEl.addEventListener("input", autoResizeTextarea);

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    formEl.requestSubmit();
  }
});

addMessage("bot", "CodePilot online with Hugging Face Llama. Share code, error logs, or architecture questions and I will help you debug and improve it.");
autoResizeTextarea();
