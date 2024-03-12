import { $ } from "bun";

Bun.serve({
  port: 6969,
  async fetch(req) {
    console.log("HI");
    console.log(req.url)
    if (req.method === "POST") {
      const body = (await req.json()) as { filename: string; code: string };
      console.log(body);
      await $`mkdir tmp`;
      const singleFile = body.filename.replaceAll("/", "__");
      await Bun.write(`./tmp/${singleFile}`, body.code);
      await $`tmux load-buffer ./tmp/${singleFile}; tmux send-keys vim SPACE ${body.filename.replace(/^src\//, '')} ENTER i ESCAPE :set SPACE paste ENTER ESCAPE i; tmux paste-buffer -d; tmux send-keys ESCAPE :W ENTER`;
      await $`sleep 0.5`
    } else if (req.method === "GET" && new URL(req.url).pathname === "/finish") {
      await $`tmux split-window -v; tmux send-keys cd SPACE ~/uploadthing-speedrun/yo ENTER; tmux send-keys while SPACE true '\;' SPACE do SPACE pbpaste SPACE '|' SPACE grep SPACE UPLOAD SPACE '>/dev/null' SPACE '&&' SPACE break '\;' SPACE sleep SPACE 0.1 '\;' SPACE done '\;' SPACE pbpaste SPACE '>' SPACE .env '\;' SPACE echo SPACE '>>' SPACE .env '\;' SPACE bun SPACE run SPACE start ENTER`;
    }

    const res = new Response("hello world");
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  },
});
