const track = new Tracker("http://localhost:3000", 12345);

$(window).on("load", () => {
  track.event("view", window.location.href);
});

$("#buy").on("click", () => {
  track.event("buy", window.location.href);
});
