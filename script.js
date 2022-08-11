document.querySelector(".main-container").style.minHeight =
  screen.height + "px";

download_img = function (el) {
  html2canvas(document.getElementById("bg-frame")).then(function (canvas) {
    // document.body.appendChild(canvas);

    // setTimeout(() => {
    //   // get image URI from canvas object

    //   var imageURI = canvas.toDataURL("image/png");
    //   el.href = imageURI;
    // }, 20 * 1000);

    var imageURI = canvas.toDataURL("image/png");
    el.href = imageURI;
  });
};

const file = document.querySelector('input[type="file"]');
file.addEventListener("change", (ev, z) => {
  var file = ev.target.files[0];

  var reader = new FileReader();
  reader.onloadend = function () {
    document.querySelector("img").src = reader.result;
    // document.querySelector(
    //   ".image"
    // ).style.backgroundImage = `url('${reader.result}')`;
  };
  reader.readAsDataURL(file);
});

document.querySelector("#paddingRange").addEventListener("input", (ev) => {
  console.log(ev.target.value);
  updateFrame({
    name: "padding",
    value: ev.target.value + "px",
  });
});

document.querySelector("#insetRange").addEventListener("input", (ev) => {
  console.log(ev.target.value);
  updateImage({
    name: "padding",
    value: ev.target.value + "px",
  });
});

document.querySelector("#radiusRange").addEventListener("input", (ev) => {
  console.log(ev.target.value);
  const param = {
    name: "borderRadius",
    value: ev.target.value + "px",
  };
  updateImage(param);
  // updateContent(param);
});

document.querySelector("#shadowRange").addEventListener("input", (ev) => {
  document
    .querySelector(".image")
    .style.setProperty("--shadow-opacity", "0." + ev.target.value);
  document
    .querySelector(".image")
    .style.setProperty("--shadow-top", 60 - ev.target.value + "px");
  document
    .querySelector(".image")
    .style.setProperty("--shadow-left", 60 - ev.target.value + "px");
});

console.log(document.querySelector('input[type="color"]'));

document
  .querySelector('input[type="color"]')
  .addEventListener("input", (ev) => {
    document.querySelector(".bg-color").style.backgroundColor = ev.target.value;
    bg("bg-color");
  });

function updateFrame(param) {
  document.querySelector(".frame").style[param.name] = param.value;
}

function updateContent(param) {
  document.querySelector("img").style[param.name] = param.value;
}

function updateImage(param) {
  document.querySelector(".image").style[param.name] = param.value;
  // document.querySelector(".image:after").style[param.name] = param.value;
}

function ratio(l, b) {
  console.log(l, b);
  const frame = document.querySelector(".frame");
  console.log(frame.classList);
  frame.classList.value = frame.classList.value.replace(/h-[\d\w/]+/g, "");
  frame.classList.value = frame.classList.value.replace(/w-[\d\w/]+/g, "");

  if (l === 4 && b === 3) {
    frame.classList.add("h-3/4");
    frame.classList.add("w-full");
  } else if (l === 16 && b === 9) {
    frame.classList.add("w-full");
    frame.classList.add("h-3/5");
  } else if (l === 1 && b === 1) {
    frame.classList.add("w-full");
    frame.classList.add("h-full");
  }
}

function bg(tone) {
  const activeColor = document.querySelector(".active");
  activeColor.classList.remove("active");
  const frame = document.querySelector(".frame");
  frame.classList.value = frame.classList.value.replace(/bg-[\d\w-]+/g, "");
  frame.classList.add(tone);

  console.log(`.${tone}`);
  const newColor = document.querySelector(`button.${tone}`);
  newColor.classList.add("active");
}

function updateWatermark() {
  const watermarkInput = document.querySelector("#watermark");
  const watermarkPlaceholder = document.querySelector("#watermark-placeholder");

  // If there is a water mark make it visible else hide it
  if (watermarkInput.value) {
    watermarkPlaceholder.classList.remove("hidden");
    watermarkPlaceholder.innerHTML = `@${watermarkInput.value}`;
  } else {
    watermarkPlaceholder.classList.add("hidden");
  }
}
