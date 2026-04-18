// Counter animation
document.querySelectorAll('.counter').forEach(counter => {
  let target = +counter.dataset.target;
  let count = 0;
  let step = target / 80;

  function update() {
    count += step;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  }
  update();
});

// Project filter
function filterProjects(type) {
  document.querySelectorAll('.project').forEach(p => {
    p.style.display = (type === 'all' || p.classList.contains(type))
      ? 'block' : 'none';
  });
}

// Modal
function openContact() {
  document.getElementById("contactModal").style.display = "block";
}
function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}
