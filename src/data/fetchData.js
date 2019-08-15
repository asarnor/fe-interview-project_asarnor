const DATA = {
  "abstract-logo": {
    width: 100,
    height: 100,
    contents: [
      { type: "rect", width: 49, height: 12, x: 20, y: 20, fill: "black" },
      { type: "rect", width: 12, height: 60, x: 68, y: 20, fill: "black" },
      { type: "oval", width: 42, height: 42, x: 20, y: 38, fill: "black" },
      { type: "oval", width: 20, height: 20, x: 31, y: 49, fill: "white" }
    ]
  },

  "scale-up": {
    width: 800,
    height: 800,
    contents: [
      { type: "abstract-logo", scale: 8, x: 0, y: 0 },
      { type: "abstract-logo", scale: 4, x: 0, y: 0 },
      { type: "abstract-logo", scale: 2, x: 0, y: 0 },
      { type: "abstract-logo", scale: 1, x: 0, y: 0 }
    ]
  },

  "more-scale": {
    width: 800,
    height: 800,
    contents: [
      { type: "scale-up", scale: 0.5, x: 0, y: 0 },
      { type: "scale-up", scale: 0.5, x: 400, y: 0 },
      { type: "scale-up", scale: 0.5, x: 400, y: 400 },
      { type: "scale-up", scale: 0.5, x: 0, y: 400 }
    ]
  },

  "man-stract": {
    width: 400,
    height: 400,
    contents: [
      { type: "abstract-logo", scale: 1.5, x: 90, y: 0 },
      { type: "abstract-logo", scale: 1.5, x: 90, y: 0 },

      { type: "abstract-logo", scale: 1.5, x: 210, y: 0 },
      { type: "abstract-logo", scale: 1.5, x: 210, y: 0 },

      { type: "rect", width: 20, height: 40, x: 310, y: 155, fill: "black" },
      { type: "rect", width: 20, height: 40, x: 310, y: 155, fill: "black" },

      { type: "rect", width: 200, height: 20, x: 130, y: 155, fill: "black" },
      { type: "rect", width: 200, height: 20, x: 130, y: 155, fill: "black" }
    ]
  }
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Access the data via this function
export default async function fetchData() {
  console.log("fetchData called!");
  await sleep(500);
  return DATA;
}
