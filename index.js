
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("applyForm");

  // Helper function to sanitize input
  const sanitize = (value) => {
    return value
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s'-]{2,40}$/,
    email: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
    phone: /^[6-9]\d{9}$/, // Indian 10-digit mobile numbers
    work: /^[a-zA-Z0-9\s.,-]{1,50}$/,
    city: /^[a-zA-Z\s'-]{2,40}$/
  };

  const showError = (input, message) => {
    removeError(input);
    const error = document.createElement("p");
    error.textContent = message;
    error.className = "error-message text-red-500 text-xs mt-1";
    input.insertAdjacentElement("afterend", error);
    input.classList.add("border-red-500");
  };

  const removeError = (input) => {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error-message")) {
      next.remove();
    }
    input.classList.remove("border-red-500");
  };

   const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // restrict non-numeric
  });

  // Allow only letters for name & city fields
  ["firstName", "lastName", "city"].forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ""); // restrict non-letter
      removeError(input);
    });
  });

   // Live error removal + live email validation
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      removeError(input);

      // Live email validation
      if (input.type === "email") {
        const email = input.value.trim();
        if (email && !patterns.email.test(email)) {
          showError(input, "Please enter a valid email address");
        } else {
          removeError(input);
        }
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    form.querySelectorAll(".error-message").forEach(el => el.remove());

    // Get and sanitize input values
    const firstName = sanitize(form.firstName.value.trim());
    const lastName = sanitize(form.lastName.value.trim());
    const email = sanitize(form.email.value.trim());
    const phone = sanitize(form.phone.value.trim());
    const work = sanitize(form.work.value.trim());
    const city = sanitize(form.city.value.trim());

   

    // Validate each field
    if (!firstName) { showError(form.firstName, "First name is required."); isValid = false; }
    else if (!patterns.name.test(firstName)) { showError(form.firstName, "Enter a valid name."); isValid = false; }

    if (!lastName) { showError(form.lastName, "Last name is required."); isValid = false; }
    else if (!patterns.name.test(lastName)) { showError(form.lastName, "Enter a valid name."); isValid = false; }

    if (!email) { showError(form.email, "Email is required."); isValid = false; }
    else if (!patterns.email.test(email)) { showError(form.email, "Enter a valid email address."); isValid = false; }

    if (!phone) { showError(form.phone, "Phone number is required."); isValid = false; }
    else if (!patterns.phone.test(phone)) { showError(form.phone, "Enter a valid 10-digit phone number."); isValid = false; }

    if (!work) { showError(form.work, "Work experience is required."); isValid = false; }
    else if (!patterns.work.test(work)) { showError(form.work, "Enter a valid experience (no symbols)."); isValid = false; }

    if (!city) { showError(form.city, "City is required."); isValid = false; }
    else if (!patterns.city.test(city)) { showError(form.city, "Enter a valid city name."); isValid = false; }

   

    // If valid → handle success
    if (isValid) {
      const formData = {
        firstName,
        lastName,
        email,
        phone,
        work,
        city,
        
      };

      console.log("Sanitized Data:", formData);
      alert("Form validated successfully!");
      form.reset();
    } else {
      const firstError = form.querySelector(".error-message");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});






document.addEventListener("DOMContentLoaded", () => {
  const clickLayer = document.getElementById("click-layer");
  const popup = document.getElementById("popup");
  const close = document.getElementById("close");
  const video = document.querySelector("#popup video");
   const backgroundVideo = document.getElementById("video-section");

  // Open popup and play video
  clickLayer.addEventListener("click", () => {
    popup.classList.remove("hidden");
    popup.classList.add("flex");
if (backgroundVideo) backgroundVideo.pause();
    if (video) {
      video.currentTime = 0; // optional: restart video
      video.play(); // play automatically
    }
  });

  // Close popup (close button)
  close.addEventListener("click", () => {
    popup.classList.add("hidden");
    if (video) video.pause();
     if (backgroundVideo) backgroundVideo.play();
  });

  // Close popup when clicking outside the content
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
      if (video) video.pause();
      if (backgroundVideo) backgroundVideo.play();
    }
  });
});






//accordian question
  document.querySelectorAll(".accordion button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector("svg");

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.style.transform = "rotate(0deg)";
      } else {
        // Close others
        document.querySelectorAll(".accordion-content").forEach((el) => {
          el.style.maxHeight = null;
          el.previousElementSibling.querySelector("svg").style.transform = "rotate(0deg)";
        });
        // Open current
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });


  const swiper = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "3",
        loop: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false,
        // },
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 1.2,
          // slideShadows: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
    320: { // small mobile
      slidesPerView: 1.1,
      spaceBetween: 5,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    },
    640: { // tablets
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: { // laptops
      slidesPerView: 3,
      spaceBetween: 30,
    },
   
  },
      });


       const quizData = [
    {
      question: "How would you describe where you are right now?",
      answers: ["I’m doing everything right… but nothing’s really changing.","I’m busy every day, yet not really moving forward.", "I’m doing okay — but it doesn’t feel like enough anymore."]
    },
    {
      question: "What do you feel is holding you back?",
      answers: ["I’ve stopped learning new things.", "I’m not sure what direction to take next.", "I don’t feel confident about my growth."]
    },
     {
      question: "What do you wish you had right now in your career?",
      answers: ["Clear direction and guidance.", "Confidence to take the next step.", "Skills that actually make a difference."]
    },
    {
       question: "What kind of support would help you move forward?",
      answers: ["Personal career counselling", "upskilling", "Help finding the right program"]
    }
  ];


      // quies asswer 
       const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const quizStep = document.getElementById("quiz-step");
  const progressPercent = document.getElementById("progress-percent");
  const resultScreen = document.getElementById("result-screen");
  const progressBar = document.getElementById("progress-bar");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");

  let currentStep = 0;
  let selectedAnswer = null;
    let userAnswers = []; // Store answers for console

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizStep.classList.remove("hidden");
    loadQuestion();
  });

  function loadQuestion() {
    const current = quizData[currentStep];
    questionEl.textContent = current.question;
    answersEl.innerHTML = "";

    current.answers.forEach((answer, index) => {
      const label = document.createElement("label");
      label.className =
        "answer-block flex items-center gap-3 border-[4px] text-left border-white bg-[#63636333] rounded-full text-[14px] md:text-[18px] font-roboto font-medium px-6 py-4 cursor-pointer hover:bg-gray-100 transition-all duration-300 shadow-[0px_0px_4px_0px_#FFE8E840,_20px_20px_36px_0px_#00000040,_24px_24px_32px_0px_#0000001A]";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = answer;
      input.className = "w-5 h-5 accent-[#304A98]";

      const span = document.createElement("span");
      span.textContent = answer;
      span.className = "text-gray-800 text-[14px] md:text-[18px] transition-all duration-300";

      input.addEventListener("change", () => {
        selectedAnswer = answer;
        nextBtn.classList.remove("hidden");

        // Reset all labels
        document.querySelectorAll(".answer-block").forEach((el) => {
          el.style.borderColor = "white";
          el.style.boxShadow =
            "0px 0px 4px 0px #FFE8E840, 20px 20px 36px 0px #00000040, 24px 24px 32px 0px #0000001A";
          el.style.background = "#63636333";
          const innerSpan = el.querySelector("span");
          if (innerSpan) innerSpan.style.color = "#000";
        });

        // Apply selected style
        label.style.borderColor = "#304A98";
        label.style.background = "#000";
        label.style.boxShadow =
          "16px 16px 32px 0px #000F3EB2, inset 0px 0px 52px 0px #3262F266";
        span.style.color = "#ffffff";
      });

      label.appendChild(input);
      label.appendChild(span);
      answersEl.appendChild(label);
    });

    updateProgress();
    nextBtn.classList.add("hidden");
  }

  function updateProgress() {
    const progress = ((currentStep + 1) / quizData.length) * 100;
    progressBar.style.width = progress + "%";
    progressPercent.textContent = Math.round(progress) + "%";
  }

  nextBtn.addEventListener("click", () => {
    if (!selectedAnswer) return;

    // Save answer
    userAnswers.push({
      question: quizData[currentStep].question,
      answer: selectedAnswer,
    });

    currentStep++;
    selectedAnswer = null;

    if (currentStep < quizData.length) {
      loadQuestion();
    } else {
      quizStep.classList.add("hidden");
      resultScreen.classList.remove("hidden");

      // Print results to console
      console.log("📋 Quiz Answers:");
      userAnswers.forEach((item, index) => {
        console.log(`Q${index + 1}: ${item.question}`);
        console.log(`Answer: ${item.answer}`);
        console.log("-----------------------------");
      });
    }
  });
  // nextBtn.addEventListener("click", () => {
  //   if (!selectedAnswer) return;
  //   currentStep++;
  //   selectedAnswer = null;

  //   if (currentStep < quizData.length) {
  //     loadQuestion();
  //   } else {
  //     quizStep.classList.add("hidden");
  //     resultScreen.classList.remove("hidden");
  //   }
  // });


