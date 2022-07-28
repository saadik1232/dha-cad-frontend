import { Howl, Howler } from "howler";

var sound1 = new Howl({
  src: ["/beep-07.mp3"],
  autoplay: false,
  loop: false,
  volume: 1,
  onend: function () {
    console.log("Just Beeped 1 ! ");
  },
});

var sound2 = new Howl({
  src: ["/button-1.mp3"],
  autoplay: false,
  loop: false,
  volume: 1,
  onend: function () {
    console.log("Just Beeped 2 ! ");
  },
});

var sound3 = new Howl({
  src: ["/button-2.mp3"],
  autoplay: false,
  loop: false,
  volume: 1,
  onend: function () {
    console.log("Just Beeped 3 ! ");
  },
});

var sound4 = new Howl({
  src: ["/button-10.mp3"],
  autoplay: false,
  loop: false,
  volume: 1,
  onend: function () {
    console.log("Just Beeped 4 ! ");
  },
});

export const Beep1 = async () => await sound1.play();
export const Beep2 = async () => await sound2.play();
export const Beep3 = async () => await sound3.play();
export const Beep4 = async () => await sound4.play();
