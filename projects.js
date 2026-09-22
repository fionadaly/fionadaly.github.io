document.addEventListener("DOMContentLoaded", function () {
  if (!window.pdfjsLib) return;

  pdfjsLib.GlobalWorkerOptions.workerSrc = "js/pdf.worker.min.js";

  document.querySelectorAll(".project-pdf").forEach(function (frame) {
    var url = frame.getAttribute("data-pdf");
    if (!url) return;
    renderPdf(frame, url);
  });
});

function renderPdf(frame, url) {
  pdfjsLib.getDocument(url).promise.then(function (pdf) {
    var chain = Promise.resolve();

    for (var pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      chain = chain.then(renderPage.bind(null, frame, pdf, pageNumber));
    }

    return chain;
  }).catch(function () {
    var link = document.createElement("a");
    link.className = "project-pdf-link";
    link.href = url;
    link.textContent = "Open PDF";
    frame.appendChild(link);
  });
}

function renderPage(frame, pdf, pageNumber) {
  return pdf.getPage(pageNumber).then(function (page) {
    var width = frame.clientWidth || frame.getBoundingClientRect().width || 640;
    var unscaled = page.getViewport({ scale: 1 });
    var viewport = page.getViewport({ scale: width / unscaled.width });
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var ratio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(viewport.width * ratio);
    canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    frame.appendChild(canvas);

    return page.render({ canvasContext: context, viewport: viewport }).promise;
  });
}
