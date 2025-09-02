/*============= toggle icon navbar =============*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*============= scroll sections active link =============*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*============= sticky navbar =============*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*============= remove toggle icon and navbar when click navbar link (scroll) =============*/
     menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*============= Mode Switch =========*/
  document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.querySelector(".theme-switch__checkbox");

    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === null) {
      document.body.classList.remove("light-mode");
      checkbox.checked = true;
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      checkbox.checked = false;
    }

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      }
    });
  });


 /*============= scroll reveal =============*/
  ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
  ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin:
    'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin:
    'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin:
    'right' });

    /*========== about hidden concept =======*/
    const revealButton = (event) => {
  event.preventDefault();

  const content = document.getElementById("first");
  const btn = document.getElementById("revealBtn");

  if (content.classList.contains("show")) {
    /*======= animation when show less =======*/
    content.style.maxHeight = content.scrollHeight + "px"; /*====== to not make a starnge scroll up =======*/
    setTimeout(() => {
      content.style.maxHeight = "0";
    }, 10);

    content.classList.remove("show");
    btn.textContent = "Read More";
      } else {
    /*====== animation when read more ======*/
    content.classList.add("show");
    content.style.maxHeight = content.scrollHeight + "px";
    btn.textContent = "Show Less";
     }
    };

    /*======= contact form =======*/
    const form = document.getElementById("contact-form");
    const submitBtn = form.querySelector(".submit-btn");

    form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalText = submitBtn.value;
    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      submitBtn.value = "Sent ✔";
      submitBtn.style.setProperty("--submit-color", "green");
      form.reset();
    } else {
      submitBtn.value = "Error ❌";
      submitBtn.style.setProperty("--submit-color", "red");
    }
  } catch (error) {
    submitBtn.value = "Network Error ❌";
    submitBtn.style.setProperty("--submit-color", "yellow");
  }

  setTimeout(() => {
    submitBtn.value = originalText;
    submitBtn.style.setProperty("--submit-color", "var(--main-color)");
    submitBtn.disabled = false;
  }, 3000);
});
  