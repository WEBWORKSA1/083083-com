/* =========================================================
   083083.com — central site configuration
   Edit this one file to switch on payments, ad units, videos.
   ========================================================= */
window.SITE_CONFIG = {
  siteName: "083083",
  siteUrl: "https://083083.com",
  adsenseClient: "ca-pub-6620975821265271",

  /* Manual AdSense units. Leave a slot "" and Auto Ads handles that area.
     Create units in AdSense → Ads → By ad unit, then paste the numeric slot IDs. */
  adSlots: {
    header: "",
    inContent: "",
    sidebar: "",
    footer: ""
  },

  /* Inquiry routing. The address is stored encoded and only assembled at
     submit time, so it never appears in page text, links or markup.
     After the first form submission FormSubmit emails an activation link;
     once activated, paste the random alias it gives you into formAlias
     and the address disappears from the source entirely. */
  formAlias: "",
  _r: [109,111,99,46,108,105,97,109,103,64,49,97,115,107,114,111,119,98,101,119],

  /* Interest banner link (top of every page) */
  interestUrl: "https://web.works/contact",

  /* Donation / payment links — paste real links to activate the buttons.
     While empty, buttons open the pledge form instead. */
  payments: {
    paypal: "",        // e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
    stripe: "",        // e.g. https://donate.stripe.com/XXXX
    buyMeACoffee: "",  // e.g. https://buymeacoffee.com/yourname
    kofi: "",          // e.g. https://ko-fi.com/yourname
    upi: ""            // e.g. upi://pay?pa=name@bank&pn=083083 (India)
  },

  /* YouTube: your channel + video IDs (the 11-char ID after watch?v=) */
  youtube: {
    channelUrl: "https://www.youtube.com/results?search_query=phone+scam+awareness",
    videos: [
      // { id: "XXXXXXXXXXX", title: "How to spot a spoofed call" },
    ]
  },

  /* Partner / affiliate links for the quote results screen */
  partners: [
    { name: "Cloud VoIP (all-in-one)", tag: "Best for 1–49 users", url: "" },
    { name: "Contact-center platform", tag: "Best for sales & support teams", url: "" },
    { name: "Virtual / vanity numbers", tag: "Best for a memorable number", url: "" }
  ]
};
