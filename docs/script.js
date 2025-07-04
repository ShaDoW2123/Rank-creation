// searchIcon start

const searchIcon = document.getElementById("searchIcon");
    const searchContainer = document.getElementById("searchContainer");

    searchIcon.addEventListener("click", () => {
      searchContainer.classList.toggle("active");
    });

// searchIcon End 


// progress bar Start


document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".progress-wrapper");

  wrappers.forEach(wrapper => {
    const percentage = parseInt(wrapper.dataset.percentage);
    const fill = wrapper.querySelector("circle[class^='progress-ring-fill']");
    const text = wrapper.querySelector(".progress-text");

    const radius = 54;
    const circumference = 2 * Math.PI * radius;

    fill.style.strokeDasharray = circumference;
    fill.style.strokeDashoffset = circumference;

    let current = 0;

    const animate = () => {
      const offset = circumference - (current / 100) * circumference;
      fill.style.strokeDashoffset = offset;
      text.textContent = `${current}%`;
      if (current < percentage) {
        current++;
        requestAnimationFrame(animate);
      }
    };

    animate();
  });
});





// progress bar End 