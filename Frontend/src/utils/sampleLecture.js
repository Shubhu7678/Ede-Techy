// Sample content for the course builder, so you can try the flow without recording anything.

export const SAMPLE_SECTIONS = ["Getting started", "Core concepts", "Build a project", "Wrap up"];

export const SAMPLE_LECTURES = [
  { title: "Welcome to the course", description: "A quick tour of what you'll learn, how the course is organised and how to get the most out of it." },
  { title: "Setting up your tools", description: "Install everything you need and check that your setup works before we start building." },
  { title: "Your first example", description: "Follow along as we build a small, working example from start to finish." },
  { title: "Key ideas to remember", description: "A short recap of the most important concepts so far, with tips to avoid common mistakes." },
  { title: "Next steps", description: "Where to go from here: practice ideas, resources and what to build next." },
];

// Records a short (default 3.5 s) video in the browser from an animated canvas. Returns a File ready to upload.
export async function makeSampleVideo(title = "Sample lecture", seconds = 3.5) {
  if (typeof MediaRecorder === "undefined" || !HTMLCanvasElement.prototype.captureStream) {
    throw new Error("This browser can't create the sample video. Try Chrome, Edge or Firefox.");
  }
  const W = 640, H = 360;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  const types = ["video/mp4;codecs=avc1", "video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  const mimeType = types.find((t) => MediaRecorder.isTypeSupported(t)) || "";
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType, videoBitsPerSecond: 900000 } : undefined);
  const chunks = [];
  recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  const stopped = new Promise((resolve) => { recorder.onstop = resolve; });

  const wrap = (text, maxWidth) => {
    const words = text.split(" "); const lines = []; let line = "";
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; } else line = test;
    }
    lines.push(line); return lines;
  };

  const start = performance.now();
  recorder.start();
  const draw = (now) => {
    const t = Math.min((now - start) / 1000, seconds);
    ctx.fillStyle = "#0A0A0A"; ctx.fillRect(0, 0, W, H);
    // soft moving glow
    const gx = W * (0.5 + 0.25 * Math.sin(t * 1.4)), gy = H * (0.5 + 0.2 * Math.cos(t * 1.1));
    const g = ctx.createRadialGradient(gx, gy, 10, gx, gy, 260);
    g.addColorStop(0, "rgba(232,196,104,0.28)"); g.addColorStop(1, "rgba(232,196,104,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    ctx.textAlign = "center"; ctx.fillStyle = "#E8C468"; ctx.font = "600 14px Inter, sans-serif";
    ctx.fillText("SAMPLE LECTURE", W / 2, 120);

    const alpha = Math.min(1, t / 0.6);
    ctx.globalAlpha = alpha; ctx.fillStyle = "#F4F1EA"; ctx.font = "600 40px 'Cormorant Garamond', Georgia, serif";
    const lines = wrap(title, W - 120);
    lines.forEach((l, i) => ctx.fillText(l, W / 2, 185 + i * 46 + (1 - alpha) * 14));
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fillRect(60, H - 44, W - 120, 4);
    ctx.fillStyle = "#E8C468"; ctx.fillRect(60, H - 44, (W - 120) * (t / seconds), 4);

    if (now - start < seconds * 1000) requestAnimationFrame(draw); else recorder.stop();
  };
  requestAnimationFrame(draw);
  await stopped;
  stream.getTracks().forEach((tr) => tr.stop());

  const type = recorder.mimeType || mimeType || "video/webm";
  const ext = type.includes("mp4") ? "mp4" : "webm";
  return new File([new Blob(chunks, { type })], `sample-lecture.${ext}`, { type });
}
