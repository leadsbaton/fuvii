// import { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_PUBLIC_KEY } from '../../utils/mail.js';

// window.openSignupModal = openSignupModal;
// window.closeSignupModal = closeSignupModal;

// // Initialize EmailJS
// window.onload = function () {
//   emailjs.init(EMAIL_PUBLIC_KEY);

//   const form = document.getElementById("signupForm");
//   const timestampInput = document.getElementById("timestamp");
//   const submitBtn = form.querySelector("button[type='submit']");

//   const showDialog = (message, isSuccess = true) => {
//     const dialog = document.createElement("div");
//     dialog.className = `fixed top-10 right-10 ${isSuccess ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded shadow-lg z-50`;
//     dialog.innerText = message;
//     document.body.appendChild(dialog);
//     setTimeout(() => dialog.remove(), 3000);
//   };

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Get input values
//     const fullName = document.getElementById("fullName").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const phone = document.getElementById("phone").value.trim();
//     const location = document.getElementById("location").value.trim();
//     const termsAccepted = document.getElementById("termsCheckbox").checked;

//     // Validate inputs
//     const isValidEmail = /\S+@\S+\.\S+/.test(email);
//     const isValidPhone = /^[0-9]{10,11}$/.test(phone);

//     if (!fullName || !email || !phone || !location) {
//       showDialog("Please fill in all required fields.", false);
//       return;
//     }

//     if (!isValidEmail) {
//       showDialog("Invalid email address.", false);
//       return;
//     }

//     if (!isValidPhone) {
//       showDialog("Phone number must be 10 or 11 digits.", false);
//       return;
//     }

//     if (!termsAccepted) {
//       showDialog("Please accept the terms and conditions.", false);
//       return;
//     }

//     // Confirm details
//     const confirmation = confirm(
//       `Please confirm your details:\n
// Full Name: ${fullName}
// Email: ${email}
// Phone: ${phone}
// Location: ${location}

// Click OK to proceed.`
//     );
//     if (!confirmation) return;

//     // Set timestamp
//     const now = new Date();
//     timestampInput.value = now.toLocaleString();

//     // Show loading state
//     submitBtn.disabled = true;
//     const originalText = submitBtn.innerHTML;
//     submitBtn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white inline mr-2" viewBox="0 0 24 24">
//                   <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                   <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
//                 </svg>Sending...`;

//     // Send email via EmailJS
//     emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, form)
//       .then(() => {
//         showDialog("Registration successful! We'll contact you soon.");
//         alert('Thank you for signing up! We will get in touch with you shortly.');
//         form.reset();
//         // Trigger file download
//         const link = document.createElement("a");
//         link.href = "https://leadsbaton.github.io/fuvii/assets/pdf/fuvii_1.pdf";
//         link.download = "fuvii.pdf";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         closeSignupModal();
//       })
//       .catch((error) => {
//         console.error("EmailJS Error:", error);
//         showDialog("Failed to send registration. Please try again.", false);
//       })
//       .finally(() => {
//         submitBtn.disabled = false;
//         submitBtn.innerHTML = originalText;
//       });
//   });
// };

// // Modal functions
// // 打开注册模态框
// function openSignupModal() {
//   // 获取id为signupModal的元素，并移除hidden类
//   document.getElementById('signupModal').classList.remove('hidden');
//   // 设置body元素的overflow属性为hidden，禁止滚动
//   document.body.style.overflow = 'hidden';
// }

// function closeSignupModal() {
//   document.getElementById('signupModal').classList.add('hidden');
//   document.body.style.overflow = 'auto';
// }

// // Close modal when clicking outside
// document.getElementById('signupModal').addEventListener('click', function (e) {
//   if (e.target === this) {
//     closeSignupModal();
//   }
// });

import { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_PUBLIC_KEY } from '../../utils/mail.js';

window.openSignupModal = openSignupModal;
window.closeSignupModal = closeSignupModal;

window.onload = function () {
  emailjs.init(EMAIL_PUBLIC_KEY);

  const form = document.getElementById("signupForm");
  const timestampInput = document.getElementById("timestamp");
  const submitBtn = form.querySelector("button[type='submit']");

  const showDialog = (message, isSuccess = true) => {
    const dialog = document.createElement("div");
    dialog.className = `fixed top-10 right-10 ${isSuccess ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded shadow-lg z-50`;
    dialog.innerText = message;
    document.body.appendChild(dialog);
    setTimeout(() => dialog.remove(), 3000);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const termsAccepted = document.getElementById("termsCheckbox").checked;

    const isValidPhone = /^[0-9]{10,11}$/.test(phone);

    if (!fullName || !phone) {
      showDialog("Please fill in all required fields.", false);
      return;
    }

    if (!isValidPhone) {
      showDialog("Phone number must be 10 or 11 digits.", false);
      return;
    }

    if (!termsAccepted) {
      showDialog("Please accept the terms and conditions.", false);
      return;
    }

    const confirmation = confirm(`Please confirm your details:\n\nFull Name: ${fullName}\nPhone: ${phone}`);
    if (!confirmation) return;

    timestampInput.value = new Date().toLocaleString();

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white inline mr-2" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>Sending...`;

    emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, form)
      .then(() => {
        showDialog("Registration successful! We'll contact you soon.");
        alert('Thank you! We will contact you shortly.');
        form.reset();
        // Trigger file download
        const link = document.createElement("a");
        link.href = "https://leadsbaton.github.io/fuvii/assets/pdf/fuvii_1.pdf";
        link.download = "fuvii.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeSignupModal();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showDialog("Failed to send. Please try again.", false);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
};

function openSignupModal() {
  document.getElementById('signupModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSignupModal() {
  document.getElementById('signupModal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

document.getElementById('signupModal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeSignupModal();
  }
});
