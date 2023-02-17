// export const fileObj = { type: "Img", data: {} }; //add type for testing purposes
export let fileObj = []; //add type for testing purposes

let compressedImageBlob;

export function compressImage(id, imgToCompress, resizingFactor, quality) {
  //final img placement
  const output = document.querySelector(id.placeholder_id);
  // showing the compressed image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const originalWidth = imgToCompress.width;
  const originalHeight = imgToCompress.height;

  const canvasWidth = originalWidth * resizingFactor;
  const canvasHeight = originalHeight * resizingFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
    imgToCompress,
    0,
    0,
    originalWidth * resizingFactor,
    originalHeight * resizingFactor
  );

  // reducing the quality of the image
  canvas.toBlob(
    async (blob) => {
      if (blob) {
        compressedImageBlob = blob;
        output.src = URL.createObjectURL(compressedImageBlob);
        const dataURLOBJ = await fileToDataUri(blob);
        const data64 = dataURLOBJ.split(",")[1];
        // fileObj.data[`${id.input_name}_img`] = data64;
        fileObj = [`${id.input_name}_img`, data64];
        console.log(`${id.input_name} is uploaded`);
      }
    },
    "image/jpeg",
    quality
  );
}

export function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(field);
  });
}
