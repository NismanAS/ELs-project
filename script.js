// ==========================================================
// Trash2Treasure — site behaviour
// ==========================================================

const WHATSAPP_NUMBER = "919345528913";

/**
 * Build a wa.me link with a pre-filled, URL-encoded message.
 */
function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Open a WhatsApp chat with the given message in a new tab.
 */
function openWhatsApp(message) {
  const link = buildWhatsAppLink(message);
  window.open(link, "_blank", "noopener");
}

// ---------------------------------------------------------
// Mobile navigation
// ---------------------------------------------------------
(function setupNav() {
  const hamburger = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");
  if (!hamburger || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after tapping a link (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Close menu if the viewport is resized back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeNav();
  });
})();

// ---------------------------------------------------------
// Per-product "Order on WhatsApp" buttons
// ---------------------------------------------------------
(function setupProductOrders() {
  const buttons = document.querySelectorAll(".order-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      if (!card) return;

      const name = card.dataset.name || "Product";
      const price = card.dataset.price || "";

      const message =
        `Hello Trash2Treasure! 👋\n\n` +
        `I would like to order:\n\n` +
        `Product: ${name}\n` +
        `Price: ₹${price}\n` +
        `Quantity: 1\n\n` +
        `Please provide the order details.`;

      openWhatsApp(message);
    });
  });
})();

// ---------------------------------------------------------
// General "Chat with us" WhatsApp button
// ---------------------------------------------------------
(function setupGeneralWhatsApp() {
  const btn = document.getElementById("generalWhatsapp");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const message =
      `Hello Trash2Treasure! 👋\n\n` +
      `I'd like to know more about your products.`;
    openWhatsApp(message);
  });
})();

// ---------------------------------------------------------
// Contact / order form
// ---------------------------------------------------------
(function setupOrderForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const product = form.product.value;
    const quantity = form.quantity.value || "1";
    const note = form.message.value.trim();

    if (!name || !phone || !product) {
      alert("Please fill in your name, phone number and select a product.");
      return;
    }

    let message =
      `Hello Trash2Treasure! 👋\n\n` +
      `I would like to order:\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Product: ${product}\n` +
      `Quantity: ${quantity}\n`;

    if (note) {
      message += `Message: ${note}\n`;
    }

    message += `\nPlease provide the order details.`;

    openWhatsApp(message);
  });
})();

// ---------------------------------------------------------
// Header shadow on scroll (subtle, purely cosmetic)
// ---------------------------------------------------------
(function setupHeaderShadow() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  function updateShadow() {
    if (window.scrollY > 8) {
      header.style.boxShadow = "0 6px 20px rgba(35,48,28,0.08)";
    } else {
      header.style.boxShadow = "none";
    }
  }

  window.addEventListener("scroll", updateShadow, { passive: true });
  updateShadow();
})();
