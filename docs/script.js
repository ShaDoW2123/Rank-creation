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


// domain age start

(function () {
    const domainStartDate = new Date("2012-03-27");
    const today = new Date();
    const diffTime = today - domainStartDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365.25);
    const remainingDays = diffDays - Math.floor(years * 365.25);

    const badgeText = `Serving clients for ${years} years, ${remainingDays} days`;

    document.getElementById("domainAgeBadge").innerText = badgeText;
  })();


// domain age end

  
  
