const dir = 'images/';
const images = [
  "frame_00059_variant_8.png",
  "frame_00262_variant_2.png",
  "frame_00414_variant_8.png",
  "frame_00536_variant_3.png",
  "frame_01206_variant_0.png",
  "frame_01253_variant_6.png",
  "frame_01399_variant_6.png",
  "frame_01305_variant_1.png",
  "frame_00271_variant_4.png",
  "frame_00269_variant_3.png",
  "frame_01311_variant_3.png",
  "frame_01349_variant_1.png",
  "frame_00456_variant_1.png",
  "frame_00026_variant_5.png",
  "frame_01291_variant_4.png",
  "frame_00515_variant_7.png",
  "frame_01350_variant_8.png",
  "frame_01373_variant_4.png",
  "frame_00380_variant_6.png",
  "frame_00033_variant_8.png",
  "frame_00143_variant_2.png",
  "frame_00177_variant_1.png",
  "frame_01273_variant_0.png",
  "frame_01366_variant_4.png",
  "frame_00264_variant_4.png",
  "frame_00455_variant_4.png",
  "frame_00262_variant_6.png",
  "frame_00330_variant_3.png",
  "frame_00523_variant_1.png",
  "frame_00392_variant_4.png",
  "frame_00416_variant_0.png",
  "frame_00513_variant_6.png",
  "frame_01359_variant_0.png",
  "frame_00517_variant_5.png",
  "frame_00566_variant_6.png",
  "frame_00484_variant_5.png",
  "frame_00627_variant_4.png",
  "frame_00514_variant_6.png",
  "frame_00441_variant_3.png",
  "frame_00639_variant_8.png",
  "frame_00270_variant_4.png",
  "frame_00642_variant_2.png",
  "frame_00738_variant_0.png",
  "frame_00792_variant_6.png",
  "frame_00884_variant_7.png",
  "frame_00773_variant_8.png",
  "frame_00939_variant_3.png",
  "frame_00851_variant_0.png",
  "frame_00923_variant_5.png",
  "frame_00791_variant_3.png",
  "frame_00741_variant_1.png",
  "frame_00889_variant_1.png",
  "frame_01138_variant_4.png",
  "frame_00899_variant_0.png",
  "frame_00771_variant_4.png"
];




const img = document.getElementById('viewer');
const cap = document.getElementById('caption');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let i = 0;

function niceName(filename){
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function show(idx){
  i = (idx + images.length) % images.length;
  const name = images[i];
  img.src = dir + name;
  img.alt = `Image ${i+1} of ${images.length}`;
  cap.textContent = `${i+1}/${images.length}`;
}

function next(){ show(i + 1); }
function prev(){ show(i - 1); }

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});

// Simple touch swipe support
let touchX = null;
img.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
img.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) { dx > 0 ? prev() : next(); }
  touchX = null;
}, { passive: true });

// Preload images
images.forEach(name => { const p = new Image(); p.src = dir + name; });

// Initial render
show(0);
