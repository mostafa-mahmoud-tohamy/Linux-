(() => {
  "use strict";

  try {
    sessionStorage.clear();
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith("orbit-linux-fs")) localStorage.removeItem(k);
    }
  } catch (e) {}

  const SESSION_ID = "session_" + Math.random().toString(36).slice(2, 8);
  const STORAGE_KEY = `orbit-linux-fs-${SESSION_ID}`;
  const encoder = new TextEncoder();
  const builtInFiles = {
    "/home/alex/readme.txt": "Welcome to Orbit Linux!\n\nThis is your virtual home on the web.\nTry the terminal: help\n",
    "/home/alex/Documents/hello.txt": "Hello from Orbit Linux.\n\nYour files are stored in this browser.",
    "/home/alex/Documents/todo.txt": "- Explore the terminal\n- Create a folder with mkdir\n- Make something great",
    "/home/alex/Documents/notes.md": "# My notes\n\nThis is a real text file in your virtual filesystem.\n",
    "/home/alex/.bashrc": "# Orbit shell configuration\nexport EDITOR=nano\n",
    "/home/alex/Pictures/wallpaper.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560"><defs><linearGradient id="a" x2="1" y2="1"><stop stop-color="#141c35"/><stop offset="1" stop-color="#674b9a"/></linearGradient><radialGradient id="b"><stop stop-color="#9c86ff" stop-opacity=".7"/><stop offset="1" stop-color="#9c86ff" stop-opacity="0"/></radialGradient></defs><rect width="900" height="560" fill="url(#a)"/><circle cx="590" cy="200" r="240" fill="url(#b)"/><path d="M0 440Q220 280 450 430T900 370V560H0" fill="#111a2b" opacity=".65"/><text x="52" y="100" fill="#fff" font-family="sans-serif" font-size="34">Orbit Linux</text><text x="54" y="137" fill="#d4c9ff" font-family="sans-serif" font-size="17">A little universe of your own</text></svg>',
    "/home/alex/Pictures/orbit.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#452c85"/><stop offset="1" stop-color="#1d88a5"/></linearGradient></defs><rect width="640" height="420" rx="24" fill="url(#g)"/><circle cx="323" cy="208" r="119" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="2"/><ellipse cx="323" cy="208" rx="172" ry="55" fill="none" stroke="#d4cbff" stroke-width="11" transform="rotate(-24 323 208)"/><circle cx="435" cy="146" r="15" fill="#ffcf78"/><circle cx="323" cy="208" r="40" fill="#b5a3ff"/><text x="250" y="370" fill="white" font-family="sans-serif" font-size="23">ORBIT</text></svg>',
    "/home/alex/Pictures/mountains.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420"><defs><linearGradient id="s" y2="1"><stop stop-color="#273e72"/><stop offset="1" stop-color="#e98c86"/></linearGradient></defs><rect width="640" height="420" fill="url(#s)"/><circle cx="465" cy="113" r="47" fill="#ffd89d"/><path d="M0 340L175 114l156 226 98-145 211 179v46H0Z" fill="#333b66"/><path d="m115 192 60-78 51 74-34-20-18 26-19-17-17 24ZM375 260l54-65 43 64-25-16-18 22-17-17-17 19Z" fill="#e3e6f0"/><path d="M0 348q130-65 266 7t374-13v78H0Z" fill="#182a43"/></svg>',
    "/home/alex/Pictures/sample.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420"><rect width="640" height="420" fill="#1e2230"/><circle cx="200" cy="210" r="120" fill="#ef4444"/><circle cx="200" cy="210" r="80" fill="#f97316"/><circle cx="200" cy="210" r="40" fill="#eab308"/><rect x="380" y="90" width="160" height="110" rx="8" fill="#3b82f6"/><polygon points="460,240 370,360 550,360" fill="#10b981"/><text x="40" y="45" fill="#fff" font-family="sans-serif" font-size="20" font-weight="bold">Computer Vision Calibration Pattern</text></svg>',
    "/home/alex/Pictures/nature.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="60%" stop-color="#e11d48"/><stop offset="100%" stop-color="#fb923c"/></linearGradient></defs><rect width="640" height="420" fill="url(#sky)"/><circle cx="320" cy="240" r="60" fill="#fef08a"/><polygon points="0,420 180,220 360,420" fill="#1e1b4b"/><polygon points="260,420 450,180 640,420" fill="#312e81"/><rect x="0" y="360" width="640" height="60" fill="#090d16"/></svg>',
    "/home/alex/Pictures/car.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420"><defs><linearGradient id="csky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="70%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#f97316"/></linearGradient></defs><rect width="640" height="420" fill="url(#csky)"/><polygon points="280,260 360,260 640,420 0,420" fill="#18181b"/><rect x="240" y="310" width="160" height="50" rx="14" fill="#ef4444"/><rect x="270" y="270" width="100" height="44" rx="10" fill="#b91c1c"/><circle cx="280" cy="360" r="18" fill="#0f172a"/><circle cx="360" cy="360" r="18" fill="#0f172a"/></svg>',
    "/home/alex/Pictures/sunset_ocean.png": (typeof window !== "undefined" && window.ORBIT_PICTURES_DATA && window.ORBIT_PICTURES_DATA["sunset_ocean.png"]) || "",
    "/home/alex/Pictures/mountain_landscape.jpg": (typeof window !== "undefined" && window.ORBIT_PICTURES_DATA && window.ORBIT_PICTURES_DATA["mountain_landscape.jpg"]) || "",
    "/home/alex/Pictures/cute_cat.jpg": (typeof window !== "undefined" && window.ORBIT_PICTURES_DATA && window.ORBIT_PICTURES_DATA["cute_cat.jpg"]) || "",
    "/home/alex/Pictures/abstract_wallpaper.png": (typeof window !== "undefined" && window.ORBIT_PICTURES_DATA && window.ORBIT_PICTURES_DATA["abstract_wallpaper.png"]) || "",
    "/home/alex/Pictures/red_rose.jpg": (typeof window !== "undefined" && window.ORBIT_PICTURES_DATA && window.ORBIT_PICTURES_DATA["red_rose.jpg"]) || "",
    "/home/alex/Documents/script.js": "// JavaScript Demo in Orbit VS Code\nfunction calculateStats(numbers) {\n  const sum = numbers.reduce((acc, curr) => acc + curr, 0);\n  const avg = sum / numbers.length;\n  return { sum, avg, max: Math.max(...numbers) };\n}\n\nconst sampleData = [15, 28, 42, 87, 91, 104];\nconsole.log(\"Processed statistics:\", calculateStats(sampleData));\n",
    "/home/alex/Documents/main.py": "# Python 3 Demo in Orbit VS Code\ndef greet(name: str) -> str:\n    return f\"Hello {name}! Welcome to VS Code on Orbit Linux.\"\n\nif __name__ == '__main__':\n    print(greet('Developer'))\n    for i in range(1, 6):\n        print(f'Task {i}: Complete')\n",
    "/home/alex/Documents/styles.css": "/* Orbit Linux Stylesheet */\n:root {\n  --accent: #7c4dff;\n  --bg-panel: #161a24;\n}\n\n.card {\n  background: var(--bg-panel);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 14px;\n  padding: 24px;\n}\n",
    "/etc/hostname": "orbit-web\n",
    "/etc/os-release": 'NAME="Orbit Linux"\nPRETTY_NAME="Orbit Linux Web 1.0"\nID=orbit\nVERSION_ID="1.0"\n',
    "/etc/motd": "Welcome to Orbit Linux Web 1.0 (virtual session)\n",
    "/var/log/README": "System log files are simulated in this web environment.\n"
  };

  const fileType = (path) => /\.(svg|png|jpe?g|gif|webp|avif)$/i.test(path) ? "image" : "text";
  const fs = loadFs();
  if (typeof window !== "undefined" && window.ORBIT_PICTURES_DATA) {
    for (const [imgName, dataUrl] of Object.entries(window.ORBIT_PICTURES_DATA)) {
      const picPath = `/home/alex/Pictures/${imgName}`;
      builtInFiles[picPath] = dataUrl;
      fs.entries[picPath] = { type: fileType(imgName), content: dataUrl };
      fs.entries[imgName] = { type: fileType(imgName), content: dataUrl };
      fs.entries[`C:/Users/Compumarts/Pictures/${imgName}`] = { type: fileType(imgName), content: dataUrl };
      fs.entries[`C:\\Users\\Compumarts\\Pictures\\${imgName}`] = { type: fileType(imgName), content: dataUrl };
      fs.entries[`C:/Users/Compumarts/Downloads/${imgName}`] = { type: fileType(imgName), content: dataUrl };
      fs.entries[`C:\\Users\\Compumarts\\Downloads\\${imgName}`] = { type: fileType(imgName), content: dataUrl };
    }
  }
  for (const [p, c] of Object.entries(builtInFiles)) {
    if (!fs.entries[p]) {
      fs.entries[p] = { type: fileType(p), content: c };
    }
  }
  Object.keys(fs.entries).forEach((k) => {
    if (/zenitsu/i.test(k)) delete fs.entries[k];
  });
  let cwd = "/home/alex";
  let history = [];
  let historyIndex = 0;
  let zIndex = 10;
  let toastTimer;
  let currentEditorPath = null;
  let lastFileFolder = null;
  let importFolder = "/home/alex/Desktop";
  const area = document.getElementById("windowArea");
  const launcher = document.getElementById("appLauncher");
  const quickSettings = document.getElementById("quickSettings");
  const contextMenu = document.getElementById("contextMenu");
  const dialogOverlay = document.getElementById("dialogOverlay");
  const systemDialog = document.getElementById("systemDialog");
  let dialogAction = null;
  let fileClipboard = null;
  let suppressDesktopClick = false;

  const deviceModalOverlay = document.getElementById("deviceModalOverlay");
  const btnChoosePhone = document.getElementById("btnChoosePhone");
  const btnChoosePC = document.getElementById("btnChoosePC");
  const rotateScreenButton = document.getElementById("rotateScreenButton");
  const quickToggleRotate = document.getElementById("quickToggleRotate");
  const quickSwitchDevice = document.getElementById("quickSwitchDevice");
  const currentDeviceLabel = document.getElementById("currentDeviceLabel");

  const preloadedImageCanvases = new Map();
  const installedPythonPackages = new Set([
    "opencv-python", "opencv-contrib-python", "pillow", "numpy", "matplotlib",
    "scikit-image", "scipy", "imageio", "imageio-ffmpeg", "tifffile",
    "pywavelets", "networkx", "torchvision", "cycler", "kiwisolver",
    "packaging", "pyparsing", "python-dateutil", "pip", "wheel"
  ]);

  function rememberImageCanvas(path, canvas) {
    if (!path || !canvas) return canvas;
    preloadedImageCanvases.set(path, canvas);
    const winPath = String(path).replace(/\//g, "\\");
    preloadedImageCanvases.set(winPath, canvas);
    const slashPath = String(path).replace(/\\/g, "/");
    preloadedImageCanvases.set(slashPath, canvas);
    const bname = basename(slashPath);
    preloadedImageCanvases.set(bname, canvas);
    const noExt = bname.replace(/\.[^.]+$/, "");
    preloadedImageCanvases.set(noExt, canvas);
    ["png", "jpg", "jpeg", "webp", "gif", "svg"].forEach((ext) => {
      preloadedImageCanvases.set(`/home/alex/Pictures/${noExt}.${ext}`, canvas);
      preloadedImageCanvases.set(`/home/alex/Downloads/${noExt}.${ext}`, canvas);
      preloadedImageCanvases.set(`/home/alex/Desktop/${noExt}.${ext}`, canvas);
      preloadedImageCanvases.set(`C:/Users/Compumarts/Downloads/${noExt}.${ext}`, canvas);
      preloadedImageCanvases.set(`C:\\Users\\Compumarts\\Downloads\\${noExt}.${ext}`, canvas);
      preloadedImageCanvases.set(`C:/Users/Compumarts/Pictures/${noExt}.${ext}`, canvas);
      preloadedImageCanvases.set(`C:\\Users\\Compumarts\\Pictures\\${noExt}.${ext}`, canvas);
    });
    return canvas;
  }

  function canvasFromHtmlImage(img) {
    let w = img.naturalWidth || img.width || 640;
    let h = img.naturalHeight || img.height || 420;
    const maxDim = 1280;
    if (Math.max(w, h) > maxDim) {
      const s = maxDim / Math.max(w, h);
      w = Math.max(1, Math.round(w * s));
      h = Math.max(1, Math.round(h * s));
    }
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    return c;
  }

  function cloneCachedCanvas(src) {
    const c = document.createElement("canvas");
    c.width = src.width;
    c.height = src.height;
    c.getContext("2d").drawImage(src, 0, 0);
    return c;
  }

  function findImageFsPath(rawPath) {
    if (!rawPath) return null;
    const clean = String(rawPath).trim().replace(/^["']|["']$/g, "").replace(/^file:\/\//, "");
    if (!clean) return null;
    if (preloadedImageCanvases.has(clean)) return clean;
    const cleanSlash = clean.replace(/\\/g, "/");
    if (preloadedImageCanvases.has(cleanSlash)) return cleanSlash;

    const bname = basename(cleanSlash);
    if (preloadedImageCanvases.has(bname)) return bname;
    const nameNoExt = bname.replace(/\.[^.]+$/, "");
    if (preloadedImageCanvases.has(nameNoExt)) return nameNoExt;

    const bases = ["/home/alex/Pictures", "/home/alex/Downloads", "/home/alex/Desktop", "/home/alex", "/tmp"];
    const candidates = [
      clean,
      cleanSlash,
      normalize(cleanSlash, "/home/alex/Pictures"),
      normalize(cleanSlash, "/home/alex/Downloads"),
      normalize(cleanSlash, "/home/alex/Desktop"),
      normalize(cleanSlash, "/home/alex")
    ];
    bases.forEach((base) => {
      candidates.push(`${base}/${bname}`);
      ["svg", "png", "jpg", "jpeg", "webp", "gif"].forEach((ext) => {
        candidates.push(`${base}/${nameNoExt}.${ext}`);
      });
    });
    for (const p of candidates) {
      const entry = fs.entries[p];
      if (entry && entry.type !== "dir" && entry.content) return p;
    }
    const lowerName = bname.toLowerCase();
    const lowerNoExt = nameNoExt.toLowerCase();
    let fallback = null;
    for (const k of Object.keys(fs.entries)) {
      const entry = fs.entries[k];
      if (!entry || entry.type === "dir") continue;
      const kbname = basename(k).toLowerCase();
      const knoExt = kbname.replace(/\.[^.]+$/, "");
      if (kbname === lowerName || knoExt === lowerNoExt) {
        if (entry.type === "image" || /\.(svg|png|jpe?g|gif|webp|avif)$/i.test(k)) return k;
        fallback = fallback || k;
      }
    }
    return fallback;
  }

  function loadFsImageToCanvas(rawPath) {
    return new Promise((resolve) => {
      const found = findImageFsPath(rawPath);
      if (found && preloadedImageCanvases.has(found)) {
        resolve(preloadedImageCanvases.get(found));
        return;
      }
      if (rawPath && preloadedImageCanvases.has(rawPath)) {
        resolve(preloadedImageCanvases.get(rawPath));
        return;
      }
      let src = "";
      const entry = found ? fs.entries[found] : fs.entries[rawPath];
      src = entry && entry.content
        ? imageSource(entry.content)
        : (/^https?:\/\//i.test(String(rawPath || "").trim()) ? String(rawPath).trim() : "");
      if (!src) {
        resolve(null);
        return;
      }
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = canvasFromHtmlImage(img);
        if (found) rememberImageCanvas(found, canvas);
        rememberImageCanvas(rawPath, canvas);
        resolve(canvas);
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function preloadAllFsImages() {
    if (typeof window !== "undefined" && window.ORBIT_PICTURES_DATA) {
      for (const imgName of Object.keys(window.ORBIT_PICTURES_DATA)) {
        loadFsImageToCanvas(`/home/alex/Pictures/${imgName}`);
        loadFsImageToCanvas(`C:\\Users\\Compumarts\\Pictures\\${imgName}`);
      }
    }
    Object.keys(fs.entries).forEach((p) => {
      const entry = fs.entries[p];
      if (!entry || entry.type !== "image" || !entry.content) return;
      loadFsImageToCanvas(p);
    });
  }

  function ensurePythonImageStackInstalled() {
    const dirs = [
      "/home/alex/.local",
      "/home/alex/.local/lib",
      "/home/alex/.local/lib/python3.11",
      "/home/alex/.local/lib/python3.11/site-packages",
      "/home/alex/.local/lib/python3.11/site-packages/cv2",
      "/home/alex/.local/lib/python3.11/site-packages/PIL",
      "/home/alex/.local/lib/python3.11/site-packages/numpy",
      "/home/alex/.local/lib/python3.11/site-packages/matplotlib",
      "/home/alex/.local/lib/python3.11/site-packages/skimage",
      "/home/alex/.local/lib/python3.11/site-packages/scipy",
      "/home/alex/.local/lib/python3.11/site-packages/scipy/ndimage",
      "/home/alex/.local/lib/python3.11/site-packages/imageio"
    ];
    dirs.forEach((d) => { fs.entries[d] ||= { type: "dir" }; });
    const files = {
      "/home/alex/.local/lib/python3.11/site-packages/cv2/__init__.py": "# opencv-python 4.9.0.80 — Orbit Linux\n",
      "/home/alex/.local/lib/python3.11/site-packages/PIL/__init__.py": "# Pillow 10.3.0 — Orbit Linux\n",
      "/home/alex/.local/lib/python3.11/site-packages/numpy/__init__.py": "# numpy 1.26.4 — Orbit Linux\n",
      "/home/alex/.local/lib/python3.11/site-packages/matplotlib/__init__.py": "# matplotlib 3.8.4 — Orbit Linux\n",
      "/home/alex/.local/lib/python3.11/site-packages/skimage/__init__.py": "# scikit-image 0.23.1 — Orbit Linux\n",
      "/home/alex/.local/lib/python3.11/site-packages/scipy/__init__.py": "# scipy 1.13.0 — Orbit Linux\n",
      "/home/alex/.local/lib/python3.11/site-packages/scipy/ndimage/__init__.py": "# scipy.ndimage — Orbit Linux\n",
      "/home/alex/.local/lib/python3.11/site-packages/imageio/__init__.py": "# imageio 2.34.0 — Orbit Linux\n"
    };
    Object.entries(files).forEach(([p, content]) => {
      fs.entries[p] ||= { type: "text", content, modified: Date.now() };
    });
    persist();
  }

  function jupyterProcessCodeForPath(path) {
    let clean = String(path || "").trim().replace(/^["']|["']$/g, "");
    if (!clean || /zenitsu/i.test(clean)) {
      clean = "/home/alex/Pictures/sunset_ocean.png";
    }
    const outPath = clean;
    return `from PIL import Image
import matplotlib.pyplot as plt

# 1. فتح الصورة
image_path = r"${clean}"
img = Image.open(image_path)

# 2. تحويل الصورة إلى أبيض وأسود
bw_img = img.convert("L")

# 3. عرض الصورة الأصلية والمعدلة
plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.imshow(img)
plt.title("Original Image")
plt.axis("off")

plt.subplot(1, 2, 2)
plt.imshow(bw_img, cmap="gray")
plt.title("Black & White")
plt.axis("off")

plt.tight_layout()
plt.show()

# 4. حفظ الصورة الجديدة
output_path = r"${outPath}"
bw_img.save(output_path)

print("تم تحويل الصورة بنجاح!")
print("مكان حفظ الصورة:", output_path)
`;
  }

  function extractImagePathsFromPython(code) {
    const paths = [];
    const patterns = [
      /(?:Image\.open|cv2\.imread|skimage\.io\.imread|io\.imread|plt\.imread|imageio\.imread)\(\s*(?:r?["']([^"']+)["'])/g,
      /(?:image_path|img_path|path|input_path|output_path|file_path|src)\s*=\s*(?:r?["']([^"']+)["'])/gi,
      /["']([^"']+\.(?:svg|png|jpe?g|gif|webp|avif))["']/gi
    ];
    patterns.forEach((re) => {
      let m;
      while ((m = re.exec(code || "")) !== null) paths.push(m[1]);
    });
    return [...new Set(paths)];
  }

  function looksLikeStandaloneImagePath(text) {
    const t = String(text || "").trim().replace(/^["']|["']$/g, "");
    if (!t || t.includes("\n") || /\bimport\b|\bdef\b|\bprint\b/.test(t)) return false;
    if (findImageFsPath(t)) return true;
    return /\.(svg|png|jpe?g|gif|webp|avif)$/i.test(t);
  }

  function openImageInJupyter(path) {
    const found = findImageFsPath(path) || path;
    loadFsImageToCanvas(found);
    const existing = [...area.querySelectorAll(".window")].find((w) => w.dataset.kind === "jupyter");
    if (existing) {
      existing.hidden = false;
      existing.style.zIndex = ++zIndex;
      existing.dispatchEvent(new CustomEvent("orbit-open-image", { detail: { path: found } }));
      updateDockActiveState();
      showToast(`Opened ${basename(found)} in Jupyter`);
      return existing;
    }
    return openWindow("jupyter", { imagePath: found });
  }

  preloadAllFsImages();
  ensurePythonImageStackInstalled();

  function isMobileMode() {
    return window.innerWidth <= 768 || document.body.classList.contains("device-phone");
  }

  function applyDeviceMode(mode) {
    if (mode === "phone") {
      document.body.classList.add("device-phone");
      document.body.classList.remove("device-pc");
      if (rotateScreenButton) rotateScreenButton.hidden = false;
      if (quickToggleRotate) quickToggleRotate.hidden = false;
      if (currentDeviceLabel) currentDeviceLabel.textContent = "هاتف (Phone)";
      showToast("تم تفعيل وضع الهاتف (تحكم باللمس بدون مؤشر ماوس)");
    } else {
      document.body.classList.add("device-pc");
      document.body.classList.remove("device-phone");
      document.body.classList.remove("phone-landscape-mode");
      if (rotateScreenButton) rotateScreenButton.hidden = true;
      if (quickToggleRotate) quickToggleRotate.hidden = true;
      if (currentDeviceLabel) currentDeviceLabel.textContent = "كمبيوتر (PC)";
      showToast("تم تفعيل وضع الكمبيوتر (سطح المكتب الكامل)");
    }
    localStorage.setItem("orbit_device_mode", mode);
    sessionStorage.setItem("orbit_device_mode_chosen", "true");
    if (deviceModalOverlay) deviceModalOverlay.hidden = true;
  }

  function toggleScreenRotation() {
    if (!document.body.classList.contains("device-phone")) return;
    const isRotated = document.body.classList.toggle("phone-landscape-mode");
    if (isRotated) {
      showToast("تم تدوير الشاشة لوضع اللابتوب العريض");
      try {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock("landscape").catch(() => {});
        }
      } catch (e) {}
    } else {
      showToast("تم إرجاع الشاشة إلى الوضع العمودي");
      try {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } catch (e) {}
    }
  }

  function initDeviceMode() {
    const chosen = sessionStorage.getItem("orbit_device_mode_chosen");
    if (!chosen) {
      if (deviceModalOverlay) deviceModalOverlay.hidden = false;
    } else {
      const saved = localStorage.getItem("orbit_device_mode") || "pc";
      applyDeviceMode(saved);
    }
  }

  const iconPaths = {
    orbit: '<ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(-28 12 12)" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18.5" cy="8.5" r="1.5" fill="currentColor"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/><path d="M2 10 12 2l10 8"/>',
    folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"/>',
    files: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"/><path d="M3 9h18"/>',
    terminal: '<rect x="2.5" y="3.5" width="19" height="17" rx="2"/><path d="m6.5 9 3 2.8-3 2.7M12 15h5"/>',
    editor: '<path d="M14 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8"/><path d="m13 15 7.5-7.5a2.1 2.1 0 0 0-3-3L10 12l-1 4 4-1Z"/>',
    settings: '<path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"/><path d="m19.4 13.5 1.2.9-1.4 2.5-1.4-.5a7.8 7.8 0 0 1-1.6.9l-.2 1.5h-2.9l-.3-1.5a7.8 7.8 0 0 1-1.6-.9l-1.4.5-1.4-2.5 1.2-.9a7 7 0 0 1 0-1.9l-1.2-.9 1.4-2.5 1.4.5a7.8 7.8 0 0 1 1.6-.9l.3-1.5h2.9l.2 1.5a7.8 7.8 0 0 1 1.6.9l1.4-.5 1.4 2.5-1.2.9a7 7 0 0 1 0 1.9Z" transform="translate(-1 -1) scale(1.08)"/>',
    trash: '<path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    pictures: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m4 17 5-5 3 3 3-4 5 6"/>',
    documents: '<path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 13h8M8 17h8"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5"/><path d="M4 17v3h16v-3"/>',
    recent: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    computer: '<rect x="2.5" y="3.5" width="19" height="14" rx="2"/><path d="M8 21h8m-4-3.5V21"/>',
    wifi: '<path d="M3 9a14 14 0 0 1 18 0M6.5 12.5a9 9 0 0 1 11 0M10 16a3.5 3.5 0 0 1 4 0"/><circle cx="12" cy="19" r=".8" fill="currentColor" stroke="none"/>',
    sound: '<path d="M4 10v4h4l5 4V6l-5 4H4Z"/><path d="M16 9a5 5 0 0 1 0 6m2.5-8.5a9 9 0 0 1 0 11"/>',
    battery: '<rect x="3" y="7" width="17" height="10" rx="2"/><path d="M22 10v4M6 10h10v4H6z" fill="currentColor" stroke="none"/>',
    brightness: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    text: '<path d="M5 4h14M12 4v16m-4 0h8"/>',
    code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14"/>',
    archive: '<path d="M4 4h16v5H4zM5 9v11h14V9M10 13h4"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    vscode: '<path d="M17 2.1 7 10.3l-4-3.2V16.9l4-3.2L17 21.9V2.1Z"/><path d="M17 2.1v19.8l4-2.3V4.4l-4-2.3Z"/><path d="m7 10.3 10-8.2M7 13.7 17 21.9M3 7.1 7 10.3M3 16.9l4-3.2"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="1.5"/><path d="M5 15H4a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 4 2h10A1.5 1.5 0 0 1 15.5 3.5V5"/>',
    newfile: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 3v4h4M12 12v6M9 15h6"/>',
    newfolder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"/><path d="M12 11v6M9 14h6"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-7H7v7M7 3v5h8"/>',
    play: '<polygon points="5,3 19,12 5,21"/>',
    jupyter: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="1.5"/><circle cx="12" cy="12" r="3.5" fill="#f37626" stroke="none"/><ellipse cx="12" cy="12" rx="11" ry="4.5" fill="none" stroke-width="1.3" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.5" fill="none" stroke-width="1.3" transform="rotate(30 12 12)"/>',
    cut: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
    paste: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
    refresh: '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15.36-6.36L21 8M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15.36 6.36L3 16"/>',
    forward: '<polygon points="5 4 15 12 5 20"/><polygon points="13 4 23 12 13 20"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    unknown: '<path d="M5 3h9l5 5v13H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5"/>'
  };

  function iconMarkup(name, size = 24) {
    const colorClass = ["folder", "files"].includes(name) ? " icon-folder" : "";
    return `<svg class="ui-icon${colorClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.unknown}</svg>`;
  }

  function paintIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((target) => {
      target.innerHTML = iconMarkup(target.dataset.icon, Number(target.dataset.size) || 24);
    });
  }

  function showContextMenu(items, x, y) {
    contextMenu.innerHTML = "";
    items.forEach((item) => {
      if (item.separator) {
        const separator = document.createElement("div");
        separator.className = "menu-separator";
        contextMenu.append(separator);
        return;
      }
      const button = document.createElement("button");
      button.className = `menu-item${item.danger ? " danger" : ""}`;
      button.setAttribute("role", "menuitem");
      button.innerHTML = `<span>${item.icon ? iconMarkup(item.icon, 16) : ""}${escapeHtml(item.label)}</span><small>${escapeHtml(item.shortcut || "")}</small>`;
      button.addEventListener("click", () => {
        hideContextMenu();
        item.action();
      });
      contextMenu.append(button);
    });
    contextMenu.hidden = false;
    const left = Math.max(6, Math.min(x, window.innerWidth - contextMenu.offsetWidth - 6));
    const top = Math.max(40, Math.min(y, window.innerHeight - contextMenu.offsetHeight - 8));
    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;
  }

  function hideContextMenu() {
    contextMenu.hidden = true;
  }

  function closeSystemDialog() {
    dialogOverlay.hidden = true;
    dialogAction = null;
  }

  function showInputDialog(title, label, initialValue, submitLabel, onSubmit, placeholder = "") {
    document.getElementById("dialogTitle").textContent = title;
    document.getElementById("dialogMessage").textContent = "";
    document.getElementById("dialogMessage").hidden = true;
    document.getElementById("dialogInputLabel").hidden = false;
    document.getElementById("dialogLabelText").textContent = label;
    const input = document.getElementById("dialogInput");
    input.value = initialValue || "";
    input.placeholder = placeholder || "";
    document.getElementById("dialogChoices").replaceChildren();
    document.getElementById("dialogChoices").hidden = true;
    document.getElementById("dialogSubmit").hidden = false;
    document.getElementById("dialogSubmit").textContent = submitLabel;
    dialogAction = () => onSubmit(input.value);
    dialogOverlay.hidden = false;
    input.focus();
    input.select();
  }

  function showConfirmDialog(title, message, submitLabel, onConfirm) {
    document.getElementById("dialogTitle").textContent = title;
    const messageNode = document.getElementById("dialogMessage");
    messageNode.textContent = message;
    messageNode.hidden = false;
    document.getElementById("dialogInputLabel").hidden = true;
    document.getElementById("dialogChoices").hidden = true;
    document.getElementById("dialogSubmit").hidden = false;
    document.getElementById("dialogSubmit").textContent = submitLabel;
    dialogAction = onConfirm;
    dialogOverlay.hidden = false;
    document.getElementById("dialogSubmit").focus();
  }

  function showChoiceDialog(title, message, choices) {
    document.getElementById("dialogTitle").textContent = title;
    const messageNode = document.getElementById("dialogMessage");
    messageNode.textContent = message;
    messageNode.hidden = false;
    document.getElementById("dialogInputLabel").hidden = true;
    document.getElementById("dialogSubmit").hidden = true;
    const list = document.getElementById("dialogChoices");
    list.replaceChildren();
    choices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dialog-choice";
      button.textContent = choice.label;
      button.addEventListener("click", () => {
        closeSystemDialog();
        choice.action();
      });
      list.append(button);
    });
    list.hidden = false;
    dialogAction = null;
    dialogOverlay.hidden = false;
  }

  function applyWallpaper(name) {
    const backgrounds = {
      Orbit: "radial-gradient(ellipse at 72% 20%, rgba(120,72,185,.55), transparent 32%), radial-gradient(ellipse at 20% 78%, rgba(27,103,143,.48), transparent 38%), linear-gradient(135deg,#141924 0%,#20213b 48%,#111720 100%)",
      Midnight: "radial-gradient(ellipse at 72% 18%,rgba(35,115,157,.45),transparent 35%),linear-gradient(145deg,#071523,#101d36 54%,#090f18)",
      Dusk: "radial-gradient(ellipse at 72% 30%,rgba(205,116,115,.43),transparent 35%),linear-gradient(145deg,#281f42,#56365b 53%,#14283c)"
    };
    if (!backgrounds[name]) return;
    document.querySelector(".desktop").style.background = backgrounds[name];
    sessionStorage.setItem("orbit-linux-wallpaper", name);
  }

  function desktopIconMenu() {
    return [
      { label: "New Folder", icon: "folder", action: () => createDesktopEntry("dir") },
      { label: "New Document", icon: "text", action: () => createDesktopEntry("text") },
      { label: "New HTML Page", icon: "editor", action: () => createDesktopHtml() },
      { label: "Import Files…", icon: "download", action: () => importFilesInto("/home/alex/Desktop") },
      { separator: true },
      { label: "Open Terminal", icon: "terminal", action: () => openWindow("terminal") },
      { label: "Change Background", icon: "pictures", action: chooseWallpaper },
      { label: "Display Settings", icon: "settings", action: () => openWindow("settings") }
    ];
  }

  function createDesktopEntry(type) {
    showInputDialog(type === "dir" ? "Create Folder" : "Create Document", "Name with extension", "", "Create", (name) => {
      if (!name || !name.trim()) return;
      const cleanName = name.trim();
      if (cleanName.includes("/") || cleanName === "." || cleanName === "..") { showToast("Enter a valid file or folder name."); return; }
      const path = normalize(cleanName, "/home/alex/Desktop");
      if (path === "/home/alex/Desktop" || path in fs.entries) { showToast("That name is already in use."); return; }
      fs.entries[path] = type === "dir" ? { type: "dir" } : { type: "text", content: "" };
      persist();
      renderDesktopFiles();
    }, type === "dir" ? "e.g. MyFolder" : "e.g. notes.txt, script.js");
  }

  function createDesktopHtml() {
    showInputDialog("Create HTML Page", "File name with extension", "", "Create", (name) => {
      if (!name || !name.trim()) return;
      let cleanName = name.trim();
      if (!cleanName.includes(".")) cleanName += ".html";
      const path = normalize(cleanName, "/home/alex/Desktop");
      if (path in fs.entries) { showToast("That name is already in use."); return; }
      fs.entries[path] = {
        type: "text",
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>My Web Page</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #12141c; color: #fff; padding: 30px; text-align: center; }\n    h1 { color: #8e7ff2; }\n  </style>\n</head>\n<body>\n  <h1>Hello from Orbit Linux!</h1>\n  <p>Edit this file in Text Editor or VS Code and click Run in Browser.</p>\n</body>\n</html>\n`
      };
      persist();
      renderDesktopFiles();
      openWindow("vscode", { path });
    }, "e.g. index.html, page.html");
  }

  function chooseWallpaper() {
    showChoiceDialog("Change Background", "Select a desktop wallpaper.", [
      { label: "Orbit · Aurora", action: () => applyWallpaper("Orbit") },
      { label: "Midnight · Blue", action: () => applyWallpaper("Midnight") },
      { label: "Dusk · Violet", action: () => applyWallpaper("Dusk") }
    ]);
  }

  function renameEntry(oldPath) {
    showInputDialog("Rename", "New name", basename(oldPath), "Rename", (newName) => {
      if (!newName || !newName.trim() || newName.trim() === basename(oldPath)) return;
      const cleanName = newName.trim();
      if (cleanName.includes("/") || cleanName === "." || cleanName === "..") { showToast("Enter a valid name."); return; }
      const newPath = normalize(cleanName, parent(oldPath));
      if (newPath in fs.entries) { showToast("That name is already in use."); return; }
      const moving = Object.keys(fs.entries).filter((path) => path === oldPath || path.startsWith(`${oldPath}/`));
      moving.forEach((path) => {
        const destination = `${newPath}${path.slice(oldPath.length)}`;
        fs.entries[destination] = fs.entries[path];
      });
      moving.sort((a, b) => b.length - a.length).forEach((path) => delete fs.entries[path]);
      persist();
      renderDesktopFiles();
      refreshFiles();
    });
  }

  function uniquePath(path) {
    path = normalize(path, "/");
    if (!(path in fs.entries)) return path;
    const extensionIndex = basename(path).lastIndexOf(".");
    const extension = extensionIndex > 0 ? basename(path).slice(extensionIndex) : "";
    const stem = extension ? basename(path).slice(0, extensionIndex) : basename(path);
    const folder = parent(path);
    let index = 1;
    let candidate;
    do {
      candidate = `${folder}/${stem} (copy${index > 1 ? ` ${index}` : ""})${extension}`;
      index += 1;
    } while (candidate in fs.entries);
    return candidate;
  }

  function ensureDir(dirPath) {
    if (!dirPath || dirPath === "/") return;
    const parts = dirPath.split("/").filter(Boolean);
    let cur = "";
    for (const part of parts) {
      cur += "/" + part;
      if (!fs.entries[cur]) {
        fs.entries[cur] = { type: "dir", modified: Date.now() };
      }
    }
  }

  function pasteInto(folder) {
    if (!fileClipboard) { showToast("Clipboard is empty."); return; }
    if (!fs.entries[folder] || fs.entries[folder].type !== "dir") return;
    const source = fileClipboard.path;
    const target = uniquePath(`${folder}/${basename(source)}`);
    const moving = Object.keys(fs.entries).filter((path) => path === source || path.startsWith(`${source}/`));
    moving.forEach((path) => {
      const destination = `${target}${path.slice(source.length)}`;
      fs.entries[destination] = { ...fs.entries[path] };
    });
    if (fileClipboard.mode === "cut") {
      moving.sort((a, b) => b.length - a.length).forEach((path) => delete fs.entries[path]);
      fileClipboard = null;
    }
    persist();
    renderDesktopFiles();
    refreshFiles();
    showToast("Item pasted.");
  }

  function moveToTrash(path) {
    if (path === "/" || path === "/home/alex" || path === "/home/alex/Desktop" || path === "/home/alex/Trash") {
      showToast("This system folder cannot be moved to Trash.");
      return;
    }
    const trash = "/home/alex/Trash";
    const target = uniquePath(`${trash}/${basename(path)}`);
    const moving = Object.keys(fs.entries).filter((entry) => entry === path || entry.startsWith(`${path}/`));
    moving.forEach((entry) => { fs.entries[`${target}${entry.slice(path.length)}`] = fs.entries[entry]; });
    moving.sort((a, b) => b.length - a.length).forEach((entry) => delete fs.entries[entry]);
    persist();
    renderDesktopFiles();
    refreshFiles();
    showToast(`${basename(path)} moved to Trash.`);
  }

  function permanentDelete(path) {
    const descendants = Object.keys(fs.entries).filter((entry) => entry === path || entry.startsWith(`${path}/`));
    descendants.sort((a, b) => b.length - a.length).forEach((entry) => delete fs.entries[entry]);
    persist();
    renderDesktopFiles();
    refreshFiles();
  }

  function fileContextMenu(path, x, y, isTrash) {
    const entry = fs.entries[path];
    if (!entry) return;
    const isTrashItem = isTrash && path !== "/home/alex/Trash";
    const isHtml = path.toLowerCase().endsWith(".html") || path.toLowerCase().endsWith(".htm");
    const items = [
      { label: isHtml ? "Open with Text Editor" : "Open", icon: entry.type === "dir" ? "folder" : entry.type === "image" ? "pictures" : "text", action: () => openPath(path) },
      { label: "Open with VS Code", icon: "vscode", action: () => openWindow("vscode", entry.type === "dir" ? { folder: path } : { path }) },
      ...(isHtml ? [{ label: "Edit with Text Editor", icon: "editor", action: () => openWindow("editor", { path }) }] : []),
      ...(entry.type !== "dir" && entry.type !== "image" && !isHtml ? [{ label: "Open with Text Editor", icon: "editor", action: () => openWindow("editor", { path }) }] : []),
      ...(entry.type === "image" ? [
        { label: "Open in Jupyter (process image)", icon: "jupyter", action: () => openImageInJupyter(path) },
        { label: "Set as Wallpaper", icon: "pictures", action: () => setAsWallpaper(entry.content) }
      ] : []),
      { separator: true },
      { label: "Cut", shortcut: "Ctrl+X", action: () => { fileClipboard = { path, mode: "cut" }; showToast(`${basename(path)} ready to move.`); } },
      { label: "Copy", shortcut: "Ctrl+C", action: () => { fileClipboard = { path, mode: "copy" }; showToast(`${basename(path)} copied.`); } },
      { label: "Rename", shortcut: "F2", action: () => renameEntry(path) },
      ...(isTrashItem
        ? [{ label: "Restore", icon: "recent", action: () => restoreFromTrash(path) }, { label: "Delete Permanently", danger: true, action: () => showConfirmDialog("Delete Permanently?", `This permanently deletes ${basename(path)}. This action cannot be undone.`, "Delete", () => permanentDelete(path)) }]
        : [{ label: "Move to Trash", icon: "trash", danger: true, action: () => moveToTrash(path) }]),
      { separator: true },
      { label: "Properties", icon: "settings", action: () => showProperties(path) }
    ];
    showContextMenu(items, x, y);
  }

  function openPath(path) {
    const entry = fs.entries[path];
    if (!entry) return;
    const targetPath = entry.target || path;
    if (entry.type === "dir") openWindow("files", { path: targetPath });
    else if (entry.type === "image") openWindow("image", { path: targetPath });
    else openWindow("editor", { path: targetPath });
  }

  function importFilesInto(folder) {
    importFolder = folder;
    const picker = document.getElementById("uploadInput");
    picker.value = "";
    picker.click();
  }

  function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(String(reader.result)));
      reader.addEventListener("error", () => reject(reader.error || new Error(`Could not read ${file.name}`)));
      reader.readAsDataURL(file);
    });
  }

  async function importSelectedFiles(files) {
    for (const file of files) {
      const path = uniquePath(`${importFolder}/${basename(file.name)}`);
      const image = file.type.startsWith("image/") || /\.(svg|png|jpe?g|gif|webp|avif)$/i.test(file.name);
      const content = image ? await readAsDataUrl(file) : await file.text();
      fs.entries[path] = { type: image ? "image" : "text", content, modified: Date.now() };
      if (image) loadFsImageToCanvas(path);
    }
    persist();
    renderDesktopFiles();
    refreshFiles();
    showToast(`${files.length} file${files.length === 1 ? "" : "s"} imported.`);
  }

  function imageSource(source) {
    if (!source) return "";
    if (source.startsWith("data:") || source.startsWith("http://") || source.startsWith("https://") || source.startsWith("blob:") || source.startsWith("./") || source.startsWith("/") || /\.(png|jpe?g|webp|gif|svg)$/i.test(source)) {
      return source;
    }
    return svgUrl(source);
  }

  function restoreFromTrash(path) {
    const destination = uniquePath(`/home/alex/Desktop/${basename(path)}`);
    const moving = Object.keys(fs.entries).filter((entry) => entry === path || entry.startsWith(`${path}/`));
    moving.forEach((entry) => { fs.entries[`${destination}${entry.slice(path.length)}`] = fs.entries[entry]; });
    moving.sort((a, b) => b.length - a.length).forEach((entry) => delete fs.entries[entry]);
    persist();
    renderDesktopFiles();
    refreshFiles();
    showToast(`${basename(path)} restored to Desktop.`);
  }

  function showProperties(path) {
    const entry = fs.entries[path];
    if (!entry) return;
    const name = basename(path);
    const isDir = entry.type === "dir";
    const isImg = entry.type === "image";
    const contentBytes = isDir ? 0 : encoder.encode(entry.content || "").length;
    const childCount = isDir ? children(path).length : 0;
    const sizeStr = isDir ? `${childCount} item${childCount === 1 ? "" : "s"}` : formatBytes(contentBytes);
    const ext = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1).toUpperCase() : "";
    const typeName = isDir ? "Folder" : isImg ? "Image" : ext ? `${ext} File` : "File";
    const mimeGuess = isImg ? "image/" + (ext.toLowerCase() || "png") : isDir ? "inode/directory" : "text/" + (ext.toLowerCase() || "plain");
    const parentPath = parent(path);
    const modified = entry.modified ? new Date(entry.modified).toLocaleString() : "Unknown";
    const created = entry.created ? new Date(entry.created).toLocaleString() : modified;
    const permStr = isDir ? "drwxr-xr-x" : "-rw-r--r--";
    const octal = isDir ? "755" : "644";
    const icon = isDir ? "folder" : isImg ? "pictures" : iconFor(name);

    const win = document.createElement("section");
    win.className = "window properties-window";
    win.dataset.kind = "properties";
    win.style.zIndex = ++zIndex;
    win.innerHTML = `<header class="window-header"><span class="window-title">${escapeHtml(name)} — Properties</span><div class="window-actions"><button class="close-window" aria-label="Close">×</button></div></header><div class="window-body properties-body">
      <div class="prop-tabs"><button class="prop-tab active" data-ptab="basic">Basic</button><button class="prop-tab" data-ptab="permissions">Permissions</button></div>
      <div class="prop-panels">
        <div class="prop-panel" data-panel="basic">
          <div class="prop-header">
            <div class="prop-icon-wrap">${iconMarkup(icon, 32)}</div>
            <div class="prop-name-box"><div class="prop-name">${escapeHtml(name)}</div><div class="prop-type-badge">${escapeHtml(typeName)}</div></div>
          </div>
          <div class="prop-section">
            <div class="prop-section-title">Location</div>
            <div class="prop-path-container"><input class="prop-path-text" value="${escapeHtml(path)}" readonly><button class="prop-copy-btn" data-copy="${escapeHtml(path)}">${iconMarkup("copy", 13)} Copy Path</button></div>
            <div class="prop-row"><span class="prop-label">Parent Folder</span><span class="prop-value">${escapeHtml(parentPath)}</span></div>
          </div>
          <div class="prop-section">
            <div class="prop-section-title">Details</div>
            <div class="prop-row"><span class="prop-label">Type</span><span class="prop-value">${escapeHtml(typeName)}</span></div>
            <div class="prop-row"><span class="prop-label">MIME Type</span><span class="prop-value">${escapeHtml(mimeGuess)}</span></div>
            <div class="prop-row"><span class="prop-label">Size</span><span class="prop-value">${escapeHtml(sizeStr)}${!isDir ? " (" + contentBytes.toLocaleString() + " bytes)" : ""}</span></div>
            ${isDir ? `<div class="prop-row"><span class="prop-label">Contents</span><span class="prop-value">${childCount} item${childCount === 1 ? "" : "s"}</span></div>` : ""}
            <div class="prop-row"><span class="prop-label">Modified</span><span class="prop-value">${escapeHtml(modified)}</span></div>
          </div>
        </div>
        <div class="prop-panel" data-panel="permissions" hidden>
          <div class="prop-section">
            <div class="prop-section-title">Access Permissions</div>
            <div class="prop-perms-card">
              <div class="prop-perm-row"><span>Owner (alex)</span><span>${isDir ? "Read, Write, Execute" : "Read, Write"}</span></div>
              <div class="prop-perm-row"><span>Group (alex)</span><span>Read${isDir ? ", Execute" : ""}</span></div>
              <div class="prop-perm-row"><span>Others</span><span>Read${isDir ? ", Execute" : ""}</span></div>
            </div>
          </div>
          <div class="prop-section">
            <div class="prop-section-title">Raw Permissions</div>
            <div class="prop-row"><span class="prop-label">Mode</span><span class="prop-value">${permStr}</span></div>
            <div class="prop-row"><span class="prop-label">Octal</span><span class="prop-octal-badge">${octal}</span></div>
            <div class="prop-row"><span class="prop-label">Owner</span><span class="prop-value">alex</span></div>
            <div class="prop-row"><span class="prop-label">Group</span><span class="prop-value">alex</span></div>
          </div>
        </div>
      </div>
    </div>`;
    area.append(win);
    enableDrag(win);
    win.querySelector(".close-window").addEventListener("click", () => win.remove());
    win.addEventListener("pointerdown", () => { win.style.zIndex = ++zIndex; });
    win.querySelectorAll(".prop-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        win.querySelectorAll(".prop-tab").forEach(t => t.classList.toggle("active", t === tab));
        win.querySelectorAll(".prop-panel").forEach(p => p.hidden = p.dataset.panel !== tab.dataset.ptab);
      });
    });
    win.querySelector(".prop-copy-btn").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        btn.classList.add("copied");
        btn.innerHTML = `${iconMarkup("copy", 13)} Copied!`;
        setTimeout(() => { btn.classList.remove("copied"); btn.innerHTML = `${iconMarkup("copy", 13)} Copy Path`; }, 1500);
      }).catch(() => {
        const inp = win.querySelector(".prop-path-text");
        inp.select(); document.execCommand("copy");
        btn.classList.add("copied");
        btn.innerHTML = `${iconMarkup("copy", 13)} Copied!`;
        setTimeout(() => { btn.classList.remove("copied"); btn.innerHTML = `${iconMarkup("copy", 13)} Copy Path`; }, 1500);
      });
    });
  }

  function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + " " + sizes[i];
  }

  fs.entries["/home/alex/Desktop"] ||= { type: "dir" };
  fs.entries["/home/alex/Trash"] ||= { type: "dir" };
  fs.entries["/home/alex/workspace"] ||= { type: "dir" };
  delete fs.entries["/home/alex/Desktop/welcome.html"];
  delete fs.entries["/home/alex/Desktop/alex"];
  delete fs.entries["/home/alex/Desktop/Desktop"];
  delete fs.entries["/home/alex/Desktop/desktop"];
  fs.entries["/home/alex/Desktop/Computer"] ||= { type: "dir", target: "/" };
  fs.entries["/home/alex/Desktop/Documents"] ||= { type: "dir", target: "/home/alex/Documents" };
  fs.entries["/home/alex/Desktop/Pictures"] ||= { type: "dir", target: "/home/alex/Pictures" };
  fs.entries["/home/alex/Desktop/Trash"] ||= { type: "dir", target: "/home/alex/Trash" };
  const savedCustomBg = sessionStorage.getItem("orbit-linux-custom-bg");
  if (savedCustomBg) {
    const desktop = document.querySelector(".desktop");
    if (desktop) {
      desktop.style.backgroundImage = `url("${savedCustomBg}")`;
      desktop.style.backgroundSize = "cover";
      desktop.style.backgroundPosition = "center";
      desktop.style.backgroundRepeat = "no-repeat";
    }
  } else {
    const savedWallpaper = sessionStorage.getItem("orbit-linux-wallpaper");
    if (savedWallpaper) {
      const choices = {
        Orbit: "radial-gradient(ellipse at 72% 20%, rgba(120,72,185,.55), transparent 32%), radial-gradient(ellipse at 20% 78%, rgba(27,103,143,.48), transparent 38%), linear-gradient(135deg,#141924 0%,#20213b 48%,#111720 100%)",
        Midnight: "radial-gradient(ellipse at 72% 18%,rgba(35,115,157,.45),transparent 35%),linear-gradient(145deg,#071523,#101d36 54%,#090f18)",
        Dusk: "radial-gradient(ellipse at 72% 30%,rgba(205,116,115,.43),transparent 35%),linear-gradient(145deg,#281f42,#56365b 53%,#14283c)"
      };
      if (choices[savedWallpaper]) document.querySelector(".desktop").style.background = choices[savedWallpaper];
    }
  }

  function loadFs() {
    const freshFs = {
      entries: {
        "/": { type: "dir" }, "/home": { type: "dir" }, "/home/alex": { type: "dir" },
        "/home/alex/Documents": { type: "dir" }, "/home/alex/Downloads": { type: "dir" },
        "/home/alex/Pictures": { type: "dir" }, "/home/alex/Music": { type: "dir" },
        "/home/alex/Videos": { type: "dir" }, "/home/alex/Trash": { type: "dir" },
        "/home/alex/Desktop": { type: "dir" },
        "/home/alex/Desktop/Computer": { type: "dir", target: "/" },
        "/home/alex/Desktop/Documents": { type: "dir", target: "/home/alex/Documents" },
        "/home/alex/Desktop/Pictures": { type: "dir", target: "/home/alex/Pictures" },
        "/home/alex/Desktop/Trash": { type: "dir", target: "/home/alex/Trash" },
        "/home/alex/workspace": { type: "dir" },
        "/home/alex/.config": { type: "dir" },
        "/tmp": { type: "dir" }, "/etc": { type: "dir" }, "/var": { type: "dir" },
        "/var/log": { type: "dir" }, "/usr": { type: "dir" }, "/usr/bin": { type: "dir" },
        "/bin": { type: "dir" }
      }
    };
    for (const [path, content] of Object.entries(builtInFiles)) {
      freshFs.entries[path] = { type: fileType(path), content };
    }
    return freshFs;
  }

  function persist() {
    // In-memory state: live changes persist during the session,
    // but on page refresh everything resets to zero.
  }
  function saveSessionFS() {
    persist();
  }

  function resolveVirtualHtml(htmlContent, htmlPath) {
    if (!htmlContent) return "";
    const dir = htmlPath ? parent(htmlPath) : "/home/alex";

    let processed = htmlContent.replace(/<link\b([^>]*\brel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*)>/gi, (match, _, href) => {
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//") || href.startsWith("data:")) {
        return match;
      }
      const targetPath = normalize(href, dir);
      if (fs.entries[targetPath] && fs.entries[targetPath].type !== "dir") {
        return `<style>/* inlined ${escapeHtml(href)} */\n${fs.entries[targetPath].content || ""}\n</style>`;
      }
      return match;
    });

    processed = processed.replace(/<script\b([^>]*\bsrc=["']([^"']+)["'][^>]*)>\s*<\/script>/gi, (match, _, src) => {
      if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//") || src.startsWith("data:")) {
        return match;
      }
      const targetPath = normalize(src, dir);
      if (fs.entries[targetPath] && fs.entries[targetPath].type !== "dir") {
        return `<script>/* inlined ${escapeHtml(src)} */\n${fs.entries[targetPath].content || ""}\n<\/script>`;
      }
      return match;
    });

    processed = processed.replace(/<img\b([^>]*\bsrc=["']([^"']+)["'][^>]*)>/gi, (match, beforeAndAfter, src) => {
      if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//") || src.startsWith("data:") || src.startsWith("blob:")) {
        return match;
      }
      const targetPath = normalize(src, dir);
      if (fs.entries[targetPath] && fs.entries[targetPath].type === "image") {
        const resolvedSrc = imageSource(fs.entries[targetPath].content);
        return match.replace(`src="${src}"`, `src="${resolvedSrc}"`).replace(`src='${src}'`, `src='${resolvedSrc}'`);
      }
      return match;
    });

    return processed;
  }

  async function saveRemoteImageToOrbit(imageUrl, title, targetDir = "/home/alex/Pictures") {
    try {
      showToast(`Downloading image to ${basename(targetDir)}...`);
      if (!fs.entries[targetDir] || fs.entries[targetDir].type !== "dir") {
        fs.entries[targetDir] = { type: "dir" };
      }
      let cleanName = (title || "downloaded_image")
        .replace(/^File:/i, "")
        .replace(/[^a-zA-Z0-9_\-\u0600-\u06FF.]/g, "_")
        .trim();
      if (!cleanName || cleanName === "_") cleanName = `image_${Date.now()}`;
      if (!/\.(jpg|jpeg|png|webp|svg|gif)$/i.test(cleanName)) {
        const detected = (imageUrl || "").match(/\.(png|jpe?g|webp|svg|gif)(\?|$)/i);
        cleanName += detected ? `.${detected[1].toLowerCase().replace("jpeg", "jpg")}` : ".jpg";
      }

      const targetPath = uniquePath(`${targetDir}/${cleanName}`);

      let contentToStore = imageUrl;
      try {
        const res = await fetch(imageUrl);
        if (res.ok) {
          const blob = await res.blob();
          contentToStore = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve(imageUrl);
            reader.readAsDataURL(blob);
          });
        }
      } catch (e) {
        console.warn("Direct blob conversion skipped, saving URL reference:", e);
        contentToStore = imageUrl;
      }

      fs.entries[targetPath] = {
        type: "image",
        content: contentToStore,
        modified: Date.now()
      };
      persist();
      loadFsImageToCanvas(targetPath);
      renderDesktopFiles();
      refreshFiles();
      showToast(`Image saved to ${targetPath} — open it in Jupyter to process`);
      return targetPath;
    } catch (err) {
      console.error("Failed saving image:", err);
      showToast("Error saving image.");
    }
  }

  function downloadToComputer(dataOrUrl, filename) {
    const link = document.createElement("a");
    link.href = dataOrUrl;
    link.download = filename || "orbit_download";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`Downloading ${filename} to your computer...`);
  }

  function setAsWallpaper(imageContent) {
    const src = imageSource(imageContent);
    const desktop = document.querySelector(".desktop");
    if (desktop) {
      desktop.style.backgroundImage = `url("${src}")`;
      desktop.style.backgroundSize = "cover";
      desktop.style.backgroundPosition = "center";
      desktop.style.backgroundRepeat = "no-repeat";
    }
    sessionStorage.setItem("orbit-linux-custom-bg", src);
    showToast("Desktop wallpaper updated!");
  }

  function updateDockActiveState() {
    const openKinds = new Set();
    area.querySelectorAll(".window").forEach((win) => {
      if (!win.hidden && win.dataset.kind) openKinds.add(win.dataset.kind);
    });
    document.querySelectorAll(".dock-icon[data-open]").forEach((btn) => {
      const openTarget = btn.dataset.open;
      btn.classList.toggle("active", openKinds.has(openTarget));
    });
  }

  function normalize(path, base = cwd) {
    const combined = path.startsWith("/") ? path : `${base}/${path}`;
    const parts = [];
    for (const part of combined.split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") parts.pop();
      else parts.push(part);
    }
    return `/${parts.join("/")}`;
  }

  function parent(path) {
    if (path === "/") return null;
    const i = path.lastIndexOf("/");
    return i === 0 ? "/" : path.slice(0, i);
  }

  function basename(path) {
    return path === "/" ? "/" : path.slice(path.lastIndexOf("/") + 1);
  }

  function children(path) {
    const prefix = path === "/" ? "/" : `${path}/`;
    return Object.keys(fs.entries)
      .filter((entry) => entry.startsWith(prefix) && entry !== path && !entry.slice(prefix.length).includes("/"))
      .sort((a, b) => {
        const aDir = fs.entries[a].type === "dir";
        const bDir = fs.entries[b].type === "dir";
        return aDir === bDir ? basename(a).localeCompare(basename(b)) : (aDir ? -1 : 1);
      });
  }

  function resolve(value) {
    const path = normalize(value || ".");
    return path in fs.entries ? path : null;
  }

  function resolveInDir(value, baseDir = "/home/alex") {
    if (!value || value === "~") return "/home/alex";
    if (value.startsWith("~/")) value = "/home/alex" + value.slice(1);
    if (value === "/") return "/";
    if (value === ".") return baseDir;
    if (value === "..") return parent(baseDir);

    const norm = normalize(value, baseDir);
    if (norm in fs.entries) return norm;

    // Case-insensitive match in parent directory
    const pDir = parent(norm);
    const targetBase = basename(norm).toLowerCase();
    if (pDir in fs.entries && fs.entries[pDir].type === "dir") {
      const match = children(pDir).find((c) => basename(c).toLowerCase() === targetBase);
      if (match) return match;
    }

    // Relative to home fallback if user is in /
    if (baseDir === "/" && fs.entries[`/home/alex/${value}`]) {
      return `/home/alex/${value}`;
    }
    const homeChildren = children("/home/alex");
    const homeMatch = homeChildren.find((c) => basename(c).toLowerCase() === value.toLowerCase());
    if (homeMatch) return homeMatch;

    return null;
  }

  function tokenize(input) {
    const tokens = [];
    const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
    let match;
    while ((match = re.exec(input)) !== null) tokens.push(match[1] ?? match[2] ?? match[3]);
    return tokens;
  }

  function promptHtml(activeDir = cwd) {
    const dir = activeDir || "/home/alex";
    const shown = dir === "/home/alex" ? "~" : dir.startsWith("/home/alex/") ? `~${dir.slice(10)}` : dir;
    return `<span class="prompt-user">alex@orbit</span>:<span class="prompt-path">${escapeHtml(shown)}</span>$ `;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function openWindow(kind, options = {}) {
    if (kind === "overview") {
      launcher.hidden = !launcher.hidden;
      quickSettings.hidden = true;
      return;
    }
    const existing = [...area.querySelectorAll(".window")].find((w) => w.dataset.kind === kind && (kind !== "image" || w.dataset.path === options.path));
    if (existing) {
      existing.hidden = false;
      existing.style.zIndex = ++zIndex;
      updateDockActiveState();
      if (options.path && kind === "files") {
        const location = existing.querySelector(".location");
        location.value = options.path;
        location.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      } else if (options.path && kind === "editor" && existing.dataset.path !== options.path) {
        buildEditor(existing.querySelector(".window-body"), options.path);
        existing.dataset.path = options.path;
        existing.querySelector(".window-title").textContent = basename(options.path);
      } else if (kind === "browser" && (options.path || options.url || options.mode || options.query)) {
        buildBrowser(existing.querySelector(".window-body"), options);
        if (options.path) {
          existing.dataset.path = options.path;
          existing.querySelector(".window-title").textContent = basename(options.path);
        }
      } else if (kind === "jupyter" && (options.imagePath || (options.path && fs.entries[options.path]?.type === "image"))) {
        existing.dispatchEvent(new CustomEvent("orbit-open-image", { detail: { path: options.imagePath || options.path } }));
      }
      return existing;
    }
    if (kind === "browser") return openWindow("editor", options);
    const config = {
      terminal: ["Terminal", "terminal-window"],
      files: ["Files", "files-window"],
      editor: ["Text Editor", "editor-window"],
      image: [basename(options.path || "Image"), "image-window"],
      settings: ["Settings", "settings-window"],
      vscode: ["Visual Studio Code", "vscode-window"],
      jupyter: ["Jupyter Notebook - Python 3 (ipykernel)", "jupyter-window"]
    }[kind];
    if (!config) return null;
    const win = document.createElement("section");
    win.className = `window ${config[1]}`;
    if (isMobileMode()) win.classList.add("maximized");
    win.dataset.kind = kind;
    if (options.path) win.dataset.path = options.path;
    win.style.zIndex = ++zIndex;
    win.innerHTML = `<header class="window-header"><span class="window-title">${escapeHtml(config[0])}</span><div class="window-actions"><button class="minimize-window" aria-label="Minimize">−</button><button class="maximize-window" aria-label="Maximize">□</button><button class="close-window" aria-label="Close">×</button></div></header><div class="window-body"></div>`;
    area.append(win);
    win.addEventListener("pointerdown", () => { win.style.zIndex = ++zIndex; });
    win.querySelector(".close-window").addEventListener("click", () => {
      win.remove();
      updateDockActiveState();
    });
    win.querySelector(".minimize-window").addEventListener("click", () => {
      win.hidden = true;
      updateDockActiveState();
    });
    win.querySelector(".maximize-window").addEventListener("click", () => win.classList.toggle("maximized"));
    enableDrag(win);
    if (kind === "terminal") buildTerminal(win.querySelector(".window-body"), options);
    if (kind === "files") buildFiles(win.querySelector(".window-body"), options.path || "/home/alex");
    if (kind === "editor") buildEditor(win.querySelector(".window-body"), options.path || currentEditorPath);
    if (kind === "image") buildImage(win.querySelector(".window-body"), options.path);
    if (kind === "settings") buildSettings(win.querySelector(".window-body"));
    if (kind === "browser") buildBrowser(win.querySelector(".window-body"), options);
    if (kind === "vscode") buildVSCode(win.querySelector(".window-body"), options);
    if (kind === "jupyter") buildJupyter(win.querySelector(".window-body"), options);
    updateDockActiveState();
    return win;
  }

  function enableDrag(win) {
    const header = win.querySelector(".window-header");
    header.addEventListener("pointerdown", (event) => {
      if (isMobileMode() || event.target.closest(".window-actions") || win.classList.contains("maximized")) return;
      const rect = win.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;
      header.setPointerCapture(event.pointerId);
      const move = (e) => {
        win.style.left = `${Math.max(-rect.width + 90, Math.min(window.innerWidth - 90, rect.left + e.clientX - startX))}px`;
        win.style.top = `${Math.max(34, Math.min(window.innerHeight - 75, rect.top + e.clientY - startY))}px`;
      };
      header.addEventListener("pointermove", move);
      header.addEventListener("pointerup", () => header.removeEventListener("pointermove", move), { once: true });
    });
  }

  function executeTerminalCommand(raw, currentCwd) {
    const trimmed = raw.trim();
    let redirect = null;
    let append = false;
    let commandText = trimmed;
    const redir = trimmed.match(/^(.*?)\s*(>>|>)\s*(.+)$/);
    if (redir) {
      commandText = redir[1].trim();
      redirect = redir[3].trim().replace(/^["']|["']$/g, "");
      append = redir[2] === ">>";
    }
    const tokens = tokenize(commandText);
    if (!tokens.length) return { result: "" };
    const cmd = tokens.shift();
    let result = "";
    let error = false;
    let fsChanged = false;
    let newCwd = null;
    const fail = (message) => { result = message; error = true; };
    const getEntry = (arg) => {
      const path = resolveInDir(arg, currentCwd);
      if (!path || !fs.entries[path]) throw new Error(`${arg}: No such file or directory`);
      return path;
    };

    try {
      switch (cmd) {
        case "help":
          result = "Available commands:\n  pwd, ls [-la], cd [DIR], tree [DIR]\n  cat FILE, less FILE, head FILE, tail FILE, wc FILE\n  mkdir [-p] DIR, touch FILE, echo TEXT [> FILE], cp SRC DEST, mv SRC DEST\n  rm [-r] PATH, rmdir DIR, find [PATH], grep TEXT FILE\n  whoami, hostname, uname [-a], date, clear, history, df, free, env\n  nano FILE, open FILE, reset-fs\n\nThis is a browser-based virtual shell; it does not execute host system commands.";
          break;
        case "pwd":
          result = currentCwd;
          break;
        case "whoami":
          result = "alex";
          break;
        case "hostname":
          result = "orbit";
          break;
        case "uname":
          result = tokens.includes("-a") ? "Linux orbit 6.8.0-orbit #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" : "Linux";
          break;
        case "date":
          result = new Date().toString();
          break;
        case "clear":
          return { isClear: true };
        case "history":
          result = history.map((entry, i) => `${String(i + 1).padStart(4)}  ${entry}`).join("\n");
          break;
        case "env":
          result = "HOME=/home/alex\nUSER=alex\nSHELL=/bin/orbit-sh\nEDITOR=nano\nPATH=/usr/local/bin:/usr/bin:/bin\nPWD=" + currentCwd;
          break;
        case "df":
          result = "Filesystem      Size  Used Avail Use% Mounted on\nvirtualfs       2.0G  4.0M  2.0G   1% /";
          break;
        case "free":
          result = "              total        used        free\nMem:        8388608      524288     7864320\nSwap:       1048576           0     1048576";
          break;
        case "ls": {
          let targetArg = tokens.find((t) => !t.startsWith("-")) || ".";
          const target = getEntry(targetArg);
          if (fs.entries[target].type !== "dir") {
            result = basename(target);
          } else {
            result = children(target).map((p) => {
              const entry = fs.entries[p];
              return tokens.some((t) => t.includes("a")) || !basename(p).startsWith(".")
                ? tokens.some((t) => t.includes("l"))
                  ? `${entry.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--"}  1 alex alex  ${String(entry.type === "dir" ? 4096 : encoder.encode(entry.content || "").length).padStart(5)}  ${basename(p)}${entry.type === "dir" ? "/" : ""}`
                  : `${basename(p)}${entry.type === "dir" ? "/" : ""}`
                : null;
            }).filter(Boolean).join(tokens.some((t) => t.includes("l")) ? "\n" : "  ");
          }
          break;
        }
        case "cd": {
          const targetArg = tokens[0] || "/home/alex";
          const target = resolveInDir(targetArg, currentCwd);
          if (!target || !fs.entries[target]) {
            fail(`cd: ${targetArg}: No such file or directory`);
          } else if (fs.entries[target].type !== "dir") {
            fail(`cd: ${targetArg}: Not a directory`);
          } else {
            newCwd = target;
          }
          break;
        }
        case "cat":
        case "less":
        case "head":
        case "tail":
        case "wc": {
          if (!tokens.length) { fail(`${cmd}: missing file operand`); break; }
          const p = getEntry(tokens[0]);
          if (fs.entries[p].type === "dir") { fail(`${cmd}: ${tokens[0]}: Is a directory`); break; }
          const content = fs.entries[p].content || "";
          if (cmd === "wc") result = `${content.split(/\n/).length - (content.endsWith("\n") ? 1 : 0)} ${content.split(/\s+/).filter(Boolean).length} ${encoder.encode(content).length} ${tokens[0]}`;
          else if (cmd === "head") result = content.split("\n").slice(0, 10).join("\n");
          else if (cmd === "tail") result = content.split("\n").slice(-10).join("\n");
          else result = content;
          break;
        }
        case "mkdir": {
          const parents = tokens.includes("-p");
          const names = tokens.filter((t) => t !== "-p");
          if (!names.length) { fail("mkdir: missing operand"); break; }
          for (const name of names) {
            const target = normalize(name, currentCwd);
            if (target in fs.entries) { if (!parents) fail(`mkdir: cannot create directory '${name}': File exists`); continue; }
            if (parents) {
              let cur = "";
              for (const part of target.split("/").filter(Boolean)) { cur += `/${part}`; fs.entries[cur] ||= { type: "dir" }; }
            } else {
              if (!fs.entries[parent(target)] || fs.entries[parent(target)].type !== "dir") { fail(`mkdir: cannot create directory '${name}': No such directory`); break; }
              fs.entries[target] = { type: "dir" };
            }
          }
          persist(); fsChanged = true; break;
        }
        case "touch": {
          if (!tokens.length) { fail("touch: missing file operand"); break; }
          for (const name of tokens) {
            const p = normalize(name, currentCwd);
            if (fs.entries[p]) { if (fs.entries[p].type !== "dir") fs.entries[p].modified = Date.now(); }
            else if (fs.entries[parent(p)]?.type === "dir") fs.entries[p] = { type: "text", content: "" };
            else { fail(`touch: cannot touch '${name}': No such directory`); break; }
          }
          persist(); fsChanged = true; break;
        }
        case "echo": {
          result = tokens.join(" ");
          if (redirect) {
            const p = normalize(redirect, currentCwd);
            if (fs.entries[parent(p)]?.type !== "dir") fail(`bash: ${redirect}: No such directory`);
            else if (fs.entries[p]?.type === "dir") fail(`bash: ${redirect}: Is a directory`);
            else {
              const previous = append && fs.entries[p] ? fs.entries[p].content : "";
              fs.entries[p] = { type: "text", content: `${previous}${result}\n` };
              persist(); fsChanged = true; result = "";
            }
          }
          break;
        }
        case "cp":
        case "mv": {
          if (tokens.length < 2) { fail(`${cmd}: missing file operand`); break; }
          const source = getEntry(tokens[0]);
          let dest = normalize(tokens[1], currentCwd);
          if (fs.entries[dest]?.type === "dir") dest = `${dest}/${basename(source)}`;
          if (fs.entries[parent(dest)]?.type !== "dir") { fail(`${cmd}: cannot create '${tokens[1]}': No such directory`); break; }
          if (fs.entries[source].type === "dir") { fail(`${cmd}: copying or moving directories is not supported`); break; }
          if (cmd === "cp") fs.entries[dest] = { ...fs.entries[source] };
          else { fs.entries[dest] = fs.entries[source]; delete fs.entries[source]; }
          persist(); fsChanged = true; break;
        }
        case "rm":
        case "rmdir": {
          if (!tokens.length) { fail(`${cmd}: missing operand`); break; }
          const recursive = tokens.includes("-r") || tokens.includes("-rf") || tokens.includes("-fr");
          const names = tokens.filter((t) => !t.startsWith("-"));
          for (const name of names) {
            const p = getEntry(name);
            if (["/", "/home/alex", "/home/alex/Desktop", "/home/alex/Trash"].includes(p)) { fail(`refusing to remove protected directory '${p}'`); break; }
            const descendants = Object.keys(fs.entries).filter((x) => x.startsWith(`${p}/`));
            if (fs.entries[p].type === "dir" && cmd === "rmdir" && descendants.length) { fail(`rmdir: failed to remove '${name}': Directory not empty`); break; }
            if (fs.entries[p].type === "dir" && cmd === "rm" && !recursive) { fail(`rm: cannot remove '${name}': Is a directory (use -r)`); break; }
            if (fs.entries[p].type === "dir") descendants.forEach((x) => delete fs.entries[x]);
            delete fs.entries[p];
          }
          persist(); fsChanged = true; break;
        }
        case "tree": {
          const root = getEntry(tokens[0] || ".");
          if (fs.entries[root].type !== "dir") { result = basename(root); break; }
          const lines = [root === currentCwd ? "." : root];
          const walk = (dir, prefix) => children(dir).forEach((child, index, list) => {
            const last = index === list.length - 1;
            const entry = fs.entries[child];
            lines.push(`${prefix}${last ? "└── " : "├── "}${basename(child)}${entry.type === "dir" ? "/" : ""}`);
            if (entry.type === "dir") walk(child, prefix + (last ? "    " : "│   "));
          });
          walk(root, ""); result = lines.join("\n"); break;
        }
        case "find": {
          const root = getEntry(tokens[0] || ".");
          const needle = tokens.find((t) => t.startsWith("-name")) ? tokens[tokens.indexOf("-name") + 1]?.replaceAll("*", "") : null;
          result = Object.keys(fs.entries).filter((p) => (p === root || p.startsWith(`${root}/`)) && (!needle || basename(p).includes(needle))).join("\n");
          break;
        }
        case "grep": {
          if (tokens.length < 2) { fail("grep: usage: grep PATTERN FILE"); break; }
          const p = getEntry(tokens[1]);
          if (fs.entries[p].type === "dir") { fail(`grep: ${tokens[1]}: Is a directory`); break; }
          result = (fs.entries[p].content || "").split("\n").map((line, i) => line.includes(tokens[0]) ? `${i + 1}:${line}` : null).filter(Boolean).join("\n");
          break;
        }
        case "nano": {
          const p = normalize(tokens[0] || "untitled.txt", currentCwd);
          openWindow("editor", { path: p }); return { result: "" };
        }
        case "open":
        case "xdg-open": {
          if (!tokens.length) { fail("open: missing file operand"); break; }
          const p = getEntry(tokens[0]);
          openPath(p);
          return { result: "" };
        }
        case "browser":
        case "firefox":
        case "chrome":
        case "google-chrome": {
          result = "Browser has been removed from this system.\n";
          return { result };
        }
        case "python":
        case "python3": {
          if (tokens.join(" ").includes("http.server")) {
            result = "Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...\nLaunching Orbit Web Browser...\n";
            setTimeout(() => openWindow("browser", { path: fs.entries[`${currentCwd}/index.html`] ? `${currentCwd}/index.html` : null }), 400);
          } else if (tokens[0] === "-m" && (tokens[1] === "pip" || tokens[1] === "pip3")) {
            const pipArgs = tokens.slice(2).join(" ");
            return executeTerminalCommand("pip " + pipArgs, currentCwd);
          } else if (tokens[0] === "-c") {
            result = "Orbit Python 3.11: Image processing libraries (OpenCV, Pillow, scikit-image, numpy, scipy) verified.";
          } else {
            result = "Python 3.11.2 (Orbit Linux virtual env)\nType 'help', 'copyright', 'credits' or 'license' for more information.\n";
          }
          break;
        }
        case "pip":
        case "pip3":
        case "conda": {
          const sub = tokens[0]?.toLowerCase();
          const pipVersions = {
            "cycler": "0.12.1",
            "imageio": "2.34.0",
            "imageio-ffmpeg": "0.4.9",
            "kiwisolver": "1.4.5",
            "matplotlib": "3.8.4",
            "networkx": "3.3",
            "numpy": "1.26.4",
            "opencv-python": "4.9.0.80",
            "opencv-contrib-python": "4.9.0.80",
            "packaging": "24.0",
            "pillow": "10.3.0",
            "pip": "24.0",
            "pyparsing": "3.1.2",
            "python-dateutil": "2.9.0",
            "pywavelets": "1.6.0",
            "scikit-image": "0.23.1",
            "scipy": "1.13.0",
            "tifffile": "2024.2.12",
            "torchvision": "0.17.2",
            "wheel": "0.43.0"
          };
          if (sub === "list") {
            const names = [...installedPythonPackages].sort();
            const rows = ["Package                  Version", "------------------------ ---------"];
            names.forEach((name) => {
              const ver = pipVersions[name] || "1.0.0";
              rows.push(name.padEnd(24) + " " + ver);
            });
            result = rows.join("\n");
          } else if (sub === "install") {
            const pkgs = tokens.slice(1).filter((t) => !t.startsWith("-") && t !== "install");
            if (!pkgs.length) {
              result = "Collecting opencv-python Pillow numpy matplotlib scikit-image scipy imageio\n  Using cached wheels from Orbit Linux package index\nInstalling collected packages: opencv-python, Pillow, numpy, matplotlib, scikit-image, scipy, imageio\nSuccessfully installed opencv-python-4.9.0.80 Pillow-10.3.0 numpy-1.26.4 matplotlib-3.8.4 scikit-image-0.23.1 scipy-1.13.0 imageio-2.34.0";
              ["opencv-python", "pillow", "numpy", "matplotlib", "scikit-image", "scipy", "imageio"].forEach((p) => installedPythonPackages.add(p));
            } else {
              const lines = [];
              pkgs.forEach((pkg) => {
                const key = pkg.toLowerCase();
                installedPythonPackages.add(key);
                const ver = pipVersions[key] || "1.0.0";
                lines.push(`Collecting ${pkg}`);
                lines.push(`  Downloading ${pkg}-${ver}-py3-none-any.whl`);
                lines.push(`Requirement already satisfied / installed: ${pkg}==${ver}`);
                lines.push(`Installing collected packages: ${pkg}`);
                lines.push(`Successfully installed ${pkg}-${ver}`);
                lines.push(`Location: /home/alex/.local/lib/python3.11/site-packages`);
              });
              result = lines.join("\n");
            }
            ensurePythonImageStackInstalled();
          } else if (sub === "show") {
            const pkg = tokens[1]?.toLowerCase() || "opencv-python";
            const pkgMap = {
              "opencv-python": "Name: opencv-python\nVersion: 4.9.0.80\nSummary: OpenCV Computer Vision & image processing library.\nLocation: /home/alex/.local/lib/python3.11/site-packages\nRequires: numpy",
              "cv2": "Name: opencv-python\nVersion: 4.9.0.80\nSummary: OpenCV Computer Vision & image processing library.\nLocation: /home/alex/.local/lib/python3.11/site-packages\nRequires: numpy",
              "pillow": "Name: Pillow\nVersion: 10.3.0\nSummary: Python Imaging Library (Fork)\nLocation: /home/alex/.local/lib/python3.11/site-packages",
              "pil": "Name: Pillow\nVersion: 10.3.0\nSummary: Python Imaging Library (Fork)\nLocation: /home/alex/.local/lib/python3.11/site-packages",
              "scikit-image": "Name: scikit-image\nVersion: 0.23.1\nSummary: Image processing in Python\nLocation: /home/alex/.local/lib/python3.11/site-packages\nRequires: numpy, scipy, pillow, imageio",
              "skimage": "Name: scikit-image\nVersion: 0.23.1\nSummary: Image processing in Python\nLocation: /home/alex/.local/lib/python3.11/site-packages\nRequires: numpy, scipy, pillow, imageio",
              "numpy": "Name: numpy\nVersion: 1.26.4\nSummary: Fundamental package for array computing and image arrays\nLocation: /home/alex/.local/lib/python3.11/site-packages",
              "matplotlib": "Name: matplotlib\nVersion: 3.8.4\nSummary: Python plotting and image visualization package\nLocation: /home/alex/.local/lib/python3.11/site-packages",
              "scipy": "Name: scipy\nVersion: 1.13.0\nSummary: Scientific computing and scipy.ndimage multidimensional image processing\nLocation: /home/alex/.local/lib/python3.11/site-packages"
            };
            result = pkgMap[pkg] || `Name: ${pkg}\nVersion: 1.0.0\nLocation: /home/alex/.local/lib/python3.11/site-packages\nStatus: Installed`;
          } else {
            result = `Usage: ${cmd} [list | install <package> | show <package>]\nPre-installed image processing libraries: opencv-python, Pillow, numpy, matplotlib, scikit-image, scipy.ndimage`;
          }
          break;
        }
        case "reset-fs":
          if (tokens[0] !== "--confirm") { fail("This removes saved virtual files. Run: reset-fs --confirm"); break; }
          sessionStorage.removeItem(STORAGE_KEY);
          location.reload();
          return { result: "" };
        default: fail(`${cmd}: command not found. Type 'help' for available commands.`);
      }
    } catch (err) {
      fail(err instanceof Error ? err.message : String(err));
    }

    if (redirect && cmd !== "echo" && !error) {
      const p = normalize(redirect, currentCwd);
      if (fs.entries[parent(p)]?.type !== "dir") { result = `bash: ${redirect}: No such directory`; error = true; }
      else { fs.entries[p] = { type: "text", content: `${append && fs.entries[p] ? fs.entries[p].content : ""}${result}\n` }; persist(); fsChanged = true; result = ""; }
    }

    const kind = error ? "error" : (["mkdir", "touch", "mv", "cp", "rm", "rmdir"].includes(cmd) ? "success" : "output");
    return { result, error, fsChanged, newCwd, kind };
  }

  const ARABIC_COMMAND_EXPLANATIONS = {
    "ls": "عرض قائمة الملفات والمجلدات الموجودة في المسار الحالي",
    "cd": "تغيير مسار العمل الحالي والانتقال إلى مجلد آخر",
    "pwd": "طباعة مسار المجلد الحالي كاملاً (Print Working Directory)",
    "mkdir": "إنشاء مجلد جديد لتنظيم الملفات",
    "touch": "إنشاء ملف جديد فارغ أو تحديث وقت تعديل الملف",
    "rm": "حذف الملف أو المجلد من النظام",
    "rmdir": "حذف مجلد فارغ من النظام",
    "cp": "نسخ ملف أو مجلد من مكان إلى آخر",
    "mv": "نقل ملف أو مجلد أو إعادة تسميته",
    "cat": "قراءة وطباعة محتويات الملف بالكامل على الشاشة",
    "head": "عرض الأسطر الأولى من بداية الملف",
    "tail": "عرض الأسطر الأخيرة من نهاية الملف",
    "less": "تصفح محتوى الملف صفحة تلو الأخرى",
    "grep": "البحث عن نص أو نمط محدد داخل الملفات",
    "find": "البحث عن الملفات والمجلدات في شجرة النظام",
    "echo": "طباعة نص في الترمينال أو توجيهه وحفظه في ملف",
    "clear": "مسح وتفريغ شاشة الترمينال من المخرجات السابقة",
    "whoami": "عرض اسم المستخدم المسجل الحالي في النظام (alex)",
    "hostname": "عرض اسم جهاز الكمبيوتر أو الخادم (orbit)",
    "uname": "عرض معلومات وإصدار نواة نظام التشغيل لينكس (Linux Kernel)",
    "date": "عرض التاريخ والوقت الحالي للنظام",
    "df": "عرض تقرير مساحة تخزين الأقراص الصلبة والمساحة الشاغرة",
    "free": "عرض استهلاك ذاكرة الرام (RAM) والذاكرة الافتراضية",
    "env": "عرض متغيرات البيئة الحالية لنظام التشغيل",
    "history": "عرض قائمة الأوامر التي تم تنفيذها مسبقاً",
    "tree": "عرض هيكلية المجلدات والملفات على شكل شجرة متفرعة",
    "nano": "فتح محرر النصوص التفاعلي نانو لتعديل الملفات",
    "python": "تشغيل مفسر بايثون لتنفيذ الأكواد والبرامج",
    "python3": "تشغيل مفسر بايثون لتنفيذ الأكواد والبرامج",
    "pip": "مدير حزم ومكتبات بايثون لتثبيت وإدارة مكتبات معالجة الصور والذكاء الاصطناعي",
    "pip3": "مدير حزم بايثون 3 لإدارة مكتبات معالجة الصور مثل OpenCV وPillow وscikit-image",
    "conda": "مدير بيئات وحزم بايثون لأناكوندا (Anaconda) وعلم البيانات ومعالجة الصور",
    "gcc": "ترجمة كود لغة C بواسطة مصرف جنو وتوليد ملف تنفيذي",
    "g++": "ترجمة كود لغة C++ بواسطة مصرف جنو",
    "node": "تشغيل بيئة نود لتنفيذ ملفات وأكواد الجافاسكريبت",
    "bash": "تنفيذ سكريبت شل أو فتح جلسة موجه أوامر جديدة",
    "sh": "تشغيل أوامر الشل القياسية",
    "help": "عرض قائمة المساعدة والدليل لجميع الأوامر المدعومة"
  };

  function getArabicCommandExplanation(cmdString) {
    if (!cmdString || !cmdString.trim()) return "";
    const trimmed = cmdString.trim();
    const parts = trimmed.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (mainCmd === "pip" || mainCmd === "pip3" || mainCmd === "conda") {
      if (args.includes("list")) return "عرض جميع مكتبات وحزم بايثون المثبتة في النظام (OpenCV, Pillow, NumPy, Scikit-image, Matplotlib, SciPy).";
      if (args.includes("install")) {
        const pkg = args.filter((a) => !a.startsWith("-") && a !== "install").join(" ") || "المكتبة";
        return `تثبيت أو التحقق من تثبيت مكتبة (${pkg}) في بيئة بايثون الافتراضية.`;
      }
      if (args.includes("show")) {
        const pkg = args[1] || "المكتبة";
        return `عرض تفاصيل وإصدار ومسار تثبيت مكتبة (${pkg}).`;
      }
      return "إدارة وتثبيت حزم ومكتبات بايثون ومعالجة الصور.";
    }

    if (mainCmd === "ls") {
      if (args.some((a) => a.includes("l") && a.includes("a"))) return "عرض قائمة الملفات والمجلدات بتفاصيلها الكاملة (الصلاحيات والحجم والتاريخ) متضمنة الملفات المخفية.";
      if (args.some((a) => a.includes("l"))) return "عرض قائمة الملفات والمجلدات بتنسيق مفصل (الصلاحيات، الحجم، تاريخ التعديل).";
      if (args.some((a) => a.includes("a"))) return "عرض جميع الملفات بما فيها الملفات المخفية التي تبدأ بنقطة (.).";
      return "عرض قائمة الملفات والمجلدات في المسار الحالي.";
    }

    if (mainCmd === "cd") {
      if (!args.length || args[0] === "~") return "الانتقال المباشر إلى المجلد الرئيسي للمستخدم (/home/alex).";
      if (args[0] === "..") return "الرجوع خطوة واحدة إلى المجلد الأب السابق.";
      if (args[0] === "/") return "الانتقال إلى المجلد الجذري للنظام (Root).";
      return `الانتقال إلى المجلد: ${args[0]}`;
    }

    if (mainCmd === "mkdir") {
      const folderName = args.filter((a) => !a.startsWith("-")).join(" ") || "جديد";
      if (args.includes("-p")) return `إنشاء مسار المجلدات المتداخلة بالكامل باسم: ${folderName}`;
      return `إنشاء مجلد جديد باسم: ${folderName}`;
    }

    if (mainCmd === "touch") {
      const fileName = args.filter((a) => !a.startsWith("-")).join(" ") || "ملف";
      return `إنشاء ملف جديد فارغ باسم: ${fileName}`;
    }

    if (mainCmd === "rm") {
      const target = args.filter((a) => !a.startsWith("-")).join(" ") || "العنصر";
      if (args.some((a) => a.includes("r") || a.includes("f"))) return `حذف المجلد بكافة محتوياته نهائياً: ${target}`;
      return `حذف الملف نهائياً: ${target}`;
    }

    if (mainCmd === "cat") {
      const file = args[0] || "الملف";
      return `قراءة وطباعة كامل محتويات الملف (${file}) على شاشة الترمينال.`;
    }

    if (mainCmd === "echo") {
      if (trimmed.includes(">>")) return "إضافة النص إلى نهاية الملف دون مسح محتواه القديم (Append).";
      if (trimmed.includes(">")) return "كتابة وتخزين النص داخل الملف ومسح أي محتوى سابق (Overwrite).";
      return "طباعة النص المدخل مباشرة على شاشة الترمينال.";
    }

    if (mainCmd === "grep") {
      return "البحث واستخراج الأسطر المطابقة لكلمة البحث داخل الملف.";
    }

    if (mainCmd === "cp") {
      return "نسخ الملف أو المجلد من مسار المصدر إلى مسار الهدف.";
    }

    if (mainCmd === "mv") {
      return "نقل أو إعادة تسمية الملف/المجلد إلى الاسم أو المسار الجديد.";
    }

    if (mainCmd === "python" || mainCmd === "python3") {
      const script = args[0] || "الكود";
      return `تشغيل مفسر لغة بايثون لتنفيذ السكريبت البرمجي (${script}).`;
    }

    if (mainCmd === "gcc" || mainCmd === "g++") {
      return "ترجمة كود لغة C/C++ بواسطة مصرف جنو وإنشاء برنامج تنفيذي.";
    }

    if (mainCmd === "clear") {
      return "تنظيف وتفريغ شاشة الترمينال من كافة المخرجات السابقة.";
    }

    if (mainCmd === "pwd") {
      return "طباعة مسار المجلد الحالي كاملاً (Print Working Directory).";
    }

    if (ARABIC_COMMAND_EXPLANATIONS[mainCmd]) {
      return ARABIC_COMMAND_EXPLANATIONS[mainCmd];
    }

    if (trimmed.includes("|")) return "تمرير مخرجات الأمر الأول كمدخلات للأمر التالي عبر أنبوب البيانات (Pipeline).";
    return `أمر نظام لينكس (${mainCmd}): تنفيذ العملية وعرض نتيجتها للمستخدم.`;
  }

  function runCommand(raw, output) {
    const res = executeTerminalCommand(raw, cwd);
    if (res.result && output) {
      const line = document.createElement("div");
      line.className = `terminal-line ${res.kind || (res.error ? "error" : "output")}`;
      line.textContent = res.result;
      output.append(line);
    }
    return res;
  }

  function buildTerminal(body, options = {}) {
    let termCwd = options.path || "/home/alex";
    let termHistory = [];
    let termHistoryIndex = 0;

    body.className = "window-body terminal-body";
    body.innerHTML = `<div class="terminal-history"><div class="terminal-line dim">Orbit Linux Web 1.0 · Type <b>help</b> to see available commands.</div><div class="terminal-line dim">Files are virtual and saved in this browser tab.</div></div><div class="terminal-input-row"><span class="prompt active-prompt">${promptHtml(termCwd)}</span><input class="terminal-input" aria-label="Terminal command" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;

    const historyContainer = body.querySelector(".terminal-history");
    const activePrompt = body.querySelector(".active-prompt");
    const input = body.querySelector(".terminal-input");

    input.focus();
    body.addEventListener("click", (e) => {
      if (!e.target.closest("a") && !e.target.closest("button")) input.focus();
    });

    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        body.scrollTop = body.scrollHeight;
      });
    };

    scrollToBottom();

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const value = input.value;
        const trimmed = value.trim();

        const block = document.createElement("div");
        block.className = "terminal-command-block";
        block.innerHTML = `<div class="terminal-line user-command-line"><span class="cmd-prompt">${promptHtml(termCwd)}</span><span class="user-cmd">${escapeHtml(value)}</span></div>`;
        historyContainer.append(block);
        input.value = "";

        if (trimmed) {
          termHistory.push(value);
          termHistoryIndex = termHistory.length;
          history.push(value);
          historyIndex = history.length;

          // Arabic command explanation
          const explanation = getArabicCommandExplanation(value);
          if (explanation) {
            const explainLine = document.createElement("div");
            explainLine.className = "terminal-line term-explanation";
            explainLine.innerHTML = `<span class="term-explain-badge">شرح الأمر</span><span class="term-explain-text">${escapeHtml(explanation)}</span>`;
            block.append(explainLine);
          }

          const outcome = executeTerminalCommand(value, termCwd);
          if (outcome.isClear) {
            historyContainer.innerHTML = "";
          } else {
            if (outcome.result) {
              const outLine = document.createElement("div");
              outLine.className = `terminal-line ${outcome.kind || (outcome.error ? "error" : "output")}`;
              outLine.textContent = outcome.result;
              block.append(outLine);
            }
            if (outcome.newCwd) {
              termCwd = outcome.newCwd;
              cwd = termCwd;
              activePrompt.innerHTML = promptHtml(termCwd);
            }
          }

          if (outcome.fsChanged) {
            renderDesktopFiles();
            refreshFiles();
          }
        }

        scrollToBottom();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const hist = termHistory.length ? termHistory : history;
        if (termHistoryIndex > 0) input.value = hist[--termHistoryIndex] || "";
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        const hist = termHistory.length ? termHistory : history;
        input.value = termHistoryIndex < hist.length - 1 ? hist[++termHistoryIndex] : "";
      } else if (event.key === "Tab") {
        event.preventDefault();
        const partial = input.value.split(/\s+/).pop();
        const dir = partial.includes("/") ? normalize(partial.slice(0, partial.lastIndexOf("/") + 1), termCwd) : termCwd;
        const prefix = partial.includes("/") ? partial.slice(partial.lastIndexOf("/") + 1) : partial;
        const matches = children(dir).map(basename).filter((name) => name.startsWith(prefix));
        if (matches.length === 1) {
          input.value += matches[0].slice(prefix.length) + (fs.entries[normalize(`${dir}/${matches[0]}`, termCwd)]?.type === "dir" ? "/" : " ");
        } else if (matches.length > 1) {
          const tabBlock = document.createElement("div");
          tabBlock.className = "terminal-line dim";
          tabBlock.textContent = matches.join("    ");
          historyContainer.append(tabBlock);
          scrollToBottom();
        }
      } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        historyContainer.innerHTML = "";
        scrollToBottom();
      } else if (event.ctrlKey && event.key.toLowerCase() === "c") {
        const cancelBlock = document.createElement("div");
        cancelBlock.className = "terminal-command-block";
        cancelBlock.innerHTML = `<div class="terminal-line user-command-line"><span class="cmd-prompt">${promptHtml(termCwd)}</span><span class="user-cmd">${escapeHtml(input.value)}</span><span class="terminal-line dim" style="margin-left: 6px;">^C</span></div>`;
        historyContainer.append(cancelBlock);
        input.value = "";
        scrollToBottom();
      }
    });

    input.addEventListener("input", scrollToBottom);
    input.addEventListener("focus", scrollToBottom);
  }

  function buildFiles(body, initialPath) {
    body.className = "window-body";
    const path = fs.entries[initialPath]?.type === "dir" ? initialPath : "/home/alex";
    body.innerHTML = `<div class="files-layout"><aside class="sidebar"><div class="sidebar-label">Places</div><button class="sidebar-item" data-path="/home/alex"><span data-icon="home"></span>Home</button><button class="sidebar-item" data-path="/home/alex/Documents"><span data-icon="documents"></span>Documents</button><button class="sidebar-item" data-path="/home/alex/Downloads"><span data-icon="download"></span>Downloads</button><button class="sidebar-item" data-path="/home/alex/Pictures"><span data-icon="pictures"></span>Pictures</button><button class="sidebar-item" data-path="/tmp"><span data-icon="recent"></span>Recent</button><div class="sidebar-label">Devices</div><button class="sidebar-item" data-path="/"><span data-icon="computer"></span>Computer</button><button class="sidebar-item" data-path="/home/alex/Trash"><span data-icon="trash"></span>Trash</button></aside><div class="files-main"><div class="file-toolbar"><button class="nav-button back" title="Back">‹</button><button class="nav-button forward" title="Forward">›</button><input class="location" aria-label="Current folder"><button class="toolbar-action new-folder" title="New folder">＋</button><button class="toolbar-action upload-files" title="Import files">${iconMarkup("download", 17)}</button><button class="toolbar-action refresh" title="Refresh">⟳</button></div><div class="file-grid"></div><div class="files-status"></div></div></div>`;
    paintIcons(body);
    const grid = body.querySelector(".file-grid");
    const location = body.querySelector(".location");
    const status = body.querySelector(".files-status");
    const backStack = [];
    const forwardStack = [];
    let current = path;
    let selected = null;
    function render() {
      location.value = current;
      grid.dataset.path = current;
      lastFileFolder = current;
      body.querySelectorAll(".sidebar-item").forEach((btn) => btn.classList.toggle("active", btn.dataset.path === current));
      grid.innerHTML = "";
      const items = children(current);
      if (!items.length) grid.innerHTML = `<div class="empty-state">This folder is empty</div>`;
      items.forEach((entryPath) => {
        const entry = fs.entries[entryPath];
        const name = basename(entryPath);
        const button = document.createElement("button");
        button.className = `file-item${selected === entryPath ? " selected" : ""}`;
        button.title = name;
        const icon = entry.type === "dir" ? "folder" : iconFor(name);
        button.innerHTML = entry.type === "image" ? `<img src="${imageSource(entry.content)}" alt="">` : `<span class="file-icon">${iconMarkup(icon, 34)}</span>`;
        button.insertAdjacentHTML("beforeend", `<span>${escapeHtml(name)}</span>`);
        button.addEventListener("click", (event) => {
          if (isMobileMode()) {
            if (entry.type === "dir") navigate(entryPath);
            else openPath(entryPath);
            return;
          }
          selected = entryPath;
          window.selectedEntry = entryPath;
          if (!event.ctrlKey && !event.metaKey) grid.querySelectorAll(".file-item").forEach((item) => item.classList.toggle("selected", item === button));
          else button.classList.toggle("selected");
        });
        button.addEventListener("dblclick", () => {
          if (entry.type === "dir") navigate(entryPath);
          else openPath(entryPath);
        });
        button.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          selected = entryPath;
          window.selectedEntry = entryPath;
          grid.querySelectorAll(".file-item").forEach((item) => item.classList.toggle("selected", item === button));
          fileContextMenu(entryPath, event.clientX, event.clientY, current === "/home/alex/Trash");
        });
        button.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/orbit-path", entryPath);
          event.dataTransfer.effectAllowed = "move";
        });
        button.addEventListener("dragover", (event) => {
          if (entry.type === "dir") { event.preventDefault(); button.classList.add("drop-target"); }
        });
        button.addEventListener("dragleave", () => button.classList.remove("drop-target"));
        button.addEventListener("drop", (event) => {
          event.preventDefault();
          button.classList.remove("drop-target");
          const source = event.dataTransfer.getData("text/orbit-path");
          if (source && entry.type === "dir" && source !== entryPath && !entryPath.startsWith(`${source}/`)) {
            const target = uniquePath(`${entryPath}/${basename(source)}`);
            const moving = Object.keys(fs.entries).filter((item) => item === source || item.startsWith(`${source}/`));
            moving.forEach((item) => { fs.entries[`${target}${item.slice(source.length)}`] = fs.entries[item]; });
            moving.sort((a, b) => b.length - a.length).forEach((item) => delete fs.entries[item]);
            persist(); render(); refreshFiles(); renderDesktopFiles();
          }
        });
        grid.append(button);
      });
      status.textContent = `${items.length} item${items.length === 1 ? "" : "s"} · ${current}`;
    }
    function navigate(next) {
      const p = normalize(next, current);
      if (!fs.entries[p] || fs.entries[p].type !== "dir") { showToast("That folder does not exist."); return; }
      if (p !== current) { backStack.push(current); forwardStack.length = 0; current = p; selected = null; render(); }
    }
    body.querySelectorAll(".sidebar-item").forEach((btn) => btn.addEventListener("click", () => navigate(btn.dataset.path)));
    body.querySelector(".back").addEventListener("click", () => { if (backStack.length) { forwardStack.push(current); current = backStack.pop(); render(); } });
    body.querySelector(".forward").addEventListener("click", () => { if (forwardStack.length) { backStack.push(current); current = forwardStack.pop(); render(); } });
    body.querySelector(".refresh").addEventListener("click", render);
    body.querySelector(".upload-files").addEventListener("click", () => importFilesInto(current));
    location.addEventListener("keydown", (event) => { if (event.key === "Enter") navigate(location.value); });
    body.querySelector(".new-folder").addEventListener("click", () => {
      createInFolder(current, "dir", render);
    });
    grid.addEventListener("contextmenu", (event) => {
      if (event.target.closest(".file-item")) return;
      event.preventDefault();
      showContextMenu([
        { label: "New Folder", icon: "folder", action: () => createInFolder(current, "dir", render) },
        { label: "New Document", icon: "text", action: () => createInFolder(current, "text", render) },
        { label: "Import Files…", icon: "download", action: () => importFilesInto(current) },
        { label: "Paste", shortcut: "Ctrl+V", action: () => pasteInto(current) },
        { separator: true },
        { label: "Refresh", action: render }
      ], event.clientX, event.clientY);
    });
    grid.addEventListener("dragover", (event) => {
      if (event.target === grid) event.preventDefault();
    });
    grid.addEventListener("drop", (event) => {
      if (event.target !== grid) return;
      event.preventDefault();
      const source = event.dataTransfer.getData("text/orbit-path");
      if (source && source !== current && !current.startsWith(`${source}/`)) moveEntry(source, current);
    });
    render();
  }

  function createInFolder(folder, type, onCreate = () => {}) {
    showInputDialog(type === "dir" ? "Create Folder" : "Create Document", "Name with extension", "", "Create", (name) => {
      if (!name || !name.trim()) return;
      const cleanName = name.trim();
      if (cleanName.includes("/") || cleanName === "." || cleanName === "..") { showToast("Enter a valid file or folder name."); return; }
      const target = normalize(cleanName, folder);
      if (target in fs.entries) { showToast("That name is already in use."); return; }
      fs.entries[target] = type === "dir" ? { type: "dir" } : { type: "text", content: "" };
      persist();
      onCreate();
      renderDesktopFiles();
    }, type === "dir" ? "e.g. MyFolder" : "e.g. script.js, data.json");
  }

  function moveEntry(source, folder) {
    if (source === "/" || source === "/home/alex" || folder === source || folder.startsWith(`${source}/`)) return;
    const target = uniquePath(`${folder}/${basename(source)}`);
    const moving = Object.keys(fs.entries).filter((entry) => entry === source || entry.startsWith(`${source}/`));
    moving.forEach((entry) => { fs.entries[`${target}${entry.slice(source.length)}`] = fs.entries[entry]; });
    moving.sort((a, b) => b.length - a.length).forEach((entry) => delete fs.entries[entry]);
    persist();
    renderDesktopFiles();
    refreshFiles();
  }

  function openDesktopShortcut(target) {
    if (target === "computer") openWindow("files", { path: "/" });
    else if (target === "user" || target === "home") openWindow("files", { path: "/home/alex" });
    else if (target === "desktop-folder") openWindow("files", { path: "/home/alex/Desktop" });
    else if (target === "documents") openWindow("files", { path: "/home/alex/Documents" });
    else if (target === "pictures") openWindow("files", { path: "/home/alex/Pictures" });
    else if (target === "trash") openWindow("files", { path: "/home/alex/Trash" });
    else if (target === "vscode") openWindow("vscode");
    else if (target === "jupyter") openWindow("jupyter");
    else if (target === "terminal") openWindow("terminal");
    else openWindow(target);
  }

  function renderDesktopFiles() {
    const desktopIcons = document.querySelector(".desktop-icons");
    if (!desktopIcons) return;
    desktopIcons.querySelectorAll(".desktop-file-icon").forEach((item) => item.remove());
    const staticNames = new Set(
      Array.from(desktopIcons.querySelectorAll(".desktop-icon:not(.desktop-file-icon)"))
        .map((b) => b.querySelector("span:last-child")?.textContent.trim().toLowerCase())
        .filter(Boolean)
    );
    children("/home/alex/Desktop").forEach((path) => {
      const name = basename(path);
      if (name.toLowerCase() === "alex" || name.toLowerCase() === "desktop") return;
      if (staticNames.has(name.toLowerCase())) return;
      const entry = fs.entries[path];
      const button = document.createElement("button");
      button.className = "desktop-icon desktop-file-icon";
      button.dataset.entry = path;
      button.draggable = true;
      const isImg = entry.type === "image" && entry.content;
      const art = isImg
        ? `<img src="${imageSource(entry.content)}" alt="" style="width:38px;height:38px;object-fit:cover;border-radius:6px;box-shadow:0 3px 6px #0006;">`
        : iconMarkup(entry.type === "dir" ? "folder" : iconFor(basename(path)), 38);
      button.innerHTML = `<span class="desktop-icon-art">${art}</span><span>${escapeHtml(basename(path))}</span>`;
      button.addEventListener("click", (event) => {
        if (button.dataset.dragged) { delete button.dataset.dragged; return; }
        if (isMobileMode()) {
          openPath(path);
          return;
        }
        if (!event.ctrlKey && !event.metaKey) desktopIcons.querySelectorAll(".desktop-icon").forEach((item) => item.classList.toggle("selected", item === button));
        else button.classList.toggle("selected");
        window.selectedEntry = path;
      });
      button.addEventListener("dblclick", () => openPath(path));
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.click();
        fileContextMenu(path, event.clientX, event.clientY, false);
      });
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/orbit-path", path);
        event.dataTransfer.effectAllowed = "move";
      });
      desktopIcons.append(button);
      enableDesktopDrag(button, desktopIcons);
    });
  }

  function enableDesktopDrag(button, container) {
    let origin = null;
    button.addEventListener("pointerdown", (event) => {
      if (isMobileMode() || event.button !== 0 || event.target.closest("button:not(.desktop-icon)")) return;
      origin = { x: event.clientX, y: event.clientY, left: 0, top: 0, moved: false };
      button.setPointerCapture(event.pointerId);
    });
    button.addEventListener("pointermove", (event) => {
      if (!origin || !(event.buttons & 1)) return;
      const dx = event.clientX - origin.x;
      const dy = event.clientY - origin.y;
      if (!origin.moved && Math.hypot(dx, dy) < 6) return;
      if (!origin.moved) {
        const rect = button.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        origin.left = rect.left - parentRect.left;
        origin.top = rect.top - parentRect.top;
        button.classList.add("dragging-icon");
        origin.moved = true;
      }
      button.style.position = "absolute";
      button.style.left = `${Math.max(0, origin.left + dx)}px`;
      button.style.top = `${Math.max(0, origin.top + dy)}px`;
    });
    button.addEventListener("pointerup", () => {
      if (origin?.moved) button.dataset.dragged = "1";
      button.classList.remove("dragging-icon");
      origin = null;
    });
  }

  function iconFor(name) {
    const ext = name.split(".").pop().toLowerCase();
    return ({ txt: "text", md: "editor", js: "code", json: "code", html: "web", css: "code", sh: "terminal", pdf: "documents", zip: "archive", png: "pictures", jpg: "pictures", jpeg: "pictures", svg: "pictures" })[ext] || "unknown";
  }

  function svgUrl(source) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source || "")}`;
  }

  function buildEditor(body, path) {
    body.className = "window-body editor-body";
    const p = path || null;
    const entry = p && fs.entries[p] && fs.entries[p].type !== "dir" ? fs.entries[p] : null;
    currentEditorPath = p;
    body.innerHTML = `<div class="editor-toolbar"><span>File</span><input aria-label="File path" value="${escapeHtml(p || "")}" placeholder="Enter file name with extension (e.g. script.js, index.html)..."><button class="save-file">${iconMarkup("save", 13)} Save</button></div><textarea class="editor-text" spellcheck="false" aria-label="Text editor"></textarea><div class="editor-status">Plain Text · UTF-8</div>`;
    const pathInput = body.querySelector(".editor-toolbar input");
    const text = body.querySelector("textarea");
    const status = body.querySelector(".editor-status");
    text.value = entry?.content || "";
    text.addEventListener("input", () => { status.textContent = `Ln ${text.value.slice(0, text.selectionStart).split("\n").length}, Col ${text.selectionStart - text.value.lastIndexOf("\n", text.selectionStart - 1)} · UTF-8`; });

    function doSave() {
      const val = pathInput.value.trim();
      if (!val) {
        showToast("Please enter a file name with extension.");
        pathInput.focus();
        return null;
      }
      const target = normalize(val, cwd);
      if (fs.entries[parent(target)]?.type !== "dir") { showToast("The parent folder does not exist."); return null; }
      fs.entries[target] = { type: fileType(target), content: text.value };
      persist(); currentEditorPath = target; status.textContent = "Saved"; showToast(`Saved ${basename(target)}`);
      refreshFiles();
      renderDesktopFiles();
      const win = body.closest(".window");
      if (win) { win.dataset.path = target; win.querySelector(".window-title").textContent = basename(target); }
      return target;
    }

    body.querySelector(".save-file").addEventListener("click", doSave);

    text.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        doSave();
      } else if (event.key === "F5" || ((event.ctrlKey || event.metaKey) && event.key === "Enter")) {
        event.preventDefault();
        doSave();
      }
    });
  }

  function highlightSyntax(code, ext) {
    if (!code) return "";
    const l = (ext || "").toLowerCase();

    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (l === "html" || l === "htm" || l === "svg" || l === "xml") {
      const safe = esc(code).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      return safe
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syn-com">$1</span>')
        .replace(/(&lt;\/?)([a-zA-Z0-9\-]+)([\s\S]*?)(\/?&gt;)/g, (m, p1, tag, attrs, p4) => {
          const highlightedAttrs = attrs
            .replace(/([a-zA-Z0-9\-:]+)=(&quot;[^&]*&quot;|&#39;[^&#]*&#39;|"[^"]*"|'[^']*')/g, '<span class="syn-attr">$1</span>=<span class="syn-str">$2</span>')
            .replace(/([a-zA-Z0-9\-:]+)(?!=)/g, '<span class="syn-attr">$1</span>');
          return `${p1}<span class="syn-tag">${tag}</span>${highlightedAttrs}${p4}`;
        });
    }

    if (l === "css") {
      const safe = esc(code);
      return safe
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syn-com">$1</span>')
        .replace(/([^{}]+)\{/g, '<span class="syn-tag">$1</span>{')
        .replace(/([\w\-]+)(\s*:)/g, '<span class="syn-attr">$1</span>$2')
        .replace(/(:[^;{}]+)(;)/g, '<span class="syn-val">$1</span>$2')
        .replace(/#[0-9a-fA-F]{3,8}/g, '<span class="syn-num">$&</span>');
    }

    if (l === "json") {
      const safe = esc(code);
      return safe
        .replace(/("(\\[^]|[^\\"])*")(\s*:)/g, '<span class="syn-attr">$1</span>$3')
        .replace(/:\s*("(\\[^]|[^\\"])*")/g, ': <span class="syn-str">$1</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="syn-const">$1</span>')
        .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="syn-num">$1</span>');
    }

    // Collect all declared variables in the code
    const declaredVars = new Set();
    const varDeclRegex = /\b(?:const|let|var|int|float|double|char|long|short|auto|bool|boolean|string|String|Integer|Double|Float|Long|List|ArrayList|HashMap|Map|Set|HashSet)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    let vm;
    while ((vm = varDeclRegex.exec(code)) !== null) {
      declaredVars.add(vm[1]);
    }
    // Java/C#: Type varName  (PascalCase type followed by identifier)
    const javaTypeDeclRegex = /\b([A-Z][a-zA-Z0-9_]*)\s+([a-z_$][a-zA-Z0-9_$]*)\s*[=;,)]/g;
    while ((vm = javaTypeDeclRegex.exec(code)) !== null) {
      declaredVars.add(vm[2]);
    }
    const pyAssignRegex = /^[ \t]*([a-zA-Z_][a-zA-Z0-9_]*)\s*=[^=]/gm;
    while ((vm = pyAssignRegex.exec(code)) !== null) {
      declaredVars.add(vm[1]);
    }
    // Go: varName := value
    const goShortDeclRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*:=/g;
    while ((vm = goShortDeclRegex.exec(code)) !== null) {
      declaredVars.add(vm[1]);
    }
    // Ruby: @instance_var, @@class_var
    const rubyVarRegex = /@@?([a-zA-Z_][a-zA-Z0-9_]*)/g;
    while ((vm = rubyVarRegex.exec(code)) !== null) {
      declaredVars.add(vm[1]);
    }
    const paramRegex = /(?:function|\bdef|\bfunc|\bfn)\s+[a-zA-Z0-9_$]*\s*\(([^)]*)\)/g;
    while ((vm = paramRegex.exec(code)) !== null) {
      vm[1].split(",").map(p => p.trim().split(" ")[0].split(":")[0]).forEach(p => {
        if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p)) declaredVars.add(p);
      });
    }

    const stash = [];
    const saveToken = (html) => {
      stash.push(html);
      return `\uE000tk${stash.length - 1}\uE001`;
    };

    let res = code;

    // 1. Comments
    if (l === "py" || l === "sh" || l === "bash" || l === "yaml" || l === "yml") {
      res = res.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, (m) => saveToken(`<span class="syn-str">${esc(m)}</span>`));
      res = res.replace(/(#.*$)/gm, (m) => saveToken(`<span class="syn-com">${esc(m)}</span>`));
    } else {
      res = res.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => saveToken(`<span class="syn-com">${esc(m)}</span>`));
      res = res.replace(/(\/\/.*$)/gm, (m) => saveToken(`<span class="syn-com">${esc(m)}</span>`));
    }

    // 2. Strings
    res = res.replace(/(`[\s\S]*?`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, (m) => {
      return saveToken(`<span class="syn-str">${esc(m)}</span>`);
    });

    // 3. Escape HTML on remaining code
    res = esc(res);

    // 4. Properties (.prop)
    res = res.replace(/(\.)([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (m, dot, prop) => {
      return `${dot}${saveToken(`<span class="syn-prop">${prop}</span>`)}`;
    });

    // 5. Function calls & declarations
    res = res.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m, fn) => {
      return saveToken(`<span class="syn-func">${fn}</span>`);
    });

    // 6. Control Flow (purple)
    const ctrlKws = /\b(if|else|elif|elsif|for|foreach|while|do|switch|case|default|break|continue|return|try|catch|finally|throw|yield|await|async|pass|raise|except|with|unless|until|loop|match|when|rescue|ensure|begin|end|defer)\b/g;
    res = res.replace(ctrlKws, (m) => saveToken(`<span class="syn-ctrl">${m}</span>`));

    // 7. Types (teal)
    const typeKws = /\b(int|float|double|char|bool|boolean|string|void|size_t|long|short|unsigned|signed|byte|uint|int8|int16|int32|int64|uint8|uint16|uint32|uint64|float32|float64|rune|usize|isize|i8|i16|i32|i64|u8|u16|u32|u64|f32|f64|str|Vec|Box|Rc|Arc|Option|Result|Promise|Array|Object|Number|String|Boolean|Function|Map|Set|Symbol|any|unknown|never|auto|Integer|Float|Double|Long|Short|Byte|Char|Character|BigInteger|BigDecimal|List|ArrayList|HashMap|HashSet|LinkedList|TreeMap|TreeSet|Iterator|Iterable|Comparable|Serializable|Scanner|StringBuilder|StringBuffer|Date|Calendar|Math|System|Thread|Runnable|Override|Deprecated|SuppressWarnings)\b/g;
    res = res.replace(typeKws, (m) => saveToken(`<span class="syn-type">${m}</span>`));

    // 8. General keywords (blue)
    const generalKws = /\b(const|let|var|function|class|extends|new|this|typeof|instanceof|import|export|from|as|def|lambda|echo|local|print|println|printf|scanf|cin|cout|endl|puts|gets|require|include|public|private|protected|static|final|abstract|virtual|override|volatile|synchronized|native|transient|throws|implements|super|self|Self|struct|fn|mut|impl|use|mod|crate|pub|ref|unsafe|extern|where|trait|dyn|move|package|go|select|chan|interface|type|enum|module|class_method|attr_accessor|attr_reader|attr_writer|proc|block_given|given|nil|using|namespace|template|typename|constexpr|inline|register|extern|goto|sizeof|alignof|decltype|noexcept|nullptr|delete|friend|mutable|operator|explicit|virtual|override)\b/g;
    res = res.replace(generalKws, (m) => saveToken(`<span class="syn-kw">${m}</span>`));

    // 8b. Decorators / Annotations (@Decorator)
    res = res.replace(/@([a-zA-Z_][a-zA-Z0-9_]*)/g, (m) => saveToken(`<span class="syn-ann">${m}</span>`));

    // 9. Constants and Booleans (light blue)
    const constKws = /\b(true|false|null|undefined|NaN|Infinity|None|True|False|nil|NULL)\b/g;
    res = res.replace(constKws, (m) => saveToken(`<span class="syn-const">${m}</span>`));
    res = res.replace(/\b([A-Z_][A-Z0-9_]{2,})\b/g, (m) => saveToken(`<span class="syn-const">${m}</span>`));

    // 10. All identified variables across the file
    if (declaredVars.size > 0) {
      const reserved = /^(if|else|elif|elsif|for|foreach|while|do|switch|case|default|break|continue|return|try|catch|finally|throw|yield|await|async|pass|raise|except|with|unless|until|loop|match|when|rescue|ensure|begin|end|defer|int|float|double|char|bool|boolean|string|void|size_t|long|short|unsigned|auto|byte|Promise|Array|Object|Number|String|Boolean|Function|Map|Set|Symbol|any|unknown|never|const|let|var|function|class|extends|new|this|typeof|instanceof|import|export|from|as|def|lambda|echo|local|print|println|printf|scanf|cin|cout|endl|public|private|protected|static|final|abstract|struct|fn|mut|impl|use|mod|crate|pub|package|go|select|chan|interface|type|enum|module|self|super|true|false|null|undefined|None|True|False|nil|NULL|require|include|puts|gets|using|namespace|template|typename)$/;
      const validVars = Array.from(declaredVars).filter(v => !reserved.test(v));
      if (validVars.length > 0) {
        const vRegex = new RegExp(`\\b(${validVars.join("|")})\\b`, "g");
        res = res.replace(vRegex, (m) => saveToken(`<span class="syn-var">${m}</span>`));
      }
    }

    // 11. Numbers (light green)
    res = res.replace(/\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/gi, (m) => saveToken(`<span class="syn-num">${m}</span>`));

    // 12. Restore stashed tokens
    res = res.replace(/\uE000tk(\d+)\uE001/g, (m, idx) => stash[Number(idx)] || "");

    return res;
  }

  function getLangInfo(filename) {
    const ext = (filename || "").split(".").pop().toLowerCase();
    const map = {
      js: { name: "JavaScript", badge: "JS", color: "#f7df1e", text: "#000" },
      mjs: { name: "JavaScript", badge: "JS", color: "#f7df1e", text: "#000" },
      ts: { name: "TypeScript", badge: "TS", color: "#3178c6", text: "#fff" },
      html: { name: "HTML", badge: "HTML", color: "#e34f26", text: "#fff" },
      htm: { name: "HTML", badge: "HTML", color: "#e34f26", text: "#fff" },
      css: { name: "CSS", badge: "CSS", color: "#1572b6", text: "#fff" },
      py: { name: "Python", badge: "PY", color: "#3776ab", text: "#ffd43b" },
      json: { name: "JSON", badge: "{}", color: "#cbcb41", text: "#000" },
      c: { name: "C", badge: "C", color: "#555555", text: "#fff" },
      cpp: { name: "C++", badge: "C++", color: "#00599c", text: "#fff" },
      h: { name: "C Header", badge: "H", color: "#a074c4", text: "#fff" },
      java: { name: "Java", badge: "JAVA", color: "#b07219", text: "#fff" },
      rs: { name: "Rust", badge: "RS", color: "#dea584", text: "#000" },
      go: { name: "Go", badge: "GO", color: "#00add8", text: "#fff" },
      php: { name: "PHP", badge: "PHP", color: "#777bb4", text: "#fff" },
      sql: { name: "SQL", badge: "SQL", color: "#e38c00", text: "#fff" },
      sh: { name: "Bash", badge: "SH", color: "#4eaa25", text: "#fff" },
      bash: { name: "Bash", badge: "SH", color: "#4eaa25", text: "#fff" },
      md: { name: "Markdown", badge: "MD", color: "#083fa1", text: "#fff" },
      txt: { name: "Text", badge: "TXT", color: "#8a8a8a", text: "#fff" },
      png: { name: "PNG Image", badge: "IMG", color: "#a05a9c", text: "#fff" },
      jpg: { name: "JPEG Image", badge: "IMG", color: "#a05a9c", text: "#fff" },
      jpeg: { name: "JPEG Image", badge: "IMG", color: "#a05a9c", text: "#fff" },
      svg: { name: "SVG Image", badge: "SVG", color: "#ff9900", text: "#fff" },
      webp: { name: "WebP Image", badge: "IMG", color: "#a05a9c", text: "#fff" },
      gif: { name: "GIF Image", badge: "GIF", color: "#28a745", text: "#fff" }
    };
    return map[ext] || { name: ext.toUpperCase() || "Plain Text", badge: ext.slice(0, 4).toUpperCase() || "FILE", color: "#6e7681", text: "#fff" };
  }

  function buildVSCode(body, options = {}) {
    body.className = "window-body vscode-body";
    let activeFolder = options.folder || "/home/alex/workspace";
    fs.entries[activeFolder] ||= { type: "dir", modified: Date.now() };
    let selectedFolder = activeFolder;
    const collapsedFolders = new Set();
    let openFiles = [];
    let activeFilePath = null;
    const dirtyFiles = new Set();
    const fileContents = new Map();

    body.innerHTML = `
      <div class="vsc-workspace">
        <div class="vsc-activity-bar">
          <button class="vsc-activity-btn active" data-vsc-view="explorer" title="Explorer">${iconMarkup("files", 18)}</button>
          <button class="vsc-activity-btn" data-vsc-view="search" title="Search">${iconMarkup("search", 18)}</button>
          <button class="vsc-activity-btn" data-vsc-view="run" title="Run & Debug">${iconMarkup("play", 18)}</button>
          <div style="flex:1;"></div>
          <button class="vsc-activity-btn" data-vsc-view="settings" title="Settings">${iconMarkup("settings", 18)}</button>
        </div>

        <div class="vsc-sidebar">
          <div class="vsc-sidebar-header">
            <span class="vsc-sidebar-title">Explorer</span>
            <div class="vsc-sidebar-actions">
              <button class="vsc-tool-btn vsc-btn-new-file" title="New File">${iconMarkup("newfile", 14)}</button>
              <button class="vsc-tool-btn vsc-btn-new-folder" title="New Folder">${iconMarkup("newfolder", 14)}</button>
              <button class="vsc-tool-btn vsc-btn-add-file" title="Add / Import File or Image">${iconMarkup("download", 14)}</button>
              <button class="vsc-tool-btn vsc-btn-refresh" title="Refresh Explorer">${iconMarkup("recent", 14)}</button>
            </div>
          </div>
          <div class="vsc-tree"></div>
        </div>

        <div class="vsc-main-editor">
          <div class="vsc-tabs-bar"></div>
          <div class="vsc-breadcrumbs">
            <span class="vsc-breadcrumb-path">${escapeHtml(basename(activeFolder))}</span>
            <div class="vsc-editor-actions">
              <button class="vsc-action-btn primary vsc-btn-run" style="background:#238636;border-color:#2ea043;color:#fff;font-weight:600;" title="Run Code (F5 / Ctrl+Enter)">${iconMarkup("play", 12)} Run Code</button>
              <button class="vsc-action-btn primary vsc-btn-save">${iconMarkup("save", 12)} Save</button>
              <button class="vsc-action-btn vsc-btn-toggle-panel">${iconMarkup("terminal", 12)} Terminal</button>
            </div>
          </div>

          <div class="vsc-empty-state">
            ${iconMarkup("vscode", 56)}
            <h3>Visual Studio Code</h3>
            <p>Workspace is clean. Create a new folder, file, or add images to begin coding.</p>
            <div class="vsc-empty-actions">
              <button class="vsc-empty-btn vsc-empty-new-folder">${iconMarkup("newfolder", 14)} New Folder</button>
              <button class="vsc-empty-btn vsc-empty-new">${iconMarkup("newfile", 14)} New File</button>
              <button class="vsc-empty-btn vsc-empty-add">${iconMarkup("download", 14)} Add File / Image</button>
            </div>
          </div>

          <div class="vsc-editor-container" hidden>
            <div class="vsc-line-numbers">1</div>
            <div class="vsc-code-scroll">
              <pre class="vsc-highlighted"></pre>
              <textarea class="vsc-textarea" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>
            </div>
          </div>

          <div class="vsc-image-viewer" hidden>
            <img src="" alt="preview">
            <div class="vsc-img-bar">
              <span class="vsc-img-info">Image Preview</span>
              <button class="vsc-action-btn vsc-btn-img-wall">${iconMarkup("brightness", 12)} Set as Wallpaper</button>
            </div>
          </div>

          <div class="vsc-bottom-panel">
            <div class="vsc-panel-tabs">
              <button class="vsc-panel-tab active" data-ptab="terminal">TERMINAL</button>
              <button class="vsc-panel-tab" data-ptab="output">OUTPUT</button>
              <button class="vsc-panel-tab" data-ptab="problems">PROBLEMS (0)</button>
            </div>
            <div class="vsc-panel-body">Orbit Linux VS Code Terminal · Ready. Type 'help' to see commands.</div>
            <div class="vsc-panel-input-row">
              <span class="vsc-panel-prompt">alex@orbit:~$</span>
              <input class="vsc-panel-input" placeholder="Type shell command (e.g. ls, cat, python3, clear)...">
            </div>
          </div>
        </div>
      </div>

      <footer class="vsc-status-bar">
        <div class="vsc-status-left">
          <span class="vsc-status-item">${iconMarkup("code", 11)} main*</span>
          <span class="vsc-status-item" style="display:inline-flex;align-items:center;gap:4px;">${iconMarkup("warn", 11)} 0 0</span>
        </div>
        <div class="vsc-status-right">
          <span class="vsc-status-item vsc-status-pos">Ln 1, Col 1</span>
          <span class="vsc-status-item">Spaces: 2</span>
          <span class="vsc-status-item">UTF-8</span>
          <span class="vsc-status-item vsc-status-lang">Plain Text</span>
        </div>
      </footer>
    `;

    const treeContainer = body.querySelector(".vsc-tree");
    const tabsBar = body.querySelector(".vsc-tabs-bar");
    const breadcrumbPath = body.querySelector(".vsc-breadcrumb-path");
    const emptyState = body.querySelector(".vsc-empty-state");
    const editorContainer = body.querySelector(".vsc-editor-container");
    const imageViewer = body.querySelector(".vsc-image-viewer");
    const lineNumbers = body.querySelector(".vsc-line-numbers");
    const codeScroll = body.querySelector(".vsc-code-scroll");
    const highlighted = body.querySelector(".vsc-highlighted");
    const textarea = body.querySelector(".vsc-textarea");
    const statusPos = body.querySelector(".vsc-status-pos");
    const statusLang = body.querySelector(".vsc-status-lang");
    const bottomPanel = body.querySelector(".vsc-bottom-panel");
    const panelBody = body.querySelector(".vsc-panel-body");
    const panelInput = body.querySelector(".vsc-panel-input");

    function renderTree() {
      treeContainer.innerHTML = "";
      const rootItems = children(activeFolder);
      if (rootItems.length === 0) {
        treeContainer.innerHTML = `
          <div class="vsc-tree-empty-box" style="padding: 24px 14px; text-align: center; color: #858585; font-size: 11px;">
            <div style="margin-bottom: 8px; font-weight: 600; color: #cccccc; font-size: 12px;">Workspace is Empty</div>
            <p style="margin: 0 0 14px; font-size: 11px; line-height: 1.5; color: #8a8d9b;">Add folders, code files, or images to this project:</p>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              <button class="vsc-action-btn primary vsc-tree-btn-folder" style="justify-content: center; padding: 6px; font-size: 11.5px;">${iconMarkup("newfolder", 13)} New Folder</button>
              <button class="vsc-action-btn primary vsc-tree-btn-file" style="justify-content: center; padding: 6px; font-size: 11.5px;">${iconMarkup("newfile", 13)} New File</button>
              <button class="vsc-action-btn vsc-tree-btn-import" style="justify-content: center; padding: 6px; font-size: 11.5px; background: #262933; color: #eee; border: 1px solid #3d4150;">${iconMarkup("download", 13)} Add Files / Images</button>
            </div>
          </div>
        `;
        treeContainer.querySelector(".vsc-tree-btn-folder")?.addEventListener("click", () => promptNewFolder(selectedFolder));
        treeContainer.querySelector(".vsc-tree-btn-file")?.addEventListener("click", () => promptNewFile(selectedFolder));
        treeContainer.querySelector(".vsc-tree-btn-import")?.addEventListener("click", () => triggerImportInto(selectedFolder));
        return;
      }

      function walk(folderPath, level = 0) {
        const items = children(folderPath);
        items.forEach((itemPath) => {
          const isDir = fs.entries[itemPath]?.type === "dir";
          const isImg = fs.entries[itemPath]?.type === "image";
          const name = basename(itemPath);
          const isCollapsed = collapsedFolders.has(itemPath);
          const lang = getLangInfo(name);

          const div = document.createElement("div");
          const isSelected = selectedFolder === itemPath;
          div.className = `vsc-tree-item${activeFilePath === itemPath ? " active" : ""}${isSelected && isDir ? " selected-dir" : ""}`;
          div.style.paddingLeft = `${8 + level * 14}px`;
          div.title = itemPath;

          if (isDir) {
            div.innerHTML = `
              <span class="vsc-tree-arrow">${isCollapsed ? "▸" : "▾"}</span>
              <span class="vsc-file-icon">${iconMarkup("folder", 14)}</span>
              <span class="vsc-tree-name" style="flex:1; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(name)}</span>
              <span class="vsc-tree-quick-acts" style="display:flex; gap:2px; margin-left:auto; opacity:0.8;">
                <button class="vsc-tree-mini-act vsc-act-addfile" title="New file inside ${escapeHtml(name)}" style="background:transparent;border:0;color:#aaa;cursor:pointer;padding:1px 3px;">${iconMarkup("newfile", 11)}</button>
                <button class="vsc-tree-mini-act vsc-act-addfolder" title="New folder inside ${escapeHtml(name)}" style="background:transparent;border:0;color:#aaa;cursor:pointer;padding:1px 3px;">${iconMarkup("newfolder", 11)}</button>
                <button class="vsc-tree-mini-act vsc-act-addimg" title="Add file/image inside ${escapeHtml(name)}" style="background:transparent;border:0;color:#aaa;cursor:pointer;padding:1px 3px;">${iconMarkup("download", 11)}</button>
              </span>
            `;
            div.addEventListener("click", (e) => {
              e.stopPropagation();
              selectedFolder = itemPath;
              if (collapsedFolders.has(itemPath)) collapsedFolders.delete(itemPath);
              else collapsedFolders.add(itemPath);
              renderTree();
            });
            div.querySelector(".vsc-act-addfile")?.addEventListener("click", (e) => { e.stopPropagation(); selectedFolder = itemPath; promptNewFile(itemPath); });
            div.querySelector(".vsc-act-addfolder")?.addEventListener("click", (e) => { e.stopPropagation(); selectedFolder = itemPath; promptNewFolder(itemPath); });
            div.querySelector(".vsc-act-addimg")?.addEventListener("click", (e) => { e.stopPropagation(); selectedFolder = itemPath; triggerImportInto(itemPath); });
          } else {
            div.innerHTML = `<span class="vsc-tree-arrow"></span><span class="vsc-file-badge" style="background:${isImg ? '#28a745' : lang.color};color:${lang.text};">${isImg ? "IMG" : lang.badge}</span><span class="vsc-tree-name" style="flex:1; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(name)}</span>`;
            div.addEventListener("click", (e) => {
              e.stopPropagation();
              openTab(itemPath);
            });
          }

          div.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDir) selectedFolder = itemPath;
            showContextMenu([
              { label: "Open", icon: isDir ? "folder" : "code", action: () => isDir ? (collapsedFolders.delete(itemPath), renderTree()) : openTab(itemPath) },
              { label: "New File Here…", icon: "newfile", action: () => promptNewFile(isDir ? itemPath : parent(itemPath)) },
              { label: "New Folder Here…", icon: "newfolder", action: () => promptNewFolder(isDir ? itemPath : parent(itemPath)) },
              { label: "Add Image / File…", icon: "download", action: () => triggerImportInto(isDir ? itemPath : parent(itemPath)) },
              { separator: true },
              { label: "Copy Path", icon: "copy", action: () => { navigator.clipboard.writeText(itemPath); showToast("Path copied to clipboard!"); } },
              { label: "Properties", icon: "settings", action: () => showProperties(itemPath) },
              { label: "Delete", icon: "trash", danger: true, action: () => {
                showConfirmDialog(`Delete ${name}?`, `Are you sure you want to delete ${itemPath}?`, "Delete", () => {
                  permanentDelete(itemPath);
                  closeTab(itemPath);
                  renderTree();
                });
              }}
            ], e.clientX, e.clientY);
          });

          treeContainer.append(div);

          if (isDir && !isCollapsed) {
            walk(itemPath, level + 1);
          }
        });
      }
      walk(activeFolder, 0);
    }

    function renderTabs() {
      tabsBar.innerHTML = "";
      openFiles.forEach((p) => {
        const name = basename(p);
        const lang = getLangInfo(name);
        const isDirty = dirtyFiles.has(p);
        const tab = document.createElement("div");
        tab.className = `vsc-tab${activeFilePath === p ? " active" : ""}`;
        tab.innerHTML = `<span class="vsc-file-badge" style="background:${lang.color};color:${lang.text};">${lang.badge}</span><span>${escapeHtml(name)}</span>${isDirty ? '<span class="vsc-tab-dirty"></span>' : `<span class="vsc-tab-close" title="Close">×</span>`}`;
        tab.addEventListener("click", () => openTab(p));
        const closeBtn = tab.querySelector(".vsc-tab-close");
        if (closeBtn) {
          closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeTab(p);
          });
        }
        tabsBar.append(tab);
      });
    }

    function renderBreadcrumbs() {
      if (!activeFilePath) {
        breadcrumbPath.textContent = activeFolder;
        return;
      }
      const parts = activeFilePath.split("/").filter(Boolean);
      breadcrumbPath.textContent = parts.join(" > ");
    }

    function updateCursorPos() {
      const pos = textarea.selectionStart;
      const textVal = textarea.value;
      const lines = textVal.slice(0, pos).split("\n");
      const line = lines.length;
      const col = lines[lines.length - 1].length + 1;
      statusPos.textContent = `Ln ${line}, Col ${col}`;
    }

    function updateEditorHighlight() {
      const val = textarea.value;
      const ext = (activeFilePath || "").split(".").pop();
      highlighted.innerHTML = highlightSyntax(val, ext) + "\n";
      const count = val.split("\n").length;
      lineNumbers.innerHTML = Array.from({ length: count }, (_, i) => i + 1).join("<br>");
      updateCursorPos();
    }

    function loadCurrentFile() {
      if (!activeFilePath || !fs.entries[activeFilePath]) {
        emptyState.hidden = false;
        editorContainer.hidden = true;
        imageViewer.hidden = true;
        statusLang.textContent = "Plain Text";
        statusPos.textContent = "Ln 1, Col 1";
        return;
      }
      emptyState.hidden = true;
      const entry = fs.entries[activeFilePath];
      const name = basename(activeFilePath);
      const lang = getLangInfo(name);
      statusLang.textContent = lang.name;

      if (entry.type === "image") {
        editorContainer.hidden = true;
        imageViewer.hidden = false;
        const imgEl = imageViewer.querySelector("img");
        const src = imageSource(entry.content);
        imgEl.src = src;
        imgEl.onload = () => {
          imageViewer.querySelector(".vsc-img-info").textContent = `${imgEl.naturalWidth}×${imgEl.naturalHeight} · ${lang.name}`;
        };
        return;
      }

      imageViewer.hidden = true;
      editorContainer.hidden = false;
      const currentContent = dirtyFiles.has(activeFilePath) ? (fileContents.get(activeFilePath) ?? entry.content ?? "") : (entry.content ?? "");
      textarea.value = currentContent;
      updateEditorHighlight();
    }

    function openTab(path) {
      if (!fs.entries[path]) return;
      if (!openFiles.includes(path)) {
        openFiles.push(path);
      }
      activeFilePath = path;
      renderTabs();
      renderBreadcrumbs();
      loadCurrentFile();
      renderTree();
    }

    function closeTab(path) {
      const idx = openFiles.indexOf(path);
      if (idx !== -1) {
        openFiles.splice(idx, 1);
        dirtyFiles.delete(path);
        fileContents.delete(path);
        if (activeFilePath === path) {
          activeFilePath = openFiles[openFiles.length - 1] || null;
        }
        renderTabs();
        renderBreadcrumbs();
        loadCurrentFile();
        renderTree();
      }
    }

    function doSave() {
      if (!activeFilePath) return;
      const entry = fs.entries[activeFilePath];
      if (entry && entry.type !== "image") {
        fs.entries[activeFilePath] = {
          type: fileType(activeFilePath),
          content: textarea.value,
          modified: Date.now()
        };
        dirtyFiles.delete(activeFilePath);
        fileContents.delete(activeFilePath);
        persist();
        renderTabs();
        renderDesktopFiles();
        refreshFiles();
        showToast(`Saved ${basename(activeFilePath)}`);
      }
    }

    function promptNewFile(targetDir) {
      const dest = targetDir || selectedFolder || activeFolder;
      showInputDialog("New File", "File name with extension", "", "Create", (name) => {
        if (!name || !name.trim()) return;
        const cleanName = name.trim();
        const fullPath = cleanName.startsWith("/") ? cleanName : `${dest}/${cleanName}`;
        ensureDir(parent(fullPath));
        const targetPath = uniquePath(fullPath);
        fs.entries[targetPath] = { type: fileType(targetPath), content: "", modified: Date.now() };
        persist();
        renderTree();
        renderDesktopFiles();
        refreshFiles();
        openTab(targetPath);
      }, "e.g. main.py, index.html, script.js, style.css");
    }

    function promptNewFolder(targetDir) {
      const dest = targetDir || selectedFolder || activeFolder;
      showInputDialog("New Folder", "Folder name", "", "Create", (name) => {
        if (!name || !name.trim()) return;
        const cleanName = name.trim();
        const fullPath = cleanName.startsWith("/") ? cleanName : `${dest}/${cleanName}`;
        ensureDir(parent(fullPath));
        const targetPath = uniquePath(fullPath);
        fs.entries[targetPath] = { type: "dir", modified: Date.now() };
        persist();
        renderTree();
        renderDesktopFiles();
        refreshFiles();
      }, "e.g. src, assets, components");
    }

    function triggerImportInto(folder) {
      importFolder = folder || selectedFolder || activeFolder;
      const picker = document.getElementById("uploadInput");
      picker.value = "";
      picker.onchange = async () => {
        const files = [...picker.files];
        if (!files.length) return;
        for (const f of files) {
          const isImg = f.type.startsWith("image/") || /\.(svg|png|jpe?g|gif|webp|avif)$/i.test(f.name);
          const targetP = uniquePath(`${importFolder}/${basename(f.name)}`);
          const content = isImg ? await readAsDataUrl(f) : await f.text();
          fs.entries[targetP] = { type: isImg ? "image" : "text", content, modified: Date.now() };
          openTab(targetP);
        }
        persist();
        renderTree();
        renderDesktopFiles();
        refreshFiles();
        showToast(`Added ${files.length} file(s) to ${basename(importFolder)}`);
      };
      picker.click();
    }

    function runActiveCode() {
      doSave();
      if (!activeFilePath) {
        showToast("No active file to run");
        return;
      }
      const fname = basename(activeFilePath);
      const ext = fname.split(".").pop().toLowerCase();
      const code = textarea.value;

      bottomPanel.hidden = false;
      body.querySelectorAll(".vsc-panel-tab").forEach((t) => t.classList.toggle("active", t.dataset.ptab === "output"));
      body.querySelector(".vsc-panel-input-row").hidden = true;

      const timestamp = new Date().toLocaleTimeString();
      const lang = getLangInfo(fname).name;
      const header = `[Running ${fname} (${lang}) · ${timestamp}]\n`;
      const sep = "─".repeat(50) + "\n";

      if (ext === "html" || ext === "htm") {
        openWindow("browser", { path: activeFilePath });
        panelBody.textContent = `${header}${sep}[Web Live Server] Started at http://localhost:3000/${fname}\nOpened live document in Orbit Web Browser.\n${sep}[OK] Server preview active.\n`;
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "js" || ext === "mjs" || ext === "ts") {
        const logs = [];
        const customConsole = {
          log: (...args) => logs.push(args.map(a => typeof a === "object" && a !== null ? JSON.stringify(a, null, 2) : String(a)).join(" ")),
          info: (...args) => logs.push("[INFO] " + args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" ")),
          warn: (...args) => logs.push("[WARN] " + args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" ")),
          error: (...args) => logs.push("[ERROR] " + args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" ")),
          dir: (...args) => logs.push(args.map(a => JSON.stringify(a, null, 2)).join(" ")),
          table: (...args) => logs.push(args.map(a => JSON.stringify(a, null, 2)).join(" "))
        };
        const startT = performance.now();
        try {
          const runner = new Function("console", "require", code);
          const ret = runner(customConsole, () => ({}));
          const elapsed = (performance.now() - startT).toFixed(1);
          if (!logs.length && ret !== undefined) {
            logs.push(typeof ret === "object" ? JSON.stringify(ret, null, 2) : String(ret));
          }
          const outputText = logs.length ? logs.join("\n") + "\n" : "[Program executed with no output]\n";
          panelBody.textContent = `${header}> node ${fname}\n${sep}${outputText}${sep}[OK] Process exited with code 0 in ${elapsed}ms\n`;
        } catch (err) {
          panelBody.textContent = `${header}> node ${fname}\n${sep}${logs.length ? logs.join("\n") + "\n" : ""}[Error] ${err.name}: ${err.message}\n${sep}Process exited with code 1\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "py") {
        const startT = performance.now();
        const logs = [];
        const pyPrint = (...args) => {
          logs.push(args.map(a => {
            if (a === null) return "None";
            if (a === true) return "True";
            if (a === false) return "False";
            if (typeof a === "object" && a !== null) return JSON.stringify(a);
            return String(a);
          }).join(" "));
        };
        const pyRange = (start, stop, step = 1) => {
          if (stop === undefined) { stop = start; start = 0; }
          const res = [];
          if (step > 0) {
            for (let i = start; i < stop; i += step) res.push(i);
          } else {
            for (let i = start; i > stop; i += step) res.push(i);
          }
          return res;
        };
        const pyLen = (o) => (o ? (o.length ?? Object.keys(o).length) : 0);
        const pyInput = (msg) => {
          const answer = window.prompt(msg || "Python input:") ?? "";
          logs.push((msg || "") + answer);
          return answer;
        };
        const pyOs = {
          listdir: (p) => {
            const target = normalize(p || ".", "/home/alex/Desktop");
            return children(target).map((x) => basename(x));
          },
          getcwd: () => "/home/alex/Desktop",
          path: {
            join: (...args) => args.join("/").replace(/\/+/g, "/"),
            basename: (p) => basename(p),
            dirname: (p) => parent(p),
            exists: (p) => normalize(p, "/home/alex/Desktop") in fs.entries
          }
        };

        try {
          const rawLines = code.split("\n");
          const jsLines = [];
          const indentStack = [0];

          for (let rawLine of rawLines) {
            if (/^\s*#/.test(rawLine)) continue;
            if (!rawLine.trim()) continue;

            const indent = rawLine.match(/^(\s*)/)[0].length;
            let line = rawLine.trim();

            while (indent < indentStack[indentStack.length - 1]) {
              indentStack.pop();
              jsLines.push("}");
            }

            line = line.replace(/^(import\s+.*|from\s+.*)$/, "// $1");
            line = line.replace(/f(["'])(.*?)\1/g, (m, q, c) => "`" + c.replace(/\{([^}]+)\}/g, "${$1}") + "`");
            line = line.replace(/\bprint\s*\(/g, "pyPrint(");
            line = line.replace(/\binput\s*\(/g, "pyInput(");
            line = line.replace(/\blen\s*\(/g, "pyLen(");
            line = line.replace(/\brange\s*\(/g, "pyRange(");
            line = line.replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null");
            line = line.replace(/\band\b/g, "&&").replace(/\bor\b/g, "||").replace(/\bnot\b/g, "!");
            line = line.replace(/\babs\s*\(/g, "Math.abs(");
            line = line.replace(/\bmin\s*\(/g, "Math.min(");
            line = line.replace(/\bmax\s*\(/g, "Math.max(");

            if (/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/.test(line)) {
              line = line.replace(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/, "function $1($2) {");
              indentStack.push(indent + 1);
              jsLines.push(line);
              continue;
            }

            if (/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+(.*?)\s*:/.test(line)) {
              line = line.replace(/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+(.*?)\s*:/, "for (let $1 of $2) {");
              indentStack.push(indent + 1);
              jsLines.push(line);
              continue;
            }

            if (/^while\s+(.*?)\s*:/.test(line)) {
              line = line.replace(/^while\s+(.*?)\s*:/, "while ($1) {");
              indentStack.push(indent + 1);
              jsLines.push(line);
              continue;
            }

            if (/^if\s+(.*?)\s*:/.test(line)) {
              line = line.replace(/^if\s+(.*?)\s*:/, "if ($1) {");
              indentStack.push(indent + 1);
              jsLines.push(line);
              continue;
            }

            if (/^elif\s+(.*?)\s*:/.test(line)) {
              line = line.replace(/^elif\s+(.*?)\s*:/, "} else if ($1) {");
              jsLines.push(line);
              continue;
            }

            if (/^else\s*:/.test(line)) {
              line = "} else {";
              jsLines.push(line);
              continue;
            }

            if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*=[^=]/.test(line)) {
              line = "var " + line;
            }
            if (!line.endsWith(";") && !line.endsWith("{") && !line.endsWith("}")) {
              line += ";";
            }
            jsLines.push(line);
          }

          while (indentStack.length > 1) {
            indentStack.pop();
            jsLines.push("}");
          }

          const runner = new Function("pyPrint", "pyRange", "pyLen", "pyInput", "os", "math", jsLines.join("\n"));
          runner(pyPrint, pyRange, pyLen, pyInput, pyOs, Math);

          const elapsed = (performance.now() - startT).toFixed(1);
          const outputText = logs.length ? logs.join("\n") + "\n" : "[Program executed with no output]\n";
          panelBody.textContent = `${header}$ python3 ${fname}\n${sep}${outputText}${sep}[OK] Process completed successfully (exit code 0 in ${elapsed}ms)\n`;
        } catch (err) {
          panelBody.textContent = `${header}$ python3 ${fname}\n${sep}${logs.length ? logs.join("\n") + "\n" : ""}[Error] Python Error: ${err.message}\n${sep}Process exited with code 1\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "c" || ext === "cpp" || ext === "cc" || ext === "h") {
        const binName = fname.replace(/\.(c|cpp|cc|h)$/, "");
        const compiler = ext === "c" ? "gcc" : "g++";
        const startT = performance.now();
        const logs = [];
        const cPrintf = (fmt, ...args) => {
          let i = 0;
          let s = String(fmt).replace(/%[-+0 #]*[0-9]*\.?[0-9]*[hlLqjzt]*[diouxXeEfFgGaAcspn%]/g, (spec) => {
            if (spec === "%%") return "%";
            const val = args[i++];
            if (val === undefined) return "";
            if (spec.endsWith("d") || spec.endsWith("i")) return String(Math.trunc(Number(val)));
            if (spec.endsWith("f") || spec.endsWith("F")) { const prec = spec.match(/\.(\d+)/); return Number(val).toFixed(prec ? Number(prec[1]) : 6); }
            if (spec.endsWith("s")) return String(val);
            if (spec.endsWith("c")) return String.fromCharCode(Number(val));
            if (spec.endsWith("x")) return Math.trunc(Number(val)).toString(16);
            if (spec.endsWith("X")) return Math.trunc(Number(val)).toString(16).toUpperCase();
            if (spec.endsWith("o")) return Math.trunc(Number(val)).toString(8);
            return String(val);
          });
          s = s.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
          logs.push(s);
        };
        const cScanf = (fmt, ...refs) => {
          const answer = window.prompt(fmt ? `scanf("${fmt}") — Enter value(s) separated by spaces:` : "Enter input:") ?? "";
          const parts = answer.trim().split(/\s+/);
          logs.push(answer);
          return parts;
        };
        const cGets = (msg) => {
          const answer = window.prompt(msg || "Enter a line of text:") ?? "";
          logs.push(answer);
          return answer;
        };
        const cCout = {
          _buf: "",
          print(val) { if (val === "\n" || val === "endl") { logs.push(cCout._buf); cCout._buf = ""; } else { cCout._buf += String(val); } return cCout; },
          flush() { if (cCout._buf) { logs.push(cCout._buf); cCout._buf = ""; } }
        };
        const cCin = {
          read(prompt) {
            const answer = window.prompt(prompt || "cin >> Enter value:") ?? "";
            logs.push(answer);
            const num = Number(answer);
            return isNaN(num) ? answer : num;
          }
        };

        try {
          const mainMatch = code.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
          if (mainMatch) {
            let body = mainMatch[1];
            body = body.replace(/\bprintf\s*\(/g, "cPrintf(");
            body = body.replace(/\bscanf\s*\(/g, "cScanf(");
            body = body.replace(/\bgets\s*\(/g, "cGets(");
            // C++ cout << x << endl;
            body = body.replace(/\bcout\s*<<\s*/g, "cCout.print(");
            body = body.replace(/<<\s*/g, "); cCout.print(");
            body = body.replace(/\bcin\s*>>\s*([a-zA-Z_][a-zA-Z0-9_]*)/g, "$1 = cCin.read(\"Enter $1:\")");
            body = body.replace(/\b(int|float|double|char|long|short|auto|bool|unsigned|signed)\s+([a-zA-Z0-9_]+)/g, "var $2");
            body = body.replace(/\bstring\s+([a-zA-Z0-9_]+)/g, "var $1 = \"\"");
            body = body.replace(/\breturn\s+0\s*;/g, "");
            body = body.replace(/\bendl\b/g, "\"\\n\"");
            body = body.replace(/\bstd\s*::\s*/g, "");
            const runner = new Function("cPrintf", "cScanf", "cGets", "cCout", "cCin", body);
            runner(cPrintf, cScanf, cGets, cCout, cCin);
            cCout.flush();
          }
          const elapsed = (performance.now() - startT).toFixed(1);
          const out = logs.length ? logs.join("") + "\n" : "[Program executed with no output]\n";
          panelBody.textContent = `${header}$ ${compiler} -Wall -O2 ${fname} -o ${binName}\nCompilation finished: 0 errors, 0 warnings.\n$ ./${binName}\n${sep}${out}${sep}[OK] Process returned 0 (0x0)  execution time: ${elapsed}ms\n`;
        } catch (err) {
          panelBody.textContent = `${header}$ ${compiler} -Wall ${fname}\n${sep}[Error] Compilation error: ${err.message}\n${sep}Process exited with code 1\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "java") {
        const className = fname.replace(/\.java$/, "");
        const startT = performance.now();
        const logs = [];
        const javaPrintln = (...args) => logs.push(args.map(a => typeof a === "object" && a !== null ? JSON.stringify(a) : String(a)).join(" "));
        const javaPrint = (...args) => { const s = args.map(a => String(a)).join(" "); logs.push(s); };
        const javaPrintf = (fmt, ...args) => {
          let i = 0;
          let s = String(fmt).replace(/%[-+0 #]*[0-9]*\.?[0-9]*[diouxXeEfFgGsScn%]/g, (spec) => {
            if (spec === "%%") return "%";
            const val = args[i++];
            if (spec.endsWith("d") || spec.endsWith("i")) return String(Math.trunc(Number(val)));
            if (spec.endsWith("f") || spec.endsWith("F")) { const prec = spec.match(/\.(\d+)/); return Number(val).toFixed(prec ? Number(prec[1]) : 6); }
            if (spec.endsWith("s") || spec.endsWith("S")) return String(val);
            return String(val ?? "");
          });
          s = s.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
          logs.push(s);
        };
        const javaScanner = {
          nextLine() { return window.prompt("Scanner: Enter a line") ?? ""; },
          nextInt() { return parseInt(window.prompt("Scanner: Enter an integer") ?? "0", 10); },
          nextDouble() { return parseFloat(window.prompt("Scanner: Enter a double") ?? "0"); },
          next() { return window.prompt("Scanner: Enter a word") ?? ""; },
          nextFloat() { return parseFloat(window.prompt("Scanner: Enter a float") ?? "0"); }
        };

        try {
          const mainMatch = code.match(/(?:public\s+)?static\s+void\s+main\s*\([^)]*\)\s*(?:throws\s+\w+\s*)?\{([\s\S]*)\}\s*\}/);
          if (mainMatch) {
            let body = mainMatch[1];
            body = body.replace(/System\.out\.println\s*\(/g, "javaPrintln(");
            body = body.replace(/System\.out\.print\s*\(/g, "javaPrint(");
            body = body.replace(/System\.out\.printf\s*\(/g, "javaPrintf(");
            body = body.replace(/new\s+Scanner\s*\(System\.in\)/g, "javaScanner");
            body = body.replace(/\b(int|float|double|char|long|short|boolean|byte)\s+([a-zA-Z0-9_]+)/g, "var $2");
            body = body.replace(/\bString\s+([a-zA-Z0-9_]+)/g, "var $1");
            body = body.replace(/\b(Scanner|ArrayList|HashMap|List|Map|Set|HashSet)\s*(<[^>]*>)?\s+([a-zA-Z0-9_]+)/g, "var $3");
            body = body.replace(/\bnew\s+ArrayList\s*(<[^>]*>)?\s*\(\)/g, "[]");
            body = body.replace(/\bnew\s+HashMap\s*(<[^>]*>)?\s*\(\)/g, "{}");
            body = body.replace(/\breturn\s*;/g, "");
            body = body.replace(/\+\s*\"\s*\+/g, "+");
            const runner = new Function("javaPrintln", "javaPrint", "javaPrintf", "javaScanner", body);
            runner(javaPrintln, javaPrint, javaPrintf, javaScanner);
          }
          const elapsed = (performance.now() - startT).toFixed(1);
          const out = logs.length ? logs.join("\n") + "\n" : "[Program executed with no output]\n";
          panelBody.textContent = `${header}$ javac ${fname}\nCompilation successful.\n$ java ${className}\n${sep}${out}${sep}[OK] Process completed in ${elapsed}ms\n`;
        } catch (err) {
          panelBody.textContent = `${header}$ javac ${fname}\n${sep}[Error] Java Error: ${err.message}\n${sep}Process exited with code 1\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "rb") {
        const startT = performance.now();
        const logs = [];
        const rubyPuts = (...args) => logs.push(args.map(a => String(a)).join(" "));
        const rubyGets = (msg) => { const answer = window.prompt(msg || "Ruby gets:") ?? ""; logs.push(answer); return answer; };
        try {
          let body = code;
          body = body.replace(/\bputs\s+/g, "rubyPuts(").replace(/\bputs\(/g, "rubyPuts(");
          body = body.replace(/\bp\s+/g, "rubyPuts(");
          body = body.replace(/\bgets\.chomp/g, "rubyGets()");
          body = body.replace(/\bgets/g, "rubyGets()");
          body = body.replace(/\.to_i/g, ") | 0");
          body = body.replace(/\.to_f/g, ") * 1.0");
          body = body.replace(/\.to_s/g, ").toString()");
          const runner = new Function("rubyPuts", "rubyGets", body);
          runner(rubyPuts, rubyGets);
          const elapsed = (performance.now() - startT).toFixed(1);
          const out = logs.length ? logs.join("\n") + "\n" : "[Program executed with no output]\n";
          panelBody.textContent = `${header}$ ruby ${fname}\n${sep}${out}${sep}[OK] Process completed in ${elapsed}ms\n`;
        } catch (err) {
          panelBody.textContent = `${header}$ ruby ${fname}\n${sep}[Error] Ruby Error: ${err.message}\n${sep}Process exited with code 1\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "php") {
        const startT = performance.now();
        const logs = [];
        const phpEcho = (...args) => logs.push(args.map(a => String(a)).join(""));
        try {
          let body = code.replace(/<\?php/g, "").replace(/\?>/g, "");
          body = body.replace(/\becho\s+/g, "phpEcho(");
          body = body.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, "$$$1");
          const runner = new Function("phpEcho", body);
          runner(phpEcho);
          const elapsed = (performance.now() - startT).toFixed(1);
          const out = logs.length ? logs.join("") + "\n" : "[Program executed with no output]\n";
          panelBody.textContent = `${header}$ php ${fname}\n${sep}${out}${sep}[OK] Process completed in ${elapsed}ms\n`;
        } catch (err) {
          panelBody.textContent = `${header}$ php ${fname}\n${sep}[Error] PHP Error: ${err.message}\n${sep}Process exited with code 1\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "sh" || ext === "bash") {
        const lines = code.split("\n");
        const logs = [];
        for (let l of lines) {
          const trimmed = l.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          logs.push(`$ ${trimmed}`);
        }
        panelBody.textContent = `${header}$ bash ${fname}\n${sep}${logs.join("\n")}\n${sep}[OK] Script completed successfully. Exit code: 0\n`;
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "json") {
        try {
          const parsed = JSON.parse(code);
          const keysCount = Object.keys(parsed).length;
          panelBody.textContent = `${header}${sep}[OK] Valid JSON syntax!\nParsed structure with ${keysCount} root keys/elements.\nFormatted preview:\n${JSON.stringify(parsed, null, 2).slice(0, 500)}\n${sep}Status: Ready\n`;
        } catch (err) {
          panelBody.textContent = `${header}${sep}[Error] Invalid JSON Syntax!\n${err.message}\n${sep}Status: Syntax Error\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "css") {
        panelBody.textContent = `${header}${sep}[OK] Stylesheet syntax verified.\nReady for web preview in browser.\n${sep}Status: OK\n`;
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      if (ext === "md") {
        panelBody.textContent = `${header}${sep}[OK] Markdown document compiled.\nLength: ${code.length} characters, ${code.split('\n').length} lines.\n${sep}Status: OK\n`;
        panelBody.scrollTop = panelBody.scrollHeight;
        return;
      }

      panelBody.textContent = `${header}${sep}[Orbit Environment] Executing ${fname}...\nFinished.\n${sep}[OK] Process exited with code 0\n`;
      panelBody.scrollTop = panelBody.scrollHeight;
    }

    textarea.addEventListener("input", () => {
      if (activeFilePath) {
        fileContents.set(activeFilePath, textarea.value);
        if (!dirtyFiles.has(activeFilePath)) {
          dirtyFiles.add(activeFilePath);
          renderTabs();
        }
      }
      updateEditorHighlight();
    });

    textarea.addEventListener("selectionchange", updateCursorPos);
    textarea.addEventListener("click", updateCursorPos);
    textarea.addEventListener("keyup", updateCursorPos);

    codeScroll.addEventListener("scroll", () => {
      lineNumbers.scrollTop = codeScroll.scrollTop;
    });
    textarea.addEventListener("scroll", () => {
      codeScroll.scrollTop = textarea.scrollTop;
      codeScroll.scrollLeft = textarea.scrollLeft;
      lineNumbers.scrollTop = textarea.scrollTop;
    });

    textarea.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        doSave();
      } else if (e.key === "Tab") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "  " + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        textarea.dispatchEvent(new Event("input"));
      } else if (e.key === "F5" || ((e.ctrlKey || e.metaKey) && e.key === "Enter")) {
        e.preventDefault();
        runActiveCode();
      }
    });

    body.querySelector(".vsc-btn-run").addEventListener("click", runActiveCode);
    body.querySelector(".vsc-btn-save").addEventListener("click", doSave);
    const vscBrowserBtn = body.querySelector(".vsc-btn-run-browser");
    if (vscBrowserBtn) {
      vscBrowserBtn.addEventListener("click", () => {
        doSave();
        if (activeFilePath) openWindow("editor", { path: activeFilePath });
      });
    }
    body.querySelector(".vsc-btn-toggle-panel").addEventListener("click", () => {
      bottomPanel.hidden = !bottomPanel.hidden;
    });

    body.querySelector(".vsc-btn-new-file").addEventListener("click", () => promptNewFile(selectedFolder));
    body.querySelector(".vsc-btn-new-folder").addEventListener("click", () => promptNewFolder(selectedFolder));
    body.querySelector(".vsc-btn-add-file").addEventListener("click", () => triggerImportInto(selectedFolder));
    body.querySelector(".vsc-btn-refresh").addEventListener("click", () => {
      renderTree();
      showToast("Explorer refreshed");
    });

    body.querySelector(".vsc-empty-new-folder")?.addEventListener("click", () => promptNewFolder(selectedFolder));
    body.querySelector(".vsc-empty-new")?.addEventListener("click", () => promptNewFile(selectedFolder));
    body.querySelector(".vsc-empty-add")?.addEventListener("click", () => triggerImportInto(selectedFolder));

    imageViewer.querySelector(".vsc-btn-img-wall").addEventListener("click", () => {
      if (activeFilePath && fs.entries[activeFilePath]?.type === "image") {
        setAsWallpaper(fs.entries[activeFilePath].content);
      }
    });

    body.querySelectorAll(".vsc-panel-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        body.querySelectorAll(".vsc-panel-tab").forEach((t) => t.classList.toggle("active", t === tab));
        const ptab = tab.dataset.ptab;
        if (ptab === "terminal") {
          panelBody.textContent = "Orbit Linux VS Code Terminal · Ready.\n";
          body.querySelector(".vsc-panel-input-row").hidden = false;
        } else if (ptab === "output") {
          panelBody.textContent = "[Orbit Build Output] 0 errors, 0 warnings. Workspace compiled successfully.\n";
          body.querySelector(".vsc-panel-input-row").hidden = true;
        } else if (ptab === "problems") {
          panelBody.textContent = "No problems have been detected in the workspace.\n";
          body.querySelector(".vsc-panel-input-row").hidden = true;
        }
      });
    });

    panelInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = panelInput.value.trim();
        if (!val) return;
        panelInput.value = "";
        panelBody.textContent += `\nalex@orbit:~$ ${val}\n`;
        if (val === "clear") {
          panelBody.textContent = "Orbit Linux VS Code Terminal · Ready.\n";
          return;
        }
        if (val.startsWith("python") || val.startsWith("python3")) {
          const parts = val.split(" ");
          const file = parts[1];
          const targetP = file ? normalize(file, activeFolder) : null;
          if (targetP && fs.entries[targetP]) {
            panelBody.textContent += `[Python 3.11.2]\nRunning ${basename(targetP)}...\nHello from Orbit Linux!\n`;
          } else {
            panelBody.textContent += `Python 3.11.2 (Orbit Linux)\nType "help" for more information.\n`;
          }
        } else if (val.startsWith("node")) {
          panelBody.textContent += `[Node.js v20.10.0]\nScript executed successfully.\n`;
        } else if (val.startsWith("ls")) {
          const names = children(activeFolder).map(p => basename(p) + (fs.entries[p].type === "dir" ? "/" : ""));
          panelBody.textContent += names.join("  ") + "\n";
        } else if (val.startsWith("cat ")) {
          const targetP = normalize(val.split(" ")[1], activeFolder);
          panelBody.textContent += (fs.entries[targetP]?.content || `cat: file not found`) + "\n";
        } else if (val === "pwd") {
          panelBody.textContent += activeFolder + "\n";
        } else if (val === "help") {
          panelBody.textContent += "Available commands: python3, node, ls, cat, pwd, clear, help\n";
        } else {
          panelBody.textContent += `${val}: command executed.\n`;
        }
        panelBody.scrollTop = panelBody.scrollHeight;
      }
    });

    const emptyNewBtn = body.querySelector(".vsc-empty-new");
    if (emptyNewBtn) emptyNewBtn.addEventListener("click", () => promptNewFile(activeFolder));
    const emptyAddBtn = body.querySelector(".vsc-empty-add");
    if (emptyAddBtn) emptyAddBtn.addEventListener("click", () => triggerImportInto(activeFolder));

    if (options.path && fs.entries[options.path]) {
      openTab(options.path);
    } else {
      activeFilePath = null;
      renderTabs();
      renderBreadcrumbs();
      loadCurrentFile();
    }
    renderTree();
  }

  function buildJupyter(body, options = {}) {
    body.className = "window-body jupyter-body";

    // Procedural Art Generator for Computer Vision & Image Processing
    function drawProceduralArt(ctx, width, height) {
      const grad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
      grad.addColorStop(0, "#2c1654");
      grad.addColorStop(0.35, "#7a285d");
      grad.addColorStop(0.7, "#de5b3c");
      grad.addColorStop(1, "#fca34d");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height * 0.7);

      const sunGrad = ctx.createRadialGradient(width * 0.7, height * 0.35, 5, width * 0.7, height * 0.35, 60);
      sunGrad.addColorStop(0, "#fff5cc");
      sunGrad.addColorStop(0.3, "#ffd166");
      sunGrad.addColorStop(1, "rgba(255, 209, 102, 0)");
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(width * 0.7, height * 0.35, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#4a1c4b";
      ctx.beginPath();
      ctx.moveTo(0, height * 0.55);
      ctx.lineTo(width * 0.2, height * 0.38);
      ctx.lineTo(width * 0.45, height * 0.48);
      ctx.lineTo(width * 0.7, height * 0.32);
      ctx.lineTo(width * 0.9, height * 0.45);
      ctx.lineTo(width, height * 0.4);
      ctx.lineTo(width, height * 0.7);
      ctx.lineTo(0, height * 0.7);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#1e1333";
      ctx.beginPath();
      ctx.moveTo(0, height * 0.65);
      ctx.lineTo(width * 0.28, height * 0.46);
      ctx.lineTo(width * 0.52, height * 0.58);
      ctx.lineTo(width * 0.8, height * 0.42);
      ctx.lineTo(width, height * 0.6);
      ctx.lineTo(width, height * 0.7);
      ctx.lineTo(0, height * 0.7);
      ctx.closePath();
      ctx.fill();

      const waterGrad = ctx.createLinearGradient(0, height * 0.7, 0, height);
      waterGrad.addColorStop(0, "#191c36");
      waterGrad.addColorStop(0.5, "#101326");
      waterGrad.addColorStop(1, "#0a0c18");
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      ctx.fillStyle = "rgba(255, 209, 102, 0.25)";
      for (let i = 0; i < 7; i++) {
        const y = height * 0.73 + i * 14;
        const w = 40 + i * 22;
        ctx.fillRect(width * 0.7 - w / 2, y, w, 3);
      }

      ctx.fillStyle = "#0d0917";
      const treePositions = [0.08, 0.14, 0.22, 0.88, 0.94];
      treePositions.forEach((pos) => {
        const tx = width * pos;
        const ty = height * 0.71;
        const th = 55 + Math.sin(pos * 10) * 15;
        ctx.fillRect(tx - 2, ty - 10, 4, 15);
        for (let l = 0; l < 3; l++) {
          ctx.beginPath();
          const ly = ty - 10 - l * (th / 3);
          const lw = 22 - l * 5;
          ctx.moveTo(tx, ly - (th / 3));
          ctx.lineTo(tx - lw, ly);
          ctx.lineTo(tx + lw, ly);
          ctx.closePath();
          ctx.fill();
        }
      });

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "bold 11px monospace";
      ctx.fillText("Orbit Linux · Python Vision Test Pattern", 12, height - 12);
    }

    function drawArtForEntry(ctx, width, height, path) {
      const p = (path || "").toLowerCase();
      if (p.includes("wallpaper")) {
        const g = ctx.createLinearGradient(0, 0, width, height);
        g.addColorStop(0, "#141c35");
        g.addColorStop(0.5, "#392b6a");
        g.addColorStop(1, "#674b9a");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);

        const rad = ctx.createRadialGradient(width * 0.65, height * 0.35, 10, width * 0.65, height * 0.35, 140);
        rad.addColorStop(0, "rgba(200, 180, 255, 0.9)");
        rad.addColorStop(1, "rgba(156, 134, 255, 0)");
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(width * 0.65, height * 0.35, 140, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#111a2b";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.8);
        ctx.quadraticCurveTo(width * 0.25, height * 0.5, width * 0.5, height * 0.75);
        ctx.quadraticCurveTo(width * 0.75, height * 0.95, width, height * 0.65);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      } else if (p.includes("orbit")) {
        const g = ctx.createLinearGradient(0, 0, width, height);
        g.addColorStop(0, "#452c85");
        g.addColorStop(1, "#1d88a5");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);

        const pg = ctx.createRadialGradient(width * 0.5, height * 0.5, 15, width * 0.5, height * 0.5, 75);
        pg.addColorStop(0, "#ffd89d");
        pg.addColorStop(0.7, "#b5a3ff");
        pg.addColorStop(1, "#2c1d5b");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.5, 75, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(width * 0.5, height * 0.5);
        ctx.rotate(-0.4);
        ctx.strokeStyle = "rgba(220, 210, 255, 0.85)";
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.ellipse(0, 0, 130, 42, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      } else if (p.includes("mountains")) {
        const g = ctx.createLinearGradient(0, 0, 0, height);
        g.addColorStop(0, "#273e72");
        g.addColorStop(0.55, "#e98c86");
        g.addColorStop(1, "#ffd89d");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#fff3cc";
        ctx.beginPath();
        ctx.arc(width * 0.75, height * 0.3, 38, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#333b66";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.6);
        ctx.lineTo(width * 0.28, height * 0.25);
        ctx.lineTo(width * 0.55, height * 0.55);
        ctx.lineTo(width * 0.75, height * 0.32);
        ctx.lineTo(width, height * 0.65);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#182a43";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.72);
        ctx.lineTo(width * 0.35, height * 0.45);
        ctx.lineTo(width * 0.65, height * 0.7);
        ctx.lineTo(width, height * 0.52);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      } else if (p.includes("sample") || p.includes("shape") || p.includes("test") || p.includes("lenna")) {
        ctx.fillStyle = "#1e2230";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
        for (let y = 0; y < height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

        const cx = width * 0.32, cy = height * 0.5;
        const colors = ["#ef4444", "#f97316", "#eab308", "#10b981", "#06b6d4", "#6366f1", "#a855f7"];
        for (let r = 85, i = 0; r >= 15; r -= 10, i++) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fillStyle = colors[i % colors.length];
          ctx.fill();
        }

        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(width * 0.62, height * 0.22, 100, 70);
        ctx.fillStyle = "#ec4899";
        ctx.fillRect(width * 0.72, height * 0.52, 80, 80);

        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.moveTo(width * 0.62, height * 0.85);
        ctx.lineTo(width * 0.52, height * 0.62);
        ctx.lineTo(width * 0.72, height * 0.62);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText("Computer Vision Calibration Pattern", 20, 26);
      } else if (p.includes("car") || p.includes("vehicle") || p.includes("auto")) {
        const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
        sky.addColorStop(0, "#0f172a");
        sky.addColorStop(1, "#f97316");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.62, 45, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#1e293b";
        ctx.beginPath();
        ctx.moveTo(width * 0.42, height * 0.68);
        ctx.lineTo(width * 0.58, height * 0.68);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#020617";
        const rx = width * 0.5, ry = height * 0.78;
        ctx.fillRect(rx - 55, ry - 14, 110, 28);
        ctx.fillRect(rx - 32, ry - 30, 64, 18);
        ctx.fillStyle = "#fde047";
        ctx.fillRect(rx - 48, ry - 4, 14, 8);
        ctx.fillRect(rx + 34, ry - 4, 14, 8);
      } else if (p.includes("nature") || p.includes("flower") || p.includes("tree")) {
        drawProceduralArt(ctx, width, height);
      } else {
        drawProceduralArt(ctx, width, height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
        ctx.fillRect(10, 10, width - 20, 26);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px monospace";
        ctx.fillText(basename(path) || "Image Asset", 18, 27);
      }
    }

    // Render Matplotlib Plots
    function renderPltFigure(pState) {
      const canvas = document.createElement("canvas");
      const [w, h] = pState._figsize || [780, 390];

      // Handle Subplots (e.g. plt.subplot(1, 2, 1), plt.subplot(1, 2, 2))
      if (pState._subplots && pState._subplots.length > 0) {
        let maxCols = 1, maxRows = 1;
        pState._subplots.forEach((sp) => {
          if (sp.ncols > maxCols) maxCols = sp.ncols;
          if (sp.nrows > maxRows) maxRows = sp.nrows;
        });

        canvas.width = Math.min(1080, Math.max(560, w || (maxCols * 420)));
        canvas.height = Math.min(680, Math.max(280, h || (maxRows * 360)));
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const padX = 24, padY = 24, gapX = 28, gapY = 24;
        const totalGapX = (maxCols - 1) * gapX;
        const totalGapY = (maxRows - 1) * gapY;
        const slotW = (canvas.width - padX * 2 - totalGapX) / maxCols;
        const slotH = (canvas.height - padY * 2 - totalGapY) / maxRows;

        pState._subplots.forEach((sp) => {
          const r = Math.floor((sp.index - 1) / maxCols);
          const c = (sp.index - 1) % maxCols;
          const sx = padX + c * (slotW + gapX);
          const sy = padY + r * (slotH + gapY);

          let titleOffset = 0;
          if (sp.title) {
            titleOffset = 26;
            ctx.fillStyle = "#111827";
            ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(sp.title, sx + slotW / 2, sy + 18);
          }

          const drawAreaY = sy + titleOffset;
          const drawAreaH = Math.max(20, slotH - titleOffset);

          let imgData = sp.imshowData;
          if (imgData) {
            if (imgData && !imgData.canvas && typeof Image !== "undefined" && Image.fromarray) {
              imgData = Image.fromarray(imgData);
            }
            if (imgData && imgData.canvas) {
              let imgCanvas = imgData.canvas;
              if (sp.cmap === "gray" && imgData.filter) {
                const grayImg = imgData.filter("grayscale");
                imgCanvas = grayImg.canvas;
              }
              const scale = Math.min(slotW / imgCanvas.width, drawAreaH / imgCanvas.height);
              const dw = imgCanvas.width * scale;
              const dh = imgCanvas.height * scale;
              const dx = sx + (slotW - dw) / 2;
              const dy = drawAreaY + (drawAreaH - dh) / 2;

              ctx.drawImage(imgCanvas, dx, dy, dw, dh);

              if (sp.axis !== "off") {
                ctx.strokeStyle = "#cbd5e1";
                ctx.lineWidth = 1;
                ctx.strokeRect(dx, dy, dw, dh);
              }
            }
          }
        });

        if (pState._title) {
          ctx.fillStyle = "#111827";
          ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(pState._title, canvas.width / 2, 22);
        }

        return canvas;
      }

      canvas.width = Math.min(840, Math.max(380, w));
      canvas.height = Math.min(480, Math.max(220, h));
      const ctx = canvas.getContext("2d");

      const imshowPlot = pState._plots.find((p) => p.type === "imshow");
      if (imshowPlot) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const padLeft = 40, padRight = 40, padTop = pState._title ? 38 : 20, padBottom = 20;
        const plotW = canvas.width - padLeft - padRight;
        const plotH = canvas.height - padTop - padBottom;

        let data = imshowPlot.data;
        if (data && !data.canvas && typeof Image !== "undefined" && Image.fromarray) {
          data = Image.fromarray(data);
        }
        if (data && data.canvas) {
          let drawCanvas = data.canvas;
          if (imshowPlot.cmap === "gray" && data.filter) {
            drawCanvas = data.filter("grayscale").canvas;
          }
          const scale = Math.min(plotW / drawCanvas.width, plotH / drawCanvas.height);
          const dw = drawCanvas.width * scale;
          const dh = drawCanvas.height * scale;
          const dx = padLeft + (plotW - dw) / 2;
          const dy = padTop + (plotH - dh) / 2;
          ctx.drawImage(drawCanvas, dx, dy, dw, dh);
        }
        if (pState._title) {
          ctx.fillStyle = "#111827";
          ctx.font = "bold 14px -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(pState._title, canvas.width / 2, 22);
        }
        return canvas;
      }

      ctx.fillStyle = "#12131a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const padLeft = 60, padRight = 30, padTop = 38, padBottom = 42;
      const plotW = canvas.width - padLeft - padRight;
      const plotH = canvas.height - padTop - padBottom;

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      pState._plots.forEach((p) => {
        if (p.x && p.y) {
          for (let i = 0; i < p.x.length; i++) {
            const vx = Number(p.x[i]) || 0;
            const vy = Number(p.y[i]) || 0;
            if (vx < minX) minX = vx;
            if (vx > maxX) maxX = vx;
            if (vy < minY) minY = vy;
            if (vy > maxY) maxY = vy;
          }
        }
      });

      if (minX === Infinity || minX === maxX) { minX = 0; maxX = 10; }
      if (minY === Infinity || minY === maxY) { minY = 0; maxY = 10; }
      const yMargin = (maxY - minY) * 0.1 || 1;
      minY -= yMargin;
      maxY += yMargin;

      const toCanvasX = (vx) => padLeft + ((vx - minX) / (maxX - minX)) * plotW;
      const toCanvasY = (vy) => padTop + plotH - ((vy - minY) / (maxY - minY)) * plotH;

      if (pState._grid) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 6; i++) {
          const cx = padLeft + (i / 6) * plotW;
          ctx.beginPath(); ctx.moveTo(cx, padTop); ctx.lineTo(cx, padTop + plotH); ctx.stroke();
        }
        for (let i = 0; i <= 5; i++) {
          const cy = padTop + (i / 5) * plotH;
          ctx.beginPath(); ctx.moveTo(padLeft, cy); ctx.lineTo(padLeft + plotW, cy); ctx.stroke();
        }
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(padLeft, padTop);
      ctx.lineTo(padLeft, padTop + plotH);
      ctx.lineTo(padLeft + plotW, padTop + plotH);
      ctx.stroke();

      ctx.fillStyle = "#9ca3af";
      ctx.font = "10.5px monospace";
      ctx.textAlign = "center";
      for (let i = 0; i <= 5; i++) {
        const xVal = minX + (i / 5) * (maxX - minX);
        const cx = toCanvasX(xVal);
        ctx.fillText(xVal.toFixed(1), cx, padTop + plotH + 16);
      }
      ctx.textAlign = "right";
      for (let i = 0; i <= 4; i++) {
        const yVal = minY + (i / 4) * (maxY - minY);
        const cy = toCanvasY(yVal);
        ctx.fillText(yVal.toFixed(1), padLeft - 8, cy + 3.5);
      }

      pState._plots.forEach((plot) => {
        ctx.strokeStyle = plot.color || "#00c3ff";
        ctx.fillStyle = plot.color || "#00c3ff";

        if (plot.type === "line") {
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          for (let i = 0; i < plot.x.length; i++) {
            const cx = toCanvasX(plot.x[i]);
            const cy = toCanvasY(plot.y[i]);
            if (i === 0) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
          }
          ctx.stroke();
        } else if (plot.type === "scatter") {
          for (let i = 0; i < plot.x.length; i++) {
            const cx = toCanvasX(plot.x[i]);
            const cy = toCanvasY(plot.y[i]);
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (plot.type === "bar") {
          const barW = Math.max(6, (plotW / (plot.x.length || 1)) * 0.65);
          for (let i = 0; i < plot.x.length; i++) {
            const cx = toCanvasX(plot.x[i]);
            const cy = toCanvasY(plot.y[i]);
            const baselineY = toCanvasY(Math.max(0, minY));
            const bh = baselineY - cy;
            ctx.fillRect(cx - barW / 2, cy, barW, bh);
          }
        }
      });

      if (pState._title) {
        ctx.fillStyle = "#f9fafb";
        ctx.font = "bold 13px -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(pState._title, canvas.width / 2, 22);
      }
      if (pState._xlabel) {
        ctx.fillStyle = "#9ca3af";
        ctx.font = "11px -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(pState._xlabel, padLeft + plotW / 2, canvas.height - 8);
      }
      if (pState._ylabel) {
        ctx.save();
        ctx.translate(16, padTop + plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = "#9ca3af";
        ctx.font = "11px -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(pState._ylabel, 0, 0);
        ctx.restore();
      }

      return canvas;
    }

    function renderMarkdown(md) {
      if (!md) return "";
      let html = escapeHtml(md);
      html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
      html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
      html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
      html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
      html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
      html = html.replace(/`([^`]+)`/gim, "<code>$1</code>");
      html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
      html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");
      html = html.replace(/\n\n/gim, "<p></p>");
      return html;
    }

    // Set up UI structure
    body.innerHTML = `
      <div class="jp-header">
        <div class="jp-header-left">
          <div class="jp-logo">
            <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;color:#f37626;"><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 0-9.5 7"/><path d="M12 22a10 10 0 0 1-9.5-7"/><circle cx="19" cy="5" r="1.5" fill="#f37626"/><circle cx="5" cy="19" r="1.5" fill="#f37626"/></svg>
            <span>Jupyter</span>
          </div>
          <div class="jp-title-box">
            <input type="text" class="jp-title-input" value="Untitled.ipynb" title="Click to rename notebook">
            <span class="jp-checkpoint-text">Last Checkpoint: just now (autosaved)</span>
          </div>
        </div>
        <div class="jp-header-right">
          <div class="jp-kernel-indicator">
            <span class="jp-kernel-dot"></span>
            <span class="jp-kernel-name">Python 3 (ipykernel) | Idle</span>
          </div>
        </div>
      </div>
      <div class="jp-menubar">
        <button class="jp-menu-btn" data-menu="file">File</button>
        <button class="jp-menu-btn" data-menu="edit">Edit</button>
        <button class="jp-menu-btn" data-menu="view">View</button>
        <button class="jp-menu-btn" data-menu="insert">Insert</button>
        <button class="jp-menu-btn" data-menu="cell">Cell</button>
        <button class="jp-menu-btn" data-menu="kernel">Kernel</button>
        <button class="jp-menu-btn" data-menu="help">Help</button>
      </div>
      <div class="jp-toolbar">
        <button class="jp-btn jp-tool-save" title="Save and Checkpoint (Ctrl+S)">${iconMarkup("save", 14)}</button>
        <button class="jp-btn jp-tool-add" title="Insert Cell Below (+)">${iconMarkup("plus", 14)}</button>
        <button class="jp-btn jp-tool-cut" title="Cut Selected Cell">${iconMarkup("cut", 14)}</button>
        <button class="jp-btn jp-tool-copy" title="Copy Selected Cell">${iconMarkup("copy", 14)}</button>
        <button class="jp-btn jp-tool-paste" title="Paste Cell Below">${iconMarkup("paste", 14)}</button>
        <div class="jp-toolbar-sep"></div>
        <button class="jp-btn primary jp-tool-run" title="Run the selected cells and advance (Shift+Enter)">${iconMarkup("play", 13)} Run</button>
        <button class="jp-btn jp-tool-interrupt" title="Interrupt the kernel">${iconMarkup("stop", 13)}</button>
        <button class="jp-btn jp-tool-restart" title="Restart the kernel">${iconMarkup("refresh", 13)}</button>
        <button class="jp-btn jp-tool-restart-run" title="Restart Kernel & Run All">${iconMarkup("forward", 13)}</button>
        <div class="jp-toolbar-sep"></div>
        <select class="jp-select jp-tool-type" title="Cell Type">
          <option value="code">Code</option>
          <option value="markdown">Markdown</option>
        </select>
        <div class="jp-toolbar-sep"></div>
        <select class="jp-select jp-tool-demos" title="Load Ready Anaconda Demos">
          <option value="">Quick Demos / Snippets</option>
          <option value="cv">Image Processing (Sobel / Grayscale / Blur)</option>
          <option value="plot">Matplotlib Charts & Waves</option>
          <option value="numpy">NumPy Math & Statistics</option>
          <option value="python">Python Functions & Logic</option>
          <option value="clear">Clear Notebook</option>
        </select>
      </div>
      <div class="jp-notebook"></div>
    `;

    const titleInput = body.querySelector(".jp-title-input");
    const checkpointText = body.querySelector(".jp-checkpoint-text");
    const kernelDot = body.querySelector(".jp-kernel-dot");
    const kernelName = body.querySelector(".jp-kernel-name");
    const notebookContainer = body.querySelector(".jp-notebook");
    const cellTypeSelect = body.querySelector(".jp-tool-type");

    let executionCounter = 0;
    let activeCellOutputs = [];
    const kernelScope = {};
    let cells = [];
    let activeCellId = null;
    let clipboardCell = null;

    function setKernelStatus(isBusy) {
      if (isBusy) {
        kernelDot.classList.add("busy");
        kernelName.textContent = "Python 3 (ipykernel) | Busy";
      } else {
        kernelDot.classList.remove("busy");
        kernelName.textContent = "Python 3 (ipykernel) | Idle";
      }
    }

    class JupyterImage {
      constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d", { willReadFrequently: true });
      }
      get width() { return this.canvas.width; }
      get height() { return this.canvas.height; }
      get size() { return [this.canvas.width, this.canvas.height]; }

      show() {
        activeCellOutputs.push({ type: "image", canvas: this.cloneCanvas() });
      }

      cloneCanvas() {
        const c = document.createElement("canvas");
        c.width = this.canvas.width;
        c.height = this.canvas.height;
        c.getContext("2d").drawImage(this.canvas, 0, 0);
        return c;
      }

      filter(name, param) {
        const c = this.cloneCanvas();
        const ctx = c.getContext("2d", { willReadFrequently: true });
        let imgData;
        try {
          imgData = ctx.getImageData(0, 0, c.width, c.height);
        } catch (err) {
          throw new Error("Cannot process this image pixels (blocked source). Download it into Pictures first, then open the saved path.");
        }
        const d = imgData.data;
        const w = c.width, h = c.height;

        if (name === "grayscale" || name === "gray") {
          for (let i = 0; i < d.length; i += 4) {
            const y = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
            d[i] = d[i + 1] = d[i + 2] = y;
          }
        } else if (name === "invert" || name === "negative") {
          for (let i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i];
            d[i + 1] = 255 - d[i + 1];
            d[i + 2] = 255 - d[i + 2];
          }
        } else if (name === "sepia") {
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i], g = d[i + 1], b = d[i + 2];
            d[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
            d[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
            d[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
          }
        } else if (name === "blur" || name === "smooth") {
          const src = new Uint8ClampedArray(d);
          const radius = Number(param) || 2;
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              let r = 0, g = 0, b = 0, count = 0;
              for (let dy = -radius; dy <= radius; dy++) {
                const ny = y + dy;
                if (ny < 0 || ny >= h) continue;
                for (let dx = -radius; dx <= radius; dx++) {
                  const nx = x + dx;
                  if (nx < 0 || nx >= w) continue;
                  const idx = (ny * w + nx) * 4;
                  r += src[idx]; g += src[idx + 1]; b += src[idx + 2];
                  count++;
                }
              }
              const outIdx = (y * w + x) * 4;
              d[outIdx] = r / count;
              d[outIdx + 1] = g / count;
              d[outIdx + 2] = b / count;
            }
          }
        } else if (name === "edges" || name === "sobel" || name === "find_edges") {
          const gray = new Float32Array(w * h);
          for (let i = 0; i < d.length; i += 4) {
            gray[i / 4] = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
          }
          const kx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
          const ky = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              let gx = 0, gy = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const val = gray[(y + dy) * w + (x + dx)];
                  gx += val * kx[dy + 1][dx + 1];
                  gy += val * ky[dy + 1][dx + 1];
                }
              }
              const mag = Math.min(255, Math.hypot(gx, gy));
              const idx = (y * w + x) * 4;
              const edgeVal = mag > 45 ? 255 : 0;
              d[idx] = d[idx + 1] = d[idx + 2] = edgeVal;
            }
          }
        } else if (name === "threshold" || name === "binarize") {
          const thresh = Number(param) || 128;
          for (let i = 0; i < d.length; i += 4) {
            const y = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            const v = y > thresh ? 255 : 0;
            d[i] = d[i + 1] = d[i + 2] = v;
          }
        } else if (name === "brightness") {
          const factor = Number(param) || 30;
          for (let i = 0; i < d.length; i += 4) {
            d[i] = Math.min(255, Math.max(0, d[i] + factor));
            d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + factor));
            d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + factor));
          }
        } else if (name === "contrast") {
          const factor = param !== undefined ? Number(param) : 1.5;
          for (let i = 0; i < d.length; i += 4) {
            d[i] = Math.min(255, Math.max(0, (d[i] - 128) * factor + 128));
            d[i + 1] = Math.min(255, Math.max(0, (d[i + 1] - 128) * factor + 128));
            d[i + 2] = Math.min(255, Math.max(0, (d[i + 2] - 128) * factor + 128));
          }
        } else if (name === "sharpen" || name === "detail") {
          const src = new Uint8ClampedArray(d);
          const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              let r = 0, g = 0, b = 0;
              for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                  const idx = ((y + ky) * w + (x + kx)) * 4;
                  const weight = kernel[(ky + 1) * 3 + (kx + 1)];
                  r += src[idx] * weight;
                  g += src[idx + 1] * weight;
                  b += src[idx + 2] * weight;
                }
              }
              const outIdx = (y * w + x) * 4;
              d[outIdx] = Math.min(255, Math.max(0, r));
              d[outIdx + 1] = Math.min(255, Math.max(0, g));
              d[outIdx + 2] = Math.min(255, Math.max(0, b));
            }
          }
        } else if (name === "emboss") {
          const src = new Uint8ClampedArray(d);
          const kernel = [-2, -1, 0, -1, 1, 1, 0, 1, 2];
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              let r = 128, g = 128, b = 128;
              for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                  const idx = ((y + ky) * w + (x + kx)) * 4;
                  const weight = kernel[(ky + 1) * 3 + (kx + 1)];
                  r += src[idx] * weight;
                  g += src[idx + 1] * weight;
                  b += src[idx + 2] * weight;
                }
              }
              const outIdx = (y * w + x) * 4;
              d[outIdx] = Math.min(255, Math.max(0, r));
              d[outIdx + 1] = Math.min(255, Math.max(0, g));
              d[outIdx + 2] = Math.min(255, Math.max(0, b));
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        return new JupyterImage(c);
      }

      convert(mode) {
        if (mode === "L") return this.filter("grayscale");
        return this;
      }

      resize(...args) {
        let nw = 400, nh = 300;
        if (Array.isArray(args[0])) { nw = args[0][0]; nh = args[0][1]; }
        else if (args.length >= 2) { nw = args[0]; nh = args[1]; }
        const c = document.createElement("canvas");
        c.width = nw;
        c.height = nh;
        const ctx = c.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(this.canvas, 0, 0, nw, nh);
        return new JupyterImage(c);
      }

      rotate(deg) {
        const rad = (deg * Math.PI) / 180;
        const c = document.createElement("canvas");
        c.width = this.canvas.width;
        c.height = this.canvas.height;
        const ctx = c.getContext("2d");
        ctx.translate(c.width / 2, c.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);
        return new JupyterImage(c);
      }

      crop(box) {
        const [x1, y1, x2, y2] = Array.isArray(box) ? box : [0, 0, this.width, this.height];
        const w = Math.max(1, x2 - x1);
        const h = Math.max(1, y2 - y1);
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d");
        ctx.drawImage(this.canvas, x1, y1, w, h, 0, 0, w, h);
        return new JupyterImage(c);
      }

      transpose(method) {
        if (method === "FLIP_LEFT_RIGHT" || method === 0) {
          const c = document.createElement("canvas");
          c.width = this.width; c.height = this.height;
          const ctx = c.getContext("2d");
          ctx.translate(c.width, 0); ctx.scale(-1, 1);
          ctx.drawImage(this.canvas, 0, 0);
          return new JupyterImage(c);
        }
        if (method === "FLIP_TOP_BOTTOM" || method === 1) {
          const c = document.createElement("canvas");
          c.width = this.width; c.height = this.height;
          const ctx = c.getContext("2d");
          ctx.translate(0, c.height); ctx.scale(1, -1);
          ctx.drawImage(this.canvas, 0, 0);
          return new JupyterImage(c);
        }
        return this.rotate(90);
      }

      getpixel(coords) {
        const [x, y] = coords;
        const p = this.ctx.getImageData(x, y, 1, 1).data;
        return [p[0], p[1], p[2], p[3]];
      }

      putpixel(coords, color) {
        const [x, y] = coords;
        const id = this.ctx.createImageData(1, 1);
        id.data[0] = color[0] ?? 0;
        id.data[1] = color[1] ?? 0;
        id.data[2] = color[2] ?? 0;
        id.data[3] = color[3] ?? 255;
        this.ctx.putImageData(id, x, y);
      }

      getdata() {
        const d = this.ctx.getImageData(0, 0, this.width, this.height).data;
        const res = [];
        for (let i = 0; i < d.length; i += 4) {
          res.push([d[i], d[i + 1], d[i + 2], d[i + 3]]);
        }
        return res;
      }

      save(path) {
        const dataUrl = this.canvas.toDataURL("image/png");
        const raw = String(path || "").trim().replace(/^["']|["']$/g, "");
        const clean = raw.replace(/\\/g, "/");
        const bname = basename(clean) || "saved_image.png";

        // Store under raw path (e.g. C:\Users\...), clean path, and virtual Linux filesystem
        fs.entries[raw] = { type: "image", content: dataUrl, modified: Date.now() };
        fs.entries[clean] = { type: "image", content: dataUrl, modified: Date.now() };
        fs.entries[`/home/alex/Pictures/${bname}`] = { type: "image", content: dataUrl, modified: Date.now() };
        fs.entries[`/home/alex/Downloads/${bname}`] = { type: "image", content: dataUrl, modified: Date.now() };

        preloadedImageCanvases.set(raw, this.cloneCanvas());
        preloadedImageCanvases.set(clean, this.cloneCanvas());
        preloadedImageCanvases.set(bname, this.cloneCanvas());
        preloadedImageCanvases.set(`/home/alex/Pictures/${bname}`, this.cloneCanvas());
        preloadedImageCanvases.set(`/home/alex/Downloads/${bname}`, this.cloneCanvas());

        saveSessionFS();
        renderDesktopFiles();
        showToast(`Saved image: ${bname}`);
        return raw;
      }
    }

    const Image = {
      open: (path) => {
        if (!path) throw new Error("FileNotFoundError: Image.open() requires a filesystem path");
        const raw = String(path).trim().replace(/^["']|["']$/g, "");
        const clean = raw.replace(/\\/g, "/").replace(/^file:\/\//, "");

        let cached = preloadedImageCanvases.get(raw)
          || preloadedImageCanvases.get(clean)
          || preloadedImageCanvases.get(basename(clean));

        if (!cached) {
          const foundPath = findImageFsPath(raw);
          if (foundPath) {
            cached = preloadedImageCanvases.get(foundPath)
              || preloadedImageCanvases.get(basename(foundPath));
          }
        }

        if (cached) {
          return new JupyterImage(cloneCachedCanvas(cached));
        }

        // Fallback: check if entry exists in fs.entries
        const entry = fs.entries[raw] || fs.entries[clean] || (findImageFsPath(raw) && fs.entries[findImageFsPath(raw)]);
        if (entry && entry.content) {
          const c = document.createElement("canvas");
          c.width = 640; c.height = 420;
          const ctx = c.getContext("2d");
          ctx.fillStyle = "#1e2230"; ctx.fillRect(0, 0, 640, 420);
          ctx.fillStyle = "#ffffff"; ctx.font = "14px monospace";
          ctx.fillText(basename(raw), 20, 40);
          rememberImageCanvas(raw, c);
          return new JupyterImage(c);
        }

        throw new Error(`FileNotFoundError: [Errno 2] No such file or directory: '${raw}'. Place the image in Pictures/Downloads/Desktop or load it via the Jupyter toolbar.`);
      },

      new: (mode, size = [400, 300], color = "#000") => {
        const canvas = document.createElement("canvas");
        canvas.width = size[0] || 400;
        canvas.height = size[1] || 300;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return new JupyterImage(canvas);
      },

      fromarray: (arr) => {
        if (arr instanceof JupyterImage) return arr;
        let w = 400, h = 300;
        if (arr && arr.shape) {
          h = arr.shape[0];
          w = arr.shape[1];
        } else if (Array.isArray(arr) && Array.isArray(arr[0])) {
          h = arr.length;
          w = arr[0].length;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const imgData = ctx.createImageData(w, h);
        const d = imgData.data;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const outIdx = (y * w + x) * 4;
            const pixel = arr[y]?.[x];
            if (Array.isArray(pixel)) {
              d[outIdx] = pixel[0] ?? 0;
              d[outIdx + 1] = pixel[1] ?? 0;
              d[outIdx + 2] = pixel[2] ?? 0;
              d[outIdx + 3] = pixel[3] !== undefined ? pixel[3] : 255;
            } else if (typeof pixel === "number") {
              d[outIdx] = pixel;
              d[outIdx + 1] = pixel;
              d[outIdx + 2] = pixel;
              d[outIdx + 3] = 255;
            } else {
              d[outIdx] = 0; d[outIdx + 1] = 0; d[outIdx + 2] = 0; d[outIdx + 3] = 255;
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        return new JupyterImage(canvas);
      },

      blend: (im1, im2, alpha = 0.5) => {
        const j1 = (im1 instanceof JupyterImage ? im1 : Image.fromarray(im1));
        const j2 = (im2 instanceof JupyterImage ? im2 : Image.fromarray(im2));
        const c = document.createElement("canvas");
        c.width = j1.width; c.height = j1.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(j1.canvas, 0, 0);
        ctx.globalAlpha = alpha;
        ctx.drawImage(j2.canvas, 0, 0, c.width, c.height);
        return new JupyterImage(c);
      }
    };

    const cv2 = {
      COLOR_BGR2GRAY: "grayscale",
      COLOR_BGR2RGB: "rgb",
      COLOR_RGB2BGR: "bgr",
      THRESH_BINARY: 0,
      THRESH_BINARY_INV: 1,
      THRESH_OTSU: 8,
      imread: (p) => Image.open(p),
      cvtColor: (img, code) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("grayscale"),
      GaussianBlur: (img, ksize, sigma) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", Array.isArray(ksize) ? ksize[0] : 2),
      blur: (img, ksize) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", Array.isArray(ksize) ? ksize[0] : 2),
      medianBlur: (img, k) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", k || 2),
      Canny: (img, t1, t2) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("edges"),
      threshold: (img, thresh = 128, maxval = 255, type = 0) => {
        const filtered = (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("threshold", thresh);
        return [thresh, filtered];
      },
      resize: (img, size) => (img instanceof JupyterImage ? img : Image.fromarray(img)).resize(size[0], size[1]),
      imshow: (titleOrImg, img) => {
        const actual = img !== undefined ? img : titleOrImg;
        const j = (actual instanceof JupyterImage ? actual : Image.fromarray(actual));
        j.show();
      },
      waitKey: () => 0,
      destroyAllWindows: () => {},
      imwrite: (p, img) => {
        const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
        return j.save(p);
      },
      bitwise_not: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("invert"),
      Sobel: (img, ddepth, dx, dy, ksize) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("edges"),
      Laplacian: (img, ddepth) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("edges"),
      circle: (img, center, radius, color = "#ff0000", thickness = 2) => {
        const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
        j.ctx.strokeStyle = Array.isArray(color) ? `rgb(${color[0]},${color[1]},${color[2]})` : color;
        j.ctx.lineWidth = thickness;
        j.ctx.beginPath();
        j.ctx.arc(center[0], center[1], radius, 0, Math.PI * 2);
        j.ctx.stroke();
        return j;
      },
      rectangle: (img, pt1, pt2, color = "#00ff00", thickness = 2) => {
        const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
        j.ctx.strokeStyle = Array.isArray(color) ? `rgb(${color[0]},${color[1]},${color[2]})` : color;
        j.ctx.lineWidth = thickness;
        j.ctx.strokeRect(pt1[0], pt1[1], pt2[0] - pt1[0], pt2[1] - pt1[1]);
        return j;
      },
      line: (img, pt1, pt2, color = "#ffffff", thickness = 2) => {
        const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
        j.ctx.strokeStyle = Array.isArray(color) ? `rgb(${color[0]},${color[1]},${color[2]})` : color;
        j.ctx.lineWidth = thickness;
        j.ctx.beginPath();
        j.ctx.moveTo(pt1[0], pt1[1]);
        j.ctx.lineTo(pt2[0], pt2[1]);
        j.ctx.stroke();
        return j;
      },
      putText: (img, text, org, fontFace, fontScale = 1, color = "#ffffff", thickness = 1) => {
        const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
        j.ctx.fillStyle = Array.isArray(color) ? `rgb(${color[0]},${color[1]},${color[2]})` : color;
        j.ctx.font = `${Math.round(fontScale * 18)}px sans-serif`;
        j.ctx.fillText(text, org[0], org[1]);
        return j;
      }
    };

    const plt = {
      _title: "",
      _xlabel: "",
      _ylabel: "",
      _grid: true,
      _plots: [],
      _subplots: [],
      _currentSubplot: null,
      _axis: "on",
      _tightLayout: false,
      _figsize: [780, 390],

      figure: (opts = {}) => {
        plt._plots = [];
        plt._subplots = [];
        plt._currentSubplot = null;
        plt._title = "";
        plt._xlabel = "";
        plt._ylabel = "";
        plt._grid = true;
        plt._axis = "on";
        plt._tightLayout = false;
        if (opts && typeof opts === "object") {
          const sz = opts.figsize || opts.size;
          if (Array.isArray(sz)) {
            plt._figsize = [Math.round(sz[0] * 65), Math.round(sz[1] * 65)];
          }
        } else if (arguments.length >= 2) {
          plt._figsize = [Math.round(Number(arguments[0]) * 65), Math.round(Number(arguments[1]) * 65)];
        }
        return plt;
      },

      subplot: (nrows = 1, ncols = 1, index = 1) => {
        if (ncols === undefined && index === undefined && typeof nrows === "number" && nrows >= 100) {
          const s = String(nrows);
          index = Number(s[2]);
          ncols = Number(s[1]);
          nrows = Number(s[0]);
        }
        const sp = {
          nrows: Number(nrows) || 1,
          ncols: Number(ncols) || 1,
          index: Number(index) || 1,
          title: "",
          axis: "on",
          plots: [],
          imshowData: null,
          cmap: null
        };
        plt._subplots.push(sp);
        plt._currentSubplot = sp;
        return sp;
      },

      subplots: (nrows = 1, ncols = 1, opts = {}) => {
        plt.figure(opts);
        const axes = [];
        for (let r = 0; r < nrows; r++) {
          const row = [];
          for (let c = 0; c < ncols; c++) {
            const idx = r * ncols + c + 1;
            const sp = plt.subplot(nrows, ncols, idx);
            const ax = {
              imshow: (d, o) => { sp.imshowData = d; sp.cmap = o?.cmap || o; return ax; },
              set_title: (t) => { sp.title = String(t); return ax; },
              title: (t) => { sp.title = String(t); return ax; },
              axis: (m) => { sp.axis = m; return ax; },
              set_axis_off: () => { sp.axis = "off"; return ax; }
            };
            row.push(ax);
          }
          axes.push(ncols === 1 ? row[0] : row);
        }
        return [plt, nrows === 1 && ncols === 1 ? axes[0] : axes];
      },

      title: (t) => {
        const s = String(t);
        if (plt._currentSubplot) {
          plt._currentSubplot.title = s;
        } else {
          plt._title = s;
        }
        return plt;
      },

      xlabel: (l) => { plt._xlabel = String(l); return plt; },
      ylabel: (l) => { plt._ylabel = String(l); return plt; },
      axis: (mode) => {
        const s = String(mode).toLowerCase();
        if (plt._currentSubplot) {
          plt._currentSubplot.axis = s;
        } else {
          plt._axis = s;
        }
        return plt;
      },

      tight_layout: () => {
        plt._tightLayout = true;
        return plt;
      },

      grid: (g = true) => { plt._grid = !!g; return plt; },

      plot: (x, y, opts = {}) => {
        if (y === undefined) { y = x; x = Array.from({ length: y.length }, (_, i) => i); }
        plt._plots.push({ type: "line", x: [...x], y: [...y], color: opts.color || "#00c3ff", label: opts.label || "" });
        return plt;
      },

      bar: (x, y, opts = {}) => {
        if (y === undefined) { y = x; x = Array.from({ length: y.length }, (_, i) => i); }
        plt._plots.push({ type: "bar", x: [...x], y: [...y], color: opts.color || "#f37626", label: opts.label || "" });
        return plt;
      },

      scatter: (x, y, opts = {}) => {
        if (y === undefined) { y = x; x = Array.from({ length: y.length }, (_, i) => i); }
        plt._plots.push({ type: "scatter", x: [...x], y: [...y], color: opts.color || "#a78bfa", label: opts.label || "" });
        return plt;
      },

      imshow: (imgOrMatrix, opts = {}) => {
        const cmap = (opts && typeof opts === "object" ? opts.cmap : opts) || "viridis";
        if (plt._currentSubplot) {
          plt._currentSubplot.imshowData = imgOrMatrix;
          plt._currentSubplot.cmap = cmap;
        } else {
          plt._plots.push({ type: "imshow", data: imgOrMatrix, cmap });
        }
        return plt;
      },

      imread: (p) => Image.open(p),

      show: () => {
        const canvas = renderPltFigure(plt);
        activeCellOutputs.push({ type: "plot", canvas });
        plt._plots = [];
        plt._subplots = [];
        plt._currentSubplot = null;
        return canvas;
      }
    };

    const np = {
      pi: Math.PI,
      e: Math.E,
      array: (arr) => {
        if (arr instanceof JupyterImage) {
          const w = arr.width, h = arr.height;
          const d = arr.ctx.getImageData(0, 0, w, h).data;
          const rows = [];
          for (let y = 0; y < h; y++) {
            const row = [];
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              row.push([d[idx], d[idx + 1], d[idx + 2], d[idx + 3]]);
            }
            rows.push(row);
          }
          rows.shape = [h, w, 4];
          rows.dtype = "uint8";
          rows._isImageArray = true;
          rows.mean = () => {
            let sum = 0;
            for (let i = 0; i < d.length; i++) sum += d[i];
            return sum / d.length;
          };
          rows.sum = () => {
            let sum = 0;
            for (let i = 0; i < d.length; i++) sum += d[i];
            return sum;
          };
          rows.min = () => Math.min(...d);
          rows.max = () => Math.max(...d);
          return rows;
        }

        const a = Array.isArray(arr) ? [...arr] : [arr];
        a.shape = [a.length];
        a.mean = () => a.reduce((s, v) => s + v, 0) / (a.length || 1);
        a.sum = () => a.reduce((s, v) => s + v, 0);
        a.min = () => Math.min(...a);
        a.max = () => Math.max(...a);
        a.std = () => {
          const m = a.mean();
          return Math.sqrt(a.reduce((s, v) => s + Math.pow(v - m, 2), 0) / (a.length || 1));
        };
        return a;
      },
      linspace: (start, stop, num = 50) => {
        const step = (stop - start) / (num - 1 || 1);
        const res = [];
        for (let i = 0; i < num; i++) res.push(start + step * i);
        return np.array(res);
      },
      arange: (start, stop, step = 1) => {
        if (stop === undefined) { stop = start; start = 0; }
        const res = [];
        if (step > 0) { for (let i = start; i < stop; i += step) res.push(i); }
        else { for (let i = start; i > stop; i += step) res.push(i); }
        return np.array(res);
      },
      zeros: (n) => {
        if (Array.isArray(n)) {
          const [h, w, c = 3] = n;
          const rows = [];
          for (let y = 0; y < h; y++) {
            const row = [];
            for (let x = 0; x < w; x++) row.push(new Array(c).fill(0));
            rows.push(row);
          }
          rows.shape = [h, w, c];
          return rows;
        }
        return np.array(new Array(n).fill(0));
      },
      ones: (n) => {
        if (Array.isArray(n)) {
          const [h, w, c = 3] = n;
          const rows = [];
          for (let y = 0; y < h; y++) {
            const row = [];
            for (let x = 0; x < w; x++) row.push(new Array(c).fill(1));
            rows.push(row);
          }
          rows.shape = [h, w, c];
          return rows;
        }
        return np.array(new Array(n).fill(1));
      },
      random: {
        rand: (n = 1) => np.array(Array.from({ length: n }, () => Math.random())),
        randn: (n = 1) => np.array(Array.from({ length: n }, () => {
          let u = 0, v = 0;
          while (u === 0) u = Math.random();
          while (v === 0) v = Math.random();
          return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        })),
        randint: (low, high, size = 1) => np.array(Array.from({ length: size }, () => Math.floor(Math.random() * (high - low)) + low))
      },
      sin: (arr) => Array.isArray(arr) ? np.array(arr.map((x) => Math.sin(x))) : Math.sin(arr),
      cos: (arr) => Array.isArray(arr) ? np.array(arr.map((x) => Math.cos(x))) : Math.cos(arr),
      sqrt: (arr) => Array.isArray(arr) ? np.array(arr.map((x) => Math.sqrt(x))) : Math.sqrt(arr),
      exp: (arr) => Array.isArray(arr) ? np.array(arr.map((x) => Math.exp(x))) : Math.exp(arr),
      mean: (arr) => np.array(arr).mean(),
      std: (arr) => np.array(arr).std(),
      sum: (arr) => np.array(arr).sum()
    };

    function initKernelScope() {
      kernelScope.Math = Math;
      kernelScope.math = Math;
      kernelScope.np = np;
      kernelScope.numpy = np;
      kernelScope.plt = plt;
      kernelScope.matplotlib = { pyplot: plt };
      kernelScope.Image = Image;
      kernelScope.PIL = { Image };
      kernelScope.ImageFilter = {
        BLUR: "blur",
        CONTOUR: "contour",
        DETAIL: "detail",
        EDGE_ENHANCE: "edges",
        FIND_EDGES: "edges",
        SHARPEN: "sharpen",
        SMOOTH: "blur",
        EMBOSS: "emboss"
      };

      // PIL.ImageOps - image-wide operations
      const ImageOps = {
        invert: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("invert"),
        grayscale: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("grayscale"),
        mirror: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).transpose("FLIP_LEFT_RIGHT"),
        flip: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).transpose("FLIP_TOP_BOTTOM"),
        autocontrast: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("contrast", 1.5),
        equalize: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("contrast", 1.8),
        solarize: (img, threshold = 128) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("threshold", threshold),
        posterize: (img, bits = 4) => {
          const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
          const c = j.cloneCanvas();
          const ctx = c.getContext("2d", { willReadFrequently: true });
          const imgData = ctx.getImageData(0, 0, c.width, c.height);
          const d = imgData.data;
          const shift = 8 - bits;
          for (let i = 0; i < d.length; i += 4) {
            d[i] = (d[i] >> shift) << shift;
            d[i + 1] = (d[i + 1] >> shift) << shift;
            d[i + 2] = (d[i + 2] >> shift) << shift;
          }
          ctx.putImageData(imgData, 0, 0);
          return new JupyterImage(c);
        }
      };
      kernelScope.ImageOps = ImageOps;
      kernelScope.PIL.ImageOps = ImageOps;

      // PIL.ImageEnhance - image enhancement
      const ImageEnhance = {
        Brightness: (img) => ({
          enhance: (factor) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("brightness", (factor - 1) * 80)
        }),
        Contrast: (img) => ({
          enhance: (factor) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("contrast", factor)
        }),
        Sharpness: (img) => ({
          enhance: (factor) => factor > 1 ? (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("sharpen") : (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", 2)
        }),
        Color: (img) => ({
          enhance: (factor) => {
            if (factor <= 0) return (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("grayscale");
            return (img instanceof JupyterImage ? img : Image.fromarray(img));
          }
        })
      };
      kernelScope.ImageEnhance = ImageEnhance;
      kernelScope.PIL.ImageEnhance = ImageEnhance;

      // PIL.ImageDraw - basic drawing on images
      const ImageDraw = {
        Draw: (img) => {
          const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
          return {
            rectangle: (coords, opts = {}) => {
              const fill = opts.fill || opts.outline || "#ff0000";
              j.ctx.strokeStyle = fill;
              j.ctx.lineWidth = opts.width || 2;
              if (Array.isArray(coords[0])) {
                j.ctx.strokeRect(coords[0][0], coords[0][1], coords[1][0] - coords[0][0], coords[1][1] - coords[0][1]);
              } else {
                j.ctx.strokeRect(coords[0], coords[1], coords[2] - coords[0], coords[3] - coords[1]);
              }
            },
            ellipse: (coords, opts = {}) => {
              const fill = opts.fill || opts.outline || "#ff0000";
              j.ctx.strokeStyle = fill;
              j.ctx.lineWidth = opts.width || 2;
              let x1, y1, x2, y2;
              if (Array.isArray(coords[0])) { x1 = coords[0][0]; y1 = coords[0][1]; x2 = coords[1][0]; y2 = coords[1][1]; }
              else { x1 = coords[0]; y1 = coords[1]; x2 = coords[2]; y2 = coords[3]; }
              j.ctx.beginPath();
              j.ctx.ellipse((x1 + x2) / 2, (y1 + y2) / 2, (x2 - x1) / 2, (y2 - y1) / 2, 0, 0, Math.PI * 2);
              j.ctx.stroke();
            },
            line: (coords, opts = {}) => {
              const fill = opts.fill || "#ffffff";
              j.ctx.strokeStyle = fill;
              j.ctx.lineWidth = opts.width || 2;
              j.ctx.beginPath();
              for (let i = 0; i < coords.length; i += 2) {
                const px = Array.isArray(coords[i]) ? coords[i][0] : coords[i];
                const py = Array.isArray(coords[i]) ? coords[i][1] : coords[i + 1];
                if (i === 0) j.ctx.moveTo(px, py);
                else j.ctx.lineTo(px, py);
              }
              j.ctx.stroke();
            },
            text: (pos, text, opts = {}) => {
              j.ctx.fillStyle = opts.fill || "#ffffff";
              j.ctx.font = `${opts.size || 16}px sans-serif`;
              const [x, y] = Array.isArray(pos) ? pos : [pos, 20];
              j.ctx.fillText(text, x, y);
            }
          };
        }
      };
      kernelScope.ImageDraw = ImageDraw;
      kernelScope.PIL.ImageDraw = ImageDraw;

      kernelScope.cv2 = cv2;

      // scikit-image (skimage)
      const skimage = {
        io: {
          imread: (p) => Image.open(p),
          imshow: (img) => {
            const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
            j.show();
          }
        },
        color: {
          rgb2gray: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("grayscale"),
          gray2rgb: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)),
          rgb2hsv: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)),
          hsv2rgb: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img))
        },
        filters: {
          sobel: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("edges"),
          gaussian: (img, sigma) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", sigma || 2),
          threshold_otsu: () => 128,
          median: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", 1),
          laplace: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("edges"),
          unsharp_mask: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("sharpen")
        },
        transform: {
          resize: (img, size) => (img instanceof JupyterImage ? img : Image.fromarray(img)).resize(size[1] || 400, size[0] || 300),
          rotate: (img, deg) => (img instanceof JupyterImage ? img : Image.fromarray(img)).rotate(deg),
          rescale: (img, scale) => {
            const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
            return j.resize(Math.round(j.width * scale), Math.round(j.height * scale));
          }
        },
        exposure: {
          adjust_gamma: (img, gamma) => {
            const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
            const c = j.cloneCanvas();
            const ctx = c.getContext("2d", { willReadFrequently: true });
            const imgData = ctx.getImageData(0, 0, c.width, c.height);
            const d = imgData.data;
            const g = 1 / (gamma || 1);
            for (let i = 0; i < d.length; i += 4) {
              d[i] = Math.round(255 * Math.pow(d[i] / 255, g));
              d[i + 1] = Math.round(255 * Math.pow(d[i + 1] / 255, g));
              d[i + 2] = Math.round(255 * Math.pow(d[i + 2] / 255, g));
            }
            ctx.putImageData(imgData, 0, 0);
            return new JupyterImage(c);
          },
          equalize_hist: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("contrast", 1.8)
        },
        util: {
          img_as_float: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)),
          img_as_ubyte: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img))
        }
      };
      kernelScope.skimage = skimage;
      kernelScope.io = skimage.io;
      kernelScope.imageio = {
        imread: (p) => Image.open(p),
        imwrite: (p, img) => {
          const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
          return j.save(p);
        }
      };

      kernelScope.scipy = {
        ndimage: {
          gaussian_filter: (img, sigma) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", sigma),
          sobel: (img) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("edges"),
          median_filter: (img, size) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", size || 2),
          rotate: (img, deg) => (img instanceof JupyterImage ? img : Image.fromarray(img)).rotate(deg),
          uniform_filter: (img, size) => (img instanceof JupyterImage ? img : Image.fromarray(img)).filter("blur", size || 2)
        }
      };

      // display() and cv2_imshow() globals
      kernelScope.display = (obj) => {
        if (obj && obj instanceof JupyterImage) { obj.show(); }
        else if (obj && obj.show && typeof obj.show === "function") { obj.show(); }
        else if (obj && obj.canvas) { activeCellOutputs.push({ type: "image", canvas: obj.canvas }); }
        else { kernelScope.pyPrint(obj); }
      };
      kernelScope.cv2_imshow = (img) => {
        const j = (img instanceof JupyterImage ? img : Image.fromarray(img));
        j.show();
      };

      kernelScope.abs = Math.abs;
      kernelScope.min = Math.min;
      kernelScope.max = Math.max;
      kernelScope.round = Math.round;
      kernelScope.pyLen = (o) => (o ? (o.length ?? Object.keys(o).length) : 0);
      kernelScope.pyRange = (start, stop, step = 1) => {
        if (stop === undefined) { stop = start; start = 0; }
        const res = [];
        if (step > 0) { for (let i = start; i < stop; i += step) res.push(i); }
        else { for (let i = start; i > stop; i += step) res.push(i); }
        return res;
      };
      kernelScope.pyInput = (msg) => (window.prompt(msg || "Python input:") ?? "");
      kernelScope.os = {
        listdir: (p) => {
          const target = normalize(p || ".", "/home/alex/Desktop");
          return children(target).map((c) => basename(c));
        },
        getcwd: () => "/home/alex/Desktop",
        path: {
          join: (...args) => args.join("/").replace(/\/+/g, "/"),
          exists: (p) => !!fs.entries[normalize(p, "/home/alex/Desktop")],
          isdir: (p) => fs.entries[normalize(p, "/home/alex/Desktop")]?.type === "dir"
        }
      };
      kernelScope.torchvision = {
        transforms: {
          ToTensor: () => (img) => np.array(img),
          ToPILImage: () => (arr) => Image.fromarray(arr),
          Grayscale: () => (img) => img.convert("L"),
          Resize: (sz) => (img) => img.resize(Array.isArray(sz) ? sz : [sz, sz]),
          RandomHorizontalFlip: () => (img) => img.transpose("FLIP_LEFT_RIGHT")
        }
      };
      kernelScope.figsize = undefined;
      kernelScope.cmap = undefined;
    }
    initKernelScope();

    function transpileCellPython(code) {
      const rawLines = code.split("\n");
      const jsLines = [];
      const indentStack = [0];

      let lastNonEmptyIndex = -1;
      for (let i = rawLines.length - 1; i >= 0; i--) {
        const trimmed = rawLines[i].trim();
        if (trimmed && !trimmed.startsWith("#")) {
          lastNonEmptyIndex = i;
          break;
        }
      }

      for (let idx = 0; idx < rawLines.length; idx++) {
        const rawLine = rawLines[idx];
        if (/^\s*#/.test(rawLine)) continue;
        if (!rawLine.trim()) continue;

        const indent = rawLine.match(/^(\s*)/)[0].length;
        let line = rawLine.trim();

        while (indent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          jsLines.push("}");
        }

        line = line.replace(/^(import\s+.*|from\s+.*)$/, "// $1");
        // Handle raw strings: r"..." or r'...'
        line = line.replace(/\br(["'])([\s\S]*?)\1/g, (m, q, content) => JSON.stringify(content));
        // Handle unescaped Windows paths in string literals
        line = line.replace(/(["'])([a-zA-Z]:\\[^"']+)\1/g, (m, q, path) => JSON.stringify(path));
        // Handle Python f-strings
        line = line.replace(/f(["'])(.*?)\1/g, (m, q, c) => "`" + c.replace(/\{([^}]+)\}/g, "${$1}") + "`");

        // Handle keyword arguments and tuples in function calls
        line = line.replace(/figsize\s*=\s*\(([^)]+)\)/g, "figsize: [$1]");
        line = line.replace(/figsize\s*=\s*\[([^\]]+)\]/g, "figsize: [$1]");
        line = line.replace(/plt\.figure\(([^)]*figsize:[^)]*)\)/g, "plt.figure({ $1 })");
        line = line.replace(/cmap\s*=\s*(["'][^"']+["']|[a-zA-Z0-9_]+)/g, "{ cmap: $1 }");
        line = line.replace(/\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)/g, "[$1, $2]");

        line = line.replace(/\bprint\s*\(/g, "pyPrint(");
        line = line.replace(/\binput\s*\(/g, "pyInput(");
        line = line.replace(/\blen\s*\(/g, "pyLen(");
        line = line.replace(/\brange\s*\(/g, "pyRange(");
        line = line.replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null");
        line = line.replace(/\band\b/g, "&&").replace(/\bor\b/g, "||").replace(/\bnot\b/g, "!");
        line = line.replace(/\babs\s*\(/g, "Math.abs(");
        line = line.replace(/\bmin\s*\(/g, "Math.min(");
        line = line.replace(/\bmax\s*\(/g, "Math.max(");

        if (/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/.test(line)) {
          line = line.replace(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/, "$1 = function($2) {");
          indentStack.push(indent + 1);
          jsLines.push(line);
          continue;
        }

        if (/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+(.*?)\s*:/.test(line)) {
          line = line.replace(/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+(.*?)\s*:/, "for (let $1 of $2) {");
          indentStack.push(indent + 1);
          jsLines.push(line);
          continue;
        }

        if (/^while\s+(.*?)\s*:/.test(line)) {
          line = line.replace(/^while\s+(.*?)\s*:/, "while ($1) {");
          indentStack.push(indent + 1);
          jsLines.push(line);
          continue;
        }

        if (/^if\s+(.*?)\s*:/.test(line)) {
          line = line.replace(/^if\s+(.*?)\s*:/, "if ($1) {");
          indentStack.push(indent + 1);
          jsLines.push(line);
          continue;
        }

        if (/^elif\s+(.*?)\s*:/.test(line)) {
          line = line.replace(/^elif\s+(.*?)\s*:/, "} else if ($1) {");
          jsLines.push(line);
          continue;
        }

        if (/^else\s*:/.test(line)) {
          line = "} else {";
          jsLines.push(line);
          continue;
        }

        // If this is the last line of the cell, track expression value or assignment for auto-display
        if (idx === lastNonEmptyIndex && indentStack.length === 1) {
          const isControlOrDecl = /^(let|const|var|return|throw|break|continue|\/\/)/.test(line);
          const isAssignment = /^[a-zA-Z_][a-zA-Z0-9_]*\s*=[^=]/.test(line);
          if (!isControlOrDecl && !isAssignment) {
            line = `__last_expr_val__ = (${line.replace(/;$/, "")});`;
          } else if (isAssignment) {
            const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
            if (m) {
              line = `${line.replace(/;$/, "")}; __last_assigned_var__ = "${m[1]}";`;
            }
          }
        }

        if (!line.endsWith(";") && !line.endsWith("{") && !line.endsWith("}")) {
          line += ";";
        }
        jsLines.push(line);
      }

      while (indentStack.length > 1) {
        indentStack.pop();
        jsLines.push("}");
      }

      return jsLines.join("\n");
    }

    function createCell(type = "code", initialContent = "", index = null) {
      const cellId = "cell_" + Math.random().toString(36).slice(2, 9);
      const cellEl = document.createElement("div");
      cellEl.className = "jp-cell";
      cellEl.dataset.cellId = cellId;
      cellEl.dataset.type = type;

      cellEl.innerHTML = `
        <div class="jp-cell-input-row">
          <span class="jp-prompt-label">${type === "code" ? "In [ ]:" : "Md:"}</span>
          <div class="jp-editor-wrapper">
            <textarea class="jp-textarea" spellcheck="false" placeholder="Paste an image path like /home/alex/Pictures/sample.svg then Python will load, process, and show the result here"></textarea>
            <pre class="jp-highlighted"><code></code></pre>
            <div class="jp-md-rendered" style="display:none;"></div>
          </div>
          <div class="jp-cell-actions">
            <button class="jp-cell-tool-btn cell-run" title="Run Cell (Shift+Enter)">${iconMarkup("play", 11)}</button>
            <button class="jp-cell-tool-btn cell-up" title="Move Cell Up">▲</button>
            <button class="jp-cell-tool-btn cell-down" title="Move Cell Down">▼</button>
            <button class="jp-cell-tool-btn cell-del" title="Delete Cell">${iconMarkup("close", 11)}</button>
          </div>
        </div>
        <div class="jp-cell-output-row" style="display:none;">
          <span class="jp-out-prompt">Out [ ]:</span>
          <div class="jp-output-content"></div>
        </div>
      `;

      const textarea = cellEl.querySelector(".jp-textarea");
      const highlightedCode = cellEl.querySelector(".jp-highlighted code");
      const mdRendered = cellEl.querySelector(".jp-md-rendered");
      const outputRow = cellEl.querySelector(".jp-cell-output-row");
      const outputContent = cellEl.querySelector(".jp-output-content");
      const outPrompt = cellEl.querySelector(".jp-out-prompt");
      const promptLabel = cellEl.querySelector(".jp-prompt-label");

      textarea.value = initialContent;

      function autoGrow() {
        textarea.style.height = "auto";
        const lineCount = (textarea.value || "").split("\n").length;
        const newHeight = Math.max(52, Math.max(textarea.scrollHeight, lineCount * 20 + 20));
        textarea.style.height = newHeight + "px";
        const highlightedEl = cellEl.querySelector(".jp-highlighted");
        if (highlightedEl) {
          highlightedEl.style.height = newHeight + "px";
        }
      }

      function updateHighlight() {
        const val = textarea.value || "";
        if (cellObj.type === "code") {
          highlightedCode.innerHTML = (highlightSyntax(val, "py") || "") + "\n";
        } else {
          highlightedCode.innerHTML = (highlightSyntax(val, "md") || "") + "\n";
        }
        autoGrow();
      }

      let pathDebounce = null;
      textarea.addEventListener("input", () => {
        cellObj.content = textarea.value;
        updateHighlight();
        if (!looksLikeStandaloneImagePath(textarea.value)) return;
        clearTimeout(pathDebounce);
        pathDebounce = setTimeout(() => {
          const found = findImageFsPath(String(textarea.value).trim().replace(/^["']|["']$/g, ""));
          if (!found) return;
          const code = jupyterProcessCodeForPath(found);
          textarea.value = code;
          cellObj.content = code;
          updateHighlight();
          runCell(cellObj, false);
        }, 400);
      });
      textarea.addEventListener("paste", (e) => {
        const pasted = (e.clipboardData && e.clipboardData.getData("text")) || "";
        if (!looksLikeStandaloneImagePath(pasted)) return;
        const found = findImageFsPath(pasted.trim().replace(/^["']|["']$/g, ""));
        if (!found) return;
        e.preventDefault();
        const code = jupyterProcessCodeForPath(found);
        textarea.value = code;
        cellObj.content = code;
        updateHighlight();
        runCell(cellObj, false);
      });

      textarea.addEventListener("scroll", () => {
        const highlightedEl = cellEl.querySelector(".jp-highlighted");
        if (highlightedEl) {
          highlightedEl.scrollLeft = textarea.scrollLeft;
        }
      });

      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + "    " + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 4;
          cellObj.content = textarea.value;
          updateHighlight();
        } else if (e.shiftKey && e.key === "Enter") {
          e.preventDefault();
          runCell(cellObj, true);
        } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          runCell(cellObj, false);
        } else if (e.altKey && e.key === "Enter") {
          e.preventDefault();
          runCell(cellObj, false);
          const idx = cells.indexOf(cellObj);
          createCell("code", "", idx + 1);
        }
      });

      cellEl.addEventListener("click", () => {
        setActiveCell(cellObj);
      });

      mdRendered.addEventListener("dblclick", () => {
        if (cellObj.type === "markdown") {
          mdRendered.style.display = "none";
          textarea.style.display = "block";
          cellEl.querySelector(".jp-highlighted").style.display = "block";
          textarea.focus();
        }
      });

      cellEl.querySelector(".cell-run").addEventListener("click", (e) => {
        e.stopPropagation();
        runCell(cellObj, true);
      });
      cellEl.querySelector(".cell-up").addEventListener("click", (e) => {
        e.stopPropagation();
        moveCell(cellObj, -1);
      });
      cellEl.querySelector(".cell-down").addEventListener("click", (e) => {
        e.stopPropagation();
        moveCell(cellObj, 1);
      });
      cellEl.querySelector(".cell-del").addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCell(cellObj);
      });

      const cellObj = {
        id: cellId,
        type,
        content: initialContent,
        element: cellEl,
        textarea,
        highlightedCode,
        mdRendered,
        outputRow,
        outputContent,
        outPrompt,
        promptLabel,
        updateHighlight
      };

      if (index !== null && index >= 0 && index < cells.length) {
        cells.splice(index, 0, cellObj);
        notebookContainer.insertBefore(cellEl, notebookContainer.children[index]);
      } else {
        cells.push(cellObj);
        notebookContainer.appendChild(cellEl);
      }

      updateHighlight();
      setActiveCell(cellObj);
      return cellObj;
    }

    function setActiveCell(cellObj) {
      activeCellId = cellObj.id;
      cells.forEach((c) => c.element.classList.toggle("active", c.id === activeCellId));
      cellTypeSelect.value = cellObj.type;
    }

    function getActiveCell() {
      return cells.find((c) => c.id === activeCellId) || cells[0];
    }

    function moveCell(cellObj, direction) {
      const idx = cells.indexOf(cellObj);
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= cells.length) return;
      cells.splice(idx, 1);
      cells.splice(targetIdx, 0, cellObj);
      if (direction > 0) {
        notebookContainer.insertBefore(cellObj.element, notebookContainer.children[targetIdx + 1] || null);
      } else {
        notebookContainer.insertBefore(cellObj.element, notebookContainer.children[targetIdx]);
      }
      setActiveCell(cellObj);
    }

    function deleteCell(cellObj) {
      if (cells.length <= 1) {
        showToast("Notebook must have at least one cell");
        return;
      }
      const idx = cells.indexOf(cellObj);
      cellObj.element.remove();
      cells.splice(idx, 1);
      const nextActive = cells[Math.min(idx, cells.length - 1)];
      if (nextActive) setActiveCell(nextActive);
    }

    function diagnosePythonError(err, code, executionCount) {
      const rawMsg = err ? (err.message || String(err)) : "خطأ غير معروف";
      const lines = (code || "").split("\n");
      let lineNum = 1;
      let errorType = "Python Error";
      let arabicReason = "";
      let arabicSolution = "";
      let suggestedCode = code;

      if (err && err.stack) {
        const match = err.stack.match(/<anonymous>:(\d+):(\d+)/) || err.stack.match(/eval.*:(\d+):(\d+)/);
        if (match) {
          lineNum = Math.max(1, Math.min(lines.length, parseInt(match[1], 10) - 2));
        }
      }

      const faultyLine = lines[lineNum - 1] || lines[0] || "";

      if (/is not defined/i.test(rawMsg)) {
        errorType = "NameError (متغير غير معرّف)";
        const varMatch = rawMsg.match(/([a-zA-Z0-9_]+) is not defined/i);
        const varName = varMatch ? varMatch[1] : "المتغير";
        arabicReason = `المتغير أو الدالة '${varName}' تم استخدامها قبل تعريفها في الكود، أو أنها موجودة في خلية سابقة لم يتم تشغيلها بعد.`;
        arabicSolution = `تأكد من كتابة اسم '${varName}' بشكل صحيح، أو قم بتعريف قيمته أولاً مثل: ${varName} = 0 أو استيراد المكتبة الخاصة به.`;
        suggestedCode = `${varName} = 0\n` + code;
      } else if (/syntaxerror|unexpected token/i.test(rawMsg)) {
        errorType = "SyntaxError (خطأ نحوي في صياغة بايثون)";
        if (/(if|for|while|def|elif|else)\b/i.test(faultyLine) && !faultyLine.trim().endsWith(":")) {
          arabicReason = `نسيت وضع علامة النقطتين (:) في نهاية سطر (${faultyLine.trim()}).`;
          arabicSolution = `في بايثون، يجب إنهاء جمل الشروط (if/elif/else) والدوال (def) وحلقات التكرار (for/while) بنقطتين (:).`;
          const fixedLines = [...lines];
          fixedLines[lineNum - 1] = faultyLine + ":";
          suggestedCode = fixedLines.join("\n");
        } else if (/\([^\)]*$/m.test(code)) {
          arabicReason = "يوجد قوس مفتوح '(' لم يتم إغلاقه بقوس ')' في الكود.";
          arabicSolution = "تأكد من إغلاق جميع الأقواس الدائرية () والمربعة [] والمجعدة {}.";
          suggestedCode = code + ")";
        } else {
          arabicReason = `صياغة الكود غير متوافقة مع قواعد بايثون بالقرب من السطر ${lineNum}.`;
          arabicSolution = "تحقق من علامات التنصيص والأقواس وتطابق نهايات الأسطر.";
        }
      } else if (/cannot read property|is null|is undefined|typeerror/i.test(rawMsg)) {
        errorType = "TypeError (خطأ في نوع البيانات)";
        arabicReason = "تمت محاولة استدعاء دالة أو خاصية على قيمة فارغة (None / undefined) أو دمج أنواع غير متوافقة.";
        arabicSolution = "تأكد من أن الكائن أو الصورة تم إنشاؤها بنجاح وليست فارغة قبل استدعاء الدوال عليها مثل .show() أو .filter().";
      } else if (/image|file.*not found|no such file/i.test(rawMsg) || (code.includes("Image.open") && /failed/i.test(rawMsg))) {
        errorType = "FileNotFoundError (مسار الصورة غير موجود)";
        arabicReason = "مسار الصورة المحدد في الكود غير موجود في مجلد الصور Pictures.";
        arabicSolution = "استخدم إحدى الصور المتاحة في النظام، مثل: img = Image.open('/home/alex/Pictures/wallpaper.svg') أو قم برفع صورتك الخاصة إلى مجلد Pictures.";
        suggestedCode = code.replace(/Image\.open\(['"][^'"]*['"]\)/, "Image.open('/home/alex/Pictures/wallpaper.svg')")
                            .replace(/cv2\.imread\(['"][^'"]*['"]\)/, "cv2.imread('/home/alex/Pictures/wallpaper.svg')");
      } else if (/zero division|division by zero/i.test(rawMsg) || /\/\s*0\b/.test(faultyLine)) {
        errorType = "ZeroDivisionError (قسمة على صفر)";
        arabicReason = "تمت محاولة القسمة على الصفر، وهي عملية غير مقبولة رياضياً.";
        arabicSolution = "تأكد من أن المتغير في المقام لا يحمل القيمة صفر قبل تنفيذ القسمة.";
        suggestedCode = code.replace(/\/\s*0\b/g, "/ 1");
      } else if (/indent/i.test(rawMsg)) {
        errorType = "IndentationError (مسافات بادئة غير متناسقة)";
        arabicReason = "المسافات البادئة في بايثون تحدد كتل الأوامر (Blocks)، وهناك سطر مسافاته غير منتظمة.";
        arabicSolution = "استخدم 4 مسافات متناسقة (أو زر Tab) لكل سطر داخل الدوال أو جمل الشروط والتكرار.";
      } else {
        errorType = "RuntimeError (خطأ أثناء التشغيل)";
        arabicReason = `حدث خطأ أثناء تنفيذ الكود: ${rawMsg}`;
        arabicSolution = `افحص السطر رقم ${lineNum} وتأكد من صحة العمليات الحسابية والمنطقية.`;
      }

      return {
        lineNum,
        errorType,
        arabicReason,
        arabicSolution,
        suggestedCode,
        rawMsg
      };
    }

    async function runCell(cellObj, advanceToNext = false) {
      if (cellObj.type === "markdown") {
        cellObj.mdRendered.innerHTML = renderMarkdown(cellObj.content);
        cellObj.mdRendered.style.display = "block";
        cellObj.textarea.style.display = "none";
        cellObj.element.querySelector(".jp-highlighted").style.display = "none";
        if (advanceToNext) {
          const idx = cells.indexOf(cellObj);
          if (idx === cells.length - 1) createCell("code", "");
          else setActiveCell(cells[idx + 1]);
        }
        return;
      }

      setKernelStatus(true);
      executionCounter++;
      cellObj.promptLabel.textContent = `In [${executionCounter}]:`;
      cellObj.outPrompt.textContent = `Out [${executionCounter}]:`;

      const code = cellObj.textarea ? cellObj.textarea.value : cellObj.content;
      cellObj.content = code;
      activeCellOutputs = [];
      const logs = [];
      const neededPaths = extractImagePathsFromPython(code);
      const unsyncedFsImages = Object.keys(fs.entries).filter((p) => fs.entries[p]?.type === "image" && !preloadedImageCanvases.has(p));
      await Promise.all([...neededPaths, ...unsyncedFsImages].map((p) => loadFsImageToCanvas(p)));

      const pyPrint = (...args) => {
        logs.push(args.map((a) => {
          if (a === null) return "None";
          if (a === true) return "True";
          if (a === false) return "False";
          if (typeof a === "object" && a !== null) {
            try { return JSON.stringify(a, null, 2); } catch (e) { return String(a); }
          }
          return String(a);
        }).join(" "));
      };

      kernelScope.pyPrint = pyPrint;
      kernelScope.__last_expr_val__ = undefined;
      kernelScope.__last_assigned_var__ = undefined;

      // Register any assigned variables or defs into kernelScope before execution
      const assignRegex = /^[ \t]*([a-zA-Z_][a-zA-Z0-9_]*)\s*=[^=]/gm;
      let match;
      while ((match = assignRegex.exec(code)) !== null) {
        const vname = match[1];
        if (!(vname in kernelScope)) kernelScope[vname] = undefined;
      }
      const defRegex = /^[ \t]*def\s+([a-zA-Z_][a-zA-Z0-9_]*)/gm;
      while ((match = defRegex.exec(code)) !== null) {
        const fname = match[1];
        if (!(fname in kernelScope)) kernelScope[fname] = undefined;
      }

      cellObj.outputContent.innerHTML = "";
      cellObj.outputRow.style.display = "flex";

      try {
        const transpiled = transpileCellPython(code);
        const runner = new Function("scope", `with (scope) {\n${transpiled}\n}`);
        runner(kernelScope);

        // Auto-display last expression if it evaluated to an image or printable value
        if (kernelScope.__last_expr_val__ !== undefined) {
          const val = kernelScope.__last_expr_val__;
          if (val instanceof JupyterImage) {
            val.show();
          } else if (val && typeof val === "object" && val._isImageArray) {
            Image.fromarray(val).show();
          } else if (typeof val !== "function") {
            pyPrint(val);
          }
        }

        // Auto-display any pending matplotlib plots (e.g. if user wrote plt.imshow(img) without plt.show())
        if (kernelScope.plt && kernelScope.plt._plots && kernelScope.plt._plots.length > 0 && activeCellOutputs.length === 0) {
          kernelScope.plt.show();
        }

        // Auto-display image if the last statement was an image assignment and nothing has output yet
        if (activeCellOutputs.length === 0 && kernelScope.__last_assigned_var__) {
          const assigned = kernelScope[kernelScope.__last_assigned_var__];
          if (assigned instanceof JupyterImage) {
            assigned.show();
          } else if (assigned && typeof assigned === "object" && assigned._isImageArray) {
            Image.fromarray(assigned).show();
          }
        }

        if (logs.length > 0) {
          const pre = document.createElement("pre");
          pre.className = "jp-output-text";
          pre.textContent = logs.join("\n");
          cellObj.outputContent.appendChild(pre);
        }

        if (activeCellOutputs.length > 0) {
          const canvasBoxContainer = document.createElement("div");
          canvasBoxContainer.className = "jp-canvas-output";

          activeCellOutputs.forEach((item) => {
            const box = document.createElement("div");
            box.className = "jp-canvas-box";
            box.appendChild(item.canvas);

            const meta = document.createElement("div");
            meta.className = "jp-canvas-meta";
            meta.innerHTML = `<span>${item.canvas.width} × ${item.canvas.height} px · ${item.type === "image" ? "PIL Image" : "Matplotlib Plot"}</span>`;

            const saveBtn = document.createElement("button");
            saveBtn.className = "jp-canvas-save-btn";
            saveBtn.innerHTML = `${iconMarkup("download", 12)} Save to Pictures`;
            saveBtn.addEventListener("click", () => {
              const filename = `/home/alex/Pictures/jupyter_output_${Date.now()}.png`;
              fs.entries[filename] = {
                type: "image",
                content: item.canvas.toDataURL("image/png"),
                modified: Date.now()
              };
              saveSessionFS();
              showToast(`Saved output to ${filename}`);
            });

            meta.appendChild(saveBtn);
            box.appendChild(meta);
            canvasBoxContainer.appendChild(box);
          });

          cellObj.outputContent.appendChild(canvasBoxContainer);
        }

        if (logs.length === 0 && activeCellOutputs.length === 0) {
          cellObj.outputRow.style.display = "none";
        }
      } catch (err) {
        const errBox = document.createElement("div");
        errBox.className = "jp-output-error";
        errBox.textContent = `Traceback (most recent call last):\n  Cell In[${executionCounter}]:\nPython Error: ${err.message}`;
        cellObj.outputContent.appendChild(errBox);

        // Intelligent Arabic Error Advisor
        const diag = diagnosePythonError(err, code, executionCounter);
        const advisor = document.createElement("div");
        advisor.className = "jp-error-advisor";
        advisor.innerHTML = `
          <div class="jp-advisor-header">
            <span class="jp-advisor-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              مساعد تشخيص الأخطاء الذكي: ${escapeHtml(diag.errorType)}
            </span>
            <span class="jp-advisor-badge">السطر ${diag.lineNum}</span>
          </div>
          <div class="jp-advisor-body">
            <div class="jp-advisor-section"><strong>المشكلة:</strong> ${escapeHtml(diag.arabicReason)}</div>
            <div class="jp-advisor-section"><strong>طريقة الحل:</strong> ${escapeHtml(diag.arabicSolution)}</div>
            ${diag.suggestedCode ? `
            <div class="jp-advisor-fix">
              <div class="jp-advisor-fix-label">الكود المصحح المقترح:</div>
              <pre class="jp-advisor-code"><code>${escapeHtml(diag.suggestedCode)}</code></pre>
              <button class="jp-btn-apply-fix" type="button">تطبيق التصحيح في الخلية تلقائياً</button>
            </div>` : ""}
          </div>
        `;
        const applyBtn = advisor.querySelector(".jp-btn-apply-fix");
        if (applyBtn && diag.suggestedCode) {
          applyBtn.addEventListener("click", () => {
            cellObj.textarea.value = diag.suggestedCode;
            cellObj.content = diag.suggestedCode;
            cellObj.updateHighlight();
            showToast("تم تطبيق التصحيح المقترح في الخلية!");
          });
        }
        cellObj.outputContent.appendChild(advisor);
      } finally {
        setTimeout(() => setKernelStatus(false), 200);
      }

      if (advanceToNext) {
        const idx = cells.indexOf(cellObj);
        if (idx === cells.length - 1) {
          createCell("code", "");
        } else {
          setActiveCell(cells[idx + 1]);
        }
      }
    }

    function doSaveNotebook() {
      const title = (titleInput.value || "Untitled.ipynb").trim();
      const filename = title.endsWith(".ipynb") ? title : title + ".ipynb";
      const fullPath = `/home/alex/workspace/${filename}`;

      const nbData = {
        cells: cells.map((c) => ({
          cell_type: c.type,
          source: c.content
        })),
        metadata: {
          kernelspec: {
            display_name: "Python 3 (ipykernel)",
            language: "python",
            name: "python3"
          }
        },
        nbformat: 4,
        nbformat_minor: 5
      };

      fs.entries[fullPath] = {
        type: "file",
        content: JSON.stringify(nbData, null, 2),
        modified: Date.now()
      };
      saveSessionFS();
      checkpointText.textContent = `Last Checkpoint: ${new Date().toLocaleTimeString()} (saved)`;
      showToast(`Notebook saved to ${fullPath}`);
    }

    // Menubar & Toolbar Wiring
    body.querySelector(".jp-tool-save").addEventListener("click", doSaveNotebook);
    body.querySelector(".jp-tool-add").addEventListener("click", () => {
      const active = getActiveCell();
      const idx = cells.indexOf(active);
      createCell("code", "", idx + 1);
    });
    body.querySelector(".jp-tool-cut").addEventListener("click", () => {
      const active = getActiveCell();
      clipboardCell = { type: active.type, content: active.content };
      deleteCell(active);
      showToast("Cell cut to clipboard");
    });
    body.querySelector(".jp-tool-copy").addEventListener("click", () => {
      const active = getActiveCell();
      clipboardCell = { type: active.type, content: active.content };
      showToast("Cell copied to clipboard");
    });
    body.querySelector(".jp-tool-paste").addEventListener("click", () => {
      if (!clipboardCell) { showToast("Clipboard is empty"); return; }
      const active = getActiveCell();
      const idx = cells.indexOf(active);
      createCell(clipboardCell.type, clipboardCell.content, idx + 1);
      showToast("Cell pasted");
    });
    body.querySelector(".jp-tool-run").addEventListener("click", () => {
      const active = getActiveCell();
      if (active) runCell(active, true);
    });
    body.querySelector(".jp-tool-interrupt").addEventListener("click", () => {
      setKernelStatus(false);
      showToast("Kernel interrupted");
    });
    body.querySelector(".jp-tool-restart").addEventListener("click", () => {
      initKernelScope();
      executionCounter = 0;
      setKernelStatus(false);
      showToast("Kernel restarted");
    });
    body.querySelector(".jp-tool-restart-run").addEventListener("click", async () => {
      initKernelScope();
      executionCounter = 0;
      showToast("Restarting kernel and running all cells...");
      for (const c of cells) {
        await runCell(c, false);
      }
    });

    cellTypeSelect.addEventListener("change", () => {
      const active = getActiveCell();
      if (active) {
        active.type = cellTypeSelect.value;
        active.element.dataset.type = active.type;
        active.promptLabel.textContent = active.type === "code" ? "In [ ]:" : "Md:";
        if (active.type === "markdown") {
          active.outputRow.style.display = "none";
        }
        active.updateHighlight();
      }
    });

    // Menubar Buttons
    body.querySelectorAll(".jp-menu-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const menu = btn.dataset.menu;
        if (menu === "file") {
          doSaveNotebook();
        } else if (menu === "cell") {
          const active = getActiveCell();
          if (active) runCell(active, true);
        } else if (menu === "kernel") {
          initKernelScope();
          executionCounter = 0;
          showToast("Kernel restarted");
        } else if (menu === "view") {
          cells.forEach((c) => {
            c.outputRow.style.display = "none";
            c.outputContent.innerHTML = "";
          });
          showToast("All outputs cleared");
        } else if (menu === "insert") {
          const active = getActiveCell();
          const idx = cells.indexOf(active);
          createCell("code", "", idx + 1);
        } else if (menu === "edit") {
          const active = getActiveCell();
          if (active) deleteCell(active);
        } else if (menu === "help") {
          showDialog({
            title: "Jupyter Anaconda Help & Shortcuts",
            message: "• Shift + Enter: Run cell and advance\n• Ctrl + Enter: Run cell in-place\n• Alt + Enter: Run cell & insert new cell below\n• Tab: Indent 4 spaces\n• Paste an image path to auto-load and process it\n\nPackages installed: OpenCV (cv2), Pillow (Image), scikit-image, NumPy, Matplotlib, SciPy, imageio"
          });
        }
      });
    });

    // Quick Demos selector
    const demosSelect = body.querySelector(".jp-tool-demos");
    demosSelect.addEventListener("change", () => {
      const val = demosSelect.value;
      if (!val) return;

      if (val === "clear") {
        cells.forEach((c) => c.element.remove());
        cells = [];
        createCell("code", "");
      } else if (val === "cv") {
        createCell("code", `# [Computer Vision] Anaconda Image Processing with Pillow & OpenCV
import numpy as np
from PIL import Image

# 1. Load image and inspect resolution
img = Image.open("sample.png")
print(f"Loaded image: {img.size[0]}x{img.size[1]} px")
img.show()

# 2. Apply Sobel Edge Detection (Computer Vision)
edges = img.filter("edges")
print("Sobel Edge Filter output:")
edges.show()

# 3. Apply Warm Sepia Filter
sepia = img.filter("sepia")
print("Warm Sepia Filter output:")
sepia.show()`);
      } else if (val === "plot") {
        createCell("code", `# [Data Visualization] Matplotlib Charts & Mathematical Waves
import matplotlib.pyplot as plt
import numpy as np

plt.figure(figsize=(7, 3.5))
x = np.linspace(0, 4 * np.pi, 60)
y = np.sin(x)

plt.plot(x, y, color="#00c3ff", label="sin(x)")
plt.title("Trigonometric Sine Wave - Orbit Linux")
plt.xlabel("Phase Angle (rad)")
plt.ylabel("Signal Amplitude")
plt.grid(True)
plt.show()`);
      } else if (val === "numpy") {
        createCell("code", `# [NumPy Analysis] Numerical Analysis & Statistics
import numpy as np

data = np.array([12, 45, 67, 89, 23, 56, 78, 90, 34, 55])
print("Array data:", data)
print("Mean:", data.mean())
print("Std Deviation:", round(data.std(), 2))
print("Min value:", data.min())
print("Max value:", data.max())
print("Sum total:", data.sum())`);
      } else if (val === "python") {
        createCell("code", `# [Algorithms] Python Logic & Loops
def fibonacci(n):
    a = 0
    b = 1
    seq = []
    for i in range(n):
        seq.push(a)
        nxt = a + b
        a = b
        b = nxt
    return seq

print("First 10 Fibonacci numbers:", fibonacci(10))`);
      }
      demosSelect.value = "";
    });

    notebookContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });
    notebookContainer.addEventListener("drop", async (e) => {
      e.preventDefault();
      const files = [...(e.dataTransfer.files || [])].filter((f) => f.type.startsWith("image/") || /\.(svg|png|jpe?g|gif|webp|avif)$/i.test(f.name));
      if (!files.length) return;
      importFolder = "/home/alex/Pictures";
      const file = files[0];
      const path = uniquePath(`/home/alex/Pictures/${basename(file.name)}`);
      const content = await readAsDataUrl(file);
      fs.entries[path] = { type: "image", content, modified: Date.now() };
      persist();
      await loadFsImageToCanvas(path);
      renderDesktopFiles();
      refreshFiles();
      const cell = createCell("code", jupyterProcessCodeForPath(path));
      setActiveCell(cell);
      await runCell(cell, false);
      showToast(`Loaded ${basename(path)} into Jupyter`);
    });

    const jupyterWin = body.closest(".window");
    if (jupyterWin) {
      jupyterWin.addEventListener("orbit-open-image", (ev) => {
        const imagePath = ev.detail && ev.detail.path;
        if (!imagePath) return;
        loadFsImageToCanvas(imagePath).then(() => {
          const cell = createCell("code", jupyterProcessCodeForPath(imagePath));
          setActiveCell(cell);
          runCell(cell, false);
        });
      });
    }

    // Start with a clean notebook, or immediately process an opened image path
    if (options.imagePath || (options.path && fs.entries[options.path]?.type === "image")) {
      const imagePath = options.imagePath || options.path;
      const initialCell = createCell("code", jupyterProcessCodeForPath(imagePath));
      setActiveCell(initialCell);
      loadFsImageToCanvas(imagePath).then(() => runCell(initialCell, false));
    } else {
      const initialCell = createCell("code", "");
      setActiveCell(initialCell);
    }
  }

  function buildImage(body, path) {
    body.className = "window-body image-body";
    const entry = fs.entries[path];
    if (!entry || entry.type !== "image") { body.innerHTML = `<div class="empty-state">Image could not be opened.</div>`; return; }
    body.innerHTML = `<img src="${imageSource(entry.content)}" alt="${escapeHtml(basename(path))}"><div class="image-caption">${escapeHtml(path)}</div>`;
  }

  function buildBrowser(body, options = {}) {
    body.className = "window-body browser-body";
    let currentPath = options.path || null;
    let currentUrl = options.url || null;
    let currentMode = options.mode || (options.path || options.url ? "web" : options.query ? "images" : "web");

    body.innerHTML = `
      <div class="browser-header">
        <div class="browser-nav-buttons">
          <button class="b-btn b-back" title="Back">${iconMarkup("folder", 14)}</button>
          <button class="b-btn b-forward" title="Forward">${iconMarkup("folder", 14)}</button>
          <button class="b-btn b-reload" title="Reload">${iconMarkup("recent", 14)}</button>
          <button class="b-btn b-home" title="Home">${iconMarkup("home", 14)}</button>
        </div>
        <div class="browser-address-container">
          <span class="browser-badge ${currentPath ? 'local-badge' : ''}" id="bBadge">${currentPath ? iconMarkup("documents", 12) + ' Local File' : iconMarkup("web", 12) + ' Web'}</span>
          <input class="browser-address-input" placeholder="Search web, images, or enter /home/alex/Desktop/file.html..." spellcheck="false" autocomplete="off" value="${escapeHtml(currentPath ? `file://${currentPath}` : currentUrl || '')}">
          <button class="browser-go-btn" title="Go / Search">${iconMarkup("play", 12)}</button>
        </div>
        <div class="browser-tabs">
          <button class="b-tab ${currentMode === 'web' ? 'active' : ''}" data-tab="web" title="Web & Local HTML Files">${iconMarkup("web", 13)} Browser</button>
          <button class="b-tab ${currentMode === 'images' ? 'active' : ''}" data-tab="images" title="Search & Download Images">${iconMarkup("pictures", 13)} Image Search</button>
          <button class="b-tab ${currentMode === 'playground' ? 'active' : ''}" data-tab="playground" title="Live HTML & Code Playground">${iconMarkup("code", 13)} Playground</button>
        </div>
      </div>
      <div class="browser-main">
        <div class="b-view b-view-web" ${currentMode !== 'web' ? 'hidden' : ''}>
          <div class="b-file-bar" ${!currentPath ? 'hidden' : ''}>
            <span class="b-file-label">${iconMarkup("documents", 13)} Viewing: <strong class="b-file-path">${escapeHtml(currentPath || '')}</strong></span>
            <div class="b-file-actions">
              <button class="b-action-btn b-edit-btn">${iconMarkup("editor", 12)} Edit in Text Editor</button>
              <button class="b-action-btn b-export-btn">${iconMarkup("save", 12)} Save to PC</button>
            </div>
          </div>
          <div class="b-home-page" ${currentPath || currentUrl ? 'hidden' : ''}>
            <div class="b-home-hero">
              <span class="b-home-logo">${iconMarkup("orbit", 36)}</span>
              <h1 class="b-home-title">Orbit Web Browser</h1>
              <p class="b-home-sub">Run real HTML/JS web projects, search & download images, or code live in the playground.</p>
            </div>
            <div class="b-home-search-box">
              <input class="b-home-search-input" placeholder="Search web, images, or enter a file path (e.g. index.html)...">
              <button class="b-home-search-btn">Search / Open</button>
            </div>
            <div class="b-home-section-title">Quick Actions</div>
            <div class="b-home-grid">
              <div class="b-feature-card" data-action="images">
                <span class="card-icon">${iconMarkup("pictures", 24)}</span>
                <strong>Image Search & Downloader</strong>
                <small>Search millions of images online and download directly into Pictures or Desktop.</small>
              </div>
              <div class="b-feature-card" data-action="playground">
                <span class="card-icon">${iconMarkup("code", 24)}</span>
                <strong>Live Code Playground</strong>
                <small>Write HTML, CSS, and JS and see the live rendering execute in real time.</small>
              </div>
              <div class="b-feature-card" data-action="new-html">
                <span class="card-icon">${iconMarkup("newfile", 24)}</span>
                <strong>Create New HTML Page</strong>
                <small>Create an HTML file in your virtual home and open it in the editor.</small>
              </div>
            </div>
            <div class="b-home-section-title">My HTML Projects in Orbit Linux</div>
            <div class="b-projects-list"></div>
          </div>
          <iframe class="b-iframe" sandbox="allow-scripts allow-modals allow-forms allow-same-origin" ${!currentPath && !currentUrl ? 'hidden' : ''}></iframe>
        </div>

        <div class="b-view b-view-images" ${currentMode !== 'images' ? 'hidden' : ''}>
          <div class="img-search-bar">
            <div class="img-input-wrap">
              <span style="font-size:14px;color:#858897;">${iconMarkup("search", 14)}</span>
              <input class="img-search-input" placeholder="Search any image (e.g. nature, cats, space, cars, anime, wallpaper...)" value="${escapeHtml(options.query || '')}">
              <button class="img-search-btn">Search Images</button>
            </div>
            <div class="img-tags">
              <button class="img-tag" data-q="Space nebula">${iconMarkup("orbit", 11)} Space</button>
              <button class="img-tag" data-q="Nature landscape">${iconMarkup("pictures", 11)} Nature</button>
              <button class="img-tag" data-q="Cute cats">${iconMarkup("home", 11)} Cats</button>
              <button class="img-tag" data-q="Sports cars">${iconMarkup("computer", 11)} Cars</button>
              <button class="img-tag" data-q="Cyberpunk city">${iconMarkup("web", 11)} Cyberpunk</button>
              <button class="img-tag" data-q="Computer programming code">${iconMarkup("code", 11)} Coding</button>
              <button class="img-tag" data-q="Digital artwork">${iconMarkup("editor", 11)} Art</button>
              <button class="img-tag" data-q="Beautiful flowers">${iconMarkup("brightness", 11)} Flowers</button>
            </div>
          </div>
          <div class="img-results-status"><span>Type a keyword or choose a category to discover images.</span></div>
          <div class="img-grid"></div>
        </div>

        <div class="b-view b-view-playground" ${currentMode !== 'playground' ? 'hidden' : ''}>
          <div class="playground-layout">
            <div class="playground-editor-pane">
              <div class="playground-pane-header">
                <span>Code Editor (HTML / CSS / JS)</span>
                <div class="playground-tools">
                  <select class="playground-templates">
                    <option value="counter">Template: Interactive Counter</option>
                    <option value="card">Template: Glass Card</option>
                    <option value="canvas">Template: Animated Canvas</option>
                  </select>
                  <button class="b-action-btn primary pg-save-btn">${iconMarkup("save", 12)} Save as File</button>
                </div>
              </div>
              <textarea class="playground-code" spellcheck="false"></textarea>
            </div>
            <div class="playground-preview-pane">
              <div class="playground-pane-header">
                <span>${iconMarkup("code", 12)} Live Rendered Preview</span>
                <button class="b-action-btn pg-run-btn">${iconMarkup("play", 11)} Refresh Live</button>
              </div>
              <iframe class="playground-iframe" sandbox="allow-scripts allow-modals allow-forms allow-same-origin"></iframe>
            </div>
          </div>
        </div>
      </div>
    `;

    const addressInput = body.querySelector(".browser-address-input");
    const badge = body.querySelector("#bBadge");
    const iframe = body.querySelector(".b-iframe");
    const homePage = body.querySelector(".b-home-page");
    const fileBar = body.querySelector(".b-file-bar");
    const filePathLabel = body.querySelector(".b-file-path");
    const editBtn = body.querySelector(".b-edit-btn");
    const exportBtn = body.querySelector(".b-export-btn");
    const projectsList = body.querySelector(".b-projects-list");

    const imgInput = body.querySelector(".img-search-input");
    const imgSearchBtn = body.querySelector(".img-search-btn");
    const imgGrid = body.querySelector(".img-grid");
    const imgStatus = body.querySelector(".img-results-status");

    const pgCode = body.querySelector(".playground-code");
    const pgIframe = body.querySelector(".playground-iframe");
    const pgRunBtn = body.querySelector(".pg-run-btn");
    const pgSaveBtn = body.querySelector(".pg-save-btn");
    const pgTemplates = body.querySelector(".playground-templates");

    function switchTab(mode) {
      currentMode = mode;
      body.querySelectorAll(".b-tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === mode));
      body.querySelectorAll(".b-view").forEach((v) => {
        v.hidden = !v.classList.contains(`b-view-${mode}`);
      });
      if (mode === "web") {
        badge.textContent = currentPath ? "Local File" : "Web";
        badge.classList.toggle("local-badge", Boolean(currentPath));
        addressInput.value = currentPath ? `file://${currentPath}` : currentUrl || "";
      } else if (mode === "images") {
        badge.textContent = "Images";
        badge.classList.remove("local-badge");
        addressInput.value = imgInput.value ? `images:${imgInput.value}` : "images:";
      } else if (mode === "playground") {
        badge.textContent = "Playground";
        badge.classList.remove("local-badge");
        addressInput.value = "orbit://playground";
      }
    }

    body.querySelectorAll(".b-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });

    function renderProjectsList() {
      projectsList.replaceChildren();
      const htmlFiles = Object.keys(fs.entries).filter((k) => (k.toLowerCase().endsWith(".html") || k.toLowerCase().endsWith(".htm")) && fs.entries[k].type !== "dir");
      if (!htmlFiles.length) {
        projectsList.innerHTML = `<small style="color:#7f8290;">No HTML files found yet. Click 'Create New HTML Page' or write code in the editor!</small>`;
        return;
      }
      htmlFiles.forEach((path) => {
        const item = document.createElement("div");
        item.className = "b-project-card";
        const bytes = encoder.encode(fs.entries[path].content || "").length;
        item.innerHTML = `<span style="display:inline-flex;align-items:center;">${iconMarkup("web", 16)}</span><div><strong>${escapeHtml(basename(path))}</strong><small>${escapeHtml(path)} · ${bytes}B</small></div>`;
        item.addEventListener("click", () => navigateWeb(path));
        projectsList.append(item);
      });
    }

    function navigateWeb(target) {
      if (!target) {
        currentPath = null;
        currentUrl = null;
        homePage.hidden = false;
        fileBar.hidden = true;
        iframe.hidden = true;
        addressInput.value = "";
        badge.textContent = "Web";
        badge.classList.remove("local-badge");
        renderProjectsList();
        switchTab("web");
        return;
      }

      let cleanTarget = target.trim();
      if (cleanTarget.startsWith("file://")) cleanTarget = cleanTarget.slice(7);

      if (cleanTarget.startsWith("http://") || cleanTarget.startsWith("https://")) {
        currentPath = null;
        currentUrl = cleanTarget;
        homePage.hidden = true;
        fileBar.hidden = true;
        iframe.hidden = false;
        iframe.removeAttribute("srcdoc");
        iframe.src = cleanTarget;
        addressInput.value = cleanTarget;
        badge.textContent = "Web";
        badge.classList.remove("local-badge");
        switchTab("web");
        return;
      }

      const localPath = normalize(cleanTarget, "/home/alex");
      if (fs.entries[localPath] && fs.entries[localPath].type !== "dir") {
        currentPath = localPath;
        currentUrl = null;
        homePage.hidden = true;
        fileBar.hidden = false;
        filePathLabel.textContent = localPath;
        iframe.hidden = false;
        iframe.removeAttribute("src");

        const rawContent = fs.entries[localPath].content || "";
        const processed = resolveVirtualHtml(rawContent, localPath);
        iframe.srcdoc = processed;

        addressInput.value = `file://${localPath}`;
        badge.textContent = "Local File";
        badge.classList.add("local-badge");

        const win = body.closest(".window");
        if (win) {
          win.dataset.path = localPath;
          win.querySelector(".window-title").textContent = basename(localPath);
        }
        switchTab("web");
        return;
      }

      if (cleanTarget.startsWith("images:") || cleanTarget.length < 50 && !cleanTarget.includes("/")) {
        const query = cleanTarget.replace(/^images:\s*/i, "");
        switchTab("images");
        imgInput.value = query;
        performImageSearch(query);
        return;
      }

      showToast(`Cannot find file: ${cleanTarget}`);
    }

    body.querySelector(".b-back").addEventListener("click", () => {
      navigateWeb(null);
    });
    body.querySelector(".b-reload").addEventListener("click", () => {
      if (currentPath) navigateWeb(currentPath);
      else if (currentUrl) iframe.src = currentUrl;
      else renderProjectsList();
    });
    body.querySelector(".b-home").addEventListener("click", () => navigateWeb(null));

    body.querySelector(".browser-go-btn").addEventListener("click", () => {
      navigateWeb(addressInput.value);
    });
    addressInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") navigateWeb(addressInput.value);
    });

    body.querySelector(".b-home-search-btn").addEventListener("click", () => {
      const val = body.querySelector(".b-home-search-input").value;
      if (val) navigateWeb(val);
    });
    body.querySelector(".b-home-search-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") navigateWeb(e.target.value);
    });

    body.querySelectorAll(".b-feature-card").forEach((card) => {
      card.addEventListener("click", () => {
        const action = card.dataset.action;
        if (action === "images") switchTab("images");
        else if (action === "playground") switchTab("playground");
        else if (action === "new-html") createDesktopHtml();
      });
    });

    editBtn.addEventListener("click", () => {
      if (currentPath) openWindow("editor", { path: currentPath });
    });
    exportBtn.addEventListener("click", () => {
      if (currentPath && fs.entries[currentPath]) {
        downloadToComputer(`data:text/html;charset=utf-8,${encodeURIComponent(fs.entries[currentPath].content || "")}`, basename(currentPath));
      }
    });

    const curatedGalleries = {
      space: [
        { title: "Carina Nebula Cosmic Cliffs", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/STS-125_Hubble_in_cargo_bay.jpg/800px-STS-125_Hubble_in_cargo_bay.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/STS-125_Hubble_in_cargo_bay.jpg/400px-STS-125_Hubble_in_cargo_bay.jpg" },
        { title: "Andromeda Galaxy", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/800px-Andromeda_Galaxy_%28with_h-alpha%29.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/400px-Andromeda_Galaxy_%28with_h-alpha%29.jpg" },
        { title: "Pillars of Creation", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoise.jpg/800px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoise.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoise.jpg/400px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoise.jpg" }
      ],
      cats: [
        { title: "Fluffy Ginger Cat", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/400px-Cat03.jpg" },
        { title: "Tabby Cat in Snow", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/800px-Felis_catus-cat_on_snow.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/400px-Felis_catus-cat_on_snow.jpg" },
        { title: "Cat with Blue Eyes", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/800px-Cat_November_2010-1a.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/400px-Cat_November_2010-1a.jpg" }
      ],
      nature: [
        { title: "Mountain Peak in Autumn", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Peak_autumn_in_the_Adirondacks.jpg/800px-Peak_autumn_in_the_Adirondacks.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Peak_autumn_in_the_Adirondacks.jpg/400px-Peak_autumn_in_the_Adirondacks.jpg" },
        { title: "Matterhorn Lake Reflection", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Matterhorn_Riffelsee_2019-08-11.jpg/800px-Matterhorn_Riffelsee_2019-08-11.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Matterhorn_Riffelsee_2019-08-11.jpg/400px-Matterhorn_Riffelsee_2019-08-11.jpg" }
      ],
      cars: [
        { title: "Classic Red Sports Car", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ferrari_250_GTO_-_Flickr_-_supermac1961_%281%29.jpg/800px-Ferrari_250_GTO_-_Flickr_-_supermac1961_%281%29.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ferrari_250_GTO_-_Flickr_-_supermac1961_%281%29.jpg/400px-Ferrari_250_GTO_-_Flickr_-_supermac1961_%281%29.jpg" },
        { title: "Modern Supercar", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_Genf_2018.jpg/800px-Bugatti_Chiron_Genf_2018.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_Genf_2018.jpg/400px-Bugatti_Chiron_Genf_2018.jpg" }
      ]
    };

    async function performImageSearch(query) {
      if (!query || !query.trim()) return;
      const q = query.trim();
      imgStatus.innerHTML = `<span>Searching live images for "<strong>${escapeHtml(q)}</strong>"...</span>`;
      imgGrid.innerHTML = `<div class="empty-state">Loading images...</div>`;

      let images = [];
      try {
        const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=24&prop=imageinfo|pageimages&iiprop=url|size&pithumbsize=640&format=json&origin=*`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          if (data?.query?.pages) {
            images = Object.values(data.query.pages)
              .map((p) => {
                const info = p.imageinfo?.[0];
                const rawUrl = info?.url;
                if (!rawUrl || /\.(tiff?|ogg|ogv|pdf)$/i.test(rawUrl)) return null;
                return {
                  title: (p.title || "Image").replace(/^File:/i, "").replace(/\.[^.]+$/, ""),
                  url: rawUrl,
                  thumb: p.thumbnail?.source || rawUrl,
                  width: info?.width || 800,
                  height: info?.height || 600
                };
              })
              .filter(Boolean);
          }
        }
      } catch (err) {
        console.warn("Live image search error:", err);
      }

      if (!images.length) {
        const lq = q.toLowerCase();
        for (const [key, list] of Object.entries(curatedGalleries)) {
          if (lq.includes(key)) {
            images = list;
            break;
          }
        }
      }

      if (!images.length) {
        images = [
          { title: `${q} 1`, url: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000`, thumb: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=500` },
          { title: `${q} 2`, url: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000`, thumb: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500` },
          { title: `${q} 3`, url: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000`, thumb: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500` }
        ];
      }

      imgStatus.innerHTML = `<span>Found ${images.length} images for "<strong>${escapeHtml(q)}</strong>"</span><small>Click download options to save into Orbit Linux</small>`;
      imgGrid.replaceChildren();

      images.forEach((img) => {
        const card = document.createElement("div");
        card.className = "img-card";
        card.innerHTML = `
          <div class="img-card-thumb-wrap">
            <img class="img-card-thumb" src="${escapeHtml(img.thumb)}" alt="${escapeHtml(img.title)}" loading="lazy">
            <span class="img-card-dim">${img.width ? `${img.width}×${img.height}` : "HD"}</span>
          </div>
          <div class="img-card-body">
            <div class="img-card-title" title="${escapeHtml(img.title)}">${escapeHtml(img.title)}</div>
            <div class="img-card-actions">
              <button class="img-btn img-btn-pic">${iconMarkup("pictures", 13)} Pictures</button>
              <button class="img-btn img-btn-desk">${iconMarkup("home", 13)} Desktop</button>
              <button class="img-btn img-btn-down">${iconMarkup("download", 13)} Downloads</button>
              <button class="img-btn img-btn-wall">${iconMarkup("brightness", 13)} Wallpaper</button>
            </div>
          </div>
        `;

        card.querySelector(".img-btn-pic").addEventListener("click", () => {
          saveRemoteImageToOrbit(img.thumb || img.url, img.title, "/home/alex/Pictures");
        });
        card.querySelector(".img-btn-desk").addEventListener("click", () => {
          saveRemoteImageToOrbit(img.thumb || img.url, img.title, "/home/alex/Desktop");
        });
        card.querySelector(".img-btn-down").addEventListener("click", () => {
          saveRemoteImageToOrbit(img.thumb || img.url, img.title, "/home/alex/Downloads");
        });
        card.querySelector(".img-btn-wall").addEventListener("click", () => {
          setAsWallpaper(img.thumb || img.url);
        });
        card.querySelector(".img-card-thumb").addEventListener("click", () => {
          saveRemoteImageToOrbit(img.thumb || img.url, img.title, "/home/alex/Pictures");
        });

        imgGrid.append(card);
      });
    }

    imgSearchBtn.addEventListener("click", () => performImageSearch(imgInput.value));
    imgInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") performImageSearch(imgInput.value);
    });
    body.querySelectorAll(".img-tag").forEach((btn) => {
      btn.addEventListener("click", () => {
        imgInput.value = btn.dataset.q;
        performImageSearch(btn.dataset.q);
      });
    });

    // Playground implementation
    const templates = {
      counter: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #0f111a; color: #fff; display: grid; place-items: center; min-height: 90vh; margin: 0; }
    .card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); padding: 35px; border-radius: 20px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); width: 340px; }
    h2 { margin: 0 0 10px; font-size: 24px; color: #b7aaff; }
    .count { font-size: 52px; font-weight: 700; color: #6ef0b0; margin: 15px 0; font-family: monospace; }
    button { background: #7c4dff; color: white; border: none; padding: 12px 24px; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 600; margin: 5px; transition: 0.15s; }
    button:hover { background: #651fff; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <h2>Live Sandbox</h2>
    <div class="count" id="c">0</div>
    <button onclick="add(1)">+ Add</button>
    <button onclick="add(-1)" style="background:#444;">- Sub</button>
  </div>
  <script>
    let n = 0;
    function add(v) {
      n += v;
      document.getElementById('c').textContent = n;
    }
  </script>
</body>
</html>`,
      card: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: system-ui, sans-serif; background: radial-gradient(circle, #2c1654, #0a0b12); color: #fff; display: flex; align-items: center; justify-content: center; min-height: 95vh; margin: 0; }
    .glass { background: rgba(255,255,255,0.07); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.18); border-radius: 24px; padding: 40px; width: 380px; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
    h1 { font-size: 26px; background: linear-gradient(135deg, #fff, #a795ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #a9abbd; line-height: 1.6; }
    .badge { display: inline-block; padding: 5px 14px; background: #8e7ff233; color: #bcaeff; border-radius: 20px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="glass">
    <span class="badge">Glassmorphism UI</span>
    <h1>Orbit Web Design</h1>
    <p>This beautiful glassmorphism card is rendered with real HTML & CSS right inside your browser session.</p>
  </div>
</body>
</html>`,
      canvas: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; overflow: hidden; background: #0b0c10; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="cv"></canvas>
  <script>
    const cv = document.getElementById('cv');
    const ctx = cv.getContext('2d');
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    const pts = Array.from({length: 60}, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r: Math.random() * 3 + 2,
      c: '#'+Math.floor(Math.random()*16777215).toString(16)
    }));
    function draw() {
      ctx.fillStyle = 'rgba(11, 12, 16, 0.2)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cv.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`
    };

    pgCode.value = templates.counter;
    function updatePlayground() {
      pgIframe.srcdoc = pgCode.value;
    }
    updatePlayground();

    let pgTimer;
    pgCode.addEventListener("input", () => {
      clearTimeout(pgTimer);
      pgTimer = setTimeout(updatePlayground, 400);
    });
    pgRunBtn.addEventListener("click", updatePlayground);

    pgTemplates.addEventListener("change", (e) => {
      if (templates[e.target.value]) {
        pgCode.value = templates[e.target.value];
        updatePlayground();
      }
    });

    pgSaveBtn.addEventListener("click", () => {
      showInputDialog("Save Playground Code", "File name", "my_playground.html", "Save", (name) => {
        if (!name || !name.trim()) return;
        let clean = name.trim();
        if (!clean.toLowerCase().endsWith(".html") && !clean.toLowerCase().endsWith(".htm")) clean += ".html";
        const target = normalize(clean, "/home/alex/Desktop");
        fs.entries[target] = { type: "text", content: pgCode.value, modified: Date.now() };
        persist();
        renderDesktopFiles();
        refreshFiles();
        showToast(`Saved to ${target}`);
      });
    });

    if (currentPath) navigateWeb(currentPath);
    else if (currentUrl) navigateWeb(currentUrl);
    else if (options.query) {
      switchTab("images");
      imgInput.value = options.query;
      performImageSearch(options.query);
    } else {
      renderProjectsList();
      switchTab("web");
    }
  }

  function buildSettings(body) {
    body.className = "window-body settings-body";
    body.innerHTML = `<h2>System Settings</h2><div class="setting-row"><div>Appearance<small>Dark style · Orbit wallpaper</small></div><button class="switch on" aria-label="Toggle dark style"></button></div><div class="setting-row"><div>Display<small>Adjust screen brightness</small></div><input type="range" min="20" max="100" value="82"></div><div class="setting-row"><div>Sound<small>Output device · Built-in speakers</small></div><input type="range" min="0" max="100" value="65"></div><div class="setting-row"><div>About<small>Orbit Linux Web 1.0 · Browser virtual machine</small></div><span>ⓘ</span></div><div class="setting-row"><div>Storage<small>${Object.keys(fs.entries).length} virtual files and folders · saved locally</small></div><span>▣</span></div>`;
    body.querySelector(".switch").addEventListener("click", (event) => event.currentTarget.classList.toggle("on"));
  }

  function refreshFiles() {
    area.querySelectorAll(".files-window").forEach((win) => {
      const refresh = win.querySelector(".refresh");
      if (refresh) refresh.click();
    });
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2300);
  }

  paintIcons();
  renderDesktopFiles();
  document.querySelectorAll(".desktop-icon:not(.desktop-file-icon)").forEach((button) => {
    enableDesktopDrag(button, document.querySelector(".desktop-icons"));
    button.addEventListener("click", (event) => {
      if (button.dataset.dragged) { delete button.dataset.dragged; return; }
      if (isMobileMode()) {
        openDesktopShortcut(button.dataset.open);
        return;
      }
      if (!event.ctrlKey && !event.metaKey) document.querySelectorAll(".desktop-icon").forEach((item) => item.classList.toggle("selected", item === button));
    });
    button.addEventListener("dblclick", () => openDesktopShortcut(button.dataset.open));
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = button.dataset.open;
      showContextMenu([
        { label: "Open", icon: target === "home" ? "home" : target === "pictures" ? "pictures" : target === "trash" ? "trash" : "terminal", action: () => openDesktopShortcut(target) },
        { separator: true },
        { label: "Properties", icon: "settings", action: () => {
          const map = { home: "/home/alex", pictures: "/home/alex/Pictures", trash: "/home/alex/Trash", vscode: "/home/alex" };
          if (map[target]) showProperties(map[target]);
          else showToast(`${button.innerText.trim()} · System shortcut`);
        }}
      ], event.clientX, event.clientY);
    });
  });
  document.querySelector(".desktop-icons").addEventListener("contextmenu", (event) => {
    if (event.target.closest(".desktop-icon")) return;
    event.preventDefault();
    showContextMenu(desktopIconMenu(), event.clientX, event.clientY);
  });
  document.querySelector(".desktop").addEventListener("contextmenu", (event) => {
    if (event.target.closest(".window, .dock, .topbar, .quick-settings, .show-apps, .context-menu, .desktop-icon")) return;
    event.preventDefault();
    showContextMenu(desktopIconMenu(), event.clientX, event.clientY);
  });
  document.querySelector(".desktop").addEventListener("click", (event) => {
    if (event.target.closest(".context-menu")) return;
    hideContextMenu();
    if (event.target === document.querySelector(".desktop")) {
      document.querySelectorAll(".desktop-icon").forEach((item) => item.classList.remove("selected"));
      window.selectedEntry = null;
    }
  });
  document.querySelector(".desktop").addEventListener("dragover", (event) => {
    if (event.dataTransfer.types.includes("text/orbit-path")) event.preventDefault();
  });
  document.querySelector(".desktop").addEventListener("drop", (event) => {
    const source = event.dataTransfer.getData("text/orbit-path");
    if (source) {
      event.preventDefault();
      moveEntry(source, "/home/alex/Desktop");
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#contextMenu")) hideContextMenu();
  });
  systemDialog.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = dialogAction;
    closeSystemDialog();
    if (action) action();
  });
  document.getElementById("dialogCancel").addEventListener("click", closeSystemDialog);
  dialogOverlay.addEventListener("click", (event) => {
    if (event.target === dialogOverlay) closeSystemDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideContextMenu();
      if (!dialogOverlay.hidden) closeSystemDialog();
    }
    if ((event.ctrlKey || event.metaKey) && event.altKey && event.key.toLowerCase() === "t") {
      event.preventDefault();
      openWindow("terminal");
      return;
    }
    if (event.target.matches("input, textarea, [contenteditable=true]")) return;
    const selected = window.selectedEntry;
    if (event.key === "F2" && selected) { event.preventDefault(); renameEntry(selected); }
    else if (event.key === "Delete" && selected) { event.preventDefault(); moveToTrash(selected); }
    else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c" && selected) {
      event.preventDefault(); fileClipboard = { path: selected, mode: "copy" };
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "x" && selected) {
      event.preventDefault(); fileClipboard = { path: selected, mode: "cut" };
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") {
      event.preventDefault();
      const activeGrid = document.activeElement.closest?.(".file-grid");
      pasteInto(activeGrid?.dataset.path || lastFileFolder || "/home/alex/Desktop");
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
      const activeGrid = document.activeElement.closest?.(".file-grid");
      if (activeGrid) {
        event.preventDefault();
        activeGrid.querySelectorAll(".file-item").forEach((item) => item.classList.add("selected"));
      }
    }
  });
  document.querySelectorAll("[data-open]:not(.desktop-icon)").forEach((button) => button.addEventListener("click", () => {
    const target = button.dataset.open;
    launcher.hidden = true;
    if (target === "home") openWindow("files", { path: "/home/alex" });
    else if (target === "pictures") openWindow("files", { path: "/home/alex/Pictures" });
    else if (target === "trash") openWindow("files", { path: "/home/alex/Trash" });
    else openWindow(target);
  }));
  document.getElementById("activitiesButton").addEventListener("click", () => { launcher.hidden = !launcher.hidden; });
  document.getElementById("dateButton").addEventListener("click", () => showToast(new Date().toLocaleDateString(undefined, { dateStyle: "full" })));
  document.getElementById("quickSettingsButton").addEventListener("click", () => { quickSettings.hidden = !quickSettings.hidden; launcher.hidden = true; });
  document.getElementById("closeQuickSettings").addEventListener("click", () => { quickSettings.hidden = true; });
  quickSettings.querySelectorAll(".quick-toggle").forEach((button) => button.addEventListener("click", () => {
    if (button.id === "quickSwitchDevice" || button.id === "quickToggleRotate") return;
    const light = button.querySelector("i");
    if (!light) return;
    const enabled = light.textContent === "●";
    light.textContent = enabled ? "○" : "●";
    light.style.color = enabled ? "#9b9da7" : "#79dfa3";
    const sm = button.querySelector("small");
    if (sm) sm.textContent = enabled ? "Disabled" : "Connected";
  }));

  if (btnChoosePhone) btnChoosePhone.addEventListener("click", () => applyDeviceMode("phone"));
  if (btnChoosePC) btnChoosePC.addEventListener("click", () => applyDeviceMode("pc"));
  if (rotateScreenButton) rotateScreenButton.addEventListener("click", toggleScreenRotation);
  if (quickToggleRotate) quickToggleRotate.addEventListener("click", toggleScreenRotation);
  if (quickSwitchDevice) quickSwitchDevice.addEventListener("click", () => {
    if (deviceModalOverlay) deviceModalOverlay.hidden = false;
    quickSettings.hidden = true;
  });

  document.querySelector(".brightness input").addEventListener("input", (event) => {
    document.querySelector(".desktop").style.filter = `brightness(${0.55 + Number(event.target.value) / 200})`;
  });
  document.getElementById("uploadInput").addEventListener("change", async (event) => {
    const files = [...event.currentTarget.files];
    if (!files.length) return;
    try {
      await importSelectedFiles(files);
    } catch (error) {
      console.error("Import failed.", error);
      showToast(error instanceof Error ? error.message : "Import failed.");
    }
  });
  document.getElementById("clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  setInterval(() => { document.getElementById("clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }, 15000);
  updateDockActiveState();
  initDeviceMode();
})();
